import { useNavigate } from 'react-router';
import { Button } from '@/shared/ui';
import BackArrowIcon from '@/shared/assets/icons/back-arrow-icon.svg?react';

interface ActionBarWidgetProps {
  parentUrl?: string;
  children?: React.ReactNode;
}

export const ActionBarWidget = ({
  parentUrl,
  children,
}: ActionBarWidgetProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full pb-3 flex items-center gap-4 justify-between border-b border-neutral-200 sm:pb-4">
      <Button
        type="button"
        variant="secondary-link"
        onClick={() => (parentUrl ? navigate(parentUrl) : navigate(-1))}
        className="gap-1!"
      >
        <BackArrowIcon />
        Go Back
      </Button>

      {children && <div className="flex items-center gap-4">{children}</div>}
    </div>
  );
};
