import { lazy, Suspense } from 'react';
import { type RouteObject, useRoutes } from 'react-router-dom';
import { Spinner } from '@/components/Loader';
import EmployeeDetailsPage from '@/features/employee/pages/EmployeeDetailsPage';
const RootLayout = lazy(() => import('@/components/RootLayout/index'));
const EmployeesPage = lazy(
  () => import('@/features/employee/pages/EmployeesPage')
);
const PageNotFound = lazy(() => import('@/components/PageNotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <EmployeesPage />
      },
      {
        path: '/employee/:employeeId',
        element: <EmployeeDetailsPage />
      },
      {
        path: '*',
        element: <PageNotFound />
      }
    ]
  },
  {
    path: '*',
    element: <PageNotFound />
  }
];

const SuspenseWrapper = (route: RouteObject): RouteObject => {
  if (route.element) {
    route.element = (
      <Suspense fallback={<Spinner center />}>{route.element}</Suspense>
    );
  }

  if (route.children) {
    // Recursive Wrapping for Nested Routes
    route.children = route.children.map(SuspenseWrapper);
  }

  return route;
};

function AppRoutes() {
  const wrappedRoutes = routes.map(SuspenseWrapper);
  return useRoutes(wrappedRoutes);
}

export default AppRoutes;
