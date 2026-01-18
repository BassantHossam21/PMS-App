import React, { useContext, useState, useEffect } from "react";
import {
  FaUsers,
  FaTasks,
  FaChevronLeft,
  FaChevronRight,
  FaHome,
} from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { CgLogOut } from "react-icons/cg";
import { TbLockPassword } from "react-icons/tb";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import imgProfile from "../../assets/imgUpload.jpg";

export default function SideBar({ toggled, setToggled }) {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Sidebar collapsed state for desktop
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // For desktop: collapse if window is smaller than 1024 but still desktop
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setCollapsed(true);
      } else if (window.innerWidth >= 1024) {
        setCollapsed(false);
      }
    };

    handleResize(); // set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleButtonStyle = {
    position: "absolute",
    top: 20,
    right: -15,
    zIndex: 10,
    backgroundColor: "#f3a333",
    color: "#fff",
    border: "none",
    borderRadius: "30% 0 0 30%",
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
  };

  const isActive = (path) => location.pathname === path;

  // Auto-close sidebar on mobile when location changes
  useEffect(() => {
    if (window.innerWidth < 768) {
      setToggled(false);
    }
  }, [location.pathname, setToggled]);

  return (
    <Sidebar
      width="200px"
      collapsed={collapsed}
      toggled={toggled}
      onBackdropClick={() => setToggled(false)}
      breakPoint="md"
      backgroundColor="#0e382f"
      rootStyles={{
        height: "100vh",
        minHeight: "100vh",
        border: "none",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <button
        className="hidden md:flex"
        style={toggleButtonStyle}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <FaChevronRight size={12} /> : <FaChevronLeft size={12} />}
      </button>

      <Menu
        menuItemStyles={{
          button: ({ level, active }) => ({
            color: "#fff",
            backgroundColor: active ? "#f3a333" : "transparent",
            "&:hover": {
              color: "#f3a333",
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }),
        }}
      >
        <div style={{ marginTop: 80 }} />

        {/* User Profile for Mobile Sidebar */}
        {!collapsed && (
          <div className="px-6 py-4 md:hidden border-b border-white/10 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#f3a333]">
                <img
                  src={imgProfile}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-white text-sm font-bold truncate">
                  {user?.userName}
                </span>
                <span className="text-white/60 text-[10px] truncate">
                  {user?.userEmail}
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-white/80 text-xs">Theme</span>
              <ToggleTheme />
            </div>
          </div>
        )}

        <div className="md:mt-20 mt-2" />

        <MenuItem
          icon={<FaHome />}
          component={<Link to="/dashboard" />}
          active={isActive("/dashboard")}
        >
          Home
        </MenuItem>

        <MenuItem
          icon={<GrProjects />}
          component={<Link to="/dashboard/Projects" />}
          active={isActive("/dashboard/Projects")}
        >
          Projects
        </MenuItem>

        {user.userGroup === "Manager" && (
          <MenuItem
            component={<Link to={"/dashboard/users"} />}
            icon={<FaUsers />}
            active={isActive("/dashboard/users")}
          >
            Users
          </MenuItem>
        )}

        <MenuItem
          icon={<FaTasks />}
          component={<Link to="/dashboard/tasks" />}
          active={isActive("/dashboard/tasks")}
        >
          Tasks
        </MenuItem>

        {/* Mobile Only Items */}
        <div className="md:hidden mt-4 border-t border-white/10 pt-4">
          <MenuItem
            icon={<TbLockPassword />}
            component={<Link to="/dashboard/change-password" />}
            active={isActive("/dashboard/change-password")}
          >
            Change Password
          </MenuItem>
          <MenuItem
            icon={<CgLogOut />}
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="text-red-400"
          >
            Logout
          </MenuItem>
        </div>
      </Menu>
    </Sidebar>
  );
}
