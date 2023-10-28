import React from "react";
import Link from "next/link";

import { UserAuth } from "@/app/context/AuthContext";
import Image from "next/image";
function Header() {
  const { user, logOut, getUserProfile } = UserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <nav
      className={`bg-blue-500 p-4 flex justify-between items-center top-0 z-50 fixed w-full`}
    >
      <div className="flex items-center">
        <span className="text-white text-borel font-bold text-2xl tracking-widest">
          Taskify
        </span>
      </div>

      <div className="flex justify-center space-x-6">
        {user ? (
          <>
            <Link
              className="text-white hover:text-gray-300 transition-colors duration-150"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-white hover:text-gray-300 transition-colors duration-150"
              href="/addtask"
            >
              Add a task
            </Link>
            {/* <Link
              className="text-white hover:text-gray-300 transition-colors duration-150"
              href="/notes"
            >
              Your notes
            </Link> */}
            <Link
              className="text-white hover:text-gray-300 transition-colors duration-150"
              href="/contact"
            >
              Contact Us
            </Link>
          </>
        ) : (
          <>
            <Link
              className="text-white hover:text-gray-300 transition-colors duration-150"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-white hover:text-gray-300 transition-colors duration-150"
              href="/help"
            >
              Help
            </Link>
            <Link
              className="text-white hover:text-gray-300 transition-colors duration-150"
              href="/contact"
            >
              Contact Us
            </Link>
          </>
        )}
      </div>

      <div className="flex items-center space-x-8">
        {user ? (
          <>
            <div className="flex justify-center items-center space-x-2">
              {user.photoURL ? (
                <>
                  <Image
                    src={user.photoURL}
                    height={40}
                    width={40}
                    alt="OOPS"
                    className="rounded-full border border-white"
                  />
                </>
              ) : (
                <></>
              )}
              <p className="text-white">
                {user.displayName
                  ? user.displayName
                  : `failed to fetch user name`}
              </p>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-500 px-3 py-1 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-150"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link
              href={"/login"}
              className="bg-white text-blue-500 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-150"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
