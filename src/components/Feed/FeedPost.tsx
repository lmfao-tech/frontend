import React from "react";
import type Post from "~/types/Post";

function FeedPost({ post }: { post: Post }) {
  return (
    <div className="p-2 my-4 mx-4 md:mx-0 bg-white dark:bg-slate-800 dark:border-gray-900 rounded-2xl border break-inside-avoid h-fit shadow-md">
      {/* Top section */}
      <a href={post.tweet_link} target="_blank" rel="noreferrer">
        <div>
          {/* User avatar */}
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
            </div>
            <div className="m-2 text-xs text-slate-500 dark:text-slate-300">
              {post.tweet_created_at}
            </div>
          </div>
        </div>
        <div className="flex mx-3 ml-5 md:text-sm font-montserrat dark:text-slate-300">
          {unescape(post.tweet_text.split(" ").slice(0, -1).join(" ").substring(0, 120) + (post.tweet_text.length > 120? "..." : ""))}
        </div>
        <div className="p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="rounded-lg" src={post.meme_link} alt="" />
        </div>
      </a>
    </div>
  );
}

export default FeedPost;
