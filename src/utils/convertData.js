export const convertDateTime = (isoDateTime) => {
  const date = new Date(isoDateTime);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };

  return date.toLocaleDateString("ru-RU", options);
};
