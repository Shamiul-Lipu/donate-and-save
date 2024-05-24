import DonorList from "@/components/Shared/DonorList/DonorList";
import HeroSection from "@/components/UI/Homepage/Hero/HeroSection";
import React from "react";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <DonorList cardLimit={3} />
    </>
  );
};

export default HomePage;
