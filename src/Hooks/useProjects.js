import { useContext, useEffect, useState } from "react";
import axiosClient from "../Utils/AxoisClient";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  let { user } = useContext(AuthContext);

  //----- Get all projects (Manager or Employee)-----
  const getAllProjects = async (role) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.get(`Project/${role}`, {
        params: {
          pageNumber,
          pageSize,
          title: searchQuery,
        },
      });
      setProjects(res.data.data);
      setTotalPages(res.data.totalNumberOfPages);
      setTotalProjects(res.data.totalNumberOfRecords || 0);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axiosClient.delete(`Project/${id}`);
      getAllProjects(user.userGroup);
      toast.success("Project deleted successfully");
    } catch (err) {
      console.error("Delete project error", err);
      toast.error("Failed to delete project");
    }
  };

  useEffect(() => {
    if (user?.userGroup) {
      getAllProjects(user.userGroup);
    }
  }, [pageNumber, pageSize, searchQuery, user?.userGroup]);

  return {
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
  };
}
