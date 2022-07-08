import React, { useEffect, useRef } from "react";
import FeedPost from "./FeedPost";
import Masonry from "react-masonry-css";
import Post from "~/types/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWR from "swr";

const breakpointColumnsObj = {
  default: 2,
  1100: 3,
  640: 1,
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function FeedGrid() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [postsShown, setPostsShown] = React.useState<Post[]>([]);
  const [currentNumber, setCurrentNumber] = React.useState<number>(0);

  const { data, error } = useSWR("/api/getMemes", fetcher);

  useEffect(() => {
    if (data) {
      setPosts(data["meme_stream"]);
      setPostsShown(data["meme_stream"].slice(0, 10));
    }
  }
  , [data]);

  

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-full h-full overflow-auto scrollbar-thin scrollbar-thumb-slate-200"
      >
        {posts.map((post) => (
          <FeedPost key={post.tweet_created_at} post={post} />
        ))}
      </Masonry>
  );
}

export default FeedGrid;
