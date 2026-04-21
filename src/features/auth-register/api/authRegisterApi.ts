import { type AuthResponse } from '@supabase/supabase-js';
import { supabase, supabaseApi } from '@/shared/api';

type RegisterResult = AuthResponse['data'];

interface RegisterArgs {
  email: string;
  password: string;
}

export const authRegisterApi = supabaseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<RegisterResult, RegisterArgs>({
      queryFn: async ({ email, password }) => {
        const { data, error } = await supabase.auth.signUp({
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

        if (data.user && data.user.identities?.length === 0) {
          return {
            error: {
              status: 400,
              data: { message: 'User with this email already exists' },
            },
          };
        }

        return { data };
      },
    }),
  }),
});

export const { useRegisterMutation } = authRegisterApi;
