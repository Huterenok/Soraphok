"use client";

import Image from "next/image";
import { switchThemeBtn } from "./ThemeSwitch.module.scss";
import moon from "./img/moon.svg";
import sun from "./img/sun.svg";
import { toggleThemeLS, useTheme } from "shared/lib/theme";
import { Theme } from "shared/config/constants";

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  const onToggleTheme = () => {
    toggleTheme(toggleThemeLS);
  };

  return (
    <button className={switchThemeBtn} onClick={onToggleTheme}>
      <Image src={theme === Theme.LIGHT ? sun : moon} alt="theme" />
    </button>
  );
};
