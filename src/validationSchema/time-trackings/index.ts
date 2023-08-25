import * as yup from 'yup';

export const timeTrackingValidationSchema = yup.object().shape({
  hours_worked: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
});
