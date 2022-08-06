import { ReactElement, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useState, useRef, useCallback } from "react";
import FeedPost from "~/components/Feed/FeedPost";
import Post from "~/types/Post";
import usePostFeed from "~/hooks/usePostFeed";
import FeedPage from "~/components/layouts/FeedPage";
import NextPageWithLayout from "~/types/NextPageWithLayout";
import { Spinner } from "flowbite-react";

const Community: NextPageWithLayout = () => {
  const [last, setLastTweet] = useState<number>(0);
  let {
    memes,
    loading,
    hasMore,
  }: { memes: Post[]; loading: boolean; hasMore: boolean } = usePostFeed({
    url: `/api/communityMemes?last=${last}&max_tweets=5`,
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
        <title>Community memes | LMFAO.tech</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="flex flex-col w-full mb-20 overflow-hidden shadow-sm md:md-0">
        <div className="flex flex-col md:px-32">
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
    </>
  );
};

Community.getLayout = (page: ReactElement) => {
  return <FeedPage>{page}</FeedPage>;
};

export default Community;
