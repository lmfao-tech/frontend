import React from "react";
import FeedPost from "./FeedPost";
import Post from "~/types/Post";
import Masonry from "react-masonry-css";

const post = {
  id: "1",
  uploadedBy: "John Doe",
  date: "2020-01-01",
  description: "This is a description",
  image: "https://i.redd.it/zebwwgvx6c891.jpg",
  uploadedByAvatar: "https://i.redd.it/uvw5fn5736891.jpg",
};
const post2 = {
  id: "1",
  uploadedBy: "John Doe",
  date: "2020-01-01",
  description: "This is a longer description that has been ...",
  image: "https://i.redd.it/uvw5fn5736891.jpg",
  uploadedByAvatar: "https://i.redd.it/uvw5fn5736891.jpg",
};

const breakpointColumnsObj = {
  default: 2,
  640: 1,
};

function FeedGrid() {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-full h-full overflow-auto scrollbar-thin scrollbar-thumb-slate-200"
    >
      <FeedPost post={post} />
      <FeedPost post={post2} />
      <FeedPost post={post} />
      <FeedPost post={post} />
      <FeedPost post={post2} />
      <FeedPost post={post} />
      <FeedPost post={post2} />
      <FeedPost post={post2} />
      <FeedPost post={post} />
    </Masonry>
  );
}

export default FeedGrid;
