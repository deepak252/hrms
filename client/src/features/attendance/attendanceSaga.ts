import { all, put, takeLatest } from 'redux-saga/effects';
import { type PayloadAction } from '@reduxjs/toolkit';
import { apiWorker } from '@/services/api';
import {
  getEmployeeAttendance,
  getEmployeeAttendanceSuccess,
  getEmployeeAttendanceFailure,
  markAttendance,
  markAttendanceSuccess,
  markAttendanceFailure
} from './attendanceSlice';
import AttendanceService from '@/features/attendance/attendanceService';
import type {
  AttendanceFormValues,
  MarkAttendancePayload
} from '@/shared.types';

function* getEmployeeAttendanceWorker(
  action: PayloadAction<{ employeeId: number }>
): Generator {
  yield* apiWorker(
    AttendanceService.getEmployeeAttendanceHistory,
    action.payload.employeeId,
    {
      onSuccess: function* (response) {
        const data = response.data?.data ?? [];
        yield put(getEmployeeAttendanceSuccess(data));
      },
      onFailure: function* (error) {
        yield put(
          getEmployeeAttendanceFailure(error?.message || 'Something went wrong')
        );
      }
    }
  );
}

function* markAttendanceWorker(
  action: PayloadAction<AttendanceFormValues>
): Generator {
  const payload: MarkAttendancePayload = {
    date: action.payload.date,
    employee_id: action.payload.employeeId,
    status: action.payload.status
  };
  yield* apiWorker(AttendanceService.markAttendance, payload, {
    onSuccess: function* (response) {
      const data = response.data?.data ?? [];
      yield put(markAttendanceSuccess(data));
      yield put(getEmployeeAttendance({ employeeId: payload.employee_id }));
    },
    onFailure: function* (error) {
      yield put(
        markAttendanceFailure(error?.message || 'Something went wrong')
      );
    }
  });
}

export default function* () {
  yield all([
    takeLatest(getEmployeeAttendance.type, getEmployeeAttendanceWorker),
    takeLatest(markAttendance.type, markAttendanceWorker)
  ]);
}
