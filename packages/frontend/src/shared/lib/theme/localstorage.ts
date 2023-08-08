import { LOCAL_STORAGE_THEME_KEY, Theme } from "shared/config/constants";

export const getThemeBrowser = () => {};

export const getThemeLS = () => {
  let themeInit = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

  return themeInit || Theme.LIGHT;
};

export const toggleThemeLS = (theme: Theme) => {
  localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
};
