import { useAppDispatch, useAppSelector } from '@/hooks';
import Toast from '@/components/Toast';
import { setEmployeeToast } from '@/features/employee/employeeSlice';

const RootToast = () => {
  const dispatch = useAppDispatch();
  const employeeToastData = useAppSelector((state) => state.employee.toastData);

  console.log(employeeToastData);

  return (
    <div>
      {employeeToastData?.message && (
        <Toast
          type={employeeToastData.type}
          message={employeeToastData.message}
          onClose={() => {
            dispatch(setEmployeeToast({}));
          }}
        />
      )}
    </div>
  );
};

export default RootToast;
