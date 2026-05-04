import type { Tag } from '../model/types';
import { mapTag } from './mappers';
import { supabase, supabaseApi } from '@/shared/api';

export const tagApi = supabaseApi.injectEndpoints({
  endpoints: (build) => ({
    getTags: build.query<Tag[], void>({
      queryFn: async () => {
        const { data, error } = await supabase.from('tags').select('*');

        if (error) {
          return {
            error: {
              status: 400,
              data: { message: error.message },
            },
          };
        }

        return { data: data.map(mapTag) };
      },
      providesTags: ['Tag'],
    }),
  }),
});

export const { useGetTagsQuery } = tagApi;
