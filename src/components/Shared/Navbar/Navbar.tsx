"use client";

import Link from "next/link";
import Container from "../Container/Container";
import Image from "next/image";
import bloodDlogo from "@/assets/bloodDlogo.png";
import NavMenu from "./NavMenu";
import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/actions/logoutUser";
import userIcon from "@/assets/user.png";

const Navbar = () => {
  const { userInfo, setUserInfo } = useUserInfo();
  const router = useRouter();

  const handleLogOut = () => {
    logoutUser(router);
    setUserInfo("");
  };

  return (
    <header className="bg-neutral">
      <Container>
        <nav className="navbar bg-neutral text-neutral-content py-5">
          <div className="navbar-start">
            <Link href="/" className="btn btn-ghost text-xl">
              <Image src={bloodDlogo} width={50} height={50} alt="logo" />
              <h3 className="text-cyan-200">
                Donate<span className="text-red-400">&</span>Save
              </h3>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <NavMenu />
            </ul>
          </div>
          <div className="navbar-end">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-700 -left-44 rounded-box w-52 text-gray-300 overflow-hidden"
              >
                <NavMenu />
              </ul>
            </div>

            {userInfo ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar online"
                >
                  <div className="w-9 rounded-full ring ring-cyan-700 ring-offset-base-100 ring-offset-2">
                    <Image
                      width={36}
                      height={36}
                      alt="User avatar"
                      src={userIcon}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-gray-700 rounded-box w-52 text-gray-300"
                >
                  <li>
                    <Link href={"/my-profile"} className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li onClick={handleLogOut}>
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
                <Link
                  href="/login"
                  className="hover:underline hover:text-cyan-100"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
