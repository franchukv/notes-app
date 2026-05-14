import cn from 'classnames';
import { type ComponentPropsWithoutRef, type ElementType } from 'react';
import { Loader } from '../loader/Loader';

type ButtonProps<T extends ElementType> = {
  as?: T;
  disabled?: boolean;
  isLoading?: boolean;
  variant?:
    | 'primary'
    | 'secondary'
    | 'border'
    | 'red'
    | 'primary-link'
    | 'secondary-link';
} & Omit<ComponentPropsWithoutRef<T>, 'disabled' | 'isLoading' | 'variant'>;

export const Button = <T extends ElementType = 'button'>({
  as: Tag = 'button' as T,
  children,
  disabled,
  isLoading,
  className,
  variant = 'primary',
  ...restProps
}: ButtonProps<T>) => {
  const classNames = cn(
    'flex items-center justify-center gap-2 text-center transition-all duration-300 cursor-pointer disabled:pointer-events-none [&>svg]:h-5 [&>svg]:w-5',
    !variant.includes('link')
      ? 'min-w-22.5 min-h-11.5 py-3 px-4 text-preset-4 rounded-lg border focus-visible:bg-blue-500 disabled:bg-neutral-100 disabled:text-neutral-300! disabled:border-neutral-100! dark:disabled:bg-neutral-700 dark:disabled:border-neutral-700! min-[340px]:min-w-32.5'
      : 'text-preset-5',
    variant === 'primary' &&
      'text-white bg-blue-500 border-blue-500 not-focus-visible:hover:bg-blue-700 not-focus-visible:hover:border-blue-700 not-focus-visible:active:border-blue-700 not-focus-visible:active:bg-blue-700',
    variant === 'secondary' &&
      'text-neutral-600 bg-neutral-100 border-neutral-100 hover:bg-white active:bg-white hover:text-neutral-950 active:text-neutral-950 hover:border-neutral-300 active:border-neutral-300 focus-visible:bg-white focus-visible:text-neutral-950 focus-visible:border-neutral-950 dark:bg-neutral-600 dark:border-neutral-600 dark:text-neutral-200',
    variant === 'border' &&
      'text-neutral-950 bg-transparent border-neutral-300 hover:text-neutral-600 active:text-neutral-600 hover:bg-neutral-100 active:bg-neutral-100 hover:border-neutral-100 active:border-neutral-100 focus-visible:bg-white focus-visible:text-neutral-950 focus-visible:border-neutral-950 dark:text-white dark:border-neutral-600',
    variant === 'red' &&
      'text-white bg-red-500 border-red-500 not-focus-visible:hover:bg-red-700 not-focus-visible:hover:border-red-700 not-focus-visible:active:border-red-700 not-focus-visible:active:bg-red-700 focus-visible:bg-red-500',
    variant === 'primary-link' &&
      'text-blue-500 hover:text-blue-700 active:text-blue-700',
    variant === 'secondary-link' &&
      'text-neutral-600 hover:text-neutral-950 active:text-neutral-950 dark:text-neutral-300 dark:hover:text-neutral-600 dark:active:text-neutral-600',
    isLoading && 'justify-center!',
    className,
  );

  return (
    <Tag
      className={classNames}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(restProps as any)}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <Loader className="text-inherit! h-4.5! w-4.5!" />
      ) : (
        children
      )}
    </Tag>
  );
};
