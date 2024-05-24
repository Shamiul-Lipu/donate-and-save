import DonorList from "@/components/Shared/DonorList/DonorList";
import React from "react";

const DonorPage = () => {
  return (
    <>
      <DonorList cardLimit={10} />
    </>
  );
};

export default DonorPage;
