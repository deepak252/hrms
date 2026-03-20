import { type Employee } from '@/shared.types';
import EmployeeItem from './EmployeeItem';
import { useAppDispatch, useAppSelector, useNavigateWithState } from '@/hooks';
import { Spinner } from '@/components/Loader';
import { confirmDeleteEmployee } from '../employeeSlice';

interface Props {
  employees: Employee[];
  onDelete: (id: number) => void;
  onRowClick: (employee: Employee) => void;
}

const EmployeeTable: React.FC<Props> = ({
  employees,
  onDelete,
  onRowClick
}) => {
  if (!employees.length) {
    return <p className="text-center text-gray-500">No employees found</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Department</th>
            {/* <th className="p-3">Created At</th> */}
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <EmployeeItem
              key={emp.id}
              employee={emp}
              onDelete={onDelete}
              onClick={onRowClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const EmployeeTableWrapper = () => {
  const navigate = useNavigateWithState();
  const dispatch = useAppDispatch();
  const employeesData = useAppSelector((state) => state.employee.data);

  const handleDelete = (employeeId: number) => {
    dispatch(
      confirmDeleteEmployee({
        employeeId
      })
    );
  };

  const handleRowClick = (employee: Employee) => {
    navigate(`/employee/${employee.id}`);
  };

  if (employeesData.isLoading && employeesData.list.length == 0) {
    return <Spinner center />;
  }

  return (
    <>
      <EmployeeTable
        employees={employeesData.list}
        onDelete={handleDelete}
        onRowClick={handleRowClick}
      />
    </>
  );
};

export default EmployeeTableWrapper;
