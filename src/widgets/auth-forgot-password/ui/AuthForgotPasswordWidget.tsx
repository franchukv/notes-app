import { AuthForgotPasswordForm } from '@/features/auth-forgot-password';
import { FormLayout } from '@/shared/ui';
import Logo from '@/shared/assets/img/svg/logo.svg?react';

export const AuthForgotPasswordWidget = () => {
  return (
    <FormLayout
      icon={<Logo />}
      title="Forgotten your password?"
      description="Enter your email below, and we’ll send you a link to reset it."
    >
      <AuthForgotPasswordForm />
    </FormLayout>
  );
};
