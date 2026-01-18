import { useState } from "react";
import axiosClient from "../Utils/AxoisClient";
import { toast } from "react-toastify";

export const useUsersApi = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  //-------GET ALL LOGGED IN USERS------------
  const getUsersApi = async (pageNumber = 1, pageSize = 10, userName = "") => {
    try {
      setLoading(true);
      const response = await axiosClient.get(
        `Users/?pageSize=${pageSize}&pageNumber=${pageNumber}&userName=${userName}`
      );
      console.log(response.data);
      setData(response?.data?.data || []);
      setTotalCount(response?.data?.totalNumberOfRecords || 0);
      setTotalPages(response?.data?.totalNumberOfPages || 0);
    } catch (error) {
      toast.error(error?.response?.data?.message || "No Data");
    } finally {
      setLoading(false);
    }
  };

  //-------TOOGLE ACTIVE EMPLOYEE------------
  const toogleActiveUser = async (id) => {
    try {
      setLoading(true);
      await axiosClient.put(`Users/${id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "No Data");
      setLoading(false);
    }
  };

  const getUsersCount = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`Users/count`);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    getUsersApi,
    toogleActiveUser,
    data,
    loading,
    getUsersCount,
    totalCount,
    totalPages,
  };
};
