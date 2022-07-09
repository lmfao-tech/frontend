import type { NextPage } from "next";
import Head from "next/head";
import { useState, useRef, useCallback } from "react";
import FeedPost from "~/components/Feed/FeedPost";
import Masonry from "react-masonry-css";
import Post from "~/types/Post";
import usePostFeed from "~/hooks/usePostFeed";

const breakpointColumnsObj = {
  default: 2,
  1100: 3,
  640: 1,
};

const Home: NextPage = () => {
  const {
    memes,
    loading,
    hasMore,
  }: { memes: Post[]; loading: boolean; hasMore: boolean } = usePostFeed({
    url: `/api/hotMemes`,
  });

  return (
    <>
      <Head>
        <title>LMFAO.tech</title>
        <meta name="description" content="LMFAO.tech | Home" />
      </Head>

      <div className="h-full overflow-hidden w-full shadow-sm flex flex-col">
        <div className="flex flex-col px-1 md:px-24 w-full h-full overflow-auto scrollbar-thin scrollbar-thumb-slate-200 dark:bg-[#222e42]">
          {[... new Set(memes)].map((post, index) => (
                <div key={post.tweet_id}>
                  <FeedPost post={post} />
                </div>
          )
          )}
          {loading && <div>Loading...</div>}
        </div>
      </div>
    </>
  );
};

export default Home;
