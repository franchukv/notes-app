import cn from 'classnames';
import HintIcon from '../../assets/icons/hint-icon.svg?react';

interface HintProps {
  text: string;
  type?: 'default' | 'error';
}

export const Hint = ({ text, type = 'default' }: HintProps) => {
  return (
    <span
      className={cn(
        'flex items-center gap-1.5 text-neutral-600 text-12 dark:text-neutral-400',
        type === 'error' && 'text-red-500!',
      )}
    >
      <HintIcon className="-mt-px" />
      {text}
    </span>
  );
};
