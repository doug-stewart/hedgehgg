import type { ThemeValue } from "../types";

const fallback: ThemeValue = "dark";

export const normalizeTheme = (theme: ThemeValue | null, isDay: boolean): ThemeValue => {
  if (theme === "dark" || theme === "light") {
    return theme;
  }

  if (theme === "geolocation") {
    return isDay ? "light" : "dark";
  }

  if (theme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersDark ? "dark" : prefersLight ? "light" : fallback;
  }

  return fallback;
};
