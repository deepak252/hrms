import React from 'react';
import AttendanceItem from './AttendanceItem';
import type { Attendance } from '@/shared.types';

interface Props {
  loading?: boolean;
  attendance: Attendance[];
  onDelete: (id: number) => void;
}

const AttendanceTable: React.FC<Props> = ({
  loading,
  attendance,
  onDelete
}) => {
  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading attendance history...</p>
    );
  }
  if (!attendance.length) {
    return (
      <p className="text-center text-gray-500">No attendance records found</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
            {/* <th className="p-3">Actions</th> */}
          </tr>
        </thead>

        <tbody>
          {attendance.map((item) => (
            <AttendanceItem
              key={item.id}
              attendance={item}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
