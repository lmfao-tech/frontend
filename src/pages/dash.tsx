import React from "react";
import { Button } from "flowbite-react";
import type { ReactElement } from "react";
import { signIn } from "next-auth/react";
import Profile from "~/components/ProfileBar/ProfileBar";
import NotFeedPage from "~/components/layouts/NotFeedPage";
import Head from "next/head";
import NextPageWithLayout from "~/types/NextPageWithLayout";
import { ChartBarIcon, HeartIcon, SparklesIcon } from "@heroicons/react/solid";

const dash: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Dashboard | LMFAO.tech</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Profile>
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
        <div className="flex md:flex-row flex-col justify-center text-center w-full gap-5 mt-10 mb-24 md:mb-0">
          {/* Discover */}
          <div className="flex flex-col flex-1 justify-center items-center dark:text-white">
            <SparklesIcon className="w-24 h-24 text-yellow-300" />
            <h2 className="dark:text-white font-montserrat text-xl mt-3">
              Discover memes
            </h2>
            <span className="text-center">
              Thousands of memes are uploaded every second on twitter. Be the
              first to find them! Also see the amazing memes chosen, liked and
              made by our community.
            </span>
          </div>
          {/* Interact */}
          <div className="flex flex-col justify-center flex-1 items-center dark:text-white">
            <HeartIcon className="w-24 h-24 text-red-500" />
            <h2 className="dark:text-white font-montserrat text-xl">
              Interact
            </h2>
            <span className="text-center">
              Interact with the community. Uploading and liking memes gives you
              LMFAO points
            </span>
          </div>
          {/* Be famous */}
          <div className="flex flex-col flex-1 justify-center items-center dark:text-white">
            <ChartBarIcon className="w-24 h-24 text-blue-500" />
            <h2 className="dark:text-white font-montserrat text-xl">
              Become famous
            </h2>
            <span className="text-center">
              The more memes you upload, posts you like, and the more likes you
              get, the more LMFAO points you have. Be at the top of the leaderboard.
            </span>
          </div>
        </div>
      </Profile>
    </div>
  );
};

dash.getLayout = (page: ReactElement) => {
  return <NotFeedPage>{page}</NotFeedPage>;
};

export default dash;
