import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./pages/welcome";
import Homepage from "./pages/customerPage/homepage";

function App() {
  const [theme, setTheme] = useState("light-theme");

  // Toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "light-theme" ? "dark-theme" : "light-theme"
    );
  };

  // Apply the theme to the HTML element
  useEffect(() => {
    const html = document.documentElement;
    html.className = theme; // Set the className to the current theme
  }, [theme]); // Runs whenever `theme` changes

  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
