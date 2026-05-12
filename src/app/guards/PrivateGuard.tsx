import { Navigate, Outlet } from 'react-router';
import { useGetUserQuery } from '@/entities/user';
import { useGetProfileSettingsQuery } from '@/entities/profile';

export const PrivateGuard = () => {
  const { data: user, isLoading } = useGetUserQuery();

  useGetProfileSettingsQuery({ userId: user?.id ?? '' }, { skip: !user?.id });

  if (isLoading) {
    return null;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
