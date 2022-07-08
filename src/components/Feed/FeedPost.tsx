import React from "react";
import { HeartIcon, ChatIcon, BookmarkIcon } from "@heroicons/react/solid";
import type Post from "~/types/Post";

function FeedPost({ post }: { post: Post }) {
  return (
    <div className="m-4 bg-white rounded-lg shadow-md break-inside-avoid h-fit">
      {/* Top section */}
      <a href={post.tweet_link}>
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
              <div className="text-sm font-semibold text-slate-800">
                {post.user}
              </div>
            </div>
            <div className="m-2 text-xs text-slate-500">
              {post.tweet_created_at}
            </div>
          </div>
        </div>
        <div className="flex mx-3 text-sm font-montserrat">{post.tweet_text}</div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="rounded-md" src={post.meme_link} alt="" />
      </a>
    </div>
  );
}

export default FeedPost;
