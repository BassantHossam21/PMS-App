import React, { useEffect, useRef, useState, useContext } from "react";
import useProjects from "../../../Hooks/useProjects";
import { BsSearch, BsFilter } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import {
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiSelector,
} from "react-icons/hi";

import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Spinner } from "flowbite-react";
import ConfirmModal from "../../../Shared/ConfirmModal/ConfirmModal";
import TablePagination from "../../../Shared/TablePagination/TablePagination";
import { AuthContext } from "../../../Context/AuthContext";

export default function Projects() {
  const {
    projects,
    loading,
    error,
    pageNumber,
    totalPages,
    pageSize,
    totalProjects,
    searchQuery,
    setSearchQuery,
    setPageNumber,
    setPageSize,
    deleteProject,
  } = useProjects();
  const { user } = useContext(AuthContext);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (projectToDelete) deleteProject(projectToDelete.id);
    setIsModalOpen(false);
    setProjectToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setProjectToDelete(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fb] dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-row justify-between items-center gap-4 py-5 px-6 bg-white dark:bg-gray-800 transition-colors duration-300">
        <h2 className="text-2xl sm:text-3xl text-gray-800 dark:text-gray-100 font-semibold truncate">
          Projects
        </h2>
        {user?.userGroup === "Manager" && (
          <button
            onClick={() => navigate("/dashboard/Project-Data")}
            className="bg-[#EF9B28] text-white py-2 px-4 sm:px-6 rounded-full flex items-center gap-2 hover:bg-[#e88c1f] dark:hover:bg-[#d88a1a] transition-all shadow-md font-medium text-sm sm:text-base shrink-0"
          >
            <FaPlus size={14} /> <span>Add New Project</span>
          </button>
        )}
      </div>

      {/* Table */}
      <div className="p-4">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md overflow-hidden flex flex-col transition-colors duration-300">
          {/* Internal Search Bar */}
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center border-b border-gray-50 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
            <div className="relative max-w-xs flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BsSearch className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-full focus:ring-[#315951] focus:border-[#315951] block w-full pl-10 p-2.5 outline-none font-sans dark:placeholder-gray-400 transition-colors duration-300"
                placeholder="Search by Title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm bg-white dark:bg-gray-800">
              <BsFilter size={18} />
              <span className="font-medium text-sm">Filter</span>
            </button>
          </div>

          {/* Table Body */}
          <div className="overflow-x-auto relative">
            {loading && projects.length > 0 && (
              <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 z-10 flex items-center justify-center transition-colors duration-300">
                <Spinner size="lg" />
              </div>
            )}

            {loading && projects.length === 0 ? (
              <div className="flex justify-center py-20">
                <Spinner size="xl" />
              </div>
            ) : error ? (
              <p className="text-red-600 dark:text-red-400 text-center py-10 font-medium">
                {error}
              </p>
            ) : (
              <table className="w-full min-w-max text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-[#315951] dark:bg-gray-700 text-white uppercase tracking-wider text-xs font-medium">
                  <tr>
                    <th className="px-6 py-4 font-medium">Title</th>
                    <th className="px-6 py-4 font-medium hidden sm:table-cell">
                      Statuses
                    </th>
                    <th className="px-6 py-4 font-medium hidden md:table-cell">
                      Tasks
                    </th>
                    <th className="px-6 py-4 font-medium hidden lg:table-cell">
                      Description
                    </th>
                    <th className="px-6 py-4 font-medium hidden sm:table-cell">
                      Date Created
                    </th>
                    {user?.userGroup === "Manager" && (
                      <th className="px-6 py-4 font-medium text-center">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <tr
                        key={project.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                          {project.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                          <span className="bg-[#D1FADF] dark:bg-green-900 text-[#027A48] dark:text-green-200 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-300">
                            {project.task?.length
                              ? `${project.task.filter((t) => t.status === "Done").length} Done`
                              : "No Tasks"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 hidden md:table-cell">
                          {project.task?.length || 0}
                        </td>
                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400 max-w-xs truncate hidden lg:table-cell">
                          {project.description || "-"}
                        </td>
                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400 whitespace-nowrap hidden sm:table-cell">
                          {new Date(project.creationDate).toLocaleDateString()}
                        </td>
                        {user?.userGroup === "Manager" && (
                          <td className="px-6 py-4 relative">
                            <div className="flex justify-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenDropdown(
                                    openDropdown === project.id
                                      ? null
                                      : project.id,
                                  );
                                }}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition-all"
                              >
                                <CiMenuKebab size={20} className="rotate-90" />
                              </button>
                            </div>

                            {openDropdown === project.id && (
                              <div
                                ref={dropdownRef}
                                className="absolute right-10 top-8 w-40 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-2xl shadow-2xl z-50 p-2 animate-in fade-in zoom-in duration-200 transition-colors"
                              >
                                <ul className="flex flex-col text-sm space-y-1">
                                  <li className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-emerald-800 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-600 cursor-pointer transition-colors">
                                    <HiOutlineEye
                                      size={16}
                                      className="text-emerald-700 dark:text-emerald-400"
                                    />{" "}
                                    <span className="font-medium">View</span>
                                  </li>
                                  <li
                                    onClick={() =>
                                      navigate(
                                        `/dashboard/Project-Data/${project.id}`,
                                        { state: project },
                                      )
                                    }
                                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-emerald-800 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                                  >
                                    <HiOutlinePencilAlt
                                      size={16}
                                      className="text-emerald-700 dark:text-emerald-400"
                                    />{" "}
                                    <span className="font-medium">Edit</span>
                                  </li>
                                  <li
                                    onClick={() => handleDeleteClick(project)}
                                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                                  >
                                    <HiOutlineTrash size={16} />{" "}
                                    <span className="font-medium">Delete</span>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={user?.userGroup === "Manager" ? "6" : "5"}
                        className="text-center py-20 text-gray-400 dark:text-gray-500"
                      >
                        No projects found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          <div className="mt-auto border-t border-gray-50 dark:border-gray-700">
            <TablePagination
              pageSize={pageSize}
              setPageSize={setPageSize}
              totalTasks={totalProjects}
              currentPage={pageNumber}
              totalPages={totalPages}
              setCurrentPage={setPageNumber}
            />
          </div>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete?.title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
