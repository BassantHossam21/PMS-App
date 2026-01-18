import React from "react";
import { HiSelector } from "react-icons/hi";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export default function TablePagination({
  pageSize,
  setPageSize,
  totalTasks,
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 bg-white dark:bg-(--bg-card) border-t border-gray-50 dark:border-(--border-dim) gap-4 mt-auto transition-colors duration-300">
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-(--text-secondary) font-medium">
        <span>Showing</span>
        <div className="relative">
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="appearance-none bg-white dark:bg-(--bg-surface) border border-gray-200 dark:border-(--border-dim) rounded-full px-4 py-1.5 pr-8 text-sm text-gray-900 dark:text-(--text-primary) focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-sm outline-none cursor-pointer transition-colors duration-300"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <HiSelector className="h-4 w-4 text-gray-400 dark:text-(--text-secondary) transition-colors" />
          </div>
        </div>
        <span className="whitespace-nowrap">of {totalTasks} Results</span>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-sm text-gray-500 dark:text-(--text-secondary) font-medium whitespace-nowrap">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex items-center gap-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-1.5 rounded-xl border border-gray-200 dark:border-(--border-dim) text-gray-400 dark:text-(--text-secondary) hover:text-emerald-600 dark:hover:text-emerald-400 disabled:opacity-30 transition-all hover:bg-gray-50 dark:hover:bg-(--bg-surface) shadow-sm"
          >
            <HiOutlineChevronLeft size={18} />
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="p-1.5 rounded-xl border border-gray-200 dark:border-(--border-dim) text-gray-400 dark:text-(--text-secondary) hover:text-emerald-600 dark:hover:text-emerald-400 disabled:opacity-30 transition-all hover:bg-gray-50 dark:hover:bg-(--bg-surface) shadow-sm"
          >
            <HiOutlineChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
