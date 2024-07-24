import { createContext, useState, useContext, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("UseTheme error");
  }
  return context;
};
