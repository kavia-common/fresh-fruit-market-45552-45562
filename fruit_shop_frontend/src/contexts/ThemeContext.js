import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext();

// PUBLIC_INTERFACE
export function useTheme() {
  /** Hook to consume theme context */
  return useContext(ThemeContext);
}

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  /** Provider to manage theme and apply data-theme attribute */
  const [theme, setTheme] = useState(() => {
    const persisted = localStorage.getItem("ffm_theme");
    return persisted || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ffm_theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      // PUBLIC_INTERFACE
      toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
