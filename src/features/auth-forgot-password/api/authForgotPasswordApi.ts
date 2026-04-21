import { supabase, supabaseApi } from '@/shared/api';

interface SendPasswordResetArgs {
  email: string;
}

export const authForgotPasswordApi = supabaseApi.injectEndpoints({
  endpoints: (build) => ({
    sendPasswordReset: build.mutation<void, SendPasswordResetArgs>({
      queryFn: async ({ email }) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: 'http://localhost:5173/reset-password',
        });

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

export const { useSendPasswordResetMutation } = authForgotPasswordApi;
