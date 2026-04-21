import { type Session, type User } from '@supabase/supabase-js';
import { supabase, supabaseApi } from '@/shared/api';

export const userApi = supabaseApi.injectEndpoints({
  endpoints: (build) => ({
    getSession: build.query<Session | null, void>({
      queryFn: async () => {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          return {
            error: {
              status: 400,
              data: { message: error.message },
            },
          };
        }

        return { data: data.session };
      },
      providesTags: ['Session'],
    }),
    getUser: build.query<User, void>({
      queryFn: async () => {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          return {
            error: {
              status: 400,
              data: { message: error.message },
            },
          };
        }

        return { data: data.user };
      },
      providesTags: ['User'],
    }),
    logout: build.mutation<void, void>({
      queryFn: async () => {
        const { error } = await supabase.auth.signOut();

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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(supabaseApi.util.resetApiState());
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useGetSessionQuery, useGetUserQuery, useLogoutMutation } =
  userApi;
