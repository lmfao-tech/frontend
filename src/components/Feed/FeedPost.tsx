import React from "react";
import type Post from "~/types/Post";

function FeedPost({ post }: { post: Post }) {
  return (
    <div className="p-2 my-4 mx-4 md:mx-0 bg-white dark:bg-slate-800 dark:border-gray-900 rounded-2xl border break-inside-avoid h-fit shadow-md">
      {/* Top section */}
      <a target="_blank" rel="noreferrer">
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
              <div className="ml-2 flex gap-2">
                <button className="text-[.7rem] px-3 py-2 text-gray-800 bg-cyan-200 rounded">
                  Following
                </button>
                <button className="text-[.7rem] px-3 py-2 text-cyan-500 border-2 border-cyan-200 rounded" onClick={async () => {
                  // const resp = await fetch(`/api/twitter/tweet/follow?id=${post.user}`);
                  // const data = await resp.json();
                  // console.log(data)
                }}>
                  Follow
                </button>
              </div>
            </div>
            <div className="m-2 text-xs text-slate-500 dark:text-slate-300">
              {post.tweet_created_at}
            </div>
          </div>
        </div>
        <div className="flex mx-3 ml-5 md:text-sm font-montserrat dark:text-slate-300">
          {unescape(post.tweet_text.split(" ").slice(0, -1).join(" ").substring(0, 120) + (post.tweet_text.length > 120 ? "..." : ""))}
        </div>
        <div className="p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="rounded-lg" src={post.meme_link} alt="" />
        </div>
      </a>
      <div className="flex gap-2 ml-5 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" onClick={async () => {
          const resp = await fetch(`/api/twitter/tweet/like?id=${post.tweet_id}`);
          const data = await resp.json();

          console.log(data)
        }} viewBox="0 0 512 512" fill="red" height="25"><path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" /></svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="red"
          height="25"
          onClick={async () => {
            const resp = await fetch(`/api/twitter/tweet/unlike?id=${post.tweet_id}`);
            const data = await resp.json();

            console.log(data)
          }}
        >
          <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" onClick={async () => {
          const resp = await fetch(`/api/twitter/tweet/retweet?id=${post.tweet_id}`);
          const data = await resp.json();

          console.log(data)
        }} className="h-6 w-6" fill="lightgreen" viewBox="0 0 24 24" stroke="blue" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" onClick={async () => {
          const resp = await fetch(`/api/twitter/tweet/unretweet?id=${post.tweet_id}`);
          const data = await resp.json();

          console.log(data)
        }} className="h-6 w-6" fill="lightgreen" viewBox="0 0 24 24" stroke="blue" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      </div>
    </div>
  );
}

export default FeedPost;
