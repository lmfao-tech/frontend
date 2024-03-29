import darkModeAtom from "~/atoms/darkmode";
import Image from "next/image";
import { useAtom } from "jotai";
import logo_white from "~/../public/logo-white.png";
import logo_black from "~/../public/logo-black.png";
import { useRouter } from "next/router";
import { BellIcon } from "@heroicons/react/outline";
// import { useNotifs } from '~/contexts/NotifyContext';
import { useSession } from "next-auth/react";

function TopBar() {

  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const router = useRouter();
  // const { unseens } = useNotifs();

  const { data: session } = useSession();

  return (
    <div className="z-auto bg-white border-b-2 dark:bg-[#242424] dark:shadow-md dark:border-none">
      <div className="flex items-center justify-between h-20 mx-5 md:h-16">
        <button onClick={(e) => router.push("/")}>
          <div className="flex w-full">
            <div className="flex text-lg justify-center items-center font-bold cursor-pointer md:text-2xl font-trispace text-slate-800 dark:text-white">
              <Image
                alt="Logo of LMFAO.tech"
                src={darkMode ? logo_white : logo_black}
                width={36}
                height={36}
              />
              <div className="mx-2">
                LMFAO
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  .tech
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* {session && (
          <button onClick={() => router.push("/notifications")} className="relative ml-auto w-9 h-9 bg-slate-200 dark:text-white dark:bg-slate-700 p-2 rounded-md">
            {unseens > 0 && <div className="text-[10px] rounded-full bg-rose-400 absolute -top-1 flex justify-center items-center -right-1 w-4 h-4">{unseens > 9 ? "9+" : unseens}</div>}
            <BellIcon className="w-5 h-5" />
          </button>
        )} */}

        <button
          className="flex items-center p-2 m-3 rounded-md cursor-pointer bg-slate-200 dark:text-white dark:bg-slate-700 "
          onClick={(e) => setDarkMode(!darkMode)}
        >
          {!darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
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
              className="w-5 h-5"
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
        </button>
      </div>
    </div>
  );
}

export default TopBar;
