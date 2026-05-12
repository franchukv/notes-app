import { supabase, supabaseApi } from '@/shared/api';

export const authOAuthApi = supabaseApi.injectEndpoints({
  endpoints: (build) => ({
    OAuth: build.mutation<void, void>({
      queryFn: async () => {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: 'http://localhost:5173',
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
