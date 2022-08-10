import Head from "next/head";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import NotFeedPage from "~/components/layouts/NotFeedPage";
import { Avatar, Spinner } from "flowbite-react";
import Image from "next/image";
import logo_white from "~/../public/logo-white.png";
import logo_black from "~/../public/logo-black.png";
import { InformationCircleIcon, FireIcon } from "@heroicons/react/solid";
import { useAtom } from "jotai";
import darkModeAtom from "~/atoms/darkmode";
import { useHaha } from "~/contexts/HahaContext";
import { useHelp } from "~/contexts/HelpContext";
import usePostFeed from "~/hooks/usePostFeed";
import Post from "~/types/Post";
import FeedPost from "~/components/FeedPost";
import { Status } from "../../types/Request";

function UserProfile({ u, user }: any) {
  const router = useRouter();
  const [last, setLast] = useState<number>(0);

  let {
    memes,
    loading,
    hasMore,
    meta,
  }: { memes: Post[]; loading: boolean; hasMore: boolean; meta: any } =
    usePostFeed({
      url: `/api/profileMemes?u=${u}&last=${last}&max_tweets=10`,
    });
  const observer = useRef<IntersectionObserver>();

  const lastMemeRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) {
          setLast(memes.length);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, memes]
  );

  let pfp;
  if (user) {
    pfp = `https://unavatar.io/twitter/${u}`;
  }

  return (
    <div className="grid lg:grid-cols-6">
      <Head>
        <title>@{user.name} | LMFAO.tech</title>
        <meta property="og:image" content="/og-image.png" />

        <meta name="og:title" content={`@${user.name} | LMFAO.tech`} />
        <meta name="title" content={`@${user.name} | LMFAO.tech`} />
        <meta
          name="description"
          content={`View @${user.name}'s profile on LMFAO.tech | ${user.name} has ${meta.total} memes and ${user.lmfaoCoins} LMFAO 💀 coins`}
        />
        <meta
          name="og:description"
          content={`View @${user.name}'s profile on LMFAO.tech | ${user.name} has ${meta.total} memes and ${user.lmfaoCoins} LMFAO 💀 coins`}
        />
      </Head>
      <div className="block lg:hidden w-full col-span-4">
        {/* Display the user object*/}
        {user && <User user={user} pfp={pfp} meta={meta} />}
      </div>
      <div className="col-span-4 bg-[#e2e8f0] dark:bg-[#101010] w-full">
        <div className="flex flex-col w-full mb-20 overflow-hidden shadow-sm md:md-0">
          <div className="flex flex-col px-2 md:px-32">
            {memes.map((post, index) => {
              if (index === memes.length - 1) {
                return (
                  <div key={post.tweet_id} ref={lastMemeRef}>
                    <FeedPost post={post} />
                  </div>
                );
              } else {
                return (
                  <div key={post.tweet_id}>
                    <FeedPost post={post} />
                  </div>
                );
              }
            })}
            {loading && (
              <div className="flex items-center justify-center h-full">
                <div className="dark:text-white ">
                  Loading... <Spinner />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hidden lg:block dark:text-white w-full col-span-2">
        <div className="sticky top-16">
          {/* Display the user object*/}
          {user && <User user={user} pfp={pfp} meta={meta} />}
        </div>
      </div>
    </div>
  );
}

function User({ user, pfp, meta }: any) {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const { helpOpen, setHelpOpen } = useHelp();

  // longest or current :rofl: // big bren
  const [lOrc, setLorC] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center py-10 w-full">
      <div className="flex flex-col gap-2 justify-center items-center w-full">
        <div className="rounded-full relative bg-gradient-to-r p-[5px] from-[#6EE7B7] dark:from-pink-500 via-[#3B82F6] dark:via-purple-600 dark:to-indigo-800 to-[#9333EA]">
          <div className="rank-btn-profile text-black">#{user.rank}</div>
          <div className="flex flex-col justify-between h-full text-white bg-white rounded-full">
            <Avatar img={pfp} rounded={true} size="xl" alt="avatar" />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <span className="text-xl dark:text-white">
            <span className="dark:text-gray-500 text-gray-400">@</span>
            {user.name}
          </span>
          <span className="text-gray-400 text-md">
            {meta.total} memes posted
          </span>
        </div>
      </div>

      <div className="flex gap-10 h-30 jusity-center items-center mt-14">
        <div className="flex flex-col text-lg text-center dark:text-slate-200">
          <span className="flex items-center justify-center gap-2 mb-2 mr-2  font-bold">
            <Image
              src={darkMode ? logo_white : logo_black}
              alt=""
              width={25}
              height={25}
              className="scale-125"
            />{" "}
            {user.lmfaoCoins}
          </span>
          <div className="">
            <span className="flex text-transparent bg-blue-600 bg-clip-text dark:bg-gradient-to-r dark:from-yellow-100 dark:via-yellow-300 dark:to-yellow-500">
              LMFAO
              <div data-tip="Click for info" className="text-xs cursor-pointer">
                <InformationCircleIcon
                  onClick={() => setHelpOpen(true)}
                  className="w-4 h-4 text-slate-500"
                />
              </div>
            </span>{" "}
            <span className="mr-2">coins</span>
          </div>
        </div>

        <div className="rotate-[20deg] h-[120px] w-[2px] bg-gray-400 dark:bg-gray-600" />

        <button
          data-tip="Click to switch between current & longest streak"
          onClick={() => setLorC((prev) => !prev)}
          className="flex flex-col items-center justify-center text-lg text-center dark:text-slate-200"
        >
          <span className="flex items-center justify-center gap-2 mb-2 mr-3 font-bold">
            <FireIcon className="h-6 w-6 text-red-500" />
            {lOrc ? user.current_streak : user.longest_streak}
          </span>
          <div>
            <span className="flex text-transparent bg-blue-600 bg-clip-text dark:bg-gradient-to-r dark:from-yellow-100 dark:via-yellow-300 dark:to-yellow-500 z-0">
              Streaks
              <div data-tip="Click for info" className="text-xs cursor-pointer">
                <InformationCircleIcon
                  onClick={() => setHelpOpen(true)}
                  className="w-4 h-4 text-slate-500"
                />
              </div>
            </span>{" "}
          </div>
          <span className="text-sm mr-3">({lOrc ? "current" : "longest"})</span>
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  let username = context.params.username;

  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://lmfao.tech";

  try {
    const resp = await fetch(`${url}/api/db/user?username=${username}`);
    const user = await resp.json();

    if (user.success === Status.Failure) {
      return {
        props: {},
        redirect: {
          permanent: false,
          destination: `https://twitter.com/${username}`,
        },
      };
    }

    if (!user) {
      return {
        props: {},
        redirect: {
          permanent: false,
          destination: `https://twitter.com/${username}`,
        },
      };
    }

    return {
      props: {
        u: username,
        user: user.data,
      },
    };
  } catch {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: `https://twitter.com/${username}`,
      },
    };
  }
}

UserProfile.getLayout = (page: ReactElement) => {
  return <NotFeedPage>{page}</NotFeedPage>;
};

export default UserProfile;
