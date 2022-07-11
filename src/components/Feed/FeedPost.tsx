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
import { useSession } from "next-auth/react";
import useLocalStorage from "~/hooks/useLocalStorage";

function FeedPost({ post }: { post: Post }) {
  const [liked, setLiked] = React.useState(false);
  const [following, setFollowing] = useLocalStorage(
    false,
    `follow-${post.user_id}`
  );
  const [retweeted, setRetweeted] = React.useState(false);

  const { data: session } = useSession();

  return (
    <div className="p-2 mx-4 my-4 bg-white border shadow-md md:mx-0 dark:bg-slate-800 dark:border-gray-900 rounded-2xl break-inside-avoid h-fit">
      {/* Top section */}
      <a target="_blank" rel="noreferrer">
        <div>
          <div className="flex items-center justify-between h-16 mx-4">
            <div className="flex items-center">
              <a
                className="flex items-center"
                href={`https://twitter.com/${post.username}`}
                target="_blank"
                rel="noreferrer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-8 h-8 mr-2 rounded-full"
                  src={post.profile_image_url}
                  alt="avatar"
                />
                <div className="font-semibold text-md text-slate-800 dark:text-slate-400">
                  {post.user}
                </div>
              </a>
              {session && (
                <div className="flex gap-2 ml-2">
                  {following ? (
                    <button
                      className="text-[.7rem] px-3 py-2 text-gray-800 bg-cyan-200 rounded"
                      onClick={async () => {
                        setFollowing(false);
                        const resp = await fetch(
                          `/api/twitter/tweet/unfollow?id=${post.user_id}`
                        );
                        const data = await resp.json();
                        console.log(data);
                      }}
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      className="text-[.7rem] px-3 py-2 text-cyan-500 border-2 border-cyan-200 rounded-lg hover:bg-cyan-200 hover:text-gray-700 cursor-pointer dark:border-slate-400"
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
              )}
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
          <img className="rounded-lg max-h-96" src={post.meme_link} alt="" />
        </div>
      </a>
      {session && (
        <div className="flex gap-2 mb-2 ml-5">
          {!liked ? (
            <div
              className="p-2 rounded-full cursor-pointer hover:bg-red-300 group"
              onClick={async () => {
                setLiked(true);
                const resp = await fetch(
                  `/api/twitter/tweet/like?id=${post.tweet_id}`
                );
                const data = await resp.json();

                console.log(data);
              }}
            >
              <HeartIcon className="w-6 h-6 text-red-300 group-hover:text-gray-600" />
            </div>
          ) : (
            <div
              className="p-2 rounded-full cursor-pointer hover:bg-red-100 group"
              onClick={async () => {
                setLiked(false);
                const resp = await fetch(
                  `/api/twitter/tweet/unlike?id=${post.tweet_id}`
                );
                const data = await resp.json();

                console.log(data);
              }}
            >
              <HeartIconSolid className="w-6 h-6 text-red-500" />
            </div>
          )}

          {!retweeted ? (
            <div
              className="p-2 rounded-full cursor-pointer hover:bg-blue-200 group"
              onClick={async () => {
                setRetweeted(true);
                const resp = await fetch(
                  `/api/twitter/tweet/retweet?id=${post.tweet_id}`
                );
                const data = await resp.json();

                console.log(data);
              }}
            >
              <SwitchHorizontalIcon className="w-6 h-6 text-blue-200 group-hover:text-blue-700" />
            </div>
          ) : (
            <div
              className="p-2 rounded-full cursor-pointer hover:bg-blue-100 group"
              onClick={async () => {
                setRetweeted(false);
                const resp = await fetch(
                  `/api/twitter/tweet/unretweet?id=${post.tweet_id}`
                );
                const data = await resp.json();

                console.log(data);
              }}
            >
              <SwitchHorizontalIcon className="w-6 h-6 text-blue-600 group-hover:text-blue-800" />
            </div>
          )}

          <a
            href={post.tweet_link}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-400"
          >
            <ExternalLinkIcon className="w-6 h-6" />
          </a>

          <div className="flex items-center justify-center px-2 py-1 rounded-full cursor-pointer bg-slate-200 hover:bg-blue-200 dark:bg-slate-400">
            <RWebShare
              data={{
                title: "Meme discovered on LMFAO.tech | #LMFAOtech",
                url: post.tweet_link,
                text: post.tweet_text,
              }}
            >
              <ShareIcon className="w-5 h-5 text-green-400 dark:text-slate-900" />
            </RWebShare>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedPost;
