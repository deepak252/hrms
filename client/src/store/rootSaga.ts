import { all } from 'redux-saga/effects';
import employeeSaga from '@/features/employee/employeeSaga';

export default function* rootSaga() {
  yield all([employeeSaga()]);
}
