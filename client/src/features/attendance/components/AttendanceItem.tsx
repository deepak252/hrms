import type { Attendance } from '@/shared.types';
import React from 'react';

interface Props {
  attendance: Attendance;
  onDelete: (id: number) => void;
}

const AttendanceItem: React.FC<Props> = ({ attendance }) => {
  return (
    <tr className="hover:bg-gray-100 transition">
      <td className="p-2 text-sm">
        {new Date(attendance.date).toLocaleDateString()}
      </td>
      <td className="p-2">
        <span
          className={`px-2 py-1 text-xs rounded ${
            attendance.status === 'Present'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {attendance.status}
        </span>
      </td>

      {/* <td className="p-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(attendance.id);
          }}
          className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 cursor-pointer"
        >
          Delete
        </button>
      </td> */}
    </tr>
  );
};

export default AttendanceItem;
