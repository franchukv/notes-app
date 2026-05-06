import { useLayoutEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { setPageTitle } from '../../model';
import { generatePageTitle } from '../utils';

interface usePageTitleProps {
  title: string | undefined;
  headerTitle?: string | undefined;
  pathname?: string;
  previousHeaderTitle?: boolean;
  extraTextInDocumentTitle?: string;
}

export const usePageTitle = ({
  title,
  pathname,
  headerTitle,
  extraTextInDocumentTitle = '',
  previousHeaderTitle = false,
}: usePageTitleProps) => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!title) {
      return;
    }

    if (!previousHeaderTitle) {
      dispatch(setPageTitle(title));
    }

    if (headerTitle) {
      dispatch(setPageTitle(headerTitle));
    }

    document.title = generatePageTitle(title + extraTextInDocumentTitle);
  }, [
    dispatch,
    title,
    pathname,
    extraTextInDocumentTitle,
    previousHeaderTitle,
    headerTitle,
  ]);
};
