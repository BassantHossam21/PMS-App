import React, { useContext, useState } from "react";
import logo from "../../assets/Navbar.png";
import { FaBell } from "react-icons/fa";
import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  Dropdown,
  DropdownItem,
} from "flowbite-react";
import { AuthContext } from "../../Context/AuthContext";
import imgProfile from "../../assets/imgUpload.jpg";
import { useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { TbLockPassword } from "react-icons/tb";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import { ThemeContext } from "../../Context/DarkModeContext";
import lightLogo from "../../assets/PMS.png";

export default function NavBar({ onMenuClick }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  let { darkMode } = useContext(ThemeContext);

  const handelLogOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar
      fluid
      rounded
      className="bg-white dark:bg-gray-900 shadow-lg dark:shadow-xl px-4 py-2 transition-colors duration-300 z-50 relative"
    >
      {/* Logo */}
      <NavbarBrand>
        {darkMode ? (
          <img src={lightLogo} className="w-32 md:w-40" alt="Logo" />
        ) : (
          <img src={logo} className="w-32 md:w-40" alt="Logo" />
        )}
      </NavbarBrand>

      {/* Toggle Button (Mobile) */}
      <div className="flex items-center gap-4 md:hidden">
        {/* Notifications */}
        <div className="relative cursor-pointer">
          <FaBell className="text-[#EF9B28] text-xl" />
          <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
        </div>

        <button
          onClick={onMenuClick}
          className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
          aria-label="Toggle SideBar"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center gap-6 ml-auto">
        {/* Notifications */}
        <div className="relative cursor-pointer">
          <FaBell className="text-[#EF9B28] text-2xl" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </div>

        {/* Theme Toggle */}
        <ToggleTheme />

        {/* Profile Dropdown */}
        <Dropdown
          inline
          label={
            <div className="flex gap-3 cursor-pointer">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#EF9B28]">
                <img
                  src={imgProfile}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[#0E382F] dark:text-[#EF9B28] text-sm">
                  {user?.userName}
                </span>
                <span className="text-[#6b7280] dark:text-gray-400 text-xs truncate">
                  {user?.userEmail}
                </span>
              </div>
            </div>
          }
          className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg mt-2 transition-colors duration-300"
        >
          <DropdownItem
            onClick={() => navigate("/dashboard/change-password")}
            className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 dark:hover:bg-gray-700"
          >
            <TbLockPassword size={18} />
            Change Password
          </DropdownItem>

          <DropdownItem
            onClick={handelLogOut}
            className="flex items-center gap-2 text-red-500 dark:text-red-400 dark:hover:bg-gray-700"
          >
            <CgLogOut size={18} />
            Logout
          </DropdownItem>
        </Dropdown>
      </div>
    </Navbar>
  );
}
