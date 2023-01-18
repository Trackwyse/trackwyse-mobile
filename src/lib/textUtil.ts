/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

/**
 * Returns a string that is at most the specified length,
 * with "..." appended if the string is longer than the specified length.
 * @param text the string to trim
 * @param length the maximum length of the returned string
 * @returns the trimmed string
 */
export const trimToLength = (text: string, length: number) => {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  }
  return text;
};

/***
 * This function takes a version string and pads it with zeroes to the left for the first part and to the right for the rest.
 * It does this because the version string is used as a unique ID for the version in the database, and the sorting of the versions
 * is based on this ID.
 *
 * E.g. 1.0.0 becomes 010000, 1.1.1 becomes 011100, 1.0.10 becomes 010010, 1.10.0 becomes 011000
 *
 * The padding is done so that the versions are sorted correctly, e.g. 1.0.0 < 1.0.1 < 1.1.0 < 1.1.1 < 1.10.0 < 1.10.1 < 1.11.0 < 1.11.1 etc.
 ***/
export const stringifyVersion = (version: string) => {
  const parts = version.split(".");

  const paddedParts = parts.map((part, index) => {
    if (index === 0) {
      while (part.length < 2) {
        part = "0" + part;
      }
    } else {
      while (part.length < 2) {
        part = part + "0";
      }
    }

    return part;
  });

  return paddedParts.join("");
};

export const getAddressString = (address: Address) => {
  // This function returns a string representation of the address
  return `${address.address1}, ${address.address2 ? `${address.address2}, ` : ""} ${
    address.city
  }, ${address.state} ${address.zip5}`;
};

export const getSaleorAddressString = (address: SaleorAddress) => {
  // This function returns a string representation of the address
  // convert the city tp title case
  const city = address.city.charAt(0).toUpperCase() + address.city.slice(1).toLowerCase();

  return `${address.streetAddress1}, ${
    address.streetAddress2 ? `${address.streetAddress2}, ` : ""
  }${city}, ${address.countryArea} ${address.postalCode}`;
};

// formats a number of seconds into a string of days, hours, and minutes
// e.g. 3661 => "1 hour, 1 minute"
export const formatSeconds = (seconds: number) => {
  seconds = Number(seconds);
  let d = Math.floor(seconds / (3600 * 24));
  let h = Math.floor((seconds % (3600 * 24)) / 3600);
  let m = Math.floor((seconds % 3600) / 60);

  let dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  let hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  let mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes ") : "";

  return dDisplay + hDisplay + mDisplay;
};
