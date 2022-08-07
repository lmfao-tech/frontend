import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import NotFeedPage from "~/components/layouts/NotFeedPage";
import { Avatar } from "flowbite-react";
import Image from "next/image";
import logo_white from "~/../public/logo-white.png";
import logo_black from "~/../public/logo-black.png";
import { InformationCircleIcon, FireIcon } from "@heroicons/react/solid";
import { useAtom } from "jotai";
import darkModeAtom from "~/atoms/darkmode";
import { useHaha } from "~/contexts/HahaContext";
import { useHelp } from "~/contexts/HelpContext";

function UserProfile({ u }: any) {
  const router = useRouter();
  const [user, setUser] = React.useState<any>();
  const { coins, streaks } = useHaha();

  const { helpOpen, setHelpOpen } = useHelp();

  // longest or current :rofl: // big bren
  const [lOrc, setLorC] = useState(false);
  
  let pfp;

  if (user) {
    pfp = `https://unavatar.io/twitter/${user.name}`;
  }

  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  useEffect(() => {
    fetch(`/api/db/user?username=${u}`)
      .then(
        async (resp) => {
          const user = await resp.json();
          console.log(user);
          setUser(user.data);
        }
      )
  }, [u, router]);

  return (
    <div className="grid lg:grid-cols-6">
      <div className="block lg:hidden dark:text-white w-full col-span-4">
        {/* Display the user object*/}
        {user && (
          <div className="flex flex-col justify-center items-center py-10 w-full">

            <div className="flex flex-col gap-2 justify-center items-center w-full">

              <div className="rounded-full relative bg-gradient-to-r p-[5px] from-[#6EE7B7] dark:from-pink-500 via-[#3B82F6] dark:via-purple-600 dark:to-indigo-800 to-[#9333EA]">
                <div className="rank-btn-profile">
                  #{user.rank}
                </div>
                <div className="flex flex-col justify-between h-full text-white bg-white rounded-full">
                  <Avatar img={pfp} rounded={true} size="xl" alt="avatar" />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center">
                <span className="dark:text-gray-400 text-xl">@{user.name}</span>
                <span className="dark:text-gray-400 text-md">30 memes posted</span>
              </div>
            </div>

            <div className="flex gap-10 h-30 jusity-center items-center mt-14">
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
                      data-tip="Click for info"
                      className="text-xs cursor-pointer"
                    >
                      <InformationCircleIcon onClick={() => setHelpOpen(true)} className="w-4 h-4 text-slate-500" />
                    </div>
                  </span>{" "}
                  coins
                </div>
              </div>

              
              <div className="rotate-[20deg] h-[120px] w-[2px] bg-gray-600" />

              <button onClick={() => setLorC((prev) => !prev)} className="flex flex-col items-center justify-center text-lg text-center dark:text-slate-200">
                <span className="flex items-center justify-center gap-2 mb-2 mr-3 font-bold">
                  <FireIcon className="h-6 w-6 text-red-500" />
                  {lOrc ? streaks.longest : streaks.current}
                </span>
                <div>
                  <span className="flex text-transparent bg-blue-600 bg-clip-text dark:bg-gradient-to-r dark:from-yellow-100 dark:via-yellow-300 dark:to-yellow-500">
                    Streaks
                    <div
                      data-tip="Click for info"
                      className="text-xs cursor-pointer"
                    >
                      <InformationCircleIcon onClick={() => setHelpOpen(true)} className="w-4 h-4 text-slate-500" />
                    </div>
                  </span>{" "}
                </div>
                <span className="text-sm mr-3">({lOrc ? "longest" : "current"})</span>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-4 text-white min-h-screen w-full">

      </div>
      <div className="hidden lg:block dark:text-white w-full col-span-2">
        {/* Display the user object*/}
        {user && (
          <div className="flex flex-col justify-center items-center py-10 w-full">

            <div className="flex flex-col gap-2 justify-center items-center w-full">

              <div className="rounded-full relative bg-gradient-to-r p-[5px] from-[#6EE7B7] dark:from-pink-500 via-[#3B82F6] dark:via-purple-600 dark:to-indigo-800 to-[#9333EA]">
                <div className="rank-btn-profile">
                  #{user.rank}
                </div>
                <div className="flex flex-col justify-between h-full text-white bg-white rounded-full">
                  <Avatar img={pfp} rounded={true} size="xl" alt="avatar" />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center">
                <span className="dark:text-gray-400 text-xl">@{user.name}</span>
                <span className="dark:text-gray-400 text-md">30 memes posted</span>
              </div>
            </div>

            <div className="flex gap-10 h-30 jusity-center items-center mt-14">
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
                      data-tip="Click for info"
                      className="text-xs cursor-pointer"
                    >
                      <InformationCircleIcon onClick={() => setHelpOpen(true)} className="w-4 h-4 text-slate-500" />
                    </div>
                  </span>{" "}
                  coins
                </div>
              </div>

              
              <div className="rotate-[20deg] h-[120px] w-[2px] bg-gray-600" />

              <button onClick={() => setLorC((prev) => !prev)} className="flex flex-col items-center justify-center text-lg text-center dark:text-slate-200">
                <span className="flex items-center justify-center gap-2 mb-2 mr-3 font-bold">
                  <FireIcon className="h-6 w-6 text-red-500" />
                  {lOrc ? streaks.longest : streaks.current}
                </span>
                <div>
                  <span className="flex text-transparent bg-blue-600 bg-clip-text dark:bg-gradient-to-r dark:from-yellow-100 dark:via-yellow-300 dark:to-yellow-500">
                    Streaks
                    <div
                      data-tip="Click for info"
                      className="text-xs cursor-pointer"
                    >
                      <InformationCircleIcon onClick={() => setHelpOpen(true)} className="w-4 h-4 text-slate-500" />
                    </div>
                  </span>{" "}
                </div>
                <span className="text-sm mr-3">({lOrc ? "longest" : "current"})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div >
  );
}

export async function getServerSideProps(context: any) {

  return {
    props: {
      u: context.params.username
    }
  }
}

UserProfile.getLayout = (page: ReactElement) => {
  return <NotFeedPage>{page}</NotFeedPage>;
};

export default UserProfile;
