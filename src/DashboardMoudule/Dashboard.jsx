import React, { useContext, useEffect } from "react";
import headerimg from "../assets/home-bg.png";
import { AuthContext } from "../Context/AuthContext";
import getGreeting from "../Shared/TimeMessage/TimeMessage";
import { FaChartBar } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { useTasksApi } from "../Hooks/useTasks";
import { useUsersApi } from "../Hooks/useUsers";
import ChartsData from "../Shared/ChartsData/ChartsData";
import ChatBot from "../Shared/ChatBot/ChatBot";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  let { taskCounts, taskCount } = useTasksApi();
  let { getUsersCount, data } = useUsersApi();

  let greeting = getGreeting();

  useEffect(() => {
    if (user.userGroup == "Manager") {
      getUsersCount();
    }
    taskCounts();
  }, []);

  return (
    <div className="min-h-screen bg-[#d3cfcf5e] dark:bg-gray-900 flex flex-col transition-colors duration-300">
      {/* Header Section */}
      <div
        className="mx-4 sm:mx-6 min-h-[220px] py-10 px-4 sm:px-6 rounded-xl text-white flex flex-col justify-center gap-3 bg-cover bg-center transition-all duration-300"
        style={{ backgroundImage: `url(${headerimg})` }}
      >
        <h3 className="text-2xl sm:text-3xl font-bold dark:text-gray-100">
          {greeting}
          <span className="text-[#EF9B28]">
            {user ? `, ${user.userName}` : ""}
          </span>
        </h3>

        <p className="text-sm sm:text-base max-w-xl dark:text-gray-300">
          You can add projects and assign tasks to your team
        </p>
      </div>

      {/* Main Sections: Tasks & Users */}
      <div className="flex flex-col md:flex-row gap-6 mx-4 sm:mx-6 mt-6 flex-1">
        {/* Tasks Section */}
        <div className="flex-1 bg-[#F8F9FB] dark:bg-gray-800 rounded-md p-5 transition-colors duration-300">
          <h5 className="border-l-4 border-amber-400 pl-2 mb-2 dark:text-gray-100">
            Tasks
          </h5>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="py-5 px-4 bg-[#E5E6F4] dark:bg-gray-700 rounded-md flex flex-col items-start gap-y-2 transition-colors">
              <div className="bg-[#CFD1EC] dark:bg-gray-600 p-3 text-black dark:text-gray-300 rounded-md">
                <FaChartBar size={20} />
              </div>
              <span className="text-gray-500 dark:text-gray-400">Progress</span>
              <h6 className="font-semibold dark:text-gray-100">
                {taskCount?.inProgress}
              </h6>
            </div>
            <div className="py-5 px-4 bg-[#F4F4E5] dark:bg-gray-700 rounded-md flex flex-col items-start gap-y-2 transition-colors">
              <div className="bg-[#E4E4BC] dark:bg-gray-600 p-3 text-black dark:text-gray-300 rounded-md">
                <CiViewList size={20} />
              </div>
              <span className="text-gray-500 dark:text-gray-400">
                Tasks Number
              </span>
              <h6 className="font-semibold dark:text-gray-100">
                {taskCount?.inProgress + taskCount?.done + taskCount?.toDo}
              </h6>
            </div>
            <div className="py-5 px-4 bg-[#F4E5ED] dark:bg-gray-700 rounded-md flex flex-col items-start gap-y-2 transition-colors">
              <div className="bg-[#E7C3D7] dark:bg-gray-600 p-3 text-black dark:text-gray-300 rounded-md">
                <FaChartBar size={20} />
              </div>
              <span className="text-gray-500 dark:text-gray-400">
                Projects Number
              </span>
              <h6 className="font-semibold dark:text-gray-100">32</h6>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full bg-[#F8F9FB] dark:bg-gray-800 rounded-md p-5 transition-colors duration-300">
          {user.userGroup == "Manager" ? (
            <>
              <h5 className="border-l-[3px] mx-1 border-l-amber-400 p-1 dark:text-gray-100">
                Users
              </h5>
              <p className="dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="my-5">
                <div className="flex gap-x-7 gap-y-3 items-center md:flex-nowrap flex-wrap">
                  <div className="md:w-1/2 w-full py-5 px-4 bg-[#E5E6F4] dark:bg-gray-700 rounded-md flex flex-col items-start gap-y-2 transition-colors">
                    <div className="bg-[#CFD1EC] dark:bg-gray-600 p-3 text-black dark:text-gray-300 rounded-md">
                      <FaChartBar />
                    </div>
                    <span className="text-gray-500 dark:text-gray-400">
                      Active
                    </span>
                    <h6 className="dark:text-gray-100">
                      {data.activatedEmployeeCount}
                    </h6>
                  </div>
                  <div className="md:w-1/2 w-full py-5 px-4 bg-[#F4F4E5] dark:bg-gray-700 rounded-md flex flex-col items-start gap-y-2 transition-colors">
                    <div className="bg-[#E4E4BC] dark:bg-gray-600 p-3 text-black dark:text-gray-300 rounded-md">
                      <CiViewList />
                    </div>
                    <span className="text-gray-500 dark:text-gray-400">
                      In Active
                    </span>
                    <h6 className="dark:text-gray-100">
                      {data.deactivatedEmployeeCount}
                    </h6>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full">
              <ChartsData TasksData={taskCount} />
            </div>
          )}
        </div>
      </div>

      {/* ChatBot Section داخل الـ layout */}
      <div className="mt-6 flex justify-end mx-4 sm:mx-6">
        <ChatBot />
      </div>
    </div>
  );
}
