// "use client"

// import { createContext, useContext, useState, useEffect } from "react"

// const ThemeContext = createContext()

// export const ThemeProvider = ({ children }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false)

//   useEffect(() => {
//     const savedMode = localStorage.getItem("darkMode") === "true"
//     setIsDarkMode(savedMode)
//     document.documentElement.classList.toggle("dark", savedMode)
//   }, [])

//   const toggleTheme = () => {
//     const newMode = !isDarkMode
//     setIsDarkMode(newMode)
//     document.documentElement.classList.toggle("dark", newMode)
//     localStorage.setItem("darkMode", newMode ? "true" : "false")
//   }

//   return <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
// }

// export const useTheme = () => {
//   const context = useContext(ThemeContext)
//   if (context === undefined) {
//     throw new Error("useTheme must be used within a ThemeProvider")
//   }
//   return context
// }


import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      console.log('Initial theme load - saved:', savedTheme, 'prefers dark:', prefersDark);
      return savedTheme === 'dark' || (!savedTheme && prefersDark);
    }
    return false;
  });

  const toggleTheme = () => {
    console.log('Toggling theme. Current:', isDarkMode);
    setIsDarkMode((prevTheme) => !prevTheme);
  };


  useEffect(() => {
    console.log('Theme changed to:', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
