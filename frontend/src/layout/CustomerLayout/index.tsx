import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import DefaultAvatar from "@/assets/user-avatar.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { keepOneKeyAndRemoveOthers } from "@/utility/helpers";
type Props = {};

const CustomerLayout = (props: Props) => {
  const navigate = useNavigate();
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

  const logout = () => {
    keepOneKeyAndRemoveOthers("theme");
    navigate("/");
  };

  return (
    <div>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-secondary text-white flex flex-col">
          <div className="p-4 text-2xl font-bold text-textColor">
            Shop Sphere
          </div>
          <ul className="flex flex-col p-4 space-y-4">
            <li className="flex items-center gap-5">
              <img
                src={DefaultAvatar}
                alt=""
                className="w-10 h-10 rounded-lg"
              />
              <a
                href="/main/account"
                className="hover:text-gray-400 text-textColor"
              >
                Hello, {accountInfo?.username}
              </a>
            </li>
            <li>
              <a
                href="/main/shop"
                className="hover:text-gray-400 text-textColor"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="hover:text-gray-400 text-textColor"
              >
                Products
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:text-gray-400 text-textColor">
                Cart
              </a>
            </li>
            <li>
              <a href="/profile" className="hover:text-gray-400 text-textColor">
                Profile
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100">
          <div className="bg-darkSecondary px-8 py-4 flex justify-between items-center">
            <button onClick={toggleTheme} className="text-textColor text-xl">
              {theme === "light-theme" ? <IoIosSunny /> : <IoIosMoon />}
            </button>
            <button className="text-textColor" onClick={logout}>
              Logout
            </button>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;
