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
