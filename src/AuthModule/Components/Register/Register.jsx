import React from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { useAuthApi } from "../../../Hooks/useAuth";
import { IoCameraOutline } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import Rebg from "../../../assets/bg1.png";
import logo from "../../../assets/PMS.png";

export default function Register() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  let { registerAcc, loading } = useAuthApi();
  const ConfirmPass = useWatch({ control, name: "password", defaultValue: "" });
  const onSubmit = (data) => {
    registerAcc(data);
  };
  return (
    <div className="Auth-container" style={{ backgroundImage: `url(${Rebg})` }}>
      <div className="flex min-h-dvh justify-center items-center ">
        <div className="md:w-1/2 w-full p-4 ">
          <div className="logo-container mb-5 ">
            <img src={logo} alt="Logo" className=" w-[150px] md:w-48 mx-auto" />
          </div>
          <div className="form-container p-6 sm:p-10 rounded-2xl bg-[#315951E5] opacity-90 shadow-xl">
            <div className="title ">
              <p className="text-white text-sm">Welcome to PMS</p>
              <h1 className="text-3xl text-[#EF9B28] font-bold flex flex-col">
                Create New Account
                <span className="w-4 h-1 bg-[#EF9B28]"></span>
              </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="input-img" htmlFor="fileInput">
                <FaCamera className="text-[#EF9B28] text-xl" />
              </label>
              <input type="file" id="fileInput" />
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center my-5">
                <div className="w-full sm:w-1/2">
                  <div className="  flex gap-y-1 flex-col w-full ">
                    <div>
                      <Label
                        htmlFor="userName"
                        className=" text-[#EF9B28] font-medium dark:text-[#EF9B28]"
                      >
                        UserName
                      </Label>
                      <TextInput
                        id="userName"
                        className="bg-transparent border-0 border-b border-gray-400 text-white placeholder-gray-300 px-0 py-2 text-lg"
                        {...register("userName", {
                          required: "UserName is Required",
                          maxLength: {
                            value: 8,
                            message: "Maximum length is 8",
                          },
                          pattern: {
                            value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{1,8}$/,
                            message: "Please Enter a Char with number max is 8",
                          },
                        })}
                        type="text"
                        placeholder="Enter Your Name"
                      />
                      {errors.userName && (
                        <div className="bg-red-400 text-white px-3 py-2 rounded-md text-sm mt-1">
                          {errors.userName.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="country"
                        className=" text-[#EF9B28] font-medium dark:text-[#EF9B28]"
                      >
                        Country
                      </Label>
                      <TextInput
                        id="country"
                        className="bg-transparent border-0 border-b border-gray-400 text-white placeholder-gray-300 px-0 py-2 text-lg"
                        {...register("country", {
                          required: "Country is Required",
                          minLength: {
                            value: 3,
                            message: "min length is 3",
                          },
                        })}
                        type="text"
                        placeholder="Enter Your Country name"
                      />
                      {errors.country && (
                        <div className="bg-red-400 text-white px-3 py-2 rounded-md text-sm mt-1">
                          {errors.country.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="password"
                        className=" text-[#EF9B28] font-medium dark:text-[#EF9B28]"
                      >
                        Password
                      </Label>
                      <TextInput
                        id="password"
                        className="bg-transparent border-0 border-b border-gray-400 text-white placeholder-gray-300 px-0 py-2 text-lg"
                        {...register("password", {
                          required: "Password is Required",
                          pattern: {
                            value:
                              /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{5,}$/,
                            message:
                              "Password must start with a capital letter and contain letters, numbers, and a special character",
                          },
                        })}
                        type="password"
                        placeholder="Enter Your Password"
                      />
                      {errors.password && (
                        <div className="bg-red-400 text-white px-3 py-2 rounded-md text-sm mt-1">
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="  flex gap-y-1 flex-col w-full ">
                    <div>
                      <Label
                        htmlFor="email"
                        className=" text-[#EF9B28] font-medium dark:text-[#EF9B28]"
                      >
                        Email
                      </Label>
                      <TextInput
                        id="email"
                        className="bg-transparent border-0 border-b border-gray-400 text-white placeholder-gray-300 px-0 py-2 text-lg"
                        {...register("email", {
                          required: "Email is Required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                            message: "Please Enter a Valid Email",
                          },
                        })}
                        type="email"
                        placeholder="Please Enter a Your mail"
                      />
                      {errors.email && (
                        <div className="bg-red-400 text-white px-3 py-2 rounded-md text-sm mt-1">
                          {errors.email.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="phoneNumber"
                        className=" text-[#EF9B28] font-medium dark:text-[#EF9B28] "
                      >
                        Phone Number
                      </Label>
                      <TextInput
                        id="phoneNumber"
                        className="bg-transparent border-0 border-b border-gray-400 text-white placeholder-gray-300 px-0 py-2 text-lg"
                        {...register("phoneNumber", {
                          required: "PhoneNumber is Required",
                          pattern: {
                            value: /^(?:\+20)?01[0-9]{9}$/,
                            message: "Please enter a valid Phone Number",
                          },
                        })}
                        type="tel"
                        placeholder="Enter Your Phone Number"
                      />
                      {errors.phoneNumber && (
                        <div className="bg-red-400 text-white px-3 py-2 rounded-md text-sm mt-1">
                          {errors.phoneNumber.message}
                        </div>
                      )}
                    </div>
                    <div>
                      {/* Confirm Password */}
                      <Label
                        htmlFor="confirmPassword"
                        className=" text-[#EF9B28] font-medium pt-4 dark:text-[#EF9B28]"
                      >
                        Confirm Password
                      </Label>
                      <TextInput
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm New Password"
                        className="bg-transparent border-0 border-b border-gray-400 text-white placeholder-gray-300 px-0 py-2 text-lg"
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === ConfirmPass || "Passwords do not match",
                        })}
                      />
                      {errors.confirmPassword && (
                        <div className="bg-red-400 text-white px-3 py-2 rounded-md text-sm mt-1">
                          {errors.confirmPassword.message}
                        </div>
                      )}
                      {/* <TextInput
                  className="bg-transparent border-0 border-b border-gray-400 text-white placeholder-gray-300 px-0 py-2 text-lg"
                  {...register("confirmPassword", {
                    required: "confirmPassword is Required",
                  })}
                  type="password"
                  placeholder="Confirm Your Password"
                />
                {errors.confirmPassword && (
                  <div className="bg-red-400 text-white px-3 py-2 rounded-md text-sm mt-1">
                    {errors.confirmPassword.message}
                  </div>
                )} */}
                    </div>
                  </div>
                </div>
              </div>
              <Button
                type="submit"
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
                {loading ? "Processing..." : "Save"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
