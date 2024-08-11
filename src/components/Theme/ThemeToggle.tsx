import { useTheme } from "./ThemeContext";
import styles from "./Theme.module.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={styles.themeButton}>
      {theme === "light" ? "Dark" : "Light"} theme
    </button>
  );
};

export default ThemeToggle;
