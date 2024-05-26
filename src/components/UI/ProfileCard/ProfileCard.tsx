import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileCard = ({ user, requestButton }: any) => {
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
          <p className="py-6">
            Last Donated on {user?.userProfile?.lastDonationDate}
            <br />
            Address: {user?.location} , {user?.division} , {user?.address}
          </p>
          {requestButton && (
            <>
              {user?.availability ? (
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
              ) : (
                <button className="btn btn-error btn-outline cursor-not-allowed">
                  Donor Not Available
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
