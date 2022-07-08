import React, {useEffect, useRef} from "react";
import FeedPost from "./FeedPost";
import Masonry from "react-masonry-css";
import Post from "~/types/Post";

const breakpointColumnsObj = {
  default: 2,
  1100: 3,
  640: 1,
};

function FeedGrid() {
  
  const [posts, setPosts] = React.useState<Post[]>([]);
  
  useEffect(() => {
    fetch("/api/getMemes")
      .then(res => res.json())
      .then(data => {
        setPosts(data['meme_stream']);
      }
    );
  }
  , []);

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
