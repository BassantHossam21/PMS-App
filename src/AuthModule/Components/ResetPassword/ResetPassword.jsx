import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useAuthApi } from "../../../Hooks/useAuth";
import logo from "../../../assets/logoo.png";
import ResetBg from "../../../assets/img2.jpeg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
  const { resetPassword, loading } = useAuthApi();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const newPassword = useWatch({
    control,
    name: "newPassword",
    defaultValue: "",
  });

  // eye states
  const [showOtp, setShowOtp] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setSuccess("");
    setError("");
    try {
      await resetPassword({
        email: data.email,
        password: data.newPassword,
        confirmPassword: data.confirmPassword,
        seed: data.otp,
      });
      setSuccess("Password reset successfully!");
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    }
  };

  // كود لإخفاء أيقونة العين الافتراضية للمتصفح برمجياً
  const inputStyle = {
    WebkitAppearance: "none",
    msReveal: { display: "none" },
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ResetBg})` }}
      ></div>

      {/* Container */}
      <div className="relative z-10 w-full max-w-lg mx-4 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8">
          <img src={logo} alt="Logo" className=" w-[150px] md:w-48" />
        </div>

        {/* Card */}
        <div className="w-full p-6 sm:p-12 rounded-[2.5rem] bg-[#315951]/90 shadow-2xl text-white backdrop-blur-md">
          {/* Title */}
          <div className="mb-8">
            <p className="text-xs text-white/70 mb-1">Welcome to PMS</p>
            <h2 className="text-4xl font-bold text-[#EF9B28] inline-block">
              <span className="border-b-4 border-[#EF9B28] pb-1">R</span>eset
              Password
            </h2>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            {/* Email */}
            <div className="relative">
              <label className="block text-[#EF9B28] text-sm mb-1">
                E-mail
              </label>
              <div className="relative border-b border-white/30 focus-within:border-[#EF9B28] transition-colors">
                <input
                  type="email"
                  placeholder="Enter your E-mail"
                  className="w-full bg-transparent border-none text-white py-2 px-0 placeholder:text-white/30 focus:ring-0 focus:outline-none"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <span className="text-[10px] text-red-400 absolute mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* OTP */}
            <div className="relative">
              <label className="block text-[#EF9B28] text-sm mb-1">
                OTP Verification
              </label>
              <div className="relative border-b border-white/30 focus-within:border-[#EF9B28] transition-colors">
                <input
                  type={showOtp ? "text" : "password"}
                  placeholder="Enter OTP"
                  style={{ appearance: "none" }}
                  className="w-full bg-transparent border-none text-white py-2 px-0 placeholder:text-white/30 pr-8 focus:ring-0 focus:outline-none"
                  {...register("otp", { required: "OTP is required" })}
                />
                <button
                  type="button"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60 hover:text-white focus:outline-none"
                  onClick={() => setShowOtp(!showOtp)}
                >
                  {showOtp ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {errors.otp && (
                <span className="text-[10px] text-red-400 absolute mt-1">
                  {errors.otp.message}
                </span>
              )}
            </div>

            {/* New Password */}
            <div className="relative">
              <label className="block text-[#EF9B28] text-sm mb-1">
                New Password
              </label>
              <div className="relative border-b border-white/30 focus-within:border-[#EF9B28] transition-colors">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your New Password"
                  className="w-full bg-transparent border-none text-white py-2 px-0 placeholder:text-white/30 pr-8 focus:ring-0 focus:outline-none"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60 hover:text-white focus:outline-none"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <span className="text-[10px] text-red-400 absolute mt-1">
                  {errors.newPassword.message}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-[#EF9B28] text-sm mb-1">
                Confirm Password
              </label>
              <div className="relative border-b border-white/30 focus-within:border-[#EF9B28] transition-colors">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  className="w-full bg-transparent border-none text-white py-2 px-0 placeholder:text-white/30 pr-8 focus:ring-0 focus:outline-none"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60 hover:text-white focus:outline-none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-[10px] text-red-400 absolute mt-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#EF9B28] hover:bg-[#d88c24] disabled:opacity-50 text-white border-none rounded-full py-3 transition-all active:scale-[0.98] shadow-lg text-lg font-bold uppercase tracking-wider mt-4"
            >
              {loading ? "Processing..." : "Verify"}
            </button>

            {/* Messages */}
            {success && (
              <p className="text-green-400 text-center text-sm mt-2">
                {success}
              </p>
            )}
            {error && (
              <p className="text-red-400 text-center text-sm mt-2">{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
