import type { Tag } from '../model/types';
import { mapTag } from './mappers';
import { supabase, supabaseApi } from '@/shared/api';

interface GetTagBySlugArgs {
  slug: string;
}

interface DeleteTagArgs {
  id: number;
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
              status: error.code,
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
              status: error.code,
              data: { message: error.message },
            },
          };
        }

        return { data: data.map(mapTag) };
      },
      providesTags: ['Tag'],
    }),
    deleteTag: build.mutation<void, DeleteTagArgs>({
      queryFn: async ({ id }) => {
        const { error } = await supabase.from('tags').delete().eq('id', id);

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
      invalidatesTags: ['Note', 'Tag'],
    }),
  }),
});

export const { useGetTagBySlugQuery, useGetTagsQuery, useDeleteTagMutation } =
  tagApi;
