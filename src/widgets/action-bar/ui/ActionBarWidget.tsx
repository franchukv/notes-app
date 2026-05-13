import cn from 'classnames';
import { useNavigate } from 'react-router';
import { Button } from '@/shared/ui';
import BackArrowIcon from '@/shared/assets/icons/back-arrow-icon.svg?react';

interface ActionBarWidgetProps {
  altText?: string;
  parentUrl?: string;
  className?: string;
  variant?: 'default' | 'without-border';
  children?: React.ReactNode;
}

export const ActionBarWidget = ({
  altText,
  parentUrl,
  className,
  variant = 'default',
  children,
}: ActionBarWidgetProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'w-full pb-3 flex items-center gap-4 justify-between border-b border-neutral-200 sm:pb-4 dark:border-neutral-800',
        variant === 'without-border' && 'pb-0! border-none!',
        className,
      )}
    >
      <Button
        type="button"
        variant="secondary-link"
        onClick={() => (parentUrl ? navigate(parentUrl) : navigate(-1))}
        className="gap-1!"
      >
        <BackArrowIcon />
        {altText ?? 'Go Back'}
      </Button>

      {children && <div className="flex items-center gap-4">{children}</div>}
    </div>
  );
};
