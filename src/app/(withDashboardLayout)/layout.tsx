"use client";

import { useGetMyProfileQuery } from "@/redux/api/features/userApi";
import Image from "next/image";
import Link from "next/link";
import bloodDlogo from "@/assets/bloodDlogo.png";
import Loader from "@/components/Shared/Loader";
import SidebarItems from "@/components/Dashboard/SidebarItems";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, isFetching } = useGetMyProfileQuery(undefined);

  if (isLoading || isFetching) {
    return (
      <div className="bg-neutral h-screen w-full">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="flex justify-end lg:justify-start items-center bg-neutral text-gray-300 font-semibold px-5 py-2 gap-2">
            <div className="avatar">
              <div className="mask mask-squircle">
                <Image
                  width={50}
                  height={50}
                  src={user?.profileImage}
                  alt="profile"
                />
              </div>
            </div>
            <div className="">
              <p>{user?.name}</p>
              <p>Role: {user?.role}</p>
              {user?.role === "ADMIN" && (
                <Link href={"/dashboard"}>Dashboard</Link>
              )}
            </div>
            <label
              htmlFor="my-drawer-2"
              className="btn btn-outline btn-accent drawer-button lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </label>
          </div>
          {/* Page content here */}
          {children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-neutral text-gray-300 ">
            {/* Sidebar content here */}
            <Link href="/" className="btn btn-ghost text-xl mb-5">
              <Image src={bloodDlogo} width={50} height={50} alt="logo" />
              <h3 className="text-cyan-200">
                Donate<span className="text-red-400">&</span>Save
              </h3>
            </Link>
            <li>
              <Link
                className={`no-underline text-gray-300 hover:underline hover:bg-neutral-900 font-semibold focus:text-cyan-200`}
                href="/"
              >
                Home
              </Link>
            </li>
            {user && <SidebarItems role={user?.role} />}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
