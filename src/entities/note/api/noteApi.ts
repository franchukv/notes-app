import { mapNote } from './mappers';
import type { Note } from '../model/types';
import { supabase, supabaseApi } from '@/shared/api';

interface NoteSlugArgs {
  slug: string;
}

interface CreateNoteArgs extends Pick<Note, 'title' | 'content'> {
  userId: string;
  tags: string[];
}

interface DeleteNoteArgs {
  id: number;
}

interface ToggleNoteArchivedArgs {
  id: number;
  isArchived: boolean;
}

interface EditNoteArgs extends Pick<Note, 'id' | 'title' | 'content'> {
  tags: string[];
}

export const noteApi = supabaseApi.injectEndpoints({
  endpoints: (build) => ({
    getNoteBySlug: build.query<Note, NoteSlugArgs>({
      queryFn: async ({ slug }) => {
        const { data, error } = await supabase
          .from('notes')
          .select(`*, note_tags ( tags (*) )`)
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

        return { data: mapNote(data) };
      },
      providesTags: ['Note'],
    }),
    getAllNotes: build.query<Note[], void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('notes')
          .select(`*, note_tags ( tags (*) )`);

        if (error) {
          return {
            error: {
              status: error.code ?? 400,
              data: { message: error.message },
            },
          };
        }

        return { data: data.map(mapNote) };
      },
      providesTags: ['Note'],
    }),
    getNotArchivedNotes: build.query<Note[], void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('notes')
          .select(`*, note_tags ( tags (*) )`)
          .eq('is_archived', false);

        if (error) {
          return {
            error: {
              status: error.code ?? 400,
              data: { message: error.message },
            },
          };
        }

        return { data: data.map(mapNote) };
      },
      providesTags: ['Note'],
    }),
    getArchivedNotes: build.query<Note[], void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('notes')
          .select(`*, note_tags ( tags (*) )`)
          .eq('is_archived', true);

        if (error) {
          return {
            error: {
              status: error.code ?? 400,
              data: { message: error.message },
            },
          };
        }

        return { data: data.map(mapNote) };
      },
      providesTags: ['Note'],
    }),
    getNotesByTagSlug: build.query<Note[], NoteSlugArgs>({
      queryFn: async ({ slug }) => {
        const { data: noteTags, error: noteTagsError } = await supabase
          .from('note_tags')
          .select('note_id, tags!inner (slug)')
          .eq('tags.slug', slug);

        if (noteTagsError) {
          return {
            error: {
              status: noteTagsError.code ?? 400,
              data: { message: noteTagsError.message },
            },
          };
        }

        const noteIds = noteTags.map((nt) => nt.note_id);

        if (noteIds.length === 0) {
          return { data: [] };
        }

        const { data, error } = await supabase
          .from('notes')
          .select(`*, note_tags ( tags (*) )`)
          .in('id', noteIds)
          .eq('is_archived', false);

        if (error) {
          return {
            error: {
              status: error.code ?? 400,
              data: { message: error.message },
            },
          };
        }

        return { data: data.map(mapNote) };
      },
      providesTags: ['Note'],
    }),
    createNote: build.mutation<Note, CreateNoteArgs>({
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
              status: error.code ?? 400,
              data: { message: error.message },
            },
          };
        }

        return { data: mapNote(data) };
      },
      invalidatesTags: ['Note', 'Tag'],
    }),
    updateNote: build.mutation<Note, EditNoteArgs>({
      queryFn: async ({ id, title, tags, content }) => {
        const { data, error } = await supabase.rpc('update_note_with_tags', {
          p_id: id,
          p_title: title,
          p_content: content,
          p_tag_names: tags,
        });

        if (error) {
          return {
            error: {
              status: error.code ?? 400,
              data: { message: error.message },
            },
          };
        }

        return { data: mapNote(data) };
      },
      invalidatesTags: ['Note', 'Tag'],
    }),
    toggleNoteArchived: build.mutation<Note, ToggleNoteArchivedArgs>({
      queryFn: async ({ id, isArchived }) => {
        const { data, error } = await supabase
          .from('notes')
          .update({ is_archived: !isArchived })
          .eq('id', id)
          .select()
          .single();

        if (error) {
          return {
            error: {
              status: error.code ?? 400,
              data: { message: error.message },
            },
          };
        }

        return { data: mapNote(data) };
      },
      invalidatesTags: ['Note'],
    }),
    deleteNote: build.mutation<void, DeleteNoteArgs>({
      queryFn: async ({ id }) => {
        const { error } = await supabase.from('notes').delete().eq('id', id);

        if (error) {
          return {
            error: {
              status: error.code ?? 400,
              data: { message: error.message },
            },
          };
        }

        return { data: undefined };
      },
      invalidatesTags: ['Note'],
    }),
  }),
});

export const {
  useGetNoteBySlugQuery,
  useGetAllNotesQuery,
  useGetNotArchivedNotesQuery,
  useGetArchivedNotesQuery,
  useGetNotesByTagSlugQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useToggleNoteArchivedMutation,
} = noteApi;
