// src/hooks/useTheme.ts
import { useEffect, useState } from "react";

export function UseTheme() {
  const [theme, setTheme] = useState(() => {
    // Load from localStorage or system preference
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme as string);
  }, [theme]);

  return { theme, setTheme };
}
