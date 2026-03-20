import { all } from 'redux-saga/effects';
import employeeSaga from '@/features/employee/employeeSaga';
import departmentSaga from '@/features/department/departmentSaga';
import attendanceSaga from '@/features/attendance/attendanceSaga';

export default function* rootSaga() {
  yield all([employeeSaga(), departmentSaga(), attendanceSaga()]);
}
