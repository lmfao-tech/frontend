import React from "react";
import { SearchIcon } from "@heroicons/react/solid";
import darkModeAtom from "~/atoms/darkmode";
import Image from "next/image";
import { useAtom } from "jotai";
import logo from "~/public/logo.svg";

function TopBar() {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  return (
    <div className="dark:bg-slate-800 bg-white border-b-2 dark:shadow-md dark:border-none z-10">
      <div className="flex items-center justify-between h-20 mx-5 md:h-16">
        <div className="w-full flex text-lg font-bold md:text-2xl font-trispace text-slate-800 dark:text-white">
          <Image alt="Logo of LMFAO.tech" src={logo} width={32} height={32} />
          <div className="mx-2">
            LMFAO
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              .tech
            </span>
          </div>
        </div>

        <div
          className="flex items-center m-3 p-2 bg-slate-200 rounded-md cursor-pointer dark:text-white dark:bg-slate-700 "
          onClick={(e) => setDarkMode(!darkMode)}
        >
          {!darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
