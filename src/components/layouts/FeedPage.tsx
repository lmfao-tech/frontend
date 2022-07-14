import React, { useState } from "react";
import darkModeAtom from "~/atoms/darkmode";
import Sidebar from "~/components/Sidebar/Sidebar";
import TopBar from "~/components/TopBar";
import Profile from "~/components/ProfileBar/Profile";
import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";

function FeedPage({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const jotaiDarkmode = useAtomValue(darkModeAtom);

  useEffect(() => {
    const darkMode = window.localStorage.getItem("darkMode");
    if (darkMode === "true") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (jotaiDarkmode) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, [jotaiDarkmode, setIsDarkMode]);

  return (
    <div>
      <div
        className={`grid grid-cols-1 lg:grid-cols-6 ${
          isDarkMode ? "dark" : null
        }`}
      >
        <div className="flex w-full col-span-1 lg:col-span-4 dark:bg-[#222e42]">
          <Sidebar />
          <div>
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

export default FeedPage;
