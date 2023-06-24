import { Button } from "flowbite-react";
import { useSession, signOut, signIn } from "next-auth/react";
import logo_white from "~/../public/logo-white.png";
import logo_black from "~/../public/logo-black.png";
import React, { useState } from "react";
import { ChevronDownIcon, FireIcon } from "@heroicons/react/solid";
import { useHaha } from "~/contexts/HahaContext";
import Image from "next/image";
import Leaderboard from "./Leaderboard";
import Link from "next/link";
import { LogoutIcon, InformationCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import darkModeAtom from "~/atoms/darkmode";
import { useHelp } from "~/contexts/HelpContext";
import { AnimatePresence, motion } from "framer-motion";

export default function Profile({ children }: { children?: React.ReactNode }) {
  const { data: session } = useSession();
  const { coins, streaks, rank, user } = useHaha();
  const [extended, setExtended] = useState(false);
  const router = useRouter();

  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  let av = session?.user?.image;
  if (av) {
    av = av.replace(/_normal./, ".");
  } else {
    av = "";
  }

  const { setHelpOpen } = useHelp();

  return (
    <>
      <div className="sticky top-0 h-screen overflow-auto scrollbar-thin dark:bg-[#242424]">
        {session ? (
          <div className="flex flex-col h-full min-h-screen mx-1">
            <button
              onClick={() => setExtended(!extended)}
              className="relative flex items-center py-3 px-5 mx-2 mt-5 rounded-2xl group hover:bg-slate-200 dark:hover:bg-black/20 transition-[background-color] hover:cursor-pointer"
            >
              <div className="rounded-full relative bg-gradient-to-r p-[3px] from-[#6EE7B7] dark:from-pink-500 via-[#3B82F6] dark:via-purple-600 dark:to-indigo-800 to-[#9333EA]">
                <div className="flex flex-col justify-between h-full text-white bg-white rounded-full">
                  <img alt="avatar" src={av} className="rounded-full w-14" />
                </div>
              </div>
              <div className="flex flex-col mx-3 mt-2">
                <span className="text-left text-black text-md font-trispace dark:text-slate-200">
                  {" "}
                  {session?.user?.name}
                </span>
                <span className="font-mono text-left text-slate-500">
                  @{user.username}
                </span>
              </div>
              <ChevronDownIcon className="w-6 h-6 ml-auto mr-2 transition-all ease-out delay-150 text-back dark:text-white group-hover:translate-y-1" />

              <AnimatePresence>
                {extended && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, width: 45, height: 45, color: darkMode ? "#4B5563" : "#76A9FA", overflow: "hidden" }}
                    animate={{ opacity: 1, y: 0, width: [45, 45, 160], color: [darkMode ? "#4B5563" : "#76A9FA", darkMode ? "#4B5563" : "#76A9FA", "#FFFFFF"], overflow: "hidden" }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute mt-36 right-0 flex justify-center z-10 dark:bg-gray-600 bg-blue-400 rounded-full py-2"
                  >
                    <button onClick={() => signOut()} className="flex">
                      Logout <LogoutIcon className="w-6 h-6 ml-3" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <div className="flex items-center justify-center mt-7">
              <div className="flex items-center justify-around max-w-lg gap-5 mx-5 space-x-4">
                <div className="flex flex-col items-center text-lg text-center dark:text-slate-200">
                  <span className="flex items-center justify-center gap-2 mb-2 font-bold">
                    <Image
                      src="/icons/HAHAcoins.png"
                      alt=""
                      width={25}
                      height={25}
                    />{" "}
                    {coins.haha}
                  </span>
                  <div>
                    <span className="flex text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500">
                      HAHA
                      <div
                        data-tip="Click for more info"
                        className="text-xs cursor-pointer"
                      >
                        <InformationCircleIcon
                          onClick={() => setHelpOpen(true)}
                          className="w-4 h-4 text-slate-500"
                        />
                      </div>
                    </span>{" "}
                    coins
                  </div>
                </div>

                <div className="flex flex-col text-lg text-center dark:text-slate-200">
                  <span className="flex items-center justify-center gap-2 mb-2 font-bold">
                    <Image
                      src={darkMode ? logo_white : logo_black}
                      alt=""
                      width={25}
                      height={25}
                      className="scale-125"
                    />{" "}
                    {coins.lmfao}
                  </span>
                  <div>
                    <span className="flex text-transparent bg-blue-600 bg-clip-text dark:bg-gradient-to-r dark:from-yellow-100 dark:via-yellow-300 dark:to-yellow-500">
                      LMFAO
                      <div
                        data-tip="Click for more info"
                        className="text-xs cursor-pointer"
                      >
                        <InformationCircleIcon
                          onClick={() => setHelpOpen(true)}
                          className="w-4 h-4 text-slate-500"
                        />
                      </div>
                    </span>{" "}
                    coins
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center text-lg text-center dark:text-slate-200">
                  <span className="flex items-center justify-center gap-2 mb-2 mr-3 font-bold">
                    <FireIcon className="h-6 w-6 text-red-500" />
                    {streaks.current}
                  </span>
                  <div>
                    <span className="flex text-transparent bg-blue-600 bg-clip-text dark:bg-gradient-to-r dark:from-yellow-100 dark:via-yellow-300 dark:to-yellow-500">
                      Streaks
                      <div
                        data-tip="Click for more info"
                        className="text-xs cursor-pointer"
                      >
                        <InformationCircleIcon
                          onClick={() => setHelpOpen(true)}
                          className="w-4 h-4 text-slate-500"
                        />
                      </div>
                    </span>{" "}
                  </div>
                  <span className="text-sm mr-3">(current)</span>
                </div>
              </div>
            </div>

            <div className="px-5 my-3 mt-10 dark:text-white">
              <Leaderboard rank={rank} />
            </div>

            <div className="sticky z-10 flex flex-col items-center justify-center h-10 mx-3 bottom-9 my-7">
              <Link href="/create" as={`/create`} passHref={true}>
                <div className="rounded-lg text-white bg-gradient-to-r transition-[transform] from-sky-400 to-blue-500 p-3 justify-center flex py-5 my-5 w-full shadow-xl shadow-blue-500/50 hover:scale-105 ease-out delay-100 cursor-pointer">
                  Create a meme
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div
            className={`flex flex-col items-center justify-center w-full gap-3 px-10 mt-10 ${!children && "min-h-screen"
              }`}
          >
            <h1
              className={`text-3xl md:text-5xl ${children && "text-6xl"
                } font-trispace font-bold main-heading dark:text-slate-300 mb-3`}
            >
              <span className="text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
                LMFAO
              </span>
              .tech
            </h1>
            {children ? (
              children
            ) : (
              <>
                <Button
                  outline
                  size="lg"
                  gradientDuoTone="purpleToPink"
                  onClick={() => signIn("google")}
                >
                  <div className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 186.69 190.5">
                      <g transform="translate(1184.583 765.171)">
                        <path clipPath="none" mask="none" d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z" fill="#4285f4" />
                        <path clipPath="none" mask="none" d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z" fill="#34a853" />
                        <path clipPath="none" mask="none" d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z" fill="#fbbc05" />
                        <path d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z" fill="#ea4335" clipPath="none" mask="none" />
                      </g>
                    </svg>
                  </div>
                  Continue with Google
                </Button>
                <Button
                  outline
                  size="lg"
                  gradientDuoTone="purpleToPink"
                  onClick={() => router.push("/create")}
                >
                  <div className="mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  Create a Meme
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
