import cn from 'classnames';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  const classNames = cn(
    'animate-pulse bg-neutral-200 rounded-md dark:bg-neutral-800',
    className,
  );

  return <div className={classNames} />;
};
