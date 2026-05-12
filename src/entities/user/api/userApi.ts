import { type Session, type User } from '@supabase/supabase-js';
import { setUserId } from '../model';
import { supabase, supabaseApi } from '@/shared/api';

interface ChangePasswordArgs {
  oldPassword: string;
  newPassword: string;
}

export const userApi = supabaseApi.injectEndpoints({
  endpoints: (build) => ({
    getSession: build.query<Session | null, void>({
      queryFn: async () => {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          return {
            error: {
              status: error.code,
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
              status: error.code,
              data: { message: error.message },
            },
          };
        }

        return { data: data.user };
      },
      providesTags: ['User'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserId(data.id));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    logout: build.mutation<void, void>({
      queryFn: async () => {
        const { error } = await supabase.auth.signOut();

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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(supabaseApi.util.resetApiState());
        } catch (error) {
          console.error(error);
        }
      },
    }),
    changePassword: build.mutation<void, ChangePasswordArgs>({
      queryFn: async ({ oldPassword, newPassword }) => {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: user!.email!,
          password: oldPassword,
        });

        if (signInError) {
          return {
            error: {
              status: signInError.code,
              data: { message: 'Old password is incorrect' },
            },
          };
        }

        const { error } = await supabase.auth.updateUser({
          password: newPassword,
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

export const {
  useGetSessionQuery,
  useGetUserQuery,
  useLogoutMutation,
  useChangePasswordMutation,
} = userApi;
