import React from "react";
import { useAuthApi } from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { Button, Label, TextInput } from "flowbite-react";
import VerifyBg from "../../../assets/bg3.png";
import logo from "../../../assets/PMS.png";
export default function VerifyAccount() {
  let { VerifyAcc, loading } = useAuthApi();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const onSubmit = (data) => {
    VerifyAcc(data);
  };
  return (
    <>
      <div
        className="Auth-container h-screen"
        style={{ backgroundImage: `url(${VerifyBg})` }}
      >
        <div className="flex  justify-center items-center h-full ">
          <div className="md:w-1/2 w-full ">
            <div className="logo-container my-3  ">
              <img
                src={logo}
                alt="Logo"
                className=" w-[150px] md:w-48 mx-auto"
              />
            </div>
            <div className="form-container p-6 sm:p-12 rounded-2xl bg-[#315951E5] opacity-90 shadow-xl">
              <div className="title ">
                <p className="text-white text-sm">Welcome to PMS</p>
                <h1 className="text-3xl text-[#EF9B28] font-bold flex flex-col">
                  Verify Account
                  <span className="w-4 h-1 bg-[#EF9B28]"></span>
                </h1>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex   flex-col gap-4 justify-center items-center my-5"
              >
                <div className="  flex gap-y-3 flex-col w-full ">
                  <div>
                    <Label
                      htmlFor="email"
                      className="mb-2 text-[#EF9B28] font-medium dark:text-[#EF9B28]"
                    >
                      Email
                    </Label>
                    <TextInput
                      className="bg-transparent border-0 border-b border-gray-400 text-white placeholder-gray-300 px-0 py-2 text-lg"
                      id="email"
                      {...register("email", {
                        required: "Email is Required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                          message: "Please Enter a Valid Email",
                        },
                      })}
                      type="email"
                      placeholder="Enter You mail"
                    />
                    {errors.email && (
                      <div className="bg-red-400 text-white px-3 py-2 rounded-md text-sm mt-1">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="OTP"
                      className="mb-2 text-[#EF9B28] font-medium dark:text-[#EF9B28]"
                    >
                      OTP Validation
                    </Label>
                    <TextInput
                      className="bg-transparent border-0 border-b border-gray-400 text-white placeholder-gray-300 px-0 py-2 text-lg"
                      id="OTP"
                      {...register("code", {
                        required: "OTP is Required",
                        minLength: {
                          value: 3,
                          message: "Enter a Valid OTP Code",
                        },
                      })}
                      type="password"
                      placeholder="OTP Validation"
                    />
                    {errors.code && (
                      <div className="bg-red-400 text-white px-3 py-2 rounded-md text-sm mt-1">
                        {errors.code.message}
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  color="none"
                  className="
            bg-[#EF9B28]
            enabled:hover:bg-[#d88a24]
            text-white
            rounded-full
            py-2
            w-full
            text-lg
            font-semibold
            border-none
          "
                >
                  {loading ? "Processing..." : "Verify"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
