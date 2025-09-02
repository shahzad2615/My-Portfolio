// src/components/ThemeToggle.tsx
import { UseTheme } from "../Hooks/Usetheme";

const ThemeToggles = () => {
  const { theme, setTheme } = UseTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-4 py-2 rounded-lg bg-gray-200 text-black dark:bg-gray-800 dark:text-white transition"
    >
      {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggles;
