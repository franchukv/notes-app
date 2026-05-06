import cn from 'classnames';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

type ButtonProps<T extends ElementType> = {
  as?: T;
  variant?:
    | 'primary'
    | 'secondary'
    | 'border'
    | 'primary-link'
    | 'secondary-link';
} & Omit<ComponentPropsWithoutRef<T>, 'variant'>;

export const Button = <T extends ElementType = 'button'>({
  as: Tag = 'button' as T,
  children,
  className,
  variant = 'primary',
  ...restProps
}: ButtonProps<T>) => {
  const classNames = cn(
    'flex items-center justify-center gap-2 text-center transition-all duration-300 cursor-pointer disabled:pointer-events-none [&>svg]:h-5 [&>svg]:w-5',
    !variant.includes('link')
      ? 'py-3 px-4 text-preset-4 rounded-lg border focus-visible:bg-blue-500 disabled:bg-neutral-100 disabled:text-neutral-300! disabled:border-neutral-100!'
      : 'text-preset-5',
    variant === 'primary' &&
      'text-white bg-blue-500 border-blue-500 not-focus-visible:hover:bg-blue-700 not-focus-visible:hover:border-blue-700 not-focus-visible:active:border-blue-700 not-focus-visible:active:bg-blue-700',
    variant === 'secondary' &&
      'text-neutral-600 bg-neutral-100 border-neutral-100 hover:bg-white active:bg-white hover:text-neutral-950 active:text-neutral-950 hover:border-neutral-300 active:border-neutral-300 focus-visible:bg-white focus-visible:text-neutral-950 focus-visible:border-neutral-950',
    variant === 'border' &&
      'text-neutral-950 bg-white border-neutral-300 hover:text-neutral-600 active:text-neutral-600 hover:bg-neutral-100 active:bg-neutral-100 hover:border-neutral-100 active:border-neutral-100 focus-visible:bg-white focus-visible:text-neutral-950 focus-visible:border-neutral-950',
    variant === 'primary-link' &&
      'text-blue-500 hover:text-blue-700 active:text-blue-700',
    variant === 'secondary-link' &&
      'text-neutral-600 hover:text-neutral-950 active:text-neutral-950',
    className,
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag className={classNames} {...(restProps as any)}>
      {children}
    </Tag>
  );
};
