"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerImage from "@/assets/register.svg";
import bloodDlogo from "@/assets/bloodDlogo.png";
import { registerUser } from "@/services/actions/registerUser";
import { toast } from "react-toastify";
import { location } from "../constants/location";
import { registerUserValidationSchema } from "@/helpers/validations/registerUserValidationSchema";
import { loginUser } from "@/services/actions/loginUser";
import { storeUserInfo } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { getRandomImageLink } from "@/utils/getRandomImageLink";

const RegisterPage = () => {
  const router = useRouter();
  const [selectedlocation, setSelectedlocation] = useState<string>("");
  const [divisions, setDivisions] = useState<string[]>([]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isSubmitEnabled = password === confirmPassword && password.length > 0;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(registerUserValidationSchema),
  });

  const onSubmit = async (payload: any) => {
    payload.profileImage = getRandomImageLink(payload.gender);
    const { confirmPassword, ...registerPayload } = payload;
    // console.log(registerPayload);
    const id = toast.loading("Please wait...");
    try {
      // console.log(payload);
      const res = await registerUser(registerPayload);
      // console.log(res);
      if (res?.data && res?.data?.id) {
        const result = await loginUser({
          email: payload.email,
          password: payload.password,
        });
        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/");
        }
        toast.update(id, {
          render: "User registered successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        toast.update(id, {
          render: "Failed to register user",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (errors) {
      toast.update(id, {
        render: "Error creating user",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    if (selectedlocation) {
      setDivisions(location[selectedlocation] || []);
    } else {
      setDivisions([]);
    }
    // Todo: not a good practice
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedlocation]);

  // useEffect(() => {
  //   const subscription = watch(({ password, confirmPassword }) => {
  //     setIsSubmitEnabled(
  //       password && confirmPassword && password === confirmPassword
  //     );
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  const newPassword = watch("newPassword");
  const rewriteNewPassword = watch("rewriteNewPassword");
  const isSubmitDisabled =
    newPassword !== rewriteNewPassword || !newPassword || !rewriteNewPassword;

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#030317] py-8">
      <div className="max-w-[1368px] flex-1">
        <div className="container grid items-center gap-8 lg:grid-cols-2">
          <div className="flex justify-center items-center w-full">
            <Image
              height={250}
              width={250}
              src={registerImage}
              alt="register icon"
            />
            <div>
              <div className="mb-3 text-4xl font-bold lg:text-[40px]">
                <Image src={bloodDlogo} width={50} height={50} alt="logo" />
                <h3 className="text-cyan-200">
                  Donate<span className="text-red-400">&</span>Save
                </h3>
              </div>
              <p className="max-w-[452px] text-gray-300 lg:text-lg">
                Join Donate-and-Save! Register to connect with donors and
                recipients, track donations, and receive urgent alerts. Save
                lives with us!
              </p>
            </div>
          </div>
          <div className="w-full mx-auto bg-[#030317] p-8 rounded-md mt-12 text-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between gap-1 items-center">
                <div className="mb-6">
                  <label htmlFor="name" className="block mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    type="text"
                    placeholder="Name"
                    className={`w-full p-3 bg-[#030317] border ${
                      errors.name ? "border-red-500" : "border-white/20"
                    } rounded-md focus:outline-none focus:border-indigo-500`}
                  />
                  {errors.name && (
                    <p className="text-red-500">
                      {errors.name.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className={`w-full p-3 bg-[#030317] border ${
                      errors.email ? "border-red-500" : "border-white/20"
                    } rounded-md focus:outline-none focus:border-indigo-500`}
                  />
                  {errors.email && (
                    <p className="text-red-500">
                      {errors.email.message?.toString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between gap-1 items-center">
                <div className="mb-6">
                  <label htmlFor="password" className="block mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full p-3 bg-[#030317] border ${
                      errors.password ? "border-red-500" : "border-white/20"
                    } rounded-md focus:outline-none focus:border-indigo-500`}
                  />
                  {errors.password && (
                    <p className="text-red-500">
                      {errors.password.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full p-3 bg-[#030317] border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-white/20"
                    } rounded-md focus:outline-none focus:border-indigo-500`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500">
                      {errors.confirmPassword.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="gender" className="block mb-2">
                    Gender
                  </label>
                  <select
                    id="gender"
                    {...register("gender")}
                    className={`w-full p-3 bg-[#030317] border ${
                      errors.gender ? "border-red-500" : "border-white/20"
                    } rounded-md focus:outline-none focus:border-indigo-500`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500">
                      {errors.gender.message?.toString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between gap-1 items-center">
                <div className="mb-6">
                  <label htmlFor="bloodType" className="block mb-2">
                    Blood Type
                  </label>
                  <select
                    id="bloodType"
                    {...register("bloodType")}
                    className={`w-full p-3 bg-[#030317] border ${
                      errors.bloodType ? "border-red-500" : "border-white/20"
                    } rounded-md focus:outline-none focus:border-indigo-500`}
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                  {errors.bloodType && (
                    <p className="text-red-500">
                      {errors.bloodType.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="location" className="block mb-2">
                    Location
                  </label>
                  <select
                    id="location"
                    {...register("location")}
                    onChange={(e) => setSelectedlocation(e.target.value)}
                    className={`w-full p-3 bg-[#030317] border ${
                      errors.location ? "border-red-500" : "border-white/20"
                    } rounded-md focus:outline-none focus:border-indigo-500`}
                  >
                    <option value="">Select location</option>
                    {Object.keys(location).map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                  {errors.location && (
                    <p className="text-red-500">
                      {errors.location.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="division" className="block mb-2">
                    Division
                  </label>
                  <select
                    id="division"
                    {...register("division")}
                    className={`w-full p-3 bg-[#030317] border ${
                      errors.division ? "border-red-500" : "border-white/20"
                    } rounded-md focus:outline-none focus:border-indigo-500`}
                  >
                    <option value="">Select Division</option>
                    {divisions.map((division) => (
                      <option key={division} value={division}>
                        {division}
                      </option>
                    ))}
                  </select>
                  {errors.division && (
                    <p className="text-red-500">
                      {errors.division.message?.toString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between gap-1 items-center">
                <div className="mb-6">
                  <label htmlFor="address" className="block mb-2">
                    Address details
                  </label>
                  <input
                    id="address"
                    {...register("address")}
                    type="text"
                    placeholder="Address"
                    className={`w-full p-3 bg-[#030317] border ${
                      errors.address ? "border-red-500" : "border-white/20"
                    } rounded-md focus:outline-none focus:border-indigo-500`}
                  />
                  {errors.address && (
                    <p className="text-red-500">
                      {errors.address.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="age" className="block mb-2">
                    Age
                  </label>
                  <input
                    id="age"
                    {...register("age", { valueAsNumber: true })}
                    type="number"
                    placeholder="Age"
                    className={`w-full p-3 bg-[#030317] border ${
                      errors.age ? "border-red-500" : "border-white/20"
                    } rounded-md focus:outline-none focus:border-indigo-500`}
                  />
                  {errors.age && (
                    <p className="text-red-500">
                      {errors.age.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="address" className="block mb-2">
                    Address details
                  </label>
                  <input
                    id="phoneNumber"
                    {...register("phoneNumber")}
                    type="text"
                    placeholder="Phone Number"
                    className={`w-full p-3 bg-[#030317] border ${
                      errors.phoneNumber ? "border-red-500" : "border-white/20"
                    } rounded-md focus:outline-none focus:border-indigo-500`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500">
                      {errors.phoneNumber.message?.toString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="bio" className="block mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  {...register("bio")}
                  placeholder="Bio"
                  className={`w-full p-3 bg-[#030317] border ${
                    errors.bio ? "border-red-500" : "border-white/20"
                  } rounded-md focus:outline-none focus:border-indigo-500`}
                />
                {errors.bio && (
                  <p className="text-red-500">
                    {errors.bio.message?.toString()}
                  </p>
                )}
              </div>

              <div className="mb-6 flex items-center">
                <input
                  id="availability"
                  {...register("availability")}
                  type="checkbox"
                  className="mr-2"
                />
                <label htmlFor="availability">Available to donate blood</label>
              </div>
              <div className="mb-6">
                <label htmlFor="lastDonationDate" className="block mb-2">
                  Last Donation Date
                </label>
                <input
                  id="lastDonationDate"
                  {...register("lastDonationDate")}
                  type="date"
                  className={`w-full p-3 bg-[#030317] border ${
                    errors.lastDonationDate
                      ? "border-red-500"
                      : "border-white/20"
                  } rounded-md focus:outline-none focus:border-indigo-500`}
                />
                {errors.lastDonationDate && (
                  <p className="text-red-500">
                    {errors.lastDonationDate.message?.toString()}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  disabled={!isSubmitEnabled}
                  data-tip="Password & Confirm password must match!"
                  className={`w-full p-3 rounded-md transition-all duration-200 ${
                    isSubmitEnabled
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed tooltip tooltip-warning"
                  }`}
                >
                  Create Account
                </button>
              </div>
              <p className="text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-indigo-600 hover:underline">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
