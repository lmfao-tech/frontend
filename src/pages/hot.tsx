import type { NextPage } from "next";
import Head from "next/head";
import FeedPost from "~/components/Feed/FeedPost";
import FeedPage from "~/components/layouts/FeedPage";
import Post from "~/types/Post";
import usePostFeed from "~/hooks/usePostFeed";

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
        <title>Hot posts on LMFAO.tech</title>
        <meta name="description" content="LMFAO.tech | Hot posts" />
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


// @ts-ignore
Home.getLayout = (page) => {
  return (
    <FeedPage>{page}</FeedPage>
  )
}

export default Home;
