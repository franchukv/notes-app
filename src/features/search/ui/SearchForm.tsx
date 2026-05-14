import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router';
import { InputField } from '@/shared/ui';
import SearchIcon from '@/shared/assets/icons/search-icon.svg?react';
import { useAppSelector, useDebounce } from '@/shared/lib/hooks';
import { selectIsDesktop } from '@/shared/model';

interface SearchFormProps {
  className?: string;
  defaultValue?: string;
  isSearchPage?: boolean;
}

export const SearchForm = ({
  className,
  defaultValue = '',
}: SearchFormProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(defaultValue);
  const debouncedValue = useDebounce({ value: value.trim() });

  const isSearchPage = pathname.startsWith('/search');

  const wasSearchPageRef = useRef(isSearchPage);
  const skipRedirectRef = useRef(false);

  const isDesktop = useAppSelector(selectIsDesktop);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!isDesktop) {
      return;
    }

    const wasSearchPage = wasSearchPageRef.current;

    if (wasSearchPage && !isSearchPage) {
      skipRedirectRef.current = true;
      setValue('');
    }

    wasSearchPageRef.current = isSearchPage;
  }, [isSearchPage, isDesktop]);

  useEffect(() => {
    if (!isDesktop) {
      if (skipRedirectRef.current) {
        skipRedirectRef.current = false;
        return;
      }

      if (isSearchPage && !debouncedValue) {
        navigate('/search', {
          replace: true,
        });

        return;
      }

      if (!debouncedValue) {
        return;
      }

      if (isSearchPage) {
        navigate(`/search?q=${encodeURIComponent(debouncedValue)}`, {
          replace: true,
        });

        return;
      }
    }

    navigate(`/search?q=${encodeURIComponent(debouncedValue)}`);
  }, [debouncedValue, isSearchPage, navigate, isDesktop]);

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
