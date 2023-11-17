export const getDtHour = (date: Date, hour24?: boolean) => {
  return date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: hour24 ? false : true,
  });
};
