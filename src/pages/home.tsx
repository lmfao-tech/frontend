import { ReactElement } from "react";
import Head from "next/head";
import { useState, useRef, useCallback } from "react";
import FeedPost from "~/components/FeedPost";
import Post from "~/types/Post";
import usePostFeed from "~/hooks/usePostFeed";
import FeedPage from "~/components/layouts/FeedPage";
import { Spinner } from "flowbite-react";
import NextPageWithLayout from "~/types/NextPageWithLayout";
import { useNotifs } from "~/contexts/NotifyContext";

const Home: NextPageWithLayout = () => {
  const [last, setLast] = useState<number>(0);
  const { unseens } = useNotifs();

  let {
    memes,
    loading,
    hasMore,
  }: { memes: Post[]; loading: boolean; hasMore: boolean } = usePostFeed({
    url: `/api/communityMemes?last=${last}&max_tweets=10`,
  });
  const observer = useRef<IntersectionObserver>();

  const lastMemeRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) {
          setLast(memes.length);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, memes]
  );

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          {`${unseens > 0 ? (unseens > 9 ? "(9+) " : `(${unseens}) `) : " "} Home | LMFAO.tech`}
        </title>
      </Head>

      <div className="flex flex-col w-full mb-20 overflow-hidden shadow-sm md:md-0">
        <div className="flex flex-col px-2 md:px-32">
          {memes?.map((post, index) => {
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

Home.getLayout = (page: ReactElement) => {
  return <FeedPage>{page}</FeedPage>;
};

export default Home;
