import React from "react";
import FeedGrid from "./Feed/FeedGrid";
import Profile from "./ProfileBar/Profile";
import TopBar from "./TopBar";

function MainPage() {
  return (
    <div className="h-screen w-full shadow-sm flex flex-col">
      <TopBar />

      <FeedGrid />
    </div>
  );
}

export default MainPage;
