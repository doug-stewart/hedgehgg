export function toLocaleTitleCase(str: string, locale = "en-US"): string {
  return str.toLocaleLowerCase(locale).replace(/\b\w/g, (char) => char.toLocaleUpperCase(locale));
}
