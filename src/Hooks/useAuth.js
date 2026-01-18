import { useState } from "react";
import axiosClient from "../Utils/AxoisClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useAuthApi = () => {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  // ================= LOGIN =================
  const login = async (values) => {
    try {
      setLoading(true);
      const { data } = await axiosClient.post("/Users/Login", values);
      console.log(data.token);

      localStorage.setItem("access_token", data.token);
      toast.success("Login successful 🎉");
      navigate("/dashboard/users");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  const registerAcc = async (values) => {
    try {
      setLoading(true);
      const { data } = await axiosClient.post("/Users/Register", values);

      toast.success("Regisrtation successful 🎉");
      navigate("/verify-account");

      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Regisrtation failed");
    } finally {
      setLoading(false);
    }
  };
  const VerifyAcc = async (values) => {
    try {
      setLoading(true);
      const { data } = await axiosClient.put("/Users/verify", values);

      toast.success("Verify successful 🎉");
      navigate("/");

      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Verify failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= FORGET PASSWORD =================
  const forgetPassword = async (values) => {
    try {
      setLoading(true);
      const { data } = await axiosClient.post("/Users/Reset/Request", values);
      toast.success("Check your email 📧");
      navigate("/reset-password");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ================= RESET PASSWORD =================
  const resetPassword = async (values) => {
    try {
      setLoading(true);
      const { data } = await axiosClient.post("/Users/Reset", {
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        seed: values.seed,
      });
      toast.success("Password reset successfully!");
      navigate("/");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  // ================= CHANGE PASSWORD =================
  const changepassword = async (values) => {
    try {
      setLoading(true);

      const { data } = await axiosClient.put("/Users/ChangePassword", {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      });

      toast.success(data?.message || "Password changed successfully 🔐");
      navigate("/");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unauthorized");
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    forgetPassword,
    resetPassword,
    registerAcc,
    changepassword,
    VerifyAcc,
    loading,
  };
};
