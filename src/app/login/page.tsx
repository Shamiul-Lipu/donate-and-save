"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import loginImage from "@/assets/login.svg";
import bloodDlogo from "@/assets/bloodDlogo.png";
import { loginUser } from "@/services/actions/loginUser";

// Define the Zod schema for login form validation
const loginValidationSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidationSchema),
  });

  const onSubmit = async (data: any) => {
    const id = toast.loading("Please wait...");
    try {
      // console.log(data);
      const res = await loginUser(data);

      if (res?.data && res?.data?.id) {
        toast.update(id, {
          render: "Login successful",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        toast.update(id, {
          render: "Invalid email or password",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.update(id, {
        render: "Error logging in",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#030317] py-8">
      <div className="max-w-[1368px] flex-1">
        <div className="container grid items-center gap-8 lg:grid-cols-2">
          <div className="flex justify-center items-center w-full">
            <Image height={300} width={300} src={loginImage} alt="login icon" />
            <div>
              <div className="mb-3 text-4xl font-bold lg:text-[40px]">
                <Image src={bloodDlogo} width={50} height={50} alt="logo" />
                <h3 className="text-cyan-200">
                  Donate<span className="text-red-400">&</span>Save
                </h3>
              </div>
              <p className="max-w-[452px] text-gray-300 lg:text-lg">
                Welcome to Donate-and-Save! Log in to manage your donations,
                connect with recipients, and stay updated on urgent needs. Thank
                you for being a life-saver!
              </p>
            </div>
          </div>
          <div className="w-full bg-[#030317] p-8 rounded-md mt-12 text-gray-300">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className={`w-full p-3 bg-[#030317] border ${
                    errors.email ? "border-red-500" : "border-white/20"
                  } rounded-md focus:outline-none focus:border-indigo-500`}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className={`w-full p-3 bg-[#030317] border ${
                    errors.password ? "border-red-500" : "border-white/20"
                  } rounded-md focus:outline-none focus:border-indigo-500`}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Login
                </button>
              </div>
              <p className="text-center">
                Dont have an account?{" "}
                <Link
                  href="/register"
                  className="text-indigo-600 hover:underline"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
