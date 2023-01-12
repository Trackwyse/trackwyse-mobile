export const trimToLength = (text: string, length: number) => {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  }
  return text;
};

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
  return `${address.address1}, ${address.address2 ? `${address.address2}, ` : ""} ${
    address.city
  }, ${address.state} ${address.zip5}`;
};

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
