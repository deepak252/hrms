import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getEmployeeDetails } from '../employeeSlice';
import EmployeeAttendanceHistory from '@/features/employee/components/EmployeeAttendanceHistory';
import { Spinner } from '@/components/Loader';

const EmployeeDetailsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { employeeId = '' } = useParams();
  const employeeDetails = useAppSelector(
    (state) => state.employee.employeeDetails
  );
  const employee = employeeDetails.profile;

  useEffect(() => {
    const eId = parseInt(employeeId);
    if (eId) {
      dispatch(getEmployeeDetails({ employeeId: eId }));
    }
  }, [dispatch, employeeId]);

  if (employeeDetails.isLoading) {
    return <Spinner center />;
  }

  if (!employee) return <div className="p-4">No data found</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-6">Employee Details</h2>

      <div className="space-y-1">
        <DetailRow label="Employee ID" value={employee.id} />
        <DetailRow label="Full Name" value={employee.fullName} />
        <DetailRow label="Email" value={employee.email} />
        <DetailRow label="Department" value={employee.department || ''} />
      </div>
      {/* <h3 className="text-lg font-bold mb-6">Attendance History</h3> */}
      <EmployeeAttendanceHistory employeeId={employee.id} />
    </div>
  );
};

interface DetailRowProps {
  label: string;
  value: string | number;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between pb-2">
      <span className="font-medium text-gray-600">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
};

export default EmployeeDetailsPage;
