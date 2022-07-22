import { Avatar, Button } from "flowbite-react";
import { signIn, useSession, signOut } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useHaha } from "~/contexts/HahaContext";
import Image from "next/image";
import Leaderboard from "../Leaderboard/Leaderboard";
import Link from "next/link";
import { LogoutIcon } from "@heroicons/react/solid";

export default function Profile() {
  const { data: session } = useSession();
  const { coins } = useHaha();
  const [extended, setExtended] = useState(false);

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
          <div className="flex flex-col min-h-screen">
            <button
              onClick={() => setExtended(!extended)}
              className="relative flex items-center px-6 py-3 mt-5 rounded-full group hover:bg-slate-200 dark:hover:bg-slate-700 hover:cursor-pointer"
            >
              <div className="rounded-full bg-gradient-to-r p-[3px] from-[#6EE7B7] dark:from-pink-500 via-[#3B82F6] dark:via-purple-600 dark:to-indigo-800 to-[#9333EA]">
                <div className="flex flex-col justify-between h-full text-white bg-white rounded-full">
                  <Avatar img={av} rounded={true} alt="avatar" size="md" />
                </div>
              </div>
              <div className="flex flex-col mx-3 mt-2">
                <span className="text-black text-md font-trispace dark:text-slate-200">
                  {" "}
                  {session?.user?.name}
                </span>
                <span className="font-mono text-slate-500">
                  @{session.twitter.twitterHandle}
                </span>
              </div>
              <ChevronDownIcon className="w-6 h-6 ml-auto mr-2 transition-all ease-out delay-150 text-back dark:text-white group-hover:translate-y-1" />

              {extended && (
                <div className="absolute mt-32 mr-2 flex justify-center bg-blue-400 rounded-full w-40 text-white py-2">
                  <button onClick={() => signOut()} className="flex">
                    Logout <LogoutIcon className="h-6 w-6 ml-3" />
                  </button>
                </div>
              )}
            </button>
            <div className="flex items-center justify-center mt-7">
              <div className="flex items-center justify-between max-w-lg gap-5 space-x-4">
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
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500">
                      HAHA
                    </span>{" "}
                    coins
                  </div>
                </div>
                <div className="flex flex-col text-lg text-center dark:text-slate-200">
                  <span className="flex items-center justify-center gap-2 mb-2 font-bold">
                    <Image
                      src="/icons/icon-192x192.png"
                      alt=""
                      width={25}
                      height={25}
                      className="scale-125"
                    />{" "}
                    {coins.lmfao}
                  </span>
                  <div>
                    <span className="text-transparent bg-blue-600 bg-clip-text dark:bg-gradient-to-r dark:from-yellow-100 dark:via-yellow-300 dark:to-yellow-500">
                      LMFAO
                    </span>{" "}
                    coins
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 my-3 mt-10">
              <Leaderboard />
            </div>

            <div className="sticky z-10 flex flex-col items-center justify-center h-10 mx-3 bottom-9 my-7">
              <Link
                href="/create"
                as={`/create`}
                passHref={true}
                prefetch={true}
              >
                <div className="rounded-lg text-white bg-gradient-to-r transition-[transform] from-sky-400 to-blue-500 p-3 justify-center flex py-5 my-5 w-full shadow-xl shadow-blue-500/50 hover:scale-105 ease-out delay-100 cursor-pointer">
                  Create a meme
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full min-h-screen gap-3 px-10">
            <h1 className="text-3xl font-bold main-heading dark:text-slate-300">
              <span className="text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
                LMFAO
              </span>
              .tech
            </h1>
            <p className="text-sm text-center dark:text-slate-300">
              A content discovery platform where you can find the best memes
              across Twitter. Follow memers and stay for a good laugh!
            </p>
            <Button
              outline
              size="lg"
              gradientDuoTone="purpleToPink"
              onClick={() => signIn("twitter")}
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
          </div>
        )}
      </div>
    </>
  );
}
