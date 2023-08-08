"use client";
import React, { ReactNode, useMemo, useState, useEffect } from "react";
import { ThemeContext, getThemeLS } from "shared/lib/theme";
import { Theme } from "shared/config/constants";

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: ReactNode;
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { initialTheme, children } = props;
  // const { theme: defaultTheme } = useJsonSettings();
  const [isThemeInited, setThemeInited] = useState(false);

  const [theme, setTheme] = useState<Theme>(
    getThemeLS() || Theme.LIGHT // defaultTheme
  );

  useEffect(() => {
    if (!isThemeInited) {
      setThemeInited(true);
    }
  }, [isThemeInited]);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};
