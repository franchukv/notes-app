import cn from 'classnames';
import type z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { searchSchema } from '../model/validation/search-schema';
import { InputField } from '@/shared/ui';
import SearchIcon from '@/shared/assets/icons/search-icon.svg?react';

interface SearchFormProps {
  className?: string;
  defaultValue?: string;
}

type SearchFormData = z.infer<typeof searchSchema>;

export const SearchForm = ({ className, defaultValue }: SearchFormProps) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: defaultValue,
    },
  });

  const onSubmit = async ({ search }: SearchFormData) => {
    navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <form
      className={cn('max-w-75 w-full relative', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SearchIcon className="absolute left-4 top-3 z-1 text-neutral-500" />
      <InputField
        register={register('search')}
        type="search"
        placeholder="Search by title or content..."
        required
        className="pl-11"
      />
    </form>
  );
};
