import { all, put, select, takeLatest } from 'redux-saga/effects';
import { type PayloadAction } from '@reduxjs/toolkit';
import { apiWorker } from '@/services/api';
import {
  createEmployee,
  createEmployeeFailure,
  createEmployeeSuccess,
  deleteEmployee,
  deleteEmployeeFailure,
  deleteEmployeeSuccess,
  getEmployeeDetails,
  getEmployeeDetailsFailure,
  getEmployeeDetailsSuccess,
  getEmployees,
  getEmployeesFailure,
  getEmployeesSuccess
} from './departmentsSlice';
import EmployeesService from '@/features/employee/employeeService';
import type { EmployeeFormValues } from '@/shared.types';
import type { RootState } from '@/store';

function* getEmployeesWorker(action: PayloadAction<undefined>): Generator {
  yield* apiWorker(EmployeesService.getEmployees, action.payload, {
    onSuccess: function* (response) {
      const data = response.data?.data ?? [];
      const employees = data.map((e: any) => ({
        id: e?.id,
        fullName: e?.full_name,
        email: e?.email,
        departmentId: e?.department_id,
        department: e?.department
      }));
      yield put(getEmployeesSuccess(employees));
    },
    onFailure: function* (error) {
      yield put(getEmployeesFailure(error?.message || 'Something went wrong'));
    }
  });
}

function* createEmployeeWorker(
  action: PayloadAction<EmployeeFormValues>
): Generator {
  const { fullName, email, departmentId } = action.payload;
  yield* apiWorker(
    EmployeesService.createEmployee,
    {
      full_name: fullName,
      email: email,
      department_id: parseInt(departmentId as any)
    },
    {
      onSuccess: function* (response) {
        yield put(createEmployeeSuccess(response.data));
        yield put(getEmployees());
      },
      onFailure: function* (error) {
        yield put(
          createEmployeeFailure(error?.message || 'Something went wrong')
        );
      }
    }
  );
}

function* getEmployeeDetailsWorker(
  action: PayloadAction<{ employeeId: string }>
): Generator {
  const { employeeId } = action.payload || {};
  yield* apiWorker(EmployeesService.getEmployeeDetails, employeeId, {
    onSuccess: function* (response) {
      const data = response.data?.data;
      yield put(
        getEmployeeDetailsSuccess({
          id: data?.id,
          fullName: data?.full_name,
          email: data?.email,
          departmentId: data?.department_id,
          department: data?.department
        })
      );
    },
    onFailure: function* (error) {
      yield put(
        getEmployeeDetailsFailure(error?.message || 'Something went wrong')
      );
    }
  });
}

function* deleteEmployeeWorker(): Generator {
  const employeeId = yield select(
    (state: RootState) => state.employee.employeeDelete.employeeId
  );

  yield* apiWorker(EmployeesService.deleteEmployee, employeeId, {
    onSuccess: function* (response) {
      yield put(deleteEmployeeSuccess(response.data?.data));
      yield put(getEmployees());
    },
    onFailure: function* (error) {
      yield put(
        deleteEmployeeFailure(error?.message || 'Something went wrong')
      );
    }
  });
}

export default function* () {
  yield all([
    takeLatest(getEmployees.type, getEmployeesWorker),
    takeLatest(createEmployee.type, createEmployeeWorker),
    takeLatest(getEmployeeDetails.type, getEmployeeDetailsWorker),
    takeLatest(deleteEmployee.type, deleteEmployeeWorker)
  ]);
}
