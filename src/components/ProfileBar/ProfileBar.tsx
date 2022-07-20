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
      <div className="sticky top-0 min-h-screen overflow-auto dark:bg-slate-800">
        {session ? (
          <div>
            <div className="flex flex-col items-center px-5 py-10">
              <div className="rounded-full mx-auto bg-gradient-to-r p-[6px] from-[#6EE7B7] dark:from-pink-500 via-[#3B82F6] dark:via-purple-600 dark:to-indigo-800 to-[#9333EA]">
                <div className="flex flex-col justify-between h-full text-white bg-white rounded-full">
                  <Avatar img={av} rounded={true} alt="avatar" size="xl" />
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className="text-xl text-black font-trispace dark:text-slate-200">
                  {" "}
                  {session?.user?.name}
                </span>
                <br />
                <span className="text-slate-500">
                  @{session.twitter.twitterHandle}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-between max-w-lg space-x-4">
                {/* TODO: Fix this */}
                <div className="text-center dark:text-slate-200">
                  <span className="font-bold">
                    {coins.haha}
                  </span>
                  <br />
                  HahaCoins
                </div>
                <div className="text-center dark:text-slate-200">
                  <span className="font-bold">
                    {session?.twitter?.followersCount}
                  </span>
                  <br />
                  Followers
                </div>
                <div className="text-center dark:text-slate-200">
                  <span className="font-bold">
                    {session?.twitter?.followingCount}
                  </span>
                  <br />
                  Following
                </div>
              </div>
            </div>

            {/* Streak count */}
            {/* Coins count */}
            {/* Like coins left today */}
            {/* Upload meme button (one more) */}
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
        <div className="px-10 mt-10">
          <div className="w-full h-[2px] dark:bg-gray-600 bg-gray-300 rounded">
            {/* divider */}
          </div>
        </div>
        <div className="flex items-center justify-center mt-10">
          <Button
            outline
            size="lg"
            gradientDuoTone="purpleToPink"
            onClick={() => signOut()}
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
