"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarItems = ({ role }: { role: string }) => {
  const pathname = usePathname();
  return (
    <>
      {role === "ADMIN" && (
        <li>
          <Link
            className={`link hover:bg-neutral-900  ${
              pathname === "/dashboard/user-management"
                ? "text-cyan-200 font-semibold focus:text-cyan-200"
                : "no-underline text-gray-300 hover:underline"
            }`}
            href="/dashboard/user-management"
          >
            User Management
          </Link>
        </li>
      )}
      <li>
        <Link
          className={`link hover:bg-neutral-900  ${
            pathname === "/my-profile/edit-profile"
              ? "text-cyan-200 font-semibold focus:text-cyan-200"
              : "no-underline text-gray-300 hover:underline"
          }`}
          href="/my-profile/edit-profile"
        >
          Edit Profile
        </Link>
      </li>
      <li>
        <Link
          className={`link hover:bg-neutral-900 ${
            pathname === "/my-profile/my-blood-requests"
              ? "text-cyan-200 font-semibold focus:text-cyan-200"
              : "no-underline text-gray-300 hover:underline"
          }`}
          href="/my-profile/my-blood-requests"
        >
          My Blood Requests
        </Link>
      </li>
      <li>
        <Link
          className={`link hover:bg-neutral-900 ${
            pathname === "/my-profile/requests-to-me"
              ? "text-cyan-200 font-semibold focus:text-cyan-200"
              : "no-underline text-gray-300 hover:underline"
          }`}
          href="/my-profile/requests-to-me"
        >
          Requests for Blood to Me
        </Link>
      </li>
      <li>
        <Link
          className={`link hover:bg-neutral-900 ${
            pathname === "/my-profile/change-password"
              ? "text-cyan-200 font-semibold focus:text-cyan-200"
              : "no-underline text-gray-300 hover:underline"
          }`}
          href="/my-profile/change-password"
        >
          Change Password
        </Link>
      </li>
    </>
  );
};

export default SidebarItems;
