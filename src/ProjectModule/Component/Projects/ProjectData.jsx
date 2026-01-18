import React, { useEffect } from "react";
import { Button, Label, TextInput, Spinner, Textarea } from "flowbite-react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosClient from "../../../Utils/AxoisClient";
import { toast } from "react-toastify";

export default function ProjectData() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation(); // 👈 الداتا اللي جاية من Edit

  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // 🔹 تعبئة الفورم
  useEffect(() => {
    if (state) {
      // جاية من Projects
      setValue("title", state.title);
      setValue("description", state.description);
    } else if (isEditMode) {
      // fallback لو Refresh
      axiosClient
        .get(`/Project/${id}`)
        .then((res) => {
          setValue("title", res.data.data.title);
          setValue("description", res.data.data.description);
        })
        .catch(() => toast.error("Failed to load project data"));
    }
  }, [state, id, isEditMode, setValue]);

  // 🔹 Submit
  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await axiosClient.put(`/Project/${id}`, data);
        toast.success("Project updated successfully");
      } else {
        await axiosClient.post("/Project", data);
        toast.success("Project created successfully");
      }
      navigate("/dashboard/Projects");
    } catch {
      toast.error("Operation failed");
    }
  };

  return (
    <div className="bg-[#F8F9FB] dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 py-6 px-6 transition-colors duration-300 border-b border-gray-100 dark:border-gray-700 mb-8">
        <div
          onClick={() => navigate("/dashboard/Projects")}
          className="flex items-center gap-1 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors text-sm mb-2 w-fit"
        >
          <IoIosArrowBack />
          <span>View all projects</span>
        </div>

        <h2 className="text-2xl  font-semibold text-[#0E382F] dark:text-gray-200">
          {isEditMode ? "Edit Project" : "Add New Project"}
        </h2>
      </div>

      {/* Form Section */}
      <div className="flex justify-center px-4 sm:px-6 py-6 sm:py-10">
        <div className="bg-white dark:bg-gray-800 max-w-6xl w-full rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-colors duration-300 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            {/* Input Fields Container */}
            <div className="p-8 sm:p-14 flex flex-col gap-10">
              <div>
                <Label
                  htmlFor="title"
                  className="text-[#0E382F] dark:text-gray-300 font-medium mb-3 block text-base"
                >
                  Title
                </Label>
                <TextInput
                  id="title"
                  placeholder="Name"
                  {...register("title", { required: "Title is required" })}
                  color={errors.title ? "failure" : "gray"}
                  className="shadow-sm"
                  theme={{
                    field: {
                      input: {
                        base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 transition-all rounded-xl py-3 px-4",
                        colors: {
                          gray: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500",
                        },
                      },
                    },
                  }}
                />
                {errors.title && (
                  <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 ml-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="description"
                  className="text-[#0E382F] dark:text-gray-300 font-medium mb-3 block text-base"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Description"
                  rows={5}
                  {...register("description")}
                  className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500 rounded-2xl shadow-sm transition-all resize-none py-3 px-4"
                />
              </div>
            </div>

            {/* Actions Bar */}
            <div className="px-8 sm:px-12 py-8 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <button
                type="button"
                onClick={() => navigate("/dashboard/Projects")}
                className="px-8 py-2.5 border-2 border-gray-400 dark:border-gray-500 text-gray-600 dark:text-gray-300 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:scale-95"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-2.5 bg-[#EF9B28] hover:bg-[#e88c1f] text-white rounded-full font-semibold shadow-md transition-all active:scale-95 flex items-center justify-center min-w-[120px]"
              >
                {isSubmitting ? <Spinner size="sm" className="mr-2" /> : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
