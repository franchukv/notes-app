import { z } from 'zod';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '../api/authLoginApi';
import { Button, InputField } from '@/shared/ui';
import { authSchema, isApiError } from '@/shared/lib';

type AuthFormData = z.infer<typeof authSchema>;

export const AuthLoginForm = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    await login(data);
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
        error={errors.password?.message}
        disabled={isLoading}
        extraLink={
          <Link
            to="/forgot-password"
            className="underline-link text-preset-6 text-neutral-600"
          >
            Forgot?
          </Link>
        }
      />

      {isError && isApiError(error) && (
        <span className="text-preset-5 text-red-500 first-letter:uppercase">
          {error.data.message}
        </span>
      )}

      <Button type="submit" className="text-preset-3" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Login'}
      </Button>
    </form>
  );
};
