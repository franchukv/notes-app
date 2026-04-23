import { z } from 'zod';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterMutation } from '../api/authRegisterApi';
import { credentialsSchema } from '@/entities/user';
import { Button, InputField } from '@/shared/ui';
import { isApiError } from '@/shared/lib';

type AuthFormData = z.infer<typeof credentialsSchema>;

export const AuthRegisterForm = () => {
  const navigate = useNavigate();
  const [signUp, { isLoading, isError, error }] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(credentialsSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    const response = await signUp(data);

    if ('error' in response) {
      return;
    }

    if (response.data?.user && !response.data?.user.email_confirmed_at) {
      navigate('/check-email', {
        state: {
          email: response.data.user.email,
          message: 'We sent a confirmation link to',
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <InputField
        title="Email Address"
        register={register('email')}
        id="email"
        type="email"
        placeholder="email@example.com"
        error={errors.email?.message}
        disabled={isLoading}
      />

      <InputField
        title="Password"
        register={register('password')}
        id="password"
        type="password"
        hint="At least 8 characters"
        error={errors.password?.message}
        disabled={isLoading}
      />

      {isError && isApiError(error) && (
        <span className="text-preset-5 text-red-500 first-letter:uppercase">
          {error.data.message}
        </span>
      )}

      <Button type="submit" className="text-preset-3" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Sign up'}
      </Button>
    </form>
  );
};
