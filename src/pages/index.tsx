import { ReactElement, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useState, useRef, useCallback } from "react";
import FeedPost from "~/components/Feed/FeedPost";
import Post from "~/types/Post";
import usePostFeed from "~/hooks/usePostFeed";
import FeedPage from "~/components/layouts/FeedPage";

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
        <title>LMFAO.tech</title>
        <meta
          name="description"
          content="LMFAO.tech | Discover memes from all around the internet | Home🌐"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/logo-white.png" />
        <meta name="keywords" content="LMFAO, lol, memes, twitter memes" />
        <meta name="language" content="en" />
        <meta name="url" content="https://LMFAO.tech" />

        <meta name="og:title" content="LMFAO.tech" />
        <meta name="og:type" content="social" />
        <meta name="og:url" content="https://lmfao.tech" />
        <meta name="og:image" content="https://lmfao.tech/og-image.png" />
        <meta name="og:site_name" content="LMFAO.tech" />
        <meta
          name="og:description"
          content="LMFAO.tech - A content discovery platform where you can find memes from all across the internet and go LMFAO"
        />
        <meta name="og:email" content="hi@lmfao.tech" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="LMFAO.tech" />
        <meta
          property="twitter:title"
          content="LMFAO.tech - A content discovery platform"
        />
        <meta
          property="twitter:description"
          content="LMFAO.tech: where you can find memes from all across the intenret and go LMFAO"
        />
        <meta
          property="twitter:image"
          content="https://lmfao.tech/og-image.png"
        />
      </Head>

      <div className="flex flex-col w-full overflow-hidden bg-gray-100 shadow-sm ">
          <div
            className="flex flex-col px-1 md:px-20 overflow-auto scrollbar-thin scrollbar-thumb-slate-200 dark:bg-[#222e42] "
          >
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
                  Loading...
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
