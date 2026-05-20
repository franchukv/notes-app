export const generateDocumentTitle = (pageTitle: string | undefined) => {
  if (!pageTitle) {
    return 'Notes App';
  }

  return `${pageTitle} | Notes App`;
};
