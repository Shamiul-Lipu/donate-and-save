"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const NavMenu = () => {
  const pathname = usePathname();
  return (
    <>
      <li>
        <Link
          className={`link ${
            pathname === "/" ? "text-cyan-200 font-semibold " : "no-underline"
          }`}
          href="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className={`link ${
            pathname === "/donor-list"
              ? "text-cyan-200 font-semibold"
              : "no-underline"
          }`}
          href="/donor-list"
        >
          Donor List
        </Link>
      </li>
      <li>
        <Link
          className={`link ${
            pathname === "/about"
              ? "text-cyan-200 font-semibold"
              : "no-underline"
          }`}
          href="/about"
        >
          About us
        </Link>
      </li>
    </>
  );
};

export default NavMenu;
