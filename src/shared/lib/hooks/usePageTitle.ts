import { useLayoutEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { setPageTitle } from '../../model';
import { generatePageTitle } from '../utils';

export const usePageTitle = (title?: string, pathname?: string) => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!title) {
      return;
    }

    dispatch(setPageTitle(title));
    document.title = generatePageTitle(title);
  }, [dispatch, title, pathname]);
};
