import { z } from 'zod';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSendPasswordResetMutation } from '../api/authForgotPasswordApi';
import { Button, InputField } from '@/shared/ui';
import { authSchema, isApiError } from '@/shared/lib';

const authForgotPasswordSchema = authSchema.pick({ email: true });
type AuthFormData = z.infer<typeof authForgotPasswordSchema>;

export const AuthForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [sendPasswordReset, { isLoading, isError, error }] =
    useSendPasswordResetMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authForgotPasswordSchema),
  });

  const onSubmit = async ({ email }: AuthFormData) => {
    const response = await sendPasswordReset({ email });

    if ('error' in response) {
      return;
    }

    navigate('/check-email', {
      state: { email, message: 'We sent a reset link to' },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <InputField
        title="Email Address"
        register={register('email')}
        id="forgot-password-email"
        type="email"
        placeholder="email@example.com"
        error={errors.email?.message}
        disabled={isLoading}
      />

      {isError && isApiError(error) && (
        <span className="text-preset-5 text-red-500 first-letter:uppercase">
          {error.data.message}
        </span>
      )}

      <Button type="submit" className="text-preset-3" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Send Reset Link'}
      </Button>
    </form>
  );
};
