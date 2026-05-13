export const generateDocumentTitle = (pageTitle: string | undefined) => {
  return pageTitle + (pageTitle ? ' | ' : '') + 'Notes App';
};
