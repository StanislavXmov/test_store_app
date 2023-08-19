import { Navigate } from 'react-router-dom';
import {
  AppRoutes,
  AppRoutesProps,
  getRouteAdmin,
  getRouteLogin,
  getRouteRegistration,
  getRouteMain,
} from '../routes/routes';
import { Auth } from '../pages/Auth';

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
    element: <Auth />,
  },
  [AppRoutes.REGISTRATION_ROUTE]: {
    path: getRouteRegistration(),
    element: <Auth />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <Navigate to={getRouteMain()} replace />,
  },
};