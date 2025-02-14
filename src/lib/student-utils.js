export const getInitials = (studentName) => {
  if (typeof studentName !== 'string') {
    return '';
  }

  return studentName
    .split(/\s+/)
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};