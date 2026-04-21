import { Link } from 'react-router';
import { AuthLoginForm } from '@/features/auth-login';
import { AuthOAuth } from '@/features/auth-oauth';
import { FormLayout } from '@/shared/ui';
import Logo from '@/shared/assets/img/svg/logo.svg?react';

export const AuthLoginWidget = () => {
  return (
    <FormLayout
      icon={<Logo />}
      title="Welcome to Note"
      description="Please log in to continue"
    >
      <AuthLoginForm />

      <AuthOAuth />

      <p className="text-preset-5 text-center text-neutral-600">
        No account yet?
        <Link to="/sign-up" className="link text-neutral-950">
          {' '}
          Sign Up
        </Link>
      </p>
    </FormLayout>
  );
};
