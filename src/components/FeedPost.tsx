import { HeartIcon } from "@heroicons/react/outline";
import {
  ExternalLinkIcon,
  HeartIcon as HeartIconSolid,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";
import { ShareIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import type Post from "~/types/Post";
import { RWebShare } from "react-web-share";
import { useSession } from "next-auth/react";
import { useHaha } from "~/contexts/HahaContext";
import { useRouter } from "next/router";
import Image from "next/image";
import { Spinner } from "flowbite-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Status } from "~/types/Request";
import toast from "react-hot-toast";

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

const isUrlImage = (url: string) => {
  return (
    url.endsWith(".jpg") ||
    url.endsWith(".jpeg") ||
    url.endsWith(".png") ||
    url.endsWith(".gif") ||
    url.endsWith(".webp")
  );
};

function FeedPost({
  post,
  removed = false,
}: {
  post: Post;
  removed?: boolean;
}) {
  const { like, unlike, likes, follow, unfollow, mod, retweet, unretweet } =
    useHaha();

  const [followed, setFollowed] = useState<boolean>(false);

  const [deleted, setDeleted] = useState<boolean>(removed);
  const [banned, setBanned] = useState<boolean>(false);
  const router = useRouter();

  const vibrateOnceOnClick = () => {
    window.navigator?.vibrate?.(200);
  };

  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const old = localStorage.getItem("follows");

    if (old && old.length > 0) {
      const ummYeah = JSON.parse(old);
    }
  }, []);

  useEffect(() => {
    const e = likes.find((l) => l.id == post.tweet_id);
    setLiked(e !== undefined && e !== null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes]);

  const isModPage = router.route === "/mod";
  const isCommunityPage = router.route === "/home";

  return (
    <div
      className={`py-0.5 my-1 md:my-4 bg-white shadow-md dark:bg-[#242424] dark:border-gray-900 md:rounded-xl rounded-md break-inside-avoid h-fit w-full ${
        !isModPage ? (post.removed_by ? "hidden" : "block") : "block"
      }`}
    >
      {/* Top section */}
      <div>
        <div className="flex items-center justify-between h-12 mx-4 ">
          <a
            className="flex items-center"
            href={`/u/${post.username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="w-8 h-8 rounded-full"
              src={post.profile_image_url}
              alt="avatar"
              width={23}
              height={23}
              unoptimized
            />
            <div className="mx-2 font-mono text-sm text-slate-800 dark:text-slate-300">
              {post.username}
            </div>
          </a>
          {session && (
            <div className="flex ml-1">
              {!followed ? (
                <button
                  className="text-[.5rem] md:text-[.7rem] mt-1 px-2 py-1 text-cyan-500 border-2 dark:hover:bg-slate-600 border-cyan-200 rounded-lg hover:bg-cyan-200 hover:text-white cursor-pointer dark:border-slate-600 umami--click--follow-user"
                  onClick={async () => {
                    setFollowed(true);
                    await follow(post.user_id, post.username);
                  }}
                >
                  Follow
                </button>
              ) : (
                <button
                  className="text-[.5rem] bg-cyan-100 hover:bg-cyan-200 dark:bg-slate-500 dark:hover:bg-transparent text-white md:text-[.7rem] mt-1 px-2 py-1 border-2 border-cyan-200 rounded-lg hover:text-white cursor-pointer dark:border-slate-600 umami--click--unfollow-user"
                  onClick={async () => {
                    setFollowed(false);
                    await unfollow(post.user_id, post.username);
                  }}
                >
                  Followed
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {post.removed_by && (
        <div className="mx-3 ml-5 text-gray-700 dark:text-white">
          Removed by{" "}
          <a
            className="text-blue-500"
            href={`https://twitter.com/${post.removed_by}`}
          >
            {post.removed_by}
          </a>
        </div>
      )}
      <div className="flex py-2 mx-3 ml-5 text-xs md:text-sm font-montserrat dark:text-slate-300">
        {isCommunityPage
          ? post.tweet_text
          : removeLinksHashtagsMention(post.tweet_text)}
      </div>
      <div
        className={`w-full px-0 my-2 md:px-3 ${
          !isUrlImage(post.meme_link) && "hidden"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <LazyLoadImage
          className="w-full rounded-md text-slate-500"
          src={post.meme_link}
          effect="blur"
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
      <div className="flex gap-3 mb-2 ml-3">
        {!liked ? (
          <button
            disabled={!session}
            className={`p-2 rounded-full group umami--click--like-button ${
              !session ? "hover:bg-none" : "hover:bg-red-700/20 cursor-pointer"
            }`}
            onClick={async () => {
              setLiked(true);
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
            className="p-2 rounded-full cursor-pointer hover:bg-red-700/20 group umami--click--unlike-button"
            onClick={async () => {
              setLiked(false);
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
            className={`p-2 rounded-full group umami--click--retweet-button ${
              !session
                ? "hover:bg-none"
                : "cursor-pointer hover:bg-green-700/20"
            }`}
            onClick={async () => {
              setRetweeted(true);
              const data: any = await retweet(post.tweet_id);
              vibrateOnceOnClick();
              if (data.success === Status.Success) {
                toast.success("Retweeted successfully", {
                  style: {
                    backgroundColor: "#292929",
                    color: "white",
                  },
                });
              } else if (data.success === Status.Failure) {
                toast.error("An error occured while retweeting the post...", {
                  style: {
                    backgroundColor: "#292929",
                    color: "white",
                  },
                });
                setRetweeted(false);
              }
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
            className="p-2 rounded-full cursor-pointer hover:bg-green-700/20 group umami--click--undo-retweet-button"
            onClick={async () => {
              setRetweeted(false);
              const resp = await fetch(
                `/api/twitter/tweet/unretweet?id=${post.tweet_id}`
              );
              vibrateOnceOnClick();
              const data = await resp.json();
              if (data.success === Status.Success) {
                toast.success("Unretweeted successfully", {
                  style: {
                    backgroundColor: "#292929",
                    color: "white",
                  },
                });
              } else if (data.success === Status.Failure) {
                toast.error("An error occured while unretweeting the post...", {
                  style: {
                    backgroundColor: "#292929",
                    color: "white",
                  },
                });
              }
            }}
          >
            <SwitchHorizontalIcon className="w-6 h-6 text-green-400" />
          </div>
        )}
        <a
          href={post.tweet_link}
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-md bg-slate-200 dark:bg-slate-400 umami--click--external-link-button"
        >
          <ExternalLinkIcon className="w-6 h-6 text-black" />
        </a>
        <button className="flex items-center justify-center px-2 py-1 rounded-md cursor-pointer bg-slate-200 hover:bg-blue-200 dark:bg-yellow-400">
          <RWebShare
            data={{
              title: "Meme discovered on LMFAO.tech | @LMFAO_tech",
              url: post.tweet_link,
              text: post.tweet_text,
            }}
          >
            <ShareIcon className="w-5 h-5 text-green-400 dark:text-slate-900 umami--click--share-button" />
          </RWebShare>
        </button>
        {mod && (
          <>
            <button
              className={`text-[.5rem] md:text-[.7rem] px-2 py-1 text-red-500 border-2 dark:hover:bg-red-400 border-red-200 rounded-lg umami--click--delete-revive-post ${
                deleted && "bg-red-200"
              } hover:bg-red-200 hover:text-white cursor-pointer dark:border-red-400`}
              onClick={async () => {
                setIsDeleteLoading(true);
                if (!deleted) {
                  await fetch(`/api/mods/remove_post?id=${post.tweet_id}`).then(
                    (res) => {
                      res.json();
                      if (res.ok === true) {
                        setDeleted(true);
                      }
                      setIsDeleteLoading(false);
                    }
                  );
                } else {
                  await fetch(`/api/mods/revive_post?id=${post.tweet_id}`).then(
                    (res) => {
                      res.json();
                      if (res.ok === true) {
                        setDeleted(false);
                      }
                      setIsDeleteLoading(false);
                    }
                  );
                }
              }}
            >
              {deleted ? "Revive" : "Delete"} {isDeleteLoading && <Spinner />}
            </button>

            <button
              className={`text-[.5rem] px-3 md:text-[.7rem] py-1 text-red-500 border-2 dark:hover:bg-red-400 border-red-200 rounded-lg umami--click--ban-user ${
                banned && "bg-red-200"
              } hover:bg-red-200 hover:text-white cursor-pointer dark:border-red-400`}
              disabled={banned}
              onClick={async () => {
                if (!banned) {
                  await fetch(`/api/mods/ban_user?user=${post.username}`).then(
                    (res) => {
                      res.json();
                      setBanned(true);
                    }
                  );
                }
              }}
            >
              {banned ? "User banned" : "Ban"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default FeedPost;
