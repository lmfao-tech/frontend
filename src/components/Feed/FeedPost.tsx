import { HeartIcon } from "@heroicons/react/outline";
import {
  ExternalLinkIcon,
  HeartIcon as HeartIconSolid,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";
import { ShareIcon } from "@heroicons/react/outline";
import React, { useEffect } from "react";
import type Post from "~/types/Post";
import { RWebShare } from "react-web-share";
import { useSession } from "next-auth/react";
import { useHaha } from "~/contexts/HahaContext";
import { useRouter } from "next/router";
import Image from "next/image";

const removeLinksHashtagsMention = (text: string) => {
  function unEscape(htmlStr: string) {
    htmlStr = htmlStr.replace(/&lt;/g, "<");
    htmlStr = htmlStr.replace(/&gt;/g, ">");
    htmlStr = htmlStr.replace(/&quot;/g, '"');
    htmlStr = htmlStr.replace(/&#39;/g, "'");
    htmlStr = htmlStr.replace(/&amp;/g, "&");
    return htmlStr;
  }

  let m = text.replace(/\s#\w+/g, "").replace(/\s@\w+/g, "");

  // Remove t.co links
  m = m.replace(/https?:\/\/t.co\/\w+/g, "");
  return unEscape(m);
};

function FeedPost({ post }: { post: Post }) {
  const { like, unlike, coins, likes } = useHaha();
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  const vibrateOnceOnClick = () => {
    window.navigator?.vibrate?.(200);
  };

  const [liked, setLiked] = React.useState(false);
  const [retweeted, setRetweeted] = React.useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const e = likes.find((l) => l.id == post.tweet_id);
    setLiked(e !== undefined && e !== null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes]);

  return (
    <div className="py-0.5 my-2 md:my-4 bg-white shadow-md dark:bg-[#242424] dark:border-gray-900 md:rounded-xl rounded-md break-inside-avoid h-fit w-full">
      {/* Top section */}
      <div>
        <div className="flex items-center justify-between h-12 mx-4 ">
          <a
            className="flex items-center"
            href={`https://twitter.com/${post.username}`}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              className="w-8 h-8 rounded-full"
              src={post.profile_image_url}
              alt="avatar"
              width={23}
              height={23}
              placeholder="blur"
              blurDataURL="/icons/defaultpfp.jpg"
              unoptimized
            />
            <div className="mx-2 font-mono text-sm text-slate-800 dark:text-slate-300">
              {post.username}
            </div>
          </a>
          {session && (
            <div className="flex ml-1">
              <button
                className="text-[.5rem] md:text-[.7rem] mt-1 px-2 py-1 text-cyan-500 border-2 border-cyan-200 rounded-lg hover:bg-cyan-600 hover:text-white cursor-pointer dark:border-slate-600"
                onClick={async () => {
                  const resp = await fetch(
                    `/api/twitter/tweet/follow?id=${post.user_id}`
                  );
                }}
              >
                Follow
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex py-2 mx-3 ml-5 text-xs md:text-sm font-montserrat dark:text-slate-300">
        {removeLinksHashtagsMention(post.tweet_text)}
      </div>
      <div className="w-full my-2 border-y dark:border-slate-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full text-slate-500 px-0.5"
          src={post.meme_link}
          alt={`Image not found, tweet might be deleted -  ${post.tweet_text}`}
        />
      </div>
      {!session && (
        <div className="mb-3 ml-5">
          <button
            onClick={() => router.push("/dash")}
            className="px-3 py-2 text-sm border rounded-full cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 dark:text-white"
          >
            Login to interact
          </button>
        </div>
      )}
      <div className="flex gap-2 mb-2 ml-5">
        {!liked ? (
          <button
            disabled={!session}
            className={`p-2 rounded-full group ${
              !session ? "hover:bg-none" : "hover:bg-red-700/20 cursor-pointer"
            }`}
            onClick={async () => {
              like(post.tweet_id, post.username);
              vibrateOnceOnClick();
            }}
          >
            <HeartIcon
              className={`w-6 h-6 text-gray-400 ${
                !session ? null : " group-hover:text-red-600"
              }`}
            />
          </button>
        ) : (
          <div
            className="p-2 rounded-full cursor-pointer hover:bg-red-700/20 group"
            onClick={async () => {
              unlike(post.tweet_id, post.username);
              vibrateOnceOnClick();
            }}
          >
            <HeartIconSolid className="w-6 h-6 text-red-500" />
          </div>
        )}
        {!retweeted ? (
          <button
            disabled={!session}
            className={`p-2 rounded-full group ${
              !session
                ? "hover:bg-none"
                : "cursor-pointer hover:bg-green-700/20"
            }`}
            onClick={async () => {
              setRetweeted(true);
              const resp = await fetch(
                `/api/twitter/tweet/retweet?id=${post.tweet_id}`
              );
              vibrateOnceOnClick();
              const data = await resp.json();
            }}
          >
            <SwitchHorizontalIcon
              className={`w-6 h-6 text-gray-400 ${
                !session ? null : "group-hover:text-green-400"
              }`}
            />
          </button>
        ) : (
          <div
            className="p-2 rounded-full cursor-pointer hover:bg-green-700/20 group"
            onClick={async () => {
              setRetweeted(false);
              const resp = await fetch(
                `/api/twitter/tweet/unretweet?id=${post.tweet_id}`
              );
              vibrateOnceOnClick();
              const data = await resp.json();
            }}
          >
            <SwitchHorizontalIcon className="w-6 h-6 text-green-400" />
          </div>
        )}
        <a
          href={post.tweet_link}
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-md bg-slate-200 dark:bg-slate-400"
        >
          <ExternalLinkIcon className="w-6 h-6" />
        </a>
        <button className="flex items-center justify-center px-2 py-1 rounded-md cursor-pointer bg-slate-200 hover:bg-blue-200 dark:bg-yellow-400">
          <RWebShare
            data={{
              title: "Meme discovered on LMFAO.tech | #LMFAOtech",
              url: post.tweet_link,
              text: post.tweet_text,
            }}
          >
            <ShareIcon className="w-5 h-5 text-green-400 dark:text-slate-900" />
          </RWebShare>
        </button>
      </div>
    </div>
  );
}

export default FeedPost;
