import { useState, useRef, useCallback } from "react";
import FeedPost from "./FeedPost";
import Masonry from "react-masonry-css";
import Post from "~/types/Post";
import usePostFeed from "~/hooks/usePostFeed";

const breakpointColumnsObj = {
  default: 2,
  1100: 3,
  640: 1,
};


function FeedGrid() {
  const [last, setLastTweet] = useState<number>(0);
  const { memes, loading, hasMore } : {memes:Post[], loading:boolean, hasMore:boolean} = usePostFeed({ lastMemeIndex:last });
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
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-full h-full overflow-auto scrollbar-thin scrollbar-thumb-slate-200"
    >
      {/* TODO: Eliminate duplicates*/}
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
      {loading && <div>Loading...</div>}
    </Masonry>
  );
}

export default FeedGrid;
