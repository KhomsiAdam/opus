import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentRole } from './authSlice';

export const RequireAuth = ({ allowedRoles }: any) => {
  const token = useSelector(selectCurrentToken);
  const role = useSelector(selectCurrentRole);
  const location = useLocation();
  // return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
  return allowedRoles?.includes(role) ? (
    <Outlet />
  ) : token ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
