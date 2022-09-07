export const getDate = () => {
  const date = new Date();

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return date.toLocaleString('ru', options);
};
