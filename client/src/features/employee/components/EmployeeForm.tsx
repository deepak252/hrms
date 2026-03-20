import { useFormik } from 'formik';
import ModalWrapper from '@/components/ModalWrapper';
import TextInput from '@/components/TextInput';
import SelectInput from '@/components/SelectInput';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { createEmployee, resetEmployeeForm } from '../employeeSlice';
import { type EmployeeFormValues } from '@/shared.types';
import { validateEmployeeForm } from '../employeeUtil';

const departments = [
  { label: 'Engineering', value: 1 },
  { label: 'HR', value: 2 },
  { label: 'Sales', value: 3 }
];

type Props = {
  loading: boolean;
  onSubmit: (values: EmployeeFormValues) => void;
  onClose: () => void;
};

const EmployeeForm: React.FC<Props> = ({
  loading = false,
  onClose,
  onSubmit
}) => {
  const formik = useFormik<EmployeeFormValues>({
    initialValues: {
      fullName: '',
      email: '',
      departmentId: 0
    },

    validate: validateEmployeeForm,

    onSubmit: (values) => {
      onSubmit?.(values);
    }
  });

  return (
    <ModalWrapper
      isOpen={true}
      onClose={onClose}
      closeOnEsc
      closeOnOutsideClick
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Employee</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <TextInput
            label="Full Name"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.fullName}
            touched={formik.touched.fullName}
          />

          <TextInput
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
            touched={formik.touched.email}
          />

          <SelectInput
            label="Department"
            name="departmentId"
            value={formik.values.departmentId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            options={departments}
            error={formik.errors.departmentId}
            touched={formik.touched.departmentId}
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
};

const EmployeeFormWrapper = () => {
  const dispatch = useAppDispatch();
  const employeeForm = useAppSelector((state) => state.employee.employeeForm);

  const handleSubmit = (values: EmployeeFormValues) => {
    dispatch(createEmployee(values));
  };

  const handleClose = () => {
    dispatch(resetEmployeeForm());
  };

  return (
    employeeForm.isOpen && (
      <EmployeeForm
        loading={employeeForm.isLoading}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    )
  );
};

export default EmployeeFormWrapper;
