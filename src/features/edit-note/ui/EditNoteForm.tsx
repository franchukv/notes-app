import { useMemo, useState } from 'react';
import { z } from 'zod';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { noteSchema, useUpdateNoteMutation, type Note } from '@/entities/note';
import { useGetTagsQuery } from '@/entities/tag';
import {
  formatDate,
  useAppSelector,
  useNavigationGuard,
  useToast,
} from '@/shared/lib';
import { Button, CreatableMultiSelect, Editor, Hint } from '@/shared/ui';
import { selectIsDesktop } from '@/shared/model';
import TagIcon from '@/shared/assets/icons/tag-icon.svg?react';
import ClockIcon from '@/shared/assets/icons/clock-icon.svg?react';

interface EditNoteFormProps {
  note: Note;
  parentUrl: string;
}

type EditNoteFormData = z.infer<typeof noteSchema>;

export const EditNoteForm = ({ note, parentUrl }: EditNoteFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const isDesktop = useAppSelector(selectIsDesktop);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<EditNoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: note.title,
      tags: note.tags.map((tag) => ({ value: tag.slug, label: tag.name })),
      content: note.content,
    },
  });

  const { data: tags, isLoading: isTagsLoading } = useGetTagsQuery();
  const [updateNote, { isLoading }] = useUpdateNoteMutation();

  const options = useMemo(
    () => tags?.map((tag) => ({ value: tag.slug, label: tag.name })) ?? [],
    [tags],
  );

  const onSubmit = async ({ title, tags, content }: EditNoteFormData) => {
    setIsSubmitting(true);

    const { error } = await updateNote({
      id: note.id,
      tags: tags ? tags.map((tag) => tag.label) : [],
      title,
      content: content ?? '',
    });

    if (error) {
      showToast({ message: 'Failed to edit note.', type: 'error' });
      setIsSubmitting(false);
      return;
    }

    reset();
    showToast({ message: 'Note saved successfully!' });
    navigate(`/notes/${note.slug}`);
    setIsSubmitting(false);
  };

  useNavigationGuard(Object.keys(dirtyFields).length > 0 && !isSubmitting);

  return (
    <form
      id="edit-note-form"
      className="h-full flex flex-col gap-3 sm:gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="pb-3 flex flex-col gap-3 border-b border-neutral-200 sm:pb-4 sm:gap-4 dark:border-neutral-800">
        <div className="flex flex-col gap-1.5">
          <input
            {...register('title')}
            type="text"
            placeholder="Enter a title…"
            className={cn(
              'p-0 text-preset-2 border-b border-transparent focus:border-neutral-950 outline-none placeholder:text-neutral-700 sm:text-preset-1',
              errors.title?.message && 'border-red-500!',
            )}
          />
          {errors.title?.message && (
            <Hint type="error" text={errors.title.message} />
          )}
        </div>

        <div className="flex flex-col gap-2 text-preset-6 text-neutral-700 sm:text-preset-5 dark:text-neutral-300">
          <div className="flex items-center gap-2">
            <div className="min-w-28.75 flex items-center gap-1.5">
              <TagIcon className="h-4 w-4" /> Tags
            </div>

            <CreatableMultiSelect
              name="tags"
              control={control}
              isLoading={isTagsLoading}
              options={options}
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="min-w-28.75 flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4" /> Last edited
            </div>

            <span className="text-neutral-700 dark:text-neutral-300">
              {formatDate(note.updatedAt)}
            </span>
          </div>
        </div>
      </fieldset>

      <fieldset className="w-full h-full flex flex-col gap-3 sm:gap-4">
        <Editor name="content" control={control} />
      </fieldset>

      {isDesktop && (
        <div className="pt-4 flex items-center gap-4 border-t border-neutral-200 dark:border-neutral-800">
          <Button type="submit" isLoading={isLoading}>
            Save Note
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(parentUrl)}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      )}
    </form>
  );
};
