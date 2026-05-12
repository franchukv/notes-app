export const generatePageTitle = (pageTitle: string | undefined) => {
  return pageTitle + (pageTitle ? ' | ' : '') + 'Notes App';
};
