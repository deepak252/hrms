import {
  type ToastData,
  type Attendance,
  type AttendanceFormValues
} from '@/shared.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AttendanceState = {
  employeeAttendance: {
    employeeId?: number;
    history: Attendance[];
    isLoading?: boolean;
  };
  attedanceForm: {
    isOpen?: boolean;
    isLoading?: boolean;
  };
  toastData?: ToastData | null;
};

const initialState: AttendanceState = {
  employeeAttendance: {
    history: []
  },
  attedanceForm: {
    isLoading: false,
    isOpen: false
  }
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    getEmployeeAttendance: (
      state,
      action: PayloadAction<{ employeeId: number }>
    ) => {
      // state.employeeAttendance.isLoading = true;
      // state.employeeAttendance.employeeId = action.payload.employeeId
      state.employeeAttendance = {
        isLoading: true,
        employeeId: action.payload.employeeId,
        history: []
      };
    },
    getEmployeeAttendanceSuccess: (
      state,
      action: PayloadAction<Attendance[]>
    ) => {
      state.employeeAttendance.isLoading = false;
      state.employeeAttendance.history = action.payload;
    },
    getEmployeeAttendanceFailure: (state, action) => {
      state.employeeAttendance.isLoading = false;
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong'
      };
    },

    openAttendanceForm: (state) => {
      state.attedanceForm.isOpen = true;
    },
    resetAttendanceForm: (state) => {
      state.attedanceForm = initialState.attedanceForm;
    },

    markAttendance: (state, _: PayloadAction<AttendanceFormValues>) => {
      state.attedanceForm.isLoading = true;
    },
    markAttendanceSuccess: (state) => {
      state.attedanceForm = initialState.attedanceForm;
      state.toastData = {
        type: 'success',
        message: 'Attendance marked'
      };
    },
    markAttendanceFailure: (state, action) => {
      state.attedanceForm.isLoading = false;
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong'
      };
    },

    setAttendanceToast: (state, action: PayloadAction<ToastData | null>) => {
      state.toastData = action.payload;
    }
  }
});

export const {
  getEmployeeAttendance,
  getEmployeeAttendanceFailure,
  getEmployeeAttendanceSuccess,

  openAttendanceForm,
  resetAttendanceForm,

  markAttendance,
  markAttendanceSuccess,
  markAttendanceFailure,

  setAttendanceToast
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
