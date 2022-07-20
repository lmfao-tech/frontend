import { Avatar, Button } from "flowbite-react";
import { signIn, useSession, signOut } from "next-auth/react";
import { useContext, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useHaha } from "~/contexts/HahaContext";
import Image from "next/image";
import Leaderboard from "../Leaderboard/Leaderboard";
import Link from "next/link";

export default function Profile() {
  const { data: session } = useSession();
  const { coins } = useHaha();

  let av = session?.user?.image;
  if (av) {
    av = av.replace(/_normal./, ".");
  } else {
    av = "";
  }

  return (
    <>
      <div className="sticky top-0 min-h-screen dark:bg-slate-800">
        {session ? (
          <div className="flex min-h-screen flex-col">
            <div className="flex group items-center p-1 pl-3 mb-7 pb-3 mx-5 mt-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 hover:cursor-pointer">
              <div className="rounded-full bg-gradient-to-r p-[3px] from-[#6EE7B7] dark:from-pink-500 via-[#3B82F6] dark:via-purple-600 dark:to-indigo-800 to-[#9333EA]">
                <div className="flex flex-col justify-between h-full text-white bg-white rounded-full">
                  <Avatar img={av} rounded={true} alt="avatar" size="md" />
                </div>
              </div>
              <div className="mt-2 flex flex-col mx-3">
                <span className="text-md text-black font-trispace dark:text-slate-200">
                  {" "}
                  {session?.user?.name}
                </span>
                <span className="text-slate-500">
                  @{session.twitter.twitterHandle}
                </span>
              </div>
              <ChevronDownIcon className="h-6 w-6 ml-auto mr-2 text-back dark:text-white group-hover:translate-y-1 transition-all delay-150 ease-out" />
            </div>
            <div className="flex items-center justify-center my-5">
              <div className="flex items-center gap-5 justify-between max-w-lg space-x-4">
                {/* TODO: Fix this */}
                <div className="text-center flex-col flex text-xl dark:text-slate-200">
                  <span className="font-bold text-2xl mb-2">
                    <Image
                      src="/icons/HAHAcoins.png"
                      alt=""
                      width={20}
                      height={20}
                    />{" "}
                    {coins.haha}
                  </span>
                  <div>
                    <span className="bg-clip-text bg-gradient-to-r from-green-300 to-blue-500 text-transparent">
                      HAHA
                    </span>{" "}
                    coins
                  </div>
                </div>
                <div className="text-center flex-col flex text-xl dark:text-slate-200">
                  <span className="font-bold text-2xl mb-2">
                    <Image
                      src="/icons/icon-192x192.png"
                      alt=""
                      width={25}
                      height={25}
                    />{" "}
                    {coins.lmfao}
                  </span>
                  <div>
                    <span className="bg-clip-text bg-blue-600 dark:bg-gradient-to-r dark:from-yellow-100 dark:via-yellow-300 dark:to-yellow-500 text-transparent">
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

            {/* Create button fixed to the bottom */}
            <div className="fixed bottom-0 mx-3 my-7 h-10 right-0 w-80 md:w-96 z-10 flex flex-col items-center justify-center">
              <Link
                href="/create"
                as={`/create`}
                passHref={true}
                prefetch={true}
              >
                <div className="rounded-lg text-white bg-gradient-to-r from-sky-400 to-blue-500 p-3 justify-center flex py-5 mx-3 my-5 w-full shadow-xl shadow-blue-500/50 hover:scale-105 ease-out delay-100 cursor-pointer">
                  Create a meme
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full min-h-screen gap-3 px-10">
            <h1 className="text-3xl font-bold main-heading dark:text-slate-300">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                LMFAO
              </span>
              .tech
            </h1>
            <p className="text-sm text-center dark:text-slate-300">
              A content discovery platform where you can find the best memes
              across twitter, follow memers and stay for a good laugh!
            </p>
            <Button
              outline
              size="lg"
              gradientDuoTone="purpleToPink"
              onClick={() => signIn("twitter")}
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
