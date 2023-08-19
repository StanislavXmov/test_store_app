import { RouteProps } from 'react-router-dom';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  role?: string;
}

export enum AppRoutes {
  ADMIN_ROUTE = 'admin',
  LOGIN_ROUTE = 'login',
  REGISTRATION_ROUTE = 'registration',
  MAIN_ROUTE = 'shop',
  NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteAdmin = () => '/admin';
export const getRouteLogin = () => '/login';
export const getRouteRegistration = () => '/registration';
