import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
type Props = {};

const CustomerLayout = (props: Props) => {
  const [theme, setTheme] = useState<string>(() => {
    // Check if there's a theme in localStorage or fall back to 'light-theme'
    return localStorage.getItem("theme") || "light-theme";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light-theme" ? "dark-theme" : "light-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Store theme in localStorage
  };

  useEffect(() => {
    // Update the <html> class based on the theme
    const html = document.documentElement;
    html.classList.remove("light-theme", "dark-theme"); // Clean up any old theme class
    html.classList.add(theme); // Add the current theme class

    // Optionally, persist the theme in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div>
      <div className="bg-border px-8 py-4 flex justify-between items-center">
        <div className="text-text text-2xl font-bold">Shop Sphere</div>
        <div>
          <button onClick={toggleTheme} className="text-text text-xl">
            {theme === "light-theme" ? <IoIosSunny /> : <IoIosMoon />}
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default CustomerLayout;
