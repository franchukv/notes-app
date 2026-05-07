import { createPortal } from 'react-dom';
import { useAppSelector, useAppDispatch } from '@/shared/lib';
import { Toast } from '@/shared/ui';
import { removeToast, selectToasts } from '@/shared/model';

export const ToastsManager = () => {
  const toasts = useAppSelector(selectToasts);
  const dispatch = useAppDispatch();

  const handleClose = (id: number) => {
    dispatch(removeToast(id));
  };

  return createPortal(
    <div className="fixed bottom-18.5 right-4 z-9998 max-w-100 min-w-72 flex flex-col gap-2 sm:bottom-24 sm:right-8 lg:bottom-16 lg:right-16">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          link={toast.link}
          onClose={() => handleClose(toast.id)}
        />
      ))}
    </div>,
    document.body,
  );
};
