import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

export default function MasterLayout() {
  const [toggled, setToggled] = useState(false);

  return (
    <div className="min-h-screen">
      <NavBar onMenuClick={() => setToggled(!toggled)} />
      <div className="flex min-h-[calc(100vh-68px)]">
        <SideBar toggled={toggled} setToggled={setToggled} />

        {/* Page Content */}
        <div className="flex-1 overflow-x-hidden min-w-0 bg-[#F8F9FB] dark:bg-gray-900 transition-colors duration-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
