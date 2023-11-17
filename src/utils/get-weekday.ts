export const getWeekday = (date: Date) => {
  return date.toLocaleString("en-us", { weekday: "short" });
};
