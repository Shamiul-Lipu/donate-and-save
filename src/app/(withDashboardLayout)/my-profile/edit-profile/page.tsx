"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/api/features/userApi";
import { toast } from "react-toastify";
import ProfileCard from "@/components/UI/ProfileCard/ProfileCard";
import { profileUpdateValidationSchema } from "@/helpers/validations/profileUpdateValidationSchema";
import { location } from "@/app/constants/location";

const EditProfileForm = () => {
  const [selectedlocation, setSelectedlocation] = useState<string>("");
  const [divisions, setDivisions] = useState<string[]>([]);
  const { data: user, isLoading, isFetching } = useGetMyProfileQuery(undefined);
  const [updateMyProfile] = useUpdateMyProfileMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileUpdateValidationSchema),
    defaultValues: {
      address: "",
      availability: false,
      bloodType: "",
      division: "",
      email: "",
      gender: "",
      location: "",
      name: "",
      userProfile: {
        age: 0,
        bio: "",
        lastDonationDate: "",
        phoneNumber: "",
      },
    },
  });

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const onSubmit = async (data: any) => {
    const id = toast.loading("Please wait...");
    try {
      const res = await updateMyProfile(data).unwrap();
      // console.log(res);
      if (res?.id) {
        toast.update(id, {
          render: "User profile updated successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        // router.push("/my-profile");
      } else {
        toast.update(id, {
          render: "Request Failed to update profile",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.update(id, {
        render: "Error updating profile request!",
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

  if (isLoading || isFetching) {
    return (
      <div className="h-screen bg-neutral w-full flex justify-center items-center overflow-hidden">
        <div className="flex flex-col gap-4 w-52">
          <div className="skeleton h-52 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  }

  // console.log(user.division);

  return (
    <div className="bg-black min-h-screen text-gray-300">
      <ProfileCard user={user} requestButton={false} />
      <div className="w-1/2 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 max-w-[800px]">
          <div className="flex justify-between items-center">
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

          <div className="flex justify-between items-center">
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
            <div
              className="mb-6 tooltip  tooltip-info"
              data-tip={
                "If you want to change the division, change the location first.\nIf it's the same location but a different division, select another location, then select your preferred location and division."
              }
            >
              <label htmlFor="division" className="block mb-2">
                Division
              </label>
              {user && (
                <select
                  id="division"
                  {...register("division")}
                  defaultValue={user?.division}
                  className={`w-full p-3 bg-[#030317] border ${
                    errors.division ? "border-red-500" : "border-white/20"
                  } rounded-md focus:outline-none focus:border-indigo-500`}
                >
                  <option value="">{user?.division}</option>
                  {user &&
                    divisions.map((division) => (
                      <option key={division} value={division}>
                        {division}
                      </option>
                    ))}
                </select>
              )}
              {errors.division && (
                <p className="text-red-500">
                  {errors.division.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="mb-6">
              <label htmlFor="address" className="block mb-2">
                Address
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
                {...register("userProfile.age", { valueAsNumber: true })}
                type="number"
                placeholder="Age"
                className={`w-full p-3 bg-[#030317] border ${
                  errors.userProfile?.age ? "border-red-500" : "border-white/20"
                } rounded-md focus:outline-none focus:border-indigo-500`}
              />
              {errors.userProfile?.age && (
                <p className="text-red-500">
                  {errors.userProfile.age.message?.toString()}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="lastDonationDate" className="block mb-2">
                Last Donation Date
              </label>
              <input
                id="lastDonationDate"
                {...register("userProfile.lastDonationDate")}
                type="date"
                className={`w-full p-3 bg-[#030317] border ${
                  errors.userProfile?.lastDonationDate
                    ? "border-red-500"
                    : "border-white/20"
                } rounded-md focus:outline-none focus:border-indigo-500`}
              />
              {errors.userProfile?.lastDonationDate && (
                <p className="text-red-500">
                  {errors.userProfile.lastDonationDate.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="mb-6">
              <label htmlFor="phoneNumber" className="block mb-2">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                {...register("userProfile.phoneNumber")}
                type="text"
                placeholder="Phone Number"
                className={`w-full p-3 bg-[#030317] border ${
                  errors.userProfile?.phoneNumber
                    ? "border-red-500"
                    : "border-white/20"
                } rounded-md focus:outline-none focus:border-indigo-500`}
              />
              {errors.userProfile?.phoneNumber && (
                <p className="text-red-500">
                  {errors.userProfile.phoneNumber.message?.toString()}
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
          </div>

          <div className="mb-6">
            <label htmlFor="bio" className="block mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              {...register("userProfile.bio")}
              placeholder="Bio"
              className={`w-full p-3 bg-[#030317] border ${
                errors.userProfile?.bio ? "border-red-500" : "border-white/20"
              } rounded-md focus:outline-none focus:border-indigo-500`}
            />
            {errors.userProfile?.bio && (
              <p className="text-red-500">
                {errors.userProfile.bio.message?.toString()}
              </p>
            )}
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
