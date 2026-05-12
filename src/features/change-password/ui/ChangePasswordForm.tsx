import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  changePasswordSchema,
  useChangePasswordMutation,
} from '@/entities/user';
import { Button, InputField } from '@/shared/ui';
import { isApiError, useToast } from '@/shared/lib';

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export const ChangePasswordForm = () => {
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const [changePassword, { isLoading, isError, error }] =
    useChangePasswordMutation();

  const onSubmit = async ({
    oldPassword,
    newPassword,
  }: ChangePasswordFormData) => {
    const { error } = await changePassword({ oldPassword, newPassword });

    if (error) {
      showToast({ message: 'Failed to change password.', type: 'error' });
      return;
    }

    reset();
    showToast({ message: 'Password changed successfully!' });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6"
    >
      <InputField
        title="Old Password"
        register={register('oldPassword')}
        id="new-password"
        type="password"
        error={errors.oldPassword?.message}
        disabled={isLoading}
      />

      <InputField
        title="New Password"
        register={register('newPassword')}
        id="new-password"
        type="password"
        hint="At least 8 characters"
        error={errors.newPassword?.message}
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

      <Button type="submit" isLoading={isLoading} className="w-fit self-end">
        Save Password
      </Button>
    </form>
  );
};
