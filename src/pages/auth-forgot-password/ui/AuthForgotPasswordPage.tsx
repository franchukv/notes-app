import { AuthForgotPasswordWidget } from '@/widgets/auth-forgot-password';

export const AuthForgotPasswordPage = () => {
  return (
    <section className="bg-neutral-100 dark:bg-neutral-700">
      <div className="custom-container">
        <div className="min-h-dvh py-18.75 flex flex-col items-center justify-center">
          <AuthForgotPasswordWidget />
        </div>
      </div>
    </section>
  );
};
