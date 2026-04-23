import { AuthLoginWidget } from '@/widgets/auth-login';

export const AuthLoginPage = () => {
  return (
    <section className="bg-neutral-100">
      <div className="custom-container">
        <div className="min-h-dvh py-18.75 flex flex-col items-center justify-center">
          <AuthLoginWidget />
        </div>
      </div>
    </section>
  );
};
