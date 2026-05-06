import { z } from 'zod';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { noteSchema, useCreateNoteMutation } from '@/entities/note';
import { selectUserId } from '@/entities/user';
import { useGetTagsQuery, type Tag } from '@/entities/tag';
import { useAppSelector } from '@/shared/lib';
import { Button, CreatableMultiSelect, Hint } from '@/shared/ui';
import { selectIsDesktop } from '@/shared/model';
import TagIcon from '@/shared/assets/icons/tag-icon.svg?react';
import ClockIcon from '@/shared/assets/icons/clock-icon.svg?react';

interface CreateNoteFormProps {
  parentUrl: string;
  tagSlug?: string;
  defaultTag?: Tag;
}

type CreateNoteFormData = z.infer<typeof noteSchema>;

export const CreateNoteForm = ({
  tagSlug,
  parentUrl,
  defaultTag,
}: CreateNoteFormProps) => {
  const navigate = useNavigate();

  const isDesktop = useAppSelector(selectIsDesktop);
  const userId = useAppSelector(selectUserId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateNoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      tags: defaultTag
        ? [{ value: defaultTag.slug, label: defaultTag.name }]
        : [],
    },
  });

  const { data: tags, isLoading: isTagsLoading } = useGetTagsQuery();
  const [createNote] = useCreateNoteMutation();

  const options = tags
    ? tags.map((tag) => ({ value: tag.slug, label: tag.name }))
    : [];

  const onSubmit = async ({ title, tags, content }: CreateNoteFormData) => {
    const response = await createNote({
      userId: userId!,
      tags: tags ? tags.map((tag) => tag.label) : [],
      title,
      content: content ?? '',
    });

    if ('error' in response) {
      return;
    }

    navigate(
      tagSlug
        ? `/tags/${tagSlug}/${response.data?.slug}`
        : `/notes/${response.data?.slug}`,
    );
  };

  return (
    <form
      id="create-note-form"
      className="h-full flex flex-col gap-3 sm:gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="pb-3 flex flex-col gap-3 border-b border-neutral-200 sm:pb-4 sm:gap-4">
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

        <div className="flex flex-col gap-2 text-preset-6 text-neutral-700 sm:text-preset-5">
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

            <span className="text-neutral-400">Not yet saved</span>
          </div>
        </div>
      </fieldset>

      <fieldset className="w-full h-full flex flex-col gap-3 sm:gap-4">
        <textarea
          {...register('content')}
          placeholder="Start typing your note here…"
          className="w-full min-h-60 h-full outline-none resize-none text-preset-6 placeholder:text-neutral-700 sm:text-preset-5"
        ></textarea>
      </fieldset>

      {isDesktop && (
        <div className="pt-4 flex items-center gap-4 border-t border-neutral-200">
          <Button type="submit">Save Note</Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(parentUrl)}
          >
            Cancel
          </Button>
        </div>
      )}
    </form>
  );
};
