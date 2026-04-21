import { Navigate, Outlet } from 'react-router';
import { useGetUserQuery } from '@/entities/user';

export const PrivateLayout = () => {
  const { data: user, isLoading } = useGetUserQuery();

  if (isLoading) {
    return null;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
