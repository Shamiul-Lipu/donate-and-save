"use client";

import { useGetAllDonorsQuery } from "@/redux/api/features/bloodDonationApi";

const DonorList = () => {
  const { data, isLoading } = useGetAllDonorsQuery({});
  isLoading ? <p>loading</p> : {};
  console.log(data);
  return <div>DonorList</div>;
};

export default DonorList;
