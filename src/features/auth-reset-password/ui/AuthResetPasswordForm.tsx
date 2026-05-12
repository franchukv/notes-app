import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useResetPasswordMutation } from '../api/authResetPasswordApi';
import { resetPasswordSchema, useLogoutMutation } from '@/entities/user';
import { Button, InputField } from '@/shared/ui';
import { isApiError } from '@/shared/lib';

type AuthFormData = z.infer<typeof resetPasswordSchema>;

export const AuthResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [resetPassword, { isLoading, isError, error }] =
    useResetPasswordMutation();
  const [logout] = useLogoutMutation();

  const onSubmit = async ({ password }: AuthFormData) => {
    const { error } = await resetPassword({ password });

    if (error) {
      return;
    }

    await logout();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <InputField
        title="New Password"
        register={register('password')}
        id="new-password"
        type="password"
        hint="At least 8 characters"
        error={errors.password?.message}
        disabled={isLoading}
      />

      <InputField
        title="Confirm New Password"
        register={register('confirmPassword')}
        id="password"
        type="password"
        error={errors.confirmPassword?.message}
        disabled={isLoading}
      />

      {isError && isApiError(error) && (
        <span className="text-preset-5 text-red-500 first-letter:uppercase">
          {error.data.message}
        </span>
      )}

      <Button type="submit" className="text-preset-3" isLoading={isLoading}>
        Reset Password
      </Button>
    </form>
  );
};
