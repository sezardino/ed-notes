import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

import Logo from "@/assets/logo.svg";

interface Props extends React.HTMLProps<HTMLDivElement> {}

export const Header: React.FC<Props> = (props) => {
  const { className, ...rest } = props;

  return (
    <header className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <nav className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link href={"/"} legacyBehavior>
          <a className="flex items-center">
            <Logo width="45" height="45" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              ED-NOTES
            </span>
          </a>
        </Link>
        <div className="flex items-center lg:order-2">
          <a
            href="#"
            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            Log in
          </a>
          <a
            href="#"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            Get started
          </a>
        </div>
      </nav>
    </header>
  );
};
