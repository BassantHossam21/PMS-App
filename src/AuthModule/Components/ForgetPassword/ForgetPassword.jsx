import React, { useState } from "react";
import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useAuthApi } from "../../../Hooks/useAuth";
import logo from "../../../assets/logoo.png";
import ForgetBg from "../../../assets/img4.jpeg";

export default function ForgetPassword() {
  const { forgetPassword, loading } = useAuthApi();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSuccess("");
    setError("");
    try {
      await forgetPassword(data);
      setSuccess("Verification email sent successfully!");
    } catch (err) {
      setError(err.message || "Failed to process request.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ForgetBg})` }}
      ></div>

      {/* Container for Logo + Form */}
      <div className="relative z-10 w-full max-w-lg mx-4 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8">
          <img src={logo} alt="Logo" className=" w-[150px] md:w-48" />
        </div>

        {/* Card */}
        <div className="w-full p-6 sm:p-12 rounded-2xl bg-[#315951]/90 shadow-2xl text-white backdrop-blur-md">
          {/* Title */}
          <div className="mb-10">
            <p className="text-xs text-white/70 mb-1">welcome to PMS</p>
            <h2 className="text-4xl font-bold text-[#EF9B28] inline-block">
              <span className="border-b-4 border-[#EF9B28] pb-1">F</span>
              orget Password
            </h2>
          </div>

          {/* Success / Error */}

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
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
                    required: "E-mail is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <span className="text-[10px] text-red-400 absolute">
                  {errors.email.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#EF9B28] text-white py-3 rounded-full font-semibold hover:bg-[#d88c24] transition-all shadow-lg mt-4 active:scale-95"
            >
              {loading ? "Processing..." : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
