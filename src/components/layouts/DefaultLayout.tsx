import React, { useState } from "react";
import darkModeAtom from "~/atoms/darkmode";
import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";

function DefaultLayout({ children }: { children: React.ReactNode }) {
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
      <div className={`${isDarkMode ? "dark" : null}`}>
        {children}
      </div>
    </div>
  );
}

export default DefaultLayout;
