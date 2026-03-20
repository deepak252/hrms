import {
  type Employee,
  type PaginatedList,
  type ToastData,
  type EmployeeFormValues
  //   type EmployeeFormError
} from '@/shared.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type EmployeeState = {
  data: PaginatedList<Employee>;
  employeeDetails: {
    employeeId?: number;
    profile?: Employee | null;
    isLoading?: boolean;
  };
  employeeForm: {
    isOpen: boolean;
    isLoading: boolean;
    isSuccessful?: boolean;
  };
  employeeDelete: {
    employeeId?: number;
    isConfirm?: boolean;
    isLoading?: boolean;
  };
  toastData?: ToastData | null;
};

const initialState: EmployeeState = {
  data: {
    list: [],
    page: 1,
    limit: 10,
    totalPages: 0,
    totalResults: 0,
    isLoading: false
  },
  employeeDetails: {},
  employeeForm: {
    isOpen: false,
    isLoading: false
    // data: formDataInitialState,
  },
  employeeDelete: {}
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    // Employees List
    getEmployees: (state, _: PayloadAction<undefined>) => {
      state.data.isLoading = true;
    },
    getEmployeesSuccess: (state, action: PayloadAction<Employee[]>) => {
      // const { employees = [] } = action.payload || {};
      state.data.isLoading = false;
      state.data.list = action.payload;
      // state.data.page = metadata.currentPage;
      // state.data.limit = metadata.itemsPerPage;
      // state.data.totalPages = metadata.totalPages;
      // state.data.totalResults = metadata.totalItems;
    },
    getEmployeesFailure: (state, action) => {
      state.data.isLoading = false;
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong'
      };
    },

    // Create Employee Form
    createEmployee: (state, _: PayloadAction<EmployeeFormValues>) => {
      state.employeeForm.isLoading = true;
    },
    createEmployeeSuccess: (state) => {
      state.employeeForm = {
        ...initialState.employeeForm,
        isSuccessful: true
      };
      state.toastData = {
        type: 'success',
        message: 'Your employee is being processed. It will appear soon.'
      };
    },
    createEmployeeFailure: (state, action) => {
      state.employeeForm.isLoading = false;
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong'
      };
    },

    openEmployeeForm: (state) => {
      state.employeeForm.isOpen = true;
    },
    resetEmployeeForm: (state) => {
      state.employeeForm = initialState.employeeForm;
    },

    getEmployeeDetails: (
      state,
      action: PayloadAction<{ employeeId: number }>
    ) => {
      if (action.payload.employeeId !== state.employeeDetails.employeeId) {
        state.employeeDetails = {
          employeeId: action.payload.employeeId,
          profile: null,
          isLoading: true
        };
      }
    },
    getEmployeeDetailsSuccess: (state, action: PayloadAction<Employee>) => {
      state.employeeDetails.isLoading = false;
      console.log(action.payload);
      state.employeeDetails.profile = action.payload;
    },
    getEmployeeDetailsFailure: (state) => {
      state.employeeDetails.isLoading = false;
    },

    confirmDeleteEmployee: (
      state,
      action: PayloadAction<{ employeeId: number }>
    ) => {
      state.employeeDelete = {
        employeeId: action.payload.employeeId,
        isConfirm: true
      };
    },
    cancelDeleteEmployee: (state) => {
      state.employeeDelete = initialState.employeeDelete;
    },
    deleteEmployee: (state) => {
      state.employeeDelete.isLoading = true;
    },
    deleteEmployeeSuccess: (state) => {
      state.employeeDelete = initialState.employeeDelete;
      state.toastData = {
        type: 'success',
        message: 'Employee deleted successfully.'
      };
    },
    deleteEmployeeFailure: (state, action) => {
      state.employeeDelete = initialState.employeeDelete;
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong'
      };
    },

    setEmployeeToast: (state, action: PayloadAction<ToastData | null>) => {
      state.toastData = action.payload;
    }
  }
});

export const {
  getEmployees,
  getEmployeesSuccess,
  getEmployeesFailure,

  createEmployee,
  createEmployeeSuccess,
  createEmployeeFailure,

  openEmployeeForm,
  resetEmployeeForm,

  getEmployeeDetails,
  getEmployeeDetailsSuccess,
  getEmployeeDetailsFailure,

  confirmDeleteEmployee,
  cancelDeleteEmployee,
  deleteEmployee,
  deleteEmployeeFailure,
  deleteEmployeeSuccess,

  setEmployeeToast
} = employeeSlice.actions;

export default employeeSlice.reducer;
