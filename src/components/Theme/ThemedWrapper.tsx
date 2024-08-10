"use client";

import React from "react";
import { useTheme } from "../../components/Theme/ThemeContext";
import themeStyles from "../../components/Theme/Theme.module.css";
import ThemeToggle from "./ThemeToggle";

interface ThemeProps {
  children: React.ReactNode;
}

const ThemedWrapper = ({ children }: ThemeProps) => {
  const { theme } = useTheme();

  return (
    <div className={theme === "light" ? themeStyles.light : themeStyles.dark}>
      <ThemeToggle />
      {children}
    </div>
  );
};

export default ThemedWrapper;
