import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../Utils/AxoisClient";

export const useTasksApi = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [projectData, setProjectData] = useState([]);
  let [taskCount, setTaskCount] = useState();
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  const getMangerTasks = async (pageSize = 10, pageNumber = 1, title = "") => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get(
        `Task/manager?pageSize=${pageSize}&pageNumber=${pageNumber}&title=${title}`,
      );
      setData(data.data);
      console.log(data);
      if (data.totalCount) setTotalTasks(data.totalCount);
      if (data.totalNumberOfPages) setTotalPages(data.totalNumberOfPages);

      return data;
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getProjectsForManger = async () => {
    try {
      const { data } = await axiosClient.get(
        "Project/manager?pageSize=10&pageNumber=1",
      );
      setProjectData(data.data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };
  const addTask = async (values) => {
    try {
      const response = await axiosClient.post(`Task`, values);
      toast.success(response.statusText);
    } catch (error) {
      toast.error(error.response.statusText);
    }
  };

  // get task by id
  const getTaskById = async (id) => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get(`Task/${id}`);
      return data;
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id, values) => {
    try {
      const response = await axiosClient.put(`Task/${id}`, values);
      toast.success(response.statusText);
      return response;
    } catch (error) {
      toast.error(error.response?.statusText || "Update failed");
      throw error;
    }
  };
  const deleteTask = async (id) => {
    try {
      const response = await axiosClient.delete(`Task/${id}`);
      console.log(response);

      toast.success(response.statusText);
    } catch (error) {
      console.log(error);

      toast.error(error.response.statusText);
    }
  };

  const taskCounts = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`Task/count`);
      console.log(response.data);
      setTaskCount(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const tasksEmployee = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`Task?pageSize=10&pageNumber=1
`);
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const ChangeTaskStatus = async (id, newStatus) => {
    try {
      const response = await axiosClient.put(`Task/${id}/change-status`, {
        status: newStatus,
      });
      toast.success(`Change Status to ${response.data.status}`);

      return response.data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return {
    getMangerTasks,
    getProjectsForManger,
    ChangeTaskStatus,
    tasksEmployee,
    projectData,
    deleteTask,
    addTask,
    updateTask,
    getTaskById,
    taskCounts,
    totalPages,
    totalTasks,
    data,
    taskCount,
    error,
    loading,
  };
};
