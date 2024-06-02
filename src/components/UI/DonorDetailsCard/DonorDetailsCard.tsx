import useUserInfo from "@/hooks/useUserInfo";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const DonorDetailsCard = ({ donor }: any) => {
  const { userInfo } = useUserInfo();

  // console.log(userInfo);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: donor.delay,
        duration: 0.5,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      key={donor?.id}
      className="card w-96 bg-gradient-to-b from-slate-600 to-gray-800 shadow-xl text-gray-100"
    >
      <div className="relative">
        {donor?.availability ? (
          <div className="badge badge-accent badge-outline absolute top-1 left-2 shadow-md shadow-teal-200 font-medium">
            Donor Available
          </div>
        ) : (
          <div className="badge badge-outline absolute top-1 left-2 font-medium">
            Donor Not Available
          </div>
        )}
      </div>

      <figure className="px-10 pt-10">
        <Image
          width={100}
          height={100}
          src={donor?.profileImage}
          alt="donors image"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{donor?.bloodType}</h2>
        <h2 className="card-title font-medium text-lg">
          {donor?.name} {donor?.userProfile?.age} {`(${donor?.gender})`}
          <br />
          {donor?.location} , {donor?.division}
        </h2>
        <p className="font-normal text-sm">
          Last Donated on {donor?.userProfile?.lastDonationDate}
          <br />
          Address: {donor?.location} , {donor?.division} ,{donor?.address}
        </p>
        <div className="card-actions justify-end">
          {userInfo && userInfo?.id === donor?.id ? (
            <Link
              href={"/my-profile"}
              className="text-xs text-cyan-500 underline"
            >
              Go to your profile
            </Link>
          ) : (
            <Link
              href={`/donor-list/${donor.id}`}
              className="btn btn-accent text-gray-600"
            >
              See donor details
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DonorDetailsCard;
