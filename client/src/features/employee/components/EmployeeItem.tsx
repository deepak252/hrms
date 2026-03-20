import React from 'react';
import { type Employee } from '@/shared.types';

interface Props {
  employee: Employee;
  onDelete: (id: number) => void;
  onClick: (employee: Employee) => void;
}

const EmployeeItem: React.FC<Props> = ({ employee, onDelete, onClick }) => {
  return (
    <tr
      className="cursor-pointer hover:bg-gray-100 transition"
      onClick={() => onClick(employee)}
    >
      <td className="p-3">{employee.id}</td>
      <td className="p-3">{employee.fullName}</td>
      <td className="p-3">{employee.email}</td>
      <td className="p-3">{employee.department}</td>
      <td className="p-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(employee.id);
          }}
          className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default EmployeeItem;
