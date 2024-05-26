"use client";

import React from "react";
import Container from "@/components/Shared/Container/Container";
import {
  useGetAllDonorsQuery,
  useGetDonorDetailsQuery,
} from "@/redux/api/features/bloodDonationApi";
import Image from "next/image";
import Link from "next/link";
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
        {/* <div className="hero py-6 text-gray-300">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              width={200}
              height={200}
              src={donorDetails.profileImage}
              className="max-w-sm rounded-lg shadow-2xl border-cyan-800 shadow-cyan-300 border-2"
              alt="donor image"
            />
            <div>
              <h1 className="text-xl font-bold w-full flex justify-start items-center gap-2">
                {donorDetails.bloodType}{" "}
                <span className="">
                  {donorDetails.availability ? (
                    <span className="badge badge-accent badge-outline shadow-md shadow-teal-200 font-medium">
                      Donor Available
                    </span>
                  ) : (
                    <span className="badge badge-outline font-medium">
                      Donor Not Available
                    </span>
                  )}
                </span>
              </h1>
              <h2 className="font-medium text-lg">
                {donorDetails.name} {donorDetails.userProfile?.age}{" "}
                {`(${donorDetails.gender})`}
                <br />
                {donorDetails.location} , {donorDetails.division}
              </h2>
              <p className="py-6">
                Last Donated on {donorDetails.userProfile?.lastDonationDate}
                <br />
                Address: {donorDetails.location} , {donorDetails.division} ,{" "}
                {donorDetails.address}
              </p>
              {donorDetails.availability ? (
                <Link
                  href={{
                    pathname: "/request-blood",
                    query: { donorId: donorDetails?.id },
                  }}
                  passHref
                  className="btn btn-accent btn-outline"
                >
                  Request for Blood
                </Link>
              ) : (
                <button className="btn btn-error btn-outline cursor-not-allowed">
                  Donor Not Available
                </button>
              )}
            </div>
          </div>
        </div> */}
        <ProfileCard user={donorDetails} requestButton={true} />
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-300 mb-4 text-center">
            Donors from the same location
          </h2>
          {donorsList && donorsList?.donors?.length > 0 ? (
            <div>
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
