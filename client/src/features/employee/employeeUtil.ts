import type { EmployeeFormError, EmployeeFormValues } from '@/shared.types';

export const validateEmployeeForm = (values: EmployeeFormValues) => {
  const errors: Partial<EmployeeFormError> = {};

  if (!values.fullName) {
    errors.fullName = 'Full name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Invalid email';
  }

  if (values.departmentId == 0) {
    errors.departmentId = 'Department is required';
  }

  return errors;
};
