import type { ThemeValue } from "../types";

export const THEME_KEY = "hedgehgg:theme";
export const THEME_DISPLAY_KEY = "hedgehgg:theme-display";

export const applyTheme = (theme: ThemeValue, display: ThemeValue): void => {
  try {
    document.documentElement.setAttribute("data-theme", display);
    localStorage.setItem(THEME_KEY, theme);
    localStorage.setItem(THEME_DISPLAY_KEY, display);
  } catch {}
};

export const themeInitScript = (): string =>
  `(function(){try{` +
  `var pref=localStorage.getItem("${THEME_KEY}");` +
  `var last=localStorage.getItem("${THEME_DISPLAY_KEY}");` +
  `var dark=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";` +
  `var resolved=pref==="light"||pref==="dark"?pref:pref==="system"?dark:pref==="geolocation"?(last||dark):last;` +
  `if(resolved)document.documentElement.setAttribute("data-theme",resolved);` +
  `}catch(e){}})();`;
