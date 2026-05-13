import { useLayoutEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { setPageTitles } from '../../model';
import { generateDocumentTitle } from '../utils';

interface useTitlesProps {
<<<<<<< HEAD
  skip?: boolean;
=======
>>>>>>> edc85e00dd610a20cd61055312f64c7a8093c43d
  documentTitle: string | undefined;
  headerTitle: string | undefined;
  isSinglePage?: boolean;
  pathname?: string;
  extraTextInDocumentTitle?: string;
}

export const useTitles = ({
  documentTitle,
  headerTitle,
  pathname,
  extraTextInDocumentTitle = '',
}: useTitlesProps) => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!documentTitle || !headerTitle) {
      return;
    }

    dispatch(setPageTitles({ documentTitle, headerTitle }));

    document.title = generateDocumentTitle(
      documentTitle + extraTextInDocumentTitle,
    );
  }, [
    dispatch,
    documentTitle,
    headerTitle,
    pathname,
    extraTextInDocumentTitle,
  ]);
};
