import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { payrollValidationSchema } from 'validationSchema/payrolls';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  const allowed = await prisma.payroll
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  if (!allowed) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  switch (req.method) {
    case 'GET':
      return getPayrollById();
    case 'PUT':
      return updatePayrollById();
    case 'DELETE':
      return deletePayrollById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPayrollById() {
    const data = await prisma.payroll.findFirst(convertQueryToPrismaUtil(req.query, 'payroll'));
    return res.status(200).json(data);
  }

  async function updatePayrollById() {
    await payrollValidationSchema.validate(req.body);
    const data = await prisma.payroll.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deletePayrollById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.payroll.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
