import cn from 'classnames';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'border';
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  type = 'button',
  ...restProps
}: ButtonProps) => {
  const classNames = cn(
    'py-3 px-4 flex items-center justify-center gap-2 text-center text-preset-4 rounded-lg transition-all duration-300 cursor-pointer border focus-visible:bg-blue-500 disabled:bg-neutral-100 disabled:text-neutral-300! disabled:border-neutral-100! disabled:pointer-events-none',
    className,
    variant === 'primary' &&
      'text-white bg-blue-500 border-blue-500 not-focus-visible:hover:bg-blue-700 not-focus-visible:hover:bg-blue-500',
    variant === 'secondary' &&
      'text-neutral-600 bg-neutral-100 border-neutral-100 hover:bg-white hover:text-neutral-950 hover:border-neutral-300 focus-visible:bg-white focus-visible:text-neutral-950 focus-visible:border-neutral-950',
    variant === 'border' &&
      'text-neutral-950 bg-white border-neutral-300 hover:text-neutral-600 hover:bg-neutral-100 hover:border-neutral-100 focus-visible:bg-white focus-visible:text-neutral-950 focus-visible:border-neutral-950',
  );

  return (
    <button type={type} className={classNames} {...restProps}>
      {children}
    </button>
  );
};
