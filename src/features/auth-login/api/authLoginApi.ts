import { type AuthResponse } from '@supabase/supabase-js';
import { supabase, supabaseApi } from '@/shared/api';

type LoginResult = AuthResponse['data'];

interface LoginArgs {
  email: string;
  password: string;
}

export const authLoginApi = supabaseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResult, LoginArgs>({
      queryFn: async ({ email, password }) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          return {
            error: {
              status: 400,
              data: { message: error.message },
            },
          };
        }

        return { data };
      },
    }),
  }),
});

export const { useLoginMutation } = authLoginApi;
