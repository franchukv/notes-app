import cn from 'classnames';
import HintIcon from '../../assets/icons/hint-icon.svg?react';

interface HintProps {
  text: string;
  type?: 'default' | 'error';
}

export const Hint = ({ text, type = 'default' }: HintProps) => {
  const classNames = cn(
    'flex items-center gap-2 text-neutral-600 text-12',
    type === 'error' && 'text-red-500',
  );

  return (
    <span className={classNames}>
      <HintIcon className="-mt-px" />
      {text}
    </span>
  );
};
