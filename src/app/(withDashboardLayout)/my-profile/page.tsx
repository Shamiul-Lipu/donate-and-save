"use client";
import ProfileCard from "@/components/UI/ProfileCard/ProfileCard";
import { useGetMyProfileQuery } from "@/redux/api/features/userApi";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

const MyProfileDetails = () => {
  const { data: user, isLoading, isFetching } = useGetMyProfileQuery(undefined);

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

  return (
    <div className="bg-black min-h-screen text-gray-300">
      <ProfileCard user={user} requestButton={false} />
      <div className="max-w-md mx-auto">
        <div className="card-body">
          <h2 className="card-title font-medium text-lg">
            Bio: {user?.userProfile?.bio}
          </h2>
          <p className="font-normal text-sm">
            Contact Number: {user?.userProfile?.phoneNumber}
            <br />
            Profile created here on
            {`${formatDate(user?.userProfile?.createdAt)}`}
          </p>
          <div className="card-actions justify-end">
            <Link
              href={`/my-profile/edit-profile`}
              className="btn btn-accent text-gray-600"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileDetails;
