import React, { useState } from "react";
import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useAuthApi } from "../../../Hooks/useAuth";
import logo from "../../../assets/logoo.png";
import ChangeBg from "../../../assets/img3.jpeg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ChangePassword() {
  const { changepassword, loading } = useAuthApi();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const newPasswordValue = watch("newPassword", "");

  const onSubmit = async (data) => {
    setSuccess("");
    setError("");
    try {
      await changepassword(data);
      setSuccess("Password changed successfully!");
    } catch (err) {
      setError(err.message || "Failed to change password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative  overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ChangeBg})` }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#EF9B284D] backdrop-blur-[2px]"></div>

      {/* Container for Logo + Form */}
      <div className="relative z-10 w-full max-w-2xl mx-4 flex flex-col items-center">
        {/* 1. Logo Above the Card */}
        <div className="">
          <img src={logo} alt="Logo" className=" w-[150px] md:w-48 mx-auto" />
        </div>

        {/* 2. Main Card (Form) */}
        <div className="w-full p-4 sm:p-12 rounded-3xl bg-[#315951]/90 shadow-2xl text-white backdrop-blur-[1px]">
          {/* Title Section */}
          <div className="mb-10">
            <p className="text-xs text-white/70 mb-1">welcome to PMS</p>

            <h2 className="text-4xl font-bold text-[#EF9B28]">
              <span className="border-b-4 border-[#EF9B28] pb-1">C</span>
              hange Password
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Old Password */}
            <div className="relative">
              <label className="block text-[#EF9B28] text-sm">
                Old Password
              </label>
              <div className="relative border-b border-white/30 focus-within:border-[#EF9B28] transition-colors">
                <input
                  type={showOld ? "text" : "password"}
                  placeholder="Enter your Old Password"
                  className="w-full bg-transparent border-none text-white py-2 px-0 placeholder:text-white/30 focus:ring-0 focus:outline-none"
                  {...register("oldPassword", { required: "Required" })}
                />
                <button
                  type="button"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  onClick={() => setShowOld(!showOld)}
                >
                  {showOld ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {errors.oldPassword && (
                <span className="text-[10px] text-red-400 mt-1 block">
                  {errors.oldPassword.message}
                </span>
              )}
            </div>
            {/* New Password */}
            <div className="relative">
              <label className="block text-[#EF9B28] text-sm ">
                New Password
              </label>
              <div className="relative border-b border-white/30 focus-within:border-[#EF9B28] transition-colors">
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="Enter your New Password"
                  className="w-full bg-transparent border-none text-white py-2 px-0 placeholder:text-white/30 focus:ring-0 focus:outline-none"
                  {...register("newPassword", {
                    required: "Required",
                    minLength: { value: 6, message: "Min 6 chars" },
                  })}
                />
                <button
                  type="button"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {errors.newPassword && (
                <span className="text-[10px] text-red-400 mt-1 block">
                  {errors.newPassword.message}
                </span>
              )}
            </div>
            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-[#EF9B28] text-sm mb-1">
                Confirm New Password
              </label>
              <div className="relative border-b border-white/30 focus-within:border-[#EF9B28] transition-colors">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm New Password"
                  className="w-full bg-transparent border-none text-white py-2 px-0 placeholder:text-white/30 focus:ring-0 focus:outline-none"
                  {...register("confirmNewPassword", {
                    required: "Required",
                    validate: (v) => v === newPasswordValue || "Mismatch",
                  })}
                />
                <button
                  type="button"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {errors.confirmNewPassword && (
                <span className="text-[10px] text-red-400 mt-1 block">
                  {errors.confirmNewPassword.message}
                </span>
              )}
            </div>
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-[#EF9B28] text-white py-3 rounded-full font-semibold hover:bg-[#d88c24] transition-all shadow-lg mt-4 active:scale-95"
              >
                <span className="text-lg font-bold text-white uppercase tracking-wider">
                  {loading ? "Saving..." : "Save"}
                </span>{" "}
              </button>
            </div>{" "}
          </form>
        </div>
      </div>
    </div>
  );
}
