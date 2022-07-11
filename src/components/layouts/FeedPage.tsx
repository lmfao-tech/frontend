import React from 'react'
import darkModeAtom from "~/atoms/darkmode";
import Sidebar from "~/components/Sidebar/Sidebar";
import TopBar from "~/components/TopBar";
import Profile from "~/components/ProfileBar/Profile";
import { useEffect } from "react";
import { useAtom } from "jotai";


function FeedPage({children} : {children: React.ReactNode}) {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);


  return (
    <div>
      <div
        className={`grid grid-cols-1 h-full lg:grid-cols-6 ${
          darkMode ? "dark" : null
        }`}
      >
        <div className="flex w-full lg:w-[70vw] col-span-1 lg:col-span-4">
          <Sidebar />
          <div className="">
            <div className="sticky top-0">
              <TopBar />
            </div>
            {children}
          </div>
        </div>
        <Profile />
      </div>
    </div>
  );
}

export default FeedPage