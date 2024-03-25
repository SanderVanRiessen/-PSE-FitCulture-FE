export const formatDate = (dateTime) => {
  const dateObj = new Date(dateTime);
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}-${month}-${year}`;
};
