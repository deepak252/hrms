import { useAppDispatch, useAppSelector } from '@/hooks';
import { useEffect } from 'react';
import { getEmployeeAttendance } from '../../attendance/attendanceSlice';
import AttendanceTable from '@/features/attendance/components/AttendanceTable';
import AttendanceFormWrapper from '@/features/attendance/components/AttendanceForm';

type EmployeeAttendanceHistoryProps = {
  employeeId: number;
};
const EmployeeAttendanceHistory: React.FC<EmployeeAttendanceHistoryProps> = ({
  employeeId
}) => {
  const dispatch = useAppDispatch();
  const employeeAttendance = useAppSelector(
    (state) => state.attendance.employeeAttendance
  );

  useEffect(() => {
    dispatch(getEmployeeAttendance({ employeeId }));
  }, [employeeId]);

  const handleDelete = (id: number) => {
    // Optional: call API here
    console.log('Delete attendance:', id);
  };

  return (
    <>
      <div className="mb-6 mt-10 flex items-center justify-between">
        <h3 className="text-lg font-bold">Attendance History</h3>
        <AttendanceFormWrapper employeeId={employeeId} />
      </div>

      <AttendanceTable
        loading={employeeAttendance.isLoading}
        attendance={employeeAttendance.history}
        onDelete={handleDelete}
      />
    </>
  );
};

export default EmployeeAttendanceHistory;
