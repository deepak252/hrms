import type { AttendanceFormError, AttendanceFormValues } from '@/shared.types';

export const validateAttendanceForm = (values: AttendanceFormValues) => {
  const errors: Partial<AttendanceFormError> = {};

  if (!values.employeeId) {
    errors.employeeId = 'Employee ID is required';
  }

  if (!values.date) {
    errors.date = 'Date is required';
  }

  if (!values.status) {
    errors.status = 'Status is required';
  }

  return errors;
};
