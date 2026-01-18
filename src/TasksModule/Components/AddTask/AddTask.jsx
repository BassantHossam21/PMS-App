import { Label, Select, Textarea, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUsersApi } from "../../../Hooks/useUsers";
import { useTasksApi } from "../../../Hooks/useTasks";

export default function AddTask() {
  const { getUsersApi, data: users } = useUsersApi();
  const {
    getProjectsForManger,
    projectData,
    addTask,
    updateTask,
    getTaskById,
  } = useTasksApi();

  const navigate = useNavigate();
  let { id } = useParams();
  const isEdit = Boolean(id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    getUsersApi();
    getProjectsForManger();

    if (isEdit) {
      getTaskById(id).then((response) => {
        if (response) {
          const task = response; // بتملي البيانات الفورم
          setValue("title", task.title);
          setValue("description", task.description);
          setValue("employeeId", task.employee?.id);
        }
      });
    }
  }, []);

  const onSubmit = (formData) => {
    const basePayload = {
      title: formData.title,
      description: formData.description,
      employeeId: Number(formData.employeeId),
    };

    if (isEdit) {
      updateTask(id, basePayload).then(() => navigate("/dashboard/tasks"));
    } else {
      const addPayload = {
        ...basePayload,
        projectId: Number(formData.projectId),
      };
      addTask(addPayload).then(() => navigate("/dashboard/tasks"));
    }
  };

  return (
    <>
      <div className="flex flex-col justify-start py-6 px-6 bg-white dark:bg-gray-800 transition-colors duration-300 border-b border-gray-100 dark:border-gray-700">
        <Link
          to={"/dashboard/tasks"}
          className="flex w-fit items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors gap-1 text-sm mb-2"
        >
          <IoIosArrowBack />
          <span>View All Tasks</span>
        </Link>
        <h2 className="text-2xl font-semibold text-[#0E382F] dark:text-gray-200">
          {isEdit ? "Edit Task" : "Add a New Task"}
        </h2>
      </div>

      <div className="bg-[#F8F9FB] dark:bg-gray-900 min-h-screen w-full px-4 sm:px-6 py-6 sm:py-10 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 max-w-6xl mx-auto rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-colors duration-300 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            {/* Input Fields Container */}
            <div className="p-8 sm:p-14 flex flex-col gap-8">
              {/* Title */}
              <div>
                <Label
                  htmlFor="title"
                  className="text-[#0E382F] dark:text-gray-300 font-medium mb-3 block text-base"
                >
                  Title
                </Label>
                <TextInput
                  id="title"
                  type="text"
                  placeholder="Name"
                  {...register("title", {
                    required: "Title is required",
                    minLength: { value: 3, message: "Min length is 3" },
                  })}
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

              {/* Description */}
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
                  {...register("description", {
                    required: "Description is required",
                    minLength: { value: 8, message: "Min length is 8" },
                  })}
                  className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500 rounded-2xl shadow-sm transition-all resize-none py-3 px-4"
                />
                {errors.description && (
                  <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 ml-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* User & Project */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                {/* User */}
                <div className="w-full sm:w-1/2">
                  <Label
                    htmlFor="employeeId"
                    className="text-[#0E382F] dark:text-gray-300 font-medium mb-2 block"
                  >
                    User
                  </Label>
                  <Select
                    id="employeeId"
                    defaultValue=""
                    {...register("employeeId", {
                      required: "User is required",
                    })}
                    className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500 rounded-xl shadow-sm"
                  >
                    <option value="" disabled>
                      Select User
                    </option>
                    {users?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.userName}
                      </option>
                    ))}
                  </Select>
                  {errors.employeeId && (
                    <p className="text-red-600 dark:text-red-400 text-xs mt-1 ml-1">
                      {errors.employeeId.message}
                    </p>
                  )}
                </div>

                {/* Project - Show ONLY if NOT editing */}
                {!isEdit && (
                  <div className="w-full sm:w-1/2">
                    <Label
                      htmlFor="projectId"
                      className="text-[#0E382F] dark:text-gray-300 font-medium mb-2 block"
                    >
                      Project
                    </Label>
                    <Select
                      id="projectId"
                      defaultValue=""
                      {...register("projectId", {
                        required: "Project is required",
                      })}
                      className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500 rounded-xl shadow-sm"
                    >
                      <option value="" disabled>
                        Select Project
                      </option>
                      {projectData?.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.title}
                        </option>
                      ))}
                    </Select>
                    {errors.projectId && (
                      <p className="text-red-600 dark:text-red-400 text-xs mt-1 ml-1">
                        {errors.projectId.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="px-8 sm:px-12 py-8 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <Link
                to={"/dashboard/tasks"}
                className="px-8 py-2.5 border-2 border-gray-400 dark:border-gray-500 text-gray-600 dark:text-gray-300 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:scale-95 text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-10 py-2.5 bg-[#EF9B28] hover:bg-[#e88c1f] text-white rounded-full font-semibold shadow-md transition-all active:scale-95 flex items-center justify-center min-w-[140px]"
              >
                {isEdit ? "Update Task" : "Save Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
