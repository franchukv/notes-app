import { Navigate, Outlet } from 'react-router';
import { useGetUserQuery } from '@/entities/user';

export const PublicLayout = () => {
  const { data: user, isLoading } = useGetUserQuery();

  if (isLoading) {
    return null;
  }

  return !user ? <Outlet /> : <Navigate to="/" replace />;
};
