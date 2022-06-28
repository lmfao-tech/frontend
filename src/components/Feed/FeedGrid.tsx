import React from "react";
import FeedPost from "./FeedPost";
import Post from "~/types/Post";

const post = {
  id: "1",
  uploadedBy: "John Doe",
  date: "2020-01-01",
  description: "This is a description",
  image: "https://i.redd.it/uvw5fn5736891.jpg",
  uploadedByAvatar: "https://i.redd.it/uvw5fn5736891.jpg",
};

function FeedGrid() {
  return (
    <div className="grid h-full overflow-auto md:grid-cols-2 lg:grid-cols-3 grid-flow-dense bg-slate-100 scrollbar-thin scrollbar-thumb-slate-200">
      <FeedPost post={post} />
      <FeedPost post={post} />
      <FeedPost post={post} />
      <FeedPost post={post} />
      <FeedPost post={post} />
      <FeedPost post={post} />
      <FeedPost post={post} />
      <FeedPost post={post} />
      <FeedPost post={post} />
    </div>
  );
}

export default FeedGrid;
