import { ReactElement, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useState, useRef, useCallback } from "react";
import FeedPost from "~/components/Feed/FeedPost";
import Post from "~/types/Post";
import usePostFeed from "~/hooks/usePostFeed";
import FeedPage from "~/components/layouts/FeedPage";
import { Spinner } from "flowbite-react";

const Home: NextPage = () => {
  const [last, setLastTweet] = useState<number>(0);
  let {
    memes,
    loading,
    hasMore,
  }: { memes: Post[]; loading: boolean; hasMore: boolean } = usePostFeed({
    url: `/api/getMemes?last=${last}&max_tweets=5`,
  });
  const observer = useRef<IntersectionObserver>();

  const lastMemeRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) {
          setLastTweet(memes.length);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, memes.length]
  );

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home | LMFAO.tech</title>
      </Head>

      <div className="flex flex-col w-full overflow-hidden bg-gray-100 shadow-sm ">
        <div className="flex flex-col px-1 md:px-20 overflow-auto scrollbar-thin scrollbar-thumb-slate-200 dark:bg-[#222e42] ">
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
              <div className="dark:bg-[#222e42] dark:text-white">
                Loading... <Spinner />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// @ts-ignore
Home.getLayout = (page: ReactElement) => {
  return <FeedPage>{page}</FeedPage>;
};

export default Home;
