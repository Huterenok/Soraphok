"use client";

import { SharedProps } from "shared/config/type";
import { useTheme } from "shared/lib/theme";

export const HtmlProvider = ({ children }: SharedProps) => {
  const { theme } = useTheme();

  return (
    <html lang="en" data-theme={theme}>
      {children}
    </html>
  );
};
