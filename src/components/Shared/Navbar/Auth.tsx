"use client";

import useUserInfo from "@/hooks/useUserInfo";
import { logoutUser } from "@/services/actions/logoutUser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Auth = () => {
  const router = useRouter();
  const { userInfo, refetchUserInfo } = useUserInfo(); // Assuming useUserInfo returns an object with userInfo and a refetch function
  const [user, setUser] = useState(null);

  // Fetch user info on component mount and on every rerender
  useEffect(() => {
    refetchUserInfo().then((data) => setUser(data));
  }, [refetchUserInfo]);

  // Handle logout
  const handleLogout = () => {
    logoutUser(router).then(() => {
      setUser(null); // Clear user info on logout
      router.refresh();
    });
  };

  return (
    <>
      {user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                width={35}
                height={35}
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-gray-700 rounded-box w-52 text-gray-300"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li onClick={handleLogout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <Link
            href="/register"
            className="underline hover:underline hover:text-cyan-100"
          >
            Register
          </Link>
          <span> / </span>
          <Link href="/login" className="hover:underline hover:text-cyan-100">
            Login
          </Link>
        </div>
      )}
    </>
  );
};

export default Auth;
