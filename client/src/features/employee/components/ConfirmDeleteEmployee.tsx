import ModalWrapper from '@/components/ModalWrapper';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { cancelDeleteEmployee, deleteEmployee } from '../employeeSlice';

type ConfirmDeleteModalProps = {
  employeeName?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  onConfirm,
  onCancel,
  loading = false
}) => {
  return (
    <ModalWrapper
      isOpen={true}
      onClose={onCancel}
      closeOnOutsideClick
      closeOnEsc
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-20"
    >
      <div className="bg-white rounded-2xl p-6 max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          Delete Employee
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete employee? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

const ConfirmDeleteEmployeeWrapper = () => {
  const dispatch = useAppDispatch();
  const employeeDelete = useAppSelector(
    (state) => state.employee.employeeDelete
  );

  const handleClose = () => {
    dispatch(cancelDeleteEmployee());
  };

  const handleConfirm = () => {
    dispatch(deleteEmployee());
  };

  return (
    employeeDelete.isConfirm && (
      <ConfirmDeleteModal
        loading={employeeDelete.isLoading}
        onConfirm={handleConfirm}
        onCancel={handleClose}
      />
    )
  );
};

export default ConfirmDeleteEmployeeWrapper;
