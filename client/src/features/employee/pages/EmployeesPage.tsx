import { useEffect } from 'react';
import EmployeeTableWrapper from '../components/EmployeeTable';
import { useAppDispatch } from '@/hooks';
import { getEmployees, openEmployeeForm } from '../employeeSlice';
import ConfirmDeleteEmployeeWrapper from '../components/ConfirmDeleteEmployee';

const EmployeesPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEmployees());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddEmployee = () => {
    dispatch(openEmployeeForm());
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="max-w-7xl mx-auto pb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-wide">Employees</h1>

        <div className="flex items-center gap-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition cursor-pointer"
            onClick={handleAddEmployee}
          >
            Add Employee
          </button>
        </div>
      </div>
      {/* <h1 className="text-2xl font-bold mb-6">{initialData.message}</h1> */}
      <EmployeeTableWrapper />
      <ConfirmDeleteEmployeeWrapper />
    </div>
  );
};

export default EmployeesPage;

// import { useCallback, useEffect } from 'react'
// import ProjectItems from '../components/ProjectItems'
// import ProjectBanners from '../components/ProjectBanners'
// import SearchInputField from '@/components/SearchInputField'
// import AddIcon from '@/assets/icons/add.svg?react'
// import { useAppDispatch } from '@/hooks'
// import { getProjectBanners, getProjects } from '../projectsSlice'
// import { Link } from 'react-router-dom'

// function ProjectsPage() {
//   const dispatch = useAppDispatch()

//   const fetchProjects = useCallback(() => {
//     dispatch(getProjects())
//   }, [dispatch])

//   const fetchProjectBanners = useCallback(() => {
//     dispatch(getProjectBanners({}))
//   }, [dispatch])

//   useEffect(() => {
//     fetchProjects()
//   }, [fetchProjects])

//   useEffect(() => {
//     fetchProjectBanners()
//   }, [fetchProjectBanners])

//   return (
//     <div className="py-3">
//       <div className="flex items-center gap-2 max-w-2xl px-4 mx-auto">
//         <SearchInputField placeholder="Search project..." />
//         <Link
//           to="/projects/create"
//           className="btn-filled p-2"
//           title="Add Project"
//         >
//           <AddIcon className="size-8 fill-white" />
//         </Link>
//       </div>
//       <ProjectBanners />
//       <div className="flex gap-3 mx-6 mb-4 pt-6">
//         <div className="chip active">All</div>
//         <div className="chip">Apps</div>
//         <div className="chip">Websites</div>
//       </div>
//       <ProjectItems />
//     </div>
//   )
// }

// export default ProjectsPage
