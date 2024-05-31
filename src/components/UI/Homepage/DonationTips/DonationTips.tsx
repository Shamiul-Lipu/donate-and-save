"use client";
import Container from "@/components/Shared/Container/Container";
import React, { useState } from "react";

const DonationTips = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const tips = [
    {
      title: "Stay Hydrated",
      description:
        "Drink plenty of water before donating blood. Staying hydrated helps maintain your blood pressure and makes the donation process smoother.",
    },
    {
      title: "Eat a Healthy Meal",
      description:
        "Have a nutritious meal before donating blood. Avoid fatty foods as they can affect blood tests.",
    },
    {
      title: "Rest Well",
      description:
        "Get a good night's sleep before your donation. Being well-rested helps you feel better during and after the donation.",
    },
    {
      title: "Wear Comfortable Clothing",
      description:
        "Wear clothing with sleeves that can be easily rolled up, allowing for easy access to your veins.",
    },
    {
      title: "Bring Identification",
      description:
        "Carry a valid ID with you. Most donation centers require identification to process your donation.",
    },
    {
      title: "Know Your Eligibility",
      description:
        "Ensure you meet the eligibility criteria for blood donation. This includes age, weight, and health requirements.",
    },
    {
      title: "Relax",
      description:
        "Stay calm and relaxed during the donation process. Deep breathing and distraction techniques can help.",
    },
    {
      title: "Post-Donation Care",
      description:
        "After donating, rest for a few minutes, drink plenty of fluids, and have a light snack to help replenish your energy.",
    },
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <div className="bg-neutral py-10 flex justify-center items-center">
      <div className="px-6">
        <div className="text-center text-gray-300 px-6 pb-5 lg:px-8">
          <h3 className="text-4xl font-bold">Donation Tips</h3>
          <p className="pt-4 max-w-md mx-auto">
            Useful tips and guidelines to ensure a smooth and safe blood
            donation experience.
          </p>
        </div>
        <Container>
          <div className="grid grid-cols-2 gap-3">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="collapse collapse-plus  w-96 text-gray-300 bg-gray-900"
              >
                <input
                  type="radio"
                  id={`tip-${index}`}
                  className="hidden"
                  checked={index === activeIndex}
                  onChange={() => handleToggle(index)}
                />
                <label
                  htmlFor={`tip-${index}`}
                  className="collapse-title text-xl font-medium"
                >
                  {tip.title}
                </label>
                <div className="collapse-content ">
                  {index === activeIndex && <p>{tip.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default DonationTips;
