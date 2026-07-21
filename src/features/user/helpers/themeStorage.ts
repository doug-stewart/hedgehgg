import type { ThemeValue } from "../types";

export const THEME_COOKIE = "theme-display";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Applies the resolved theme to the DOM and caches it for the next session.
 *
 * Sets `data-theme` on <html> and writes the resolved value to a cookie so the
 * root layout can server-render `<html data-theme>` on the next load, before
 * any paint — avoiding a flash of the wrong theme.
 */
export const applyTheme = (display: ThemeValue): void => {
  try {
    document.documentElement.setAttribute("data-theme", display);
    // biome-ignore lint/suspicious/noDocumentCookie: synchronous write is required so the cookie is set before the next navigation/paint
    document.cookie = `${THEME_COOKIE}=${display}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
  } catch {}
};
