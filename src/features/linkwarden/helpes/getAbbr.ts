export const getAbbr = (name: string) => {
  const abbr = name
    .split(" ")
    .map((word) => word.slice(0, 1))
    .join("")
    .slice(0, 3);
  const result = abbr.length > 1 ? abbr : name.slice(0, 2);
  return result.toUpperCase();
};
