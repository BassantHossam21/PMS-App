import React, { useContext } from "react";
import { ThemeContext } from "../../Context/DarkModeContext";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

export default function ToggleTheme() {
  let { darkMode, toggleTheme } = useContext(ThemeContext);
  return (
    <i onClick={toggleTheme} className="w-fit cursor-pointer text-2xl">
      {darkMode ? <CiLight className="text-white" /> : <MdDarkMode />}
    </i>
  );
}
