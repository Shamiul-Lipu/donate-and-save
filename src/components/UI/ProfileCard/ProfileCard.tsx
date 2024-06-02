import { useGetAllRequestsQuery } from "@/redux/api/features/bloodDonationApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileCard = ({ user, requestButton }: any) => {
  const {
    data: requests,
    isLoading,
    isFetching,
  } = useGetAllRequestsQuery(undefined);

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

  const filteredRequests = requests?.requestByMe?.filter(
    (request: any) => request?.donor?.userProfile?.userId === user?.id
  );

  // console.log(filteredRequests);

  return (
    <div className="hero py-6 text-gray-300">
      <div className="hero-content flex-col lg:flex-row">
        <Image
          width={200}
          height={200}
          src={user?.profileImage}
          className="max-w-sm rounded-lg shadow-2xl border-cyan-800 shadow-cyan-300 border-2"
          alt="donor image"
        />
        <div>
          <h1 className="text-xl font-bold w-full flex justify-start items-center gap-2">
            {user?.bloodType}{" "}
            <span className="">
              {user?.availability ? (
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
            {user?.name} {user?.userProfile?.age} {`(${user?.gender})`}
            <br />
            {user?.location} , {user?.division}
          </h2>
          <p className="py-6 text-sm">
            Last Donated on {user?.userProfile?.lastDonationDate}
            <br />
            Address: {user?.location} , {user?.division} , {user?.address}
          </p>
          {filteredRequests &&
          filteredRequests[0]?.requestStatus === "APPROVED" ? (
            <div className="rounded-xl border-4 border-cyan-400 bg-green-100 p-2 text-gray-900 font-medium">
              <p className="badge badge-accent">You request is approved</p>
              <p>
                Contact Info: <br />+
                {filteredRequests[0]?.donor?.userProfile?.phoneNumber}
              </p>
              <p>
                {" "}
                {filteredRequests[0]?.donor?.location} ,{" "}
                {filteredRequests[0]?.donor?.division} ,{" "}
                {filteredRequests[0]?.donor?.address}
              </p>
            </div>
          ) : (
            requestButton && (
              <>
                {user?.availability ? (
                  filteredRequests &&
                  filteredRequests[0]?.requestStatus === "PENDING" ? (
                    <button className="btn btn-warning btn-outline cursor-not-allowed">
                      Your request is pending
                    </button>
                  ) : (
                    <Link
                      href={{
                        pathname: "/request-blood",
                        query: { donorId: user?.id },
                      }}
                      passHref
                      className="btn btn-accent btn-outline"
                    >
                      Request for Blood
                    </Link>
                  )
                ) : (
                  <button className="btn btn-error btn-outline cursor-not-allowed">
                    Donor Not Available
                  </button>
                )}
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
