import React, { useContext, useEffect, useState } from "react";
import { useUsersApi } from "../../../Hooks/useUsers";
import { toast } from "react-toastify";
import { CiMenuKebab } from "react-icons/ci";
import { BsSearch, BsFilter } from "react-icons/bs";
import { FaEye, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Spinner } from "flowbite-react";
import TablePagination from "../../../Shared/TablePagination/TablePagination";
import { HiSelector } from "react-icons/hi";
import { AuthContext } from "../../../Context/AuthContext";

export default function Users() {
  const {
    getUsersApi,
    data,
    loading,
    toogleActiveUser,
    totalCount,
    totalPages,
  } = useUsersApi();
  const [openDropdown, setOpenDropdown] = useState(null);
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      getUsersApi(currentPage, pageSize, searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentPage, pageSize, searchQuery]);

  const handleToggleActive = async (user) => {
    await toogleActiveUser(user.id);
    getUsersApi(currentPage, pageSize, searchQuery);
    toast.success(user.isActivated ? "User deactivated" : "User activated");
    setOpenDropdown(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-5 px-6 bg-white dark:bg-gray-800 transition-colors duration-300">
        <h2 className="text-3xl text-gray-800 dark:text-gray-100 font-semibold text-center sm:text-left">
          Users
        </h2>
      </div>

      <div className="flex-1 p-4">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md overflow-hidden flex flex-col transition-colors duration-300">
          {/* Search & Filter Bar */}
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center border-b border-gray-50 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
            <div className="relative max-w-xs flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BsSearch className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-full focus:ring-[#315951] focus:border-[#315951] block w-full pl-10 p-2.5 outline-none font-sans dark:placeholder-gray-400 transition-colors duration-300"
                placeholder="Search by User Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm bg-white dark:bg-gray-800">
              <BsFilter size={18} />
              <span className="font-medium text-sm">Filter</span>
            </button>
          </div>

          <div className="overflow-x-auto relative">
            {loading && data.length > 0 && (
              <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 z-10 flex items-center justify-center transition-colors duration-300">
                <Spinner size="lg" />
              </div>
            )}

            <table className="w-full overflow-x-scroll  min-w-max text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-[#315951] dark:bg-gray-700 text-white uppercase tracking-wider text-xs font-medium">
                <tr>
                  <th className="px-6 py-4 font-medium flex items-center gap-2 cursor-pointer group whitespace-nowrap">
                    User Name{" "}
                    <HiSelector className="text-gray-400 group-hover:text-white transition-colors" />
                  </th>
                  <th className="px-6 py-4 font-medium">
                    <div className="flex items-center gap-2 cursor-pointer group whitespace-nowrap">
                      Status{" "}
                      <HiSelector className="text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </th>
                  <th className="hidden sm:table-cell px-6 py-4 font-medium">
                    <div className="flex items-center gap-2 cursor-pointer group whitespace-nowrap">
                      Phone Number{" "}
                      <HiSelector className="text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </th>
                  <th className="hidden sm:table-cell px-6 py-4 font-medium">
                    <div className="flex items-center gap-2 cursor-pointer group whitespace-nowrap">
                      Email{" "}
                      <HiSelector className="text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </th>
                  <th className="hidden sm:table-cell px-6 py-4 font-medium">
                    <div className="flex items-center gap-2 cursor-pointer group whitespace-nowrap">
                      Date Created{" "}
                      <HiSelector className="text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-medium text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
                {loading && data.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-20">
                      <Spinner size="xl" />
                    </td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((user) => (
                    <tr
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      key={user.id}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                        {user.userName}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                            user.isActivated
                              ? "bg-[#009247] dark:bg-green-700 text-white"
                              : "bg-[#BC5454] dark:bg-red-700 text-white"
                          }`}
                        >
                          {user.isActivated ? "Active" : "Not Active"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap hidden sm:table-cell">
                        {user.phoneNumber}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap hidden sm:table-cell">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap hidden sm:table-cell">
                        {new Date(user.creationDate).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap relative">
                        <div className="flex justify-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(
                                openDropdown === user.id ? null : user.id,
                              );
                            }}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition-all"
                          >
                            <CiMenuKebab className="text-xl rotate-90" />
                          </button>
                        </div>

                        {openDropdown === user.id && (
                          <div className="absolute right-10 top-8 z-50 w-40 rounded-2xl bg-white dark:bg-gray-700 p-2 shadow-2xl ring-1 ring-gray-100 dark:ring-gray-600 border border-gray-100 dark:border-gray-600 animate-in fade-in zoom-in duration-200 transition-colors">
                            <ul className="flex flex-col text-sm space-y-1">
                              <li
                                onClick={() => handleToggleActive(user)}
                                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 cursor-pointer transition-colors ${
                                  user.isActivated
                                    ? "text-[#E14120] dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-600"
                                    : "text-emerald-800 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-600"
                                }`}
                              >
                                {user.isActivated ? (
                                  <FaTimesCircle
                                    size={14}
                                    className="text-[#E14120] dark:text-red-400"
                                  />
                                ) : (
                                  <FaCheckCircle
                                    size={14}
                                    className="text-emerald-700 dark:text-emerald-400"
                                  />
                                )}
                                <span className="font-medium">
                                  {user.isActivated ? "Deactivate" : "Activate"}
                                </span>
                              </li>
                              <li className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-emerald-800 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-600 cursor-pointer transition-colors">
                                <FaEye
                                  className="text-emerald-700 dark:text-emerald-400"
                                  size={14}
                                />{" "}
                                <span className="font-medium">
                                  View Profile
                                </span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-10 text-gray-400 dark:text-gray-500"
                    >
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <TablePagination
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalTasks={totalCount}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}
