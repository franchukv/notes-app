import { selectProfileSettings, setProfileSettings } from '../model/index';
import type { Profile, ProfileSettings } from '@/shared/model';
import { supabase, supabaseApi } from '@/shared/api';
import { profileStorage } from '@/shared/lib';

interface getProfileSettingsArgs {
  userId: string;
}

interface UpdateProfileSettingsArgs {
  userId: string;
  settings: Partial<ProfileSettings>;
}

export const profileApi = supabaseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileSettings: build.query<ProfileSettings, getProfileSettingsArgs>({
      queryFn: async ({ userId }) => {
        const { data, error } = await supabase
          .from('profiles')
          .select('settings')
          .eq('id', userId)
          .single();

        if (error) {
          return {
            error: {
              status: error.code,
              data: { message: error.message },
            },
          };
        }

        return { data: data.settings };
      },
      providesTags: ['Profile'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProfileSettings(data));
          profileStorage.set(data);
        } catch (error) {
          console.error(error);
        }
      },
    }),
    updateProfileSettings: build.mutation<Profile, UpdateProfileSettingsArgs>({
      queryFn: async ({ userId, settings }) => {
        const { data, error } = await supabase
          .from('profiles')
          .update({ settings })
          .eq('id', userId)
          .select('id, settings')
          .single();

        if (error) {
          return {
            error: {
              status: error.code,
              data: { message: error.message },
            },
          };
        }

        return { data };
      },
      invalidatesTags: ['Profile'],
      async onQueryStarted(
        { settings },
        { dispatch, queryFulfilled, getState },
      ) {
        const previousSettings = selectProfileSettings(getState() as RootState);
        const newSettings = { ...previousSettings, ...settings };

        dispatch(setProfileSettings(newSettings));
        profileStorage.set(newSettings);

        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(setProfileSettings(previousSettings));
          profileStorage.set(previousSettings);
          console.error(error);
        }
      },
    }),
  }),
});

export const { useGetProfileSettingsQuery, useUpdateProfileSettingsMutation } =
  profileApi;
