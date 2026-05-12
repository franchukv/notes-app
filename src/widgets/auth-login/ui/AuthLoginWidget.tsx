import { Link } from 'react-router';
import { AuthLoginForm } from '@/features/auth-login';
import { AuthOAuth } from '@/features/auth-oauth';
import { FormLayout } from '@/shared/ui';
import Logo from '@/shared/assets/icons/logo.svg?react';

export const AuthLoginWidget = () => {
  return (
    <FormLayout
      icon={<Logo />}
      title="Welcome to Note"
      description="Please log in to continue"
    >
      <AuthLoginForm />

      <AuthOAuth />

      <p className="text-preset-5 text-center text-neutral-600 dark:text-neutral-300">
        No account yet?
        <Link to="/sign-up" className="link text-neutral-950 dark:text-white">
          {' '}
          Sign Up
        </Link>
      </p>
    </FormLayout>
  );
};
