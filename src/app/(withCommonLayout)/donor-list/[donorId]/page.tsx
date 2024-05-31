"use client";

import React from "react";
import Container from "@/components/Shared/Container/Container";
import {
  useGetAllDonorsQuery,
  useGetDonorDetailsQuery,
} from "@/redux/api/features/bloodDonationApi";
import DonorDetailsCard from "@/components/UI/DonorDetailsCard/DonorDetailsCard";
import ProfileCard from "@/components/UI/ProfileCard/ProfileCard";

const DonorDetailsPage = ({ params }: { params: { donorId: string } }) => {
  const { data: donorDetails, isLoading: isDonorDetailsLoading } =
    useGetDonorDetailsQuery(params.donorId);

  const { data: donorsList, isLoading: isDonorsListLoading } =
    useGetAllDonorsQuery(
      { location: donorDetails?.location },
      {
        skip: !donorDetails?.location,
      }
    );

  if (
    isDonorDetailsLoading ||
    (donorDetails?.location && isDonorsListLoading)
  ) {
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

  if (!donorDetails) {
    return <p>No donor details available.</p>;
  }
  // console.log(donorDetails);
  return (
    <div className="w-full bg-neutral min-h-screen">
      <Container>
        <ProfileCard user={donorDetails} requestButton={true} />
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-300 mb-4 text-center">
            Donors from the same location
          </h2>
          {donorsList && donorsList?.donors?.length > 0 ? (
            <div className="py-5">
              <p className="text-gray-300 mb-4 text-center">
                {donorsList.meta.total} donor(s) found from the same district
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donorsList?.donors?.map((donor) => (
                  <DonorDetailsCard key={donor.id} donor={donor} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-300">
              No donors found from the same location.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default DonorDetailsPage;
