import axios from 'axios';
import queryString from 'query-string';
import { PayrollInterface, PayrollGetQueryInterface } from 'interfaces/payroll';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPayrolls = async (query?: PayrollGetQueryInterface): Promise<PaginatedInterface<PayrollInterface>> => {
  const response = await axios.get('/api/payrolls', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPayroll = async (payroll: PayrollInterface) => {
  const response = await axios.post('/api/payrolls', payroll);
  return response.data;
};

export const updatePayrollById = async (id: string, payroll: PayrollInterface) => {
  const response = await axios.put(`/api/payrolls/${id}`, payroll);
  return response.data;
};

export const getPayrollById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/payrolls/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePayrollById = async (id: string) => {
  const response = await axios.delete(`/api/payrolls/${id}`);
  return response.data;
};
