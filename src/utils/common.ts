export const capitalizeString = (str: string): string => {
  if (!str) return '';

  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const setMarkColor = (mark: number): string => {
  if (mark >= 8) return 'green';
  if (mark >= 5) return 'blue';
  return 'red';
};
