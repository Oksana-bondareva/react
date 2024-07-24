import { useTheme } from "./ThemeContext";
import "./Theme.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-button">
      {theme === "light" ? "Dark" : "Light"} theme
    </button>
  );
};

export default ThemeToggle;
