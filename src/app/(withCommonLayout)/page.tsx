import DonorList from "@/components/Shared/DonorList/DonorList";
import AboutUsSection from "@/components/UI/Homepage/AboutUs/AboutUsSection";
import CovarageArea from "@/components/UI/Homepage/CovarageArea/CovarageArea";
import DonationTips from "@/components/UI/Homepage/DonationTips/DonationTips";
import HeroSection from "@/components/UI/Homepage/Hero/HeroSection";
import Stats from "@/components/UI/Homepage/Stats/Stats";
import SuccessStories from "@/components/UI/Homepage/SuccessStories/SuccessStories";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Stats />
      <DonorList cardLimit={3} />
      <AboutUsSection />
      <CovarageArea />
      <SuccessStories />
      <DonationTips />
    </>
  );
};

export default HomePage;
