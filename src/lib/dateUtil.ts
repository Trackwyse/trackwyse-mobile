// convert a MONGODB date to Month Day, Year at Hour:Minute:AM or PM
export const convertDateToReadable = (date: Date, withTime: boolean = true) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: withTime ? "numeric" : undefined,
    minute: withTime ? "numeric" : undefined,
  });
};
