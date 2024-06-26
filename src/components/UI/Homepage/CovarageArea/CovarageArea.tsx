"use client";
import Image from "next/image";
import worldMap from "@/assets/worldMap.png";
import bdMap from "@/assets/mapofbd.png";
import Container from "@/components/Shared/Container/Container";
import { useGetAllDonorsQuery } from "@/redux/api/features/bloodDonationApi";
import { useState } from "react";
import { motion } from "framer-motion";
import { fromLeft, fromRight, hiddenToVisible } from "@/utils/animations";

const CovarageArea = () => {
  const [location, setLocation] = useState("Dhaka");
  const { data, isLoading } = useGetAllDonorsQuery({
    location: location,
  });

  const districts = [
    "Dhaka",
    "Chittagong",
    "Barisal",
    "Khulna",
    "Mymensingh",
    "Rajshahi",
    "Rangpur",
    "Sylhet",
  ];

  // console.log(data);

  return (
    <div className="bg-gray-900 text-gray-300 py-10 flex justify-center items-center">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-300 sm:text-4xl">
            Coverage Area
          </h2>
          <p className="mt-4 text-gray-400">
            Our blood donation service covers all districts in Bangladesh. Here
            are the regions with available donors:
          </p>
        </div>
        <div className="flex justify-between items-start gap-5 py-3 overflow-hidden">
          <motion.div
            variants={fromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="overflow-hidden"
          >
            <ul className="p-3 rounded-md border-2 border-gray-600 bg-gray-800">
              {districts.map((district, i) => (
                <li
                  key={i}
                  className={`px-2 py-1 my-1 rounded-md border-2 border-gray-700  cursor-pointer hover:bg-gray-700 ${
                    district === location
                      ? "bg-gray-300 text-black"
                      : "bg-slate-900 text-gray-300"
                  }`}
                  onClick={() => setLocation(district)}
                >
                  {district}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={hiddenToVisible}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="mx-auto overflow-hidden"
          >
            <h3 className="text-base font-medium mb-2">Donors in {location}</h3>
            {isLoading && (
              <span className="loading loading-ring loading-lg"></span>
            )}
            {!isLoading && data && (
              <ul>
                {data?.donors?.map((donor: any, index: number) => (
                  <li
                    key={index}
                    className="py-1 px-2 my-1 rounded-md border-2 border-gray-700 bg-slate-800 text-xs"
                  >
                    {donor?.name}, {donor?.bloodType}
                    <br />
                    {donor?.location}, {donor?.division}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          <motion.div
            variants={fromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="mx-auto w-1/2 overflow-hidden"
          >
            <Image width={250} height={250} src={bdMap} alt="Bangladesh map" />
          </motion.div>
        </div>
        <motion.div
          variants={hiddenToVisible}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full border-4 border-green-800 rounded-xl overflow-hidden"
        >
          <Image
            width={3500}
            height={2500}
            src={worldMap}
            alt="World map"
            className="rounded-lg w-full border-2 border-red-400"
          />
        </motion.div>
      </Container>
    </div>
  );
};

export default CovarageArea;
