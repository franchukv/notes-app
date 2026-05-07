import type { Tag } from '../model/types';
import { mapTag } from './mappers';
import { supabase, supabaseApi } from '@/shared/api';

interface GetTagBySlugArgs {
  slug: string;
}

export const tagApi = supabaseApi.injectEndpoints({
  endpoints: (build) => ({
    getTagBySlug: build.query<Tag, GetTagBySlugArgs>({
      queryFn: async ({ slug }) => {
        const { data, error } = await supabase
          .from('tags')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          return {
            error: {
              status: error.code ?? 400,
              data: { message: error.message },
            },
          };
        }

        return { data: mapTag(data) };
      },
      providesTags: ['Tag'],
    }),
    getTags: build.query<Tag[], void>({
      queryFn: async () => {
        const { data, error } = await supabase.from('tags').select('*');

        if (error) {
          return {
            error: {
              status: error.code ?? 400,
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

export const { useGetTagBySlugQuery, useGetTagsQuery } = tagApi;
