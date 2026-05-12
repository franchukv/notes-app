import { AuthCheckEmailWidget } from '@/widgets/auth-check-email';

export const AuthCheckEmailPage = () => {
  return (
    <section className="bg-neutral-100 dark:bg-neutral-700">
      <div className="custom-container">
        <div className="min-h-dvh py-18.75 flex flex-col items-center justify-center">
          <AuthCheckEmailWidget />
        </div>
      </div>
    </section>
  );
};
