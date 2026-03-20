import { openEmployeeForm } from '@/features/employee/employeeSlice';
import { useAppDispatch } from '@/hooks';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleAddEmployee = () => {
    dispatch(openEmployeeForm());
  };

  return (
    <nav className="shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-wide">HRMS Lite</h1>

        <div className="flex items-center gap-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition cursor-pointer"
            onClick={handleAddEmployee}
          >
            Add Employee
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
