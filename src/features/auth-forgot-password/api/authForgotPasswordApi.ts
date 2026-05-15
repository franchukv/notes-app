import { supabase, supabaseApi } from '@/shared/api';
import { SITE_URL } from '@/shared/config';

interface SendPasswordResetArgs {
  email: string;
}

export const authForgotPasswordApi = supabaseApi.injectEndpoints({
  endpoints: (build) => ({
    sendPasswordReset: build.mutation<void, SendPasswordResetArgs>({
      queryFn: async ({ email }) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${SITE_URL}/reset-password`,
        });

        if (error) {
          return {
            error: {
              status: error.code,
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
