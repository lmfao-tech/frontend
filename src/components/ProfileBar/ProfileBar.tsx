import { Avatar, Button } from "flowbite-react";
import { useSession, signOut } from "next-auth/react";
import logo_white from "~/../public/logo-white.png";
import logo_black from "~/../public/logo-black.png";
import React, { useContext, useEffect, useState } from "react";
import { ChevronDownIcon, FireIcon } from "@heroicons/react/solid";
import { useHaha } from "~/contexts/HahaContext";
import Image from "next/image";
import Leaderboard from "../Leaderboard";
import Link from "next/link";
import { LogoutIcon, InformationCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import darkModeAtom from "~/atoms/darkmode";

export default function Profile({ children }: { children?: React.ReactNode }) {
  const { data: session } = useSession();
  const { coins, streaks, rank } = useHaha();
  const [extended, setExtended] = useState(false);
  const router = useRouter();

  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  let av = session?.user?.image;
  if (av) {
    av = av.replace(/_normal./, ".");
  } else {
    av = "";
  }

  return (
    <>
      <div className="sticky top-0 h-screen overflow-auto scrollbar-thin dark:bg-[#242424]">
        {session ? (
          <div className="flex flex-col h-full min-h-screen mx-1">
            <button
              onClick={() => setExtended(!extended)}
              className="relative flex items-center px-6 mx-2 py-3 mt-5 rounded-full group hover:bg-slate-200 dark:hover:bg-black/20 transition-[background-color] hover:cursor-pointer"
            >
              <div className="rounded-full bg-gradient-to-r p-[3px] from-[#6EE7B7] dark:from-pink-500 via-[#3B82F6] dark:via-purple-600 dark:to-indigo-800 to-[#9333EA]">
                <div className="flex flex-col justify-between h-full text-white bg-white rounded-full">
                  <Avatar img={av} rounded={true} alt="avatar" />
                </div>
              </div>
              <div className="flex flex-col mx-3 mt-2">
                <span className="text-left text-black text-md font-trispace dark:text-slate-200">
                  {" "}
                  {session?.user?.name}
                </span>
                <span className="font-mono text-slate-500">
                  @{session.twitter.twitterHandle}
                </span>
              </div>
              <ChevronDownIcon className="w-6 h-6 ml-auto mr-2 transition-all ease-out delay-150 text-back dark:text-white group-hover:translate-y-1" />

              {extended && (
                <div className="absolute ml-40 mt-32 mr-2 flex justify-center z-10 dark:bg-gray-600 bg-blue-400 rounded-full w-40 text-white py-2">
                  <button onClick={() => signOut()} className="flex">
                    Logout <LogoutIcon className="w-6 h-6 ml-3" />
                  </button>
                </div>
              )}
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
                        data-tip="You get 50 HAHA coins every day. Liking a meme will cost 1 HAHA coin. The recipient will get LMFAO coins for every like they receive."
                        className="text-xs cursor-pointer"
                      >
                        <InformationCircleIcon className="w-4 h-4 text-slate-500" />
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
                        data-tip="This is the main currency of LMFAO.tech. You can earn LMFAO coins by uploading memes and liking others memes."
                        className="text-xs cursor-pointer"
                      >
                        <InformationCircleIcon className="w-4 h-4 text-slate-500" />
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
                        data-tip="Upload a meme through LMFAO.tech every day to keep your streaks. LMFAO coins are awarded based on streaks"
                        className="text-xs cursor-pointer"
                      >
                        <InformationCircleIcon className="w-4 h-4 text-slate-500" />
                      </div>
                    </span>{" "}
                  </div>
                  <span className="text-sm mr-3">(current)</span>
                </div>
              </div>
            </div>

            <div className="px-5 my-3 mt-10 dark:text-white">
              <Leaderboard rank={rank}/>
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
            className={`flex flex-col items-center justify-center w-full gap-3 px-10 mt-10 ${
              !children && "min-h-screen"
            }`}
          >
            <h1
              className={`text-5xl ${
                children && "text-6xl"
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
              <Button
                outline
                size="lg"
                gradientDuoTone="purpleToPink"
                onClick={() => router.push("/dash")}
              >
                <div className="mr-3">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height={22}
                    width={22}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </div>
                Login with Twitter
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
