import { Link } from 'react-router';
import type { Toast as ToastType } from '../../model';
import SuccessIcon from '../../assets/icons/success-icon.svg?react';
import ErrorIcon from '../../assets/icons/error-icon.svg?react';
import InfoIcon from '../../assets/icons/info-icon.svg?react';
import CloseIcon from '../../assets/icons/close-icon.svg?react';

interface ToastProps extends Pick<ToastType, 'message' | 'type' | 'link'> {
  onClose: () => void;
}

export const Toast = ({
  message,
  type = 'success',
  link,
  onClose,
}: ToastProps) => {
  const icons = {
    success: SuccessIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };
  const Icon = icons[type];

  return (
    <div className="p-2 flex items-center gap-2 text-preset-6 rounded-lg border border-neutral-200 bg-white shadow-[0_16px_32px_-12px_rgba(14,18,27,0.1)] sm:text-preset-5">
      <Icon className="min-w-4 h-4 w-4 sm:min-w-5 sm:w-5 sm:h-5" />

      <div className="mr-auto">{message}</div>

      {link && (
        <Link to={link.url} className="ml-4 underline-link">
          {link.text}
        </Link>
      )}

      <button
        onClick={onClose}
        className="min-w-4 h-4 w-4 text-neutral-400 cursor-pointer hover:text-red-500 sm:min-w-5 sm:w-5 sm:h-5"
      >
        <CloseIcon className="h-full w-full" />
      </button>
    </div>
  );
};
