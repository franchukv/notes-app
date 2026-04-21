import { useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Logo from '@/shared/assets/img/svg/logo.svg?react';
import { Button, FormLayout } from '@/shared/ui';

export const AuthCheckEmailWidget = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!state?.email) {
      navigate('/login');
    }
  }, [navigate, state]);

  return (
    <FormLayout
      icon={<Logo />}
      title="Check your email"
      description={
        <>
          {state?.message} <b>{state?.email}</b>
        </>
      }
      className="gap-4!"
    >
      <Button onClick={() => navigate('/login')}>Back to login</Button>
    </FormLayout>
  );
};
