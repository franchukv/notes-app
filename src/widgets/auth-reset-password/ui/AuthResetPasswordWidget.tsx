import { AuthResetPasswordForm } from '@/features/auth-reset-password';
import { FormLayout } from '@/shared/ui';
import Logo from '@/shared/assets/img/svg/logo.svg?react';

export const AuthResetPasswordWidget = () => {
  return (
    <FormLayout
      icon={<Logo />}
      title="Reset Your Password"
      description="Choose a new password to secure your account."
    >
      <AuthResetPasswordForm />
    </FormLayout>
  );
};
