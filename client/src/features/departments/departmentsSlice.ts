import {
  type PaginatedList,
  type ToastData,
  type Department
} from '@/shared.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type DepartmentsState = {
  data: PaginatedList<Department>;
  toastData?: ToastData | null;
};

const initialState: DepartmentsState = {
  data: {
    list: [],
    page: 1,
    limit: 10,
    totalPages: 0,
    totalResults: 0,
    isLoading: false
  }
};

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    getDepartments: (state, _: PayloadAction<undefined>) => {
      state.data.isLoading = true;
    },
    getDepartmentsSuccess: (state, action: PayloadAction<Department[]>) => {
      state.data.isLoading = false;
      state.data.list = action.payload;
    },
    getDepartmentsFailure: (state, action) => {
      state.data.isLoading = false;
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong'
      };
    },

    setDepartmentToast: (state, action: PayloadAction<ToastData | null>) => {
      state.toastData = action.payload;
    }
  }
});

export const {
  getDepartments,
  getDepartmentsSuccess,
  getDepartmentsFailure,

  setDepartmentToast
} = departmentSlice.actions;

export default departmentSlice.reducer;
