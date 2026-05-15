import { supabase, supabaseApi } from '@/shared/api';
import { SITE_URL } from '@/shared/config';

export const authOAuthApi = supabaseApi.injectEndpoints({
  endpoints: (build) => ({
    OAuth: build.mutation<void, void>({
      queryFn: async () => {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: SITE_URL,
          },
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

export const { useOAuthMutation } = authOAuthApi;
