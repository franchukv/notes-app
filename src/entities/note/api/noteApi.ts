import { mapNote } from './mappers';
import type { Note } from '../model/types';
import { supabase, supabaseApi } from '@/shared/api';

interface getNoteBySlugArgs {
  slug: string;
}

interface createNoteArgs extends Pick<Note, 'title' | 'content'> {
  userId: string;
  tags: string[];
}

export const noteApi = supabaseApi.injectEndpoints({
  endpoints: (build) => ({
    getNoteBySlug: build.query<Note, getNoteBySlugArgs>({
      queryFn: async ({ slug }) => {
        const { data, error } = await supabase
          .from('notes')
          .select(`*, note_tags ( tags (*) )`)
          .eq('slug', slug)
          .single();

        if (error) {
          return {
            error: {
              status: 400,
              data: { message: error.message },
            },
          };
        }

        return { data: mapNote(data) };
      },
      providesTags: ['Note'],
    }),
    getNotes: build.query<Note[], void>({
      queryFn: async () => {
        const { data, error } = await supabase.from('notes').select('*');

        if (error) {
          return {
            error: {
              status: 400,
              data: { message: error.message },
            },
          };
        }

        return { data: data.map(mapNote) };
      },
      providesTags: ['Note'],
    }),
    createNote: build.mutation<Note, createNoteArgs>({
      queryFn: async ({ userId, title, tags, content }) => {
        const { data, error } = await supabase.rpc('create_note_with_tags', {
          p_title: title,
          p_content: content,
          p_user_id: userId,
          p_tag_names: tags,
        });

        if (error) {
          return {
            error: {
              status: 400,
              data: { message: error.message },
            },
          };
        }

        return { data: mapNote(data) };
      },
      invalidatesTags: ['Note'],
    }),
  }),
});

export const {
  useGetNoteBySlugQuery,
  useGetNotesQuery,
  useCreateNoteMutation,
} = noteApi;
