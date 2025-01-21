import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import DefaultAvatar from "@/assets/user-avatar.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
type Props = {};

const CustomerLayout = (props: Props) => {
  const accountInfo = useSelector(
    (state: RootState) => state.userInfo.userInfo
  );
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
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold">Shop Sphere</div>
        <ul className="flex flex-col p-4 space-y-4">
          <li className="flex items-center gap-5">
            <img src={DefaultAvatar} alt="" className="w-10 h-10 rounded-lg" />
            <a href="/" className="hover:text-gray-400 cur">
              Hello, {accountInfo?.username}
            </a>
          </li>
          <li>
            <a href="/" className="hover:text-gray-400">
              Home
            </a>
          </li>
          <li>
            <a href="/products" className="hover:text-gray-400">
              Products
            </a>
          </li>
          <li>
            <a href="/cart" className="hover:text-gray-400">
              Cart
            </a>
          </li>
          <li>
            <a href="/profile" className="hover:text-gray-400">
              Profile
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <div className="bg-border px-8 py-4 flex justify-between items-center">
          <button onClick={toggleTheme} className="text-text text-xl">
            {theme === "light-theme" ? <IoIosSunny /> : <IoIosMoon />}
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default CustomerLayout;
