import { Outlet } from 'react-router-dom';
import RootToast from './RootToast';
// import AppLoader from './AppLoader'
import ScrollToTop from './ScrollToTop';
import Navbar from './Navbar';
import EmployeeFormWrapper from '@/features/employee/components/EmployeeForm';
import RootLoader from './RootLoader';

const RootLayout = () => {
  return (
    <>
      <div>
        <Navbar />
        <Outlet />
        {/* <AppLoader /> */}
      </div>
      <ScrollToTop />
      <RootToast />
      <RootLoader />
      <EmployeeFormWrapper />
    </>
  );
};

export default RootLayout;
