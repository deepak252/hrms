import employeeReducer from '@/features/employee/employeeSlice';
import departmentReducer from '@/features/department/departmentsSlice';
import attendanceReducer from '@/features/attendance/attendanceSlice';

export default {
  employee: employeeReducer,
  department: departmentReducer,
  attendance: attendanceReducer
};
