import Image from "next/image";
import React from "react";
import coverOne from "@/assets/cover1.svg";
import coverTwo from "@/assets/cover2.svg";
import coverThree from "@/assets/cover3.svg";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      <section className="relative py-32 lg:py-36 bg-neutral">
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 hidden lg:block">
            <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-green-400 blur-xl opacity-60 lg:opacity-95 lg:block hidden"></span>
            <span className="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-blue-600 blur-xl opacity-80"></span>
          </div>
          <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-blue-600 to-green-400 absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
          <div
            className="relative flex flex-col items-center text-center lg:text-left lg:py-7 xl:py-8 
            lg:items-start lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2"
          >
            <h1
              className="text-2xl leading-tight sm:text-3xl md:text-3xl xl:text-4xl
            font-bold text-gray-200"
            >
              Be Someone’s Miracle <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 from-20% via-blue-400 via-30% to-green-400">
                Donate Blood
              </span>{" "}
              <br />
              Join the Movement
            </h1>
            <p className="mt-8 text-gray-400">
              Every Donation Makes a Difference - Your Blood Can Provide Hope,
              Healing, and a Future to Those in Need
            </p>
            <div className="mt-10  w-full flex max-w-md mx-auto lg:mx-0">
              <div className="flex sm:flex-row flex-col gap-5 w-full">
                <form
                  className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-gray-600 shadow-lg shadow-gray-200/20
                            border border-gray-200 bg-gray-100 rounded-full ease-linear focus-within:bg-white  focus-within:border-blue-600"
                >
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="search by your preference"
                    className="w-full py-3 outline-none bg-transparent"
                  />
                  <button
                    className="flex text-white justify-center items-center w-max min-w-max sm:w-max px-6 h-12 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                                after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-[#172554] hover:after:opacity-100 hover:after:scale-[2.5] bg-blue-600 border-transparent hover:border-[#172554]"
                  >
                    <Link href={"/donor-list"}>
                      <span className="hidden sm:flex relative z-[5]">
                        Search Donors
                      </span>
                    </Link>
                    <span className="flex sm:hidden relative z-[5]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="flex flex-1 lg:w-1/2 lg:h-auto relative lg:max-w-none lg:mx-0 mx-auto max-w-3xl space-x-4 bg-slate-700 rounded-xl border-2 border-gray-500 bg-opacity-30 p-2">
            <div className="relative flex-1">
              <Image
                src={coverOne}
                alt="Hero image"
                width={2350}
                height={2359}
                className="lg:absolute lg:w-full lg:h-full rounded-3xl object-cover lg:max-h-none max-h-96"
              />
            </div>
            <div className="relative flex-1">
              <Image
                src={coverTwo}
                alt="Hero image"
                width={2350}
                height={2359}
                className="lg:absolute lg:w-full lg:h-full rounded-3xl object-cover lg:max-h-none max-h-96"
              />
            </div>
            <div className="relative flex-1">
              <Image
                src={coverThree}
                alt="Hero image"
                width={2350}
                height={2359}
                className="lg:absolute lg:w-full lg:h-full rounded-3xl object-cover lg:max-h-none max-h-96"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
