import { useEffect, useState, type ChangeEvent } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router';
import { InputField } from '@/shared/ui';
import SearchIcon from '@/shared/assets/icons/search-icon.svg?react';
import { useDebounce } from '@/shared/lib/hooks';

interface SearchFormProps {
  className?: string;
  defaultValue?: string;
}

export const SearchForm = ({
  className,
  defaultValue = '',
}: SearchFormProps) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(defaultValue);
  const debouncedValue = useDebounce({ value: value.trim() });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (debouncedValue) {
      navigate(
        debouncedValue.length > 0
          ? `/search?q=${encodeURIComponent(debouncedValue)}`
          : '/search',
      );
    }
  }, [navigate, debouncedValue]);

  return (
    <form
      className={cn('max-w-75 w-full relative', className)}
      onSubmit={handleSubmit}
    >
      <SearchIcon className="absolute left-4 top-3 z-1 text-neutral-500" />

      <InputField
        value={value}
        onChange={handleChange}
        type="search"
        placeholder="Search by title or content..."
        className="pl-11"
      />
    </form>
  );
};
