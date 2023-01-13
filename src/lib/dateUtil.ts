/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

// convert a MONGODB date to Month Day, Year at Hour:Minute:AM or PM
// Converts a date to a readable string
// date: Date to convert
// withTime: Whether or not to include the time in the returned string
export const convertDateToReadable = (date: Date, withTime: boolean = true): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: withTime ? "numeric" : undefined,
    minute: withTime ? "numeric" : undefined,
  });
};
