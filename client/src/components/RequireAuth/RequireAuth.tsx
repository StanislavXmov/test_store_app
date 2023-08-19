import {  useLocation, Navigate } from 'react-router-dom';
import { getRouteMain } from '../../routes/routes';

interface RequireAuthProps {
  children: JSX.Element;
  role?: string;
}

export function RequireAuth(props: RequireAuthProps) {
  const { children, role } = props;
  const auth = true;
  const location = useLocation();

  if (!auth) {
    return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
  }

  return children;
}