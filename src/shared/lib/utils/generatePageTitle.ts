export const generatePageTitle = (pageTitle: string | undefined) => {
  return 'Notes App' + (pageTitle ? ' — ' + pageTitle : '');
};
