import { HeartIcon } from "@heroicons/react/outline";
import {
  ExternalLinkIcon,
  HeartIcon as HeartIconSolid,
  ShareIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";
import React from "react";
import type Post from "~/types/Post";
import { RWebShare } from "react-web-share";

function FeedPost({ post }: { post: Post }) {
  const [liked, setLiked] = React.useState(false);
  const [following, setFollowing] = React.useState(false);
  const [retweeted, setRetweeted] = React.useState(false);

  return (
    <div className="p-2 my-4 mx-4 md:mx-0 bg-white dark:bg-slate-800 dark:border-gray-900 rounded-2xl border break-inside-avoid h-fit shadow-md">
      {/* Top section */}
      <a target="_blank" rel="noreferrer">
        <div>
          <div className="flex items-center justify-between h-16 mx-4">
            <div className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-8 h-8 mr-2 rounded-full"
                src={post.profile_image_url}
                alt="avatar"
              />
              <div className="text-md font-semibold text-slate-800 dark:text-slate-400">
                {post.user}
              </div>
              <div className="ml-2 flex gap-2">
                {following ? (
                  <button className="text-[.7rem] px-3 py-2 text-gray-800 bg-cyan-200 rounded">
                    Following
                  </button>
                ) : (
                  <button
                    className="text-[.7rem] px-3 py-2 text-cyan-500 border-2 border-cyan-200 rounded hover:bg-cyan-200 hover:text-gray-700 cursor-pointer"
                    onClick={async () => {
                      setFollowing(true);
                      const resp = await fetch(
                        `/api/twitter/tweet/follow?id=${post.user_id}`
                      );
                      const data = await resp.json();
                      console.log(data);
                    }}
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
            <div className="m-2 text-xs text-slate-500 dark:text-slate-300">
              {post.tweet_created_at}
            </div>
          </div>
        </div>
        <div className="flex mx-3 ml-5 md:text-sm font-montserrat dark:text-slate-300">
          {unescape(
            post.tweet_text
              .split(" ")
              .slice(0, -1)
              .join(" ")
              .substring(0, 120) + (post.tweet_text.length > 120 ? "..." : "")
          )}
        </div>
        <div className="p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="rounded-lg" src={post.meme_link} alt="" />
        </div>
      </a>
      <div className="flex gap-2 ml-5 mb-2">
        {!liked ? (
          <div
            className="hover:bg-red-300 rounded-full p-1 group cursor-pointer"
            onClick={async () => {
              setLiked(true);
              const resp = await fetch(
                `/api/twitter/tweet/like?id=${post.tweet_id}`
              );
              const data = await resp.json();

              console.log(data);
            }}
          >
            <HeartIcon className="h-7 w-7 text-red-300 group-hover:text-gray-600" />
          </div>
        ) : (
          <div
            className="hover:bg-red-100 rounded-full p-1 group cursor-pointer"
            onClick={async () => {
              setLiked(false);
              const resp = await fetch(
                `/api/twitter/tweet/unlike?id=${post.tweet_id}`
              );
              const data = await resp.json();

              console.log(data);
            }}
          >
            <HeartIconSolid className="h-7 w-7 text-red-500" />
          </div>
        )}

        {!retweeted ? (
          <div
            className="p-1 cursor-pointer rounded-full hover:bg-blue-200 group"
            onClick={async () => {
              setRetweeted(true);
              const resp = await fetch(
                `/api/twitter/tweet/retweet?id=${post.tweet_id}`
              );
              const data = await resp.json();

              console.log(data);
            }}
          >
            <SwitchHorizontalIcon className="h-6 w-6 text-blue-200 group-hover:text-blue-700" />
          </div>
        ) : (
          <div
            className="p-1 cursor-pointer rounded-full hover:bg-blue-100 group"
            onClick={async () => {
              setRetweeted(false);
              const resp = await fetch(
                `/api/twitter/tweet/unretweet?id=${post.tweet_id}`
              );
              const data = await resp.json();

              console.log(data);
            }}
          >
            <SwitchHorizontalIcon className="h-6 w-6 text-blue-600 group-hover:text-blue-800" />
          </div>
        )}

        <a href={post.tweet_link} target="_blank" rel="noreferrer" className="p-1 rounded-md bg-slate-200">
          <ExternalLinkIcon className="h-6 w-6"/>
        </a>

        <div className="p-1 rounded-md bg-slate-200 hover:bg-blue-200 cursor-pointer">
          <RWebShare
            data={{
              title: "Meme discovered on LMFAO.tech | #LMFAOtech",
              url: post.tweet_link,
              text: post.tweet_text,
            }}
          >
            <ShareIcon className="h-6 w-6 text-green-400" />
          </RWebShare>
        </div>
      </div>
    </div>
  );
}

export default FeedPost;
