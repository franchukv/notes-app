import { useAppDispatch } from './useAppDispatch';
import { addToast, removeToast, type Toast } from '../../model';

type ShowToastProps = Pick<Toast, 'message' | 'type' | 'link'>;

export const useToast = () => {
  const dispatch = useAppDispatch();

  const showToast = ({ message, type, link }: ShowToastProps) => {
    const id = Date.now();

    dispatch(addToast({ id, message, type, link }));

    setTimeout(() => dispatch(removeToast(id)), 3000);
  };

  return { showToast };
};
