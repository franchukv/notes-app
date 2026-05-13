import cn from 'classnames';
import LoaderIcon from '../../assets/icons/loader-icon.svg?react';

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className = '' }: LoaderProps) => {
  return <LoaderIcon className={cn('h-6 w-6 text-neutral-700', className)} />;
};
