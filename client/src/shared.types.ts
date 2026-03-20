export type AttendanceStatus = 'Present' | 'Absent';

export type ToastData = {
  type?: 'success' | 'failure' | 'message' | null;
  message?: string | null;
};

export type Employee = {
  id: number;
  fullName: string;
  email: string;
  departmentId: number;
  department?: string;
};

export type PaginatedList<T> = {
  list: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
  isLoading: boolean;
};

export type EmployeeFormValues = {
  fullName: string;
  email: string;
  departmentId: number;
};

export type EmployeeFormError = {
  fullName?: string;
  email?: string;
  departmentId?: string;
};

export type CreateEmployeePayload = {
  full_name: string;
  email: string;
  department_id: number;
};

export type MarkAttendancePayload = {
  employee_id: number;
  status: AttendanceStatus;
  date: string;
};

export type Attendance = {
  id: number;
  employeeId: number;
  status: AttendanceStatus;
  date: string;
};

export type AttendanceFormValues = {
  employeeId: number;
  status: AttendanceStatus;
  date: string;
};

export type AttendanceFormError = {
  employeeId?: string;
  status?: string;
  date?: string;
};

export type Department = {
  id: number;
  name: string;
};
