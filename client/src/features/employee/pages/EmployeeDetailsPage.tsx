import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getEmployeeDetails } from '../employeeSlice';

const EmployeeDetailsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { employeeId = '' } = useParams();
  const employeeDetails = useAppSelector(
    (state) => state.employee.employeeDetails
  );

  useEffect(() => {
    const eId = parseInt(employeeId);
    if (eId) {
      dispatch(getEmployeeDetails({ employeeId: eId }));
    }
  }, [dispatch, employeeId]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div>Name: {employeeDetails?.profile?.fullName}</div>
    </div>
  );
};

export default EmployeeDetailsPage;
