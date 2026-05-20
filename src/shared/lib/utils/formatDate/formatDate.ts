const formatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export const formatDate = (dateString: string) => {
  return formatter.format(new Date(dateString));
};
