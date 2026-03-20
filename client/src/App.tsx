import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { useAppDispatch } from './hooks';
import { getDepartments } from './features/department/departmentsSlice';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getDepartments())
  }, []);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
