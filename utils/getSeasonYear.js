// If Jan-June, get previous year’s records
const getSeasonYear = async () => {
  const date = new Date();
  const month = date.getMonth();
  return date.getFullYear() + (month < 6 ? -1 : 0);
};

export default getSeasonYear;
