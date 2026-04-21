import { supabase, supabaseApi } from '@/shared/api';

interface ResetPasswordArgs {
  password: string;
}

export const authResetPasswordApi = supabaseApi.injectEndpoints({
  endpoints: (build) => ({
    resetPassword: build.mutation<void, ResetPasswordArgs>({
      queryFn: async ({ password }) => {
        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
          return {
            error: {
              status: 400,
              data: { message: error.message },
            },
          };
        }

        return { data: undefined };
      },
    }),
  }),
});

export const { useResetPasswordMutation } = authResetPasswordApi;
