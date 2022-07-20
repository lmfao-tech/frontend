import { Avatar, Button } from "flowbite-react";
import { signIn, useSession, signOut } from "next-auth/react";
import { useContext, useEffect } from "react";
import { useHaha } from "~/contexts/HahaContext";

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
      <div className="sticky top-0 min-h-screen overflow-y-scroll dark:bg-slate-800">
        {session ? (
          <div className="flex min-h-screen flex-col">
            <div className="flex items-center px-10 py-7 mt-2 gap-3">
              <div className="rounded-full bg-gradient-to-r p-[6px] from-[#6EE7B7] dark:from-pink-500 via-[#3B82F6] dark:via-purple-600 dark:to-indigo-800 to-[#9333EA]">
                <div className="flex flex-col justify-between h-full text-white bg-white rounded-full">
                  <Avatar img={av} rounded={true} alt="avatar" size="lg" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xl text-black font-trispace dark:text-slate-200">
                  {" "}
                  {session?.user?.name}
                </span>
                <br />
                <span className="text-slate-500">
                  @{session.twitter.twitterHandle}
                </span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 dark:fill-white ml-auto mr-2" viewBox="0 0 320 512">
                <path d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z"/>
              </svg>
            </div>
            <div className="flex items-center justify-center mt-5">
              <div className="flex items-center flex-col gap-5 justify-between max-w-lg space-x-4">
                {/* TODO: Fix this */}
                <div className="text-center flex-col flex text-xl dark:text-slate-200">
                  <span className="font-bold text-2xl mb-2">
                    😂 {coins.haha}
                  </span>
                  HAHA coins
                </div>
                <div className="text-center flex-col flex text-xl dark:text-slate-200">
                  <span className="font-bold mb-2 text-2xl">
                   💀 {coins.lmfao}
                  </span>
                  LMFAO coins
                </div>
              </div>
            </div>

            <div className="px-5 my-3">
              <div className="w-full h-full overflow-y-scroll rounded py-3 bg-slate-500/30 dark:text-white">
                <h1 className="text-center text-lg underline underline-offset-2">Leaderboard</h1>
                <div className="flex py-2 flex-col gap-1">
                  <div className="flex px-5 gap-2 items-center">
                    <span>#1</span>
                    <span>
                      <Avatar img={av} rounded={true} alt="avatar" size="sm" />
                    </span>
                    <span className="ml-auto">
                      💀 {coins.lmfao}
                    </span>
                  </div>
                  <div className="flex px-5 gap-2 items-center">
                    <span>#1</span>
                    <span>
                      <Avatar img={av} rounded={true} alt="avatar" size="sm" />
                    </span>
                    <span className="ml-auto">
                      💀 {coins.lmfao}
                    </span>
                  </div>
                  <div className="flex px-5 gap-2 items-center">
                    <span>#1</span>
                    <span>
                      <Avatar img={av} rounded={true} alt="avatar" size="sm" />
                    </span>
                    <span className="ml-auto">
                      💀 {coins.lmfao}
                    </span>
                  </div>
                  <div className="flex px-5 gap-2 items-center">
                    <span>#1</span>
                    <span>
                      <Avatar img={av} rounded={true} alt="avatar" size="sm" />
                    </span>
                    <span className="ml-auto">
                      💀 {coins.lmfao}
                    </span>
                  </div>
                  <div className="flex px-5 gap-2 items-center">
                    <span>#1</span>
                    <span>
                      <Avatar img={av} rounded={true} alt="avatar" size="sm" />
                    </span>
                    <span className="ml-auto">
                      💀 {coins.lmfao}
                    </span>
                  </div>
                  <div className="flex px-5 gap-2 items-center">
                    <span>#1</span>
                    <span>
                      <Avatar img={av} rounded={true} alt="avatar" size="sm" />
                    </span>
                    <span className="ml-auto">
                      💀 {coins.lmfao}
                    </span>
                  </div>
                  <div className="flex px-5 gap-2 items-center">
                    <span>#1</span>
                    <span>
                      <Avatar img={av} rounded={true} alt="avatar" size="sm" />
                    </span>
                    <span className="ml-auto">
                      💀 {coins.lmfao}
                    </span>
                  </div>
                  <div className="flex px-5 gap-2 items-center">
                    <span>#1</span>
                    <span>
                      <Avatar img={av} rounded={true} alt="avatar" size="sm" />
                    </span>
                    <span className="ml-auto">
                      💀 {coins.lmfao}
                    </span>
                  </div>
                  <div className="flex px-5 gap-2 items-center">
                    <span>#1</span>
                    <span>
                      <Avatar img={av} rounded={true} alt="avatar" size="sm" />
                    </span>
                    <span className="ml-auto">
                      💀 {coins.lmfao}
                    </span>
                  </div>
                  <div className="flex px-5 gap-2 items-center">
                    <span>#1</span>
                    <span>
                      <Avatar img={av} rounded={true} alt="avatar" size="sm" />
                    </span>
                    <span className="ml-auto">
                      💀 {coins.lmfao}
                    </span>
                  </div>
                  <div className="flex px-5 gap-2 items-center">
                    <span>#1</span>
                    <span>
                      <Avatar img={av} rounded={true} alt="avatar" size="sm" />
                    </span>
                    <span className="ml-auto">
                      💀 {coins.lmfao}
                    </span>
                  </div>
                  <div className="flex px-5 gap-2 items-center">
                    <span>#1</span>
                    <span>
                      <Avatar img={av} rounded={true} alt="avatar" size="sm" />
                    </span>
                    <span className="ml-auto">
                      💀 {coins.lmfao}
                    </span>
                  </div>
                  <div className="flex px-5 gap-2 items-center">
                    <span>#1</span>
                    <span>
                      <Avatar img={av} rounded={true} alt="avatar" size="sm" />
                    </span>
                    <span className="ml-auto">
                      💀 {coins.lmfao}
                    </span>
                  </div>
                  <div className="flex px-5 gap-2 items-center">
                    <span>#1</span>
                    <span>
                      <Avatar img={av} rounded={true} alt="avatar" size="sm" />
                    </span>
                    <span className="ml-auto">
                      💀 {coins.lmfao}
                    </span>
                  </div>
                  <div className="flex px-5 gap-2 items-center">
                    <span>#1</span>
                    <span>
                      <Avatar img={av} rounded={true} alt="avatar" size="sm" />
                    </span>
                    <span className="ml-auto">
                      💀 {coins.lmfao}
                    </span>
                  </div>
                  <div className="flex px-5 gap-2 items-center">
                    <span>#1</span>
                    <span>
                      <Avatar img={av} rounded={true} alt="avatar" size="sm" />
                    </span>
                    <span className="ml-auto">
                      💀 {coins.lmfao}
                    </span>
                  </div>
                  
                </div>
              </div>
            </div>


            <div className="w-full mt-auto mb-2 px-5 bottom-0 fixed">
              <div className="rounded-md bg-gradient-to-r p-[4px] from-[#6EE7B7] dark:from-pink-500 via-[#3B82F6] dark:via-purple-600 dark:to-indigo-800 to-[#9333EA]">
                <button className="w-full tracking-wider font-bold dark:text-white hover:text-white bg-white hover:bg-transparent dark:hover:bg-transparent transition-[background-color] dark:bg-slate-800 py-4 text-center text-xl rounded-md">
                  CREATE
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full min-h-screen gap-3 px-10">
            <h1 className="text-3xl font-bold main-heading dark:text-slate-300">
              <span
                className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text"
                style={{ WebkitTextFillColor: "transparent" }}
              >
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
