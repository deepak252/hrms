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
      {/* <td className="p-3">
        {new Date(employee.created_at).toLocaleString()}
      </td> */}
      <td className="p-3">
        <button
          onClick={(e) => {
            e.stopPropagation(); // 👈 prevent row click
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

// import { type Employee } from '@/shared.types';

// interface Props {
//   employee: Employee;
// }

// const EmployeeItem: React.FC<Props> = ({ employee }) => {
//   return (
//     <div className="p-4 border rounded-xl shadow-sm hover:shadow-md transition">
//       <h2 className="text-lg font-semibold">{employee.fullName}</h2>
//       <p className="text-sm text-gray-600">{employee.email}</p>
//       {/* <p className="text-sm">Dept ID: {employee.department}</p> */}
//       {/* <p className="text-xs text-gray-400">
//         Joined: {new Date(employee.created_at).toLocaleString()}
//       </p> */}
//     </div>
//   );
// };

// export default EmployeeItem;
