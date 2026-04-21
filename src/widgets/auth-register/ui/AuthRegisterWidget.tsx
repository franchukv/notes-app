import { Link } from 'react-router';
import { AuthRegisterForm } from '@/features/auth-register';
import { AuthOAuth } from '@/features/auth-oauth';
import { FormLayout } from '@/shared/ui';
import Logo from '@/shared/assets/img/svg/logo.svg?react';

export const AuthRegisterWidget = () => {
  return (
    <FormLayout
      icon={<Logo />}
      title="Create Your Account"
      description="Sign up to start organizing your notes and boost your productivity."
    >
      <AuthRegisterForm />

      <AuthOAuth />

      <p className="text-preset-5 text-center text-neutral-600">
        Already have an account?
        <Link to="/login" className="link text-neutral-950">
          {' '}
          Login
        </Link>
      </p>
    </FormLayout>
  );
};
