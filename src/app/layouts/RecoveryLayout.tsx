import { Navigate, Outlet } from 'react-router';
import { selectIsRecoveryFlow, useGetUserQuery } from '@/entities/user';
import { useAppSelector } from '@/shared/lib';

export const RecoveryLayout = () => {
  const isRecoveryFlow = useAppSelector(selectIsRecoveryFlow);
  const { data: user, isLoading } = useGetUserQuery();

  if (isLoading) {
    return null;
  }

  return user && isRecoveryFlow ? <Outlet /> : <Navigate to="/login" replace />;
};
