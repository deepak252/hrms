import { all, put, takeLatest } from 'redux-saga/effects';
import { type PayloadAction } from '@reduxjs/toolkit';
import { apiWorker } from '@/services/api';
import {
  getDepartments,
  getDepartmentsSuccess,
  getDepartmentsFailure
} from './departmentsSlice';
import DepartmentsService from '@/features/department/departmentService';

function* getDepartmentsWorker(action: PayloadAction<undefined>): Generator {
  const cachedDepartments = localStorage.getItem('departments');

  if (cachedDepartments) {
    yield put(getDepartmentsSuccess(JSON.parse(cachedDepartments)));
    return;
  }
  yield* apiWorker(DepartmentsService.getDepartments, action.payload, {
    onSuccess: function* (response) {
      const data = response.data?.data ?? [];
      localStorage.setItem('departments', JSON.stringify(data));
      yield put(getDepartmentsSuccess(data));
    },
    onFailure: function* (error) {
      yield put(
        getDepartmentsFailure(error?.message || 'Something went wrong')
      );
    }
  });
}

export default function* () {
  yield all([takeLatest(getDepartments.type, getDepartmentsWorker)]);
}
