"use client";
import ProfileCard from "@/components/UI/ProfileCard/ProfileCard";
import { useGetMyProfileQuery } from "@/redux/api/features/userApi";

const EditProfile = () => {
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
    <>
      <ProfileCard user={user} requestButton={false} />
    </>
  );
};

export default EditProfile;
