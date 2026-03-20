import { Outlet } from 'react-router-dom';
import RootToast from './RootToast';
import ScrollToTop from './ScrollToTop';
import Navbar from './Navbar';
import EmployeeFormWrapper from '@/features/employee/components/EmployeeForm';

const RootLayout = () => {
  return (
    <>
      <div>
        <Navbar />
        <Outlet />
      </div>
      <ScrollToTop />
      <RootToast />
      <EmployeeFormWrapper />
    </>
  );
};

export default RootLayout;
