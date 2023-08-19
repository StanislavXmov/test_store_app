import { Navigate } from 'react-router-dom';
import {
  AppRoutes,
  AppRoutesProps,
  getRouteAdmin,
  getRouteLogin,
  getRouteRegistration,
  getRouteMain,
} from '../routes/routes';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN_ROUTE]: {
    path: getRouteMain(),
    element: <h2>MAIN</h2>,
  },
  [AppRoutes.ADMIN_ROUTE]: {
    path: getRouteAdmin(),
    element: <h2>ADMIN</h2>,
    authOnly: true,
  },
  [AppRoutes.LOGIN_ROUTE]: {
    path: getRouteLogin(),
    element: <h2>AUTH</h2>,
  },
  [AppRoutes.REGISTRATION_ROUTE]: {
    path: getRouteRegistration(),
    element: <h2>AUTH</h2>,
  },
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <Navigate to={getRouteMain()} replace />,
  },
};