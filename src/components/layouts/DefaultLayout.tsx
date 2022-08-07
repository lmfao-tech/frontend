import React, { useState } from "react";
import darkModeAtom from "~/atoms/darkmode";
import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import { useHelp } from "~/contexts/HelpContext";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const jotaiDarkmode = useAtomValue(darkModeAtom);
  const { helpOpen, setHelpOpen } = useHelp();

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
      <AnimatePresence>

        {helpOpen && (

          <div onClick={() => setHelpOpen(false)} className={`fixed p-10 lg:p-72 z-[1000] ${isDarkMode ? "bg-black/20": "bg-black/10"} flex justify-center items-center w-screen h-screen`}>
            <motion.div initial={{ scale: 0 }} exit={{ scale: 0, opacity: 0 }} animate={{ scale: 1 }} className={`relative overflow-y-auto scrollbar-thin w-screen z-[1001] rounded-md h-[60vh] ${isDarkMode ? "bg-gray-600 text-white": "bg-gray-300"}`}>
              
              <button onClick={() => setHelpOpen(false)} className={`focus:bg-gray-500 ${!isDarkMode && "hover:text-white focus:text-white"} hover:bg-gray-500 p-1 rounded absolute top-o right-0 mt-3 mr-3`}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275q-.425 0-.7-.275q-.275-.275-.275-.7q0-.425.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7L13.4 12l4.9 4.9q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275Z"></path></svg>
              </button>

              <div className="p-5 lg:pt-7">

                <h1 className={`text-center text-xl font-bold`}>What are these strange coins? and whats this streak?</h1>

                <div className="flex flex-col lg:flex-row mt-5 flex-wrap gap-1">
                  <div className={`flex-1 rounded-md p-3 border-2 ${isDarkMode ? "border-gray-700" : "border-gray-500"}`}>
                    <h2 className={`text-center font-bold text-lg px-3 py-1 rounded-md ${isDarkMode ? "bg-gray-700" : "bg-gray-500 text-white"}`}>
                      HAHA coins
                    </h2>
                    <p className="text-sm mt-2">
                      HAHA coins are used on liking. When you like a meme 1 HAHA coins will be taken, and the author of the post will get 5 LMFAO coins (and you{"'"}ll also get 1 LMFAO coins in return). Everyday you are given 50 HAHA coins and if all HAHA coins are used you can still like posts but neither you or the author will get LMFAO coins.
                    </p>
                  </div>
                  <div className={`flex-1 rounded-md p-3 border-2 ${isDarkMode ? "border-gray-700" : "border-gray-500"}`}>
                    <h2 className={`text-center font-bold text-lg px-3 py-1 rounded-md ${isDarkMode ? "bg-gray-700" : "bg-gray-500 text-white"}`}>
                      LMFAO coins
                    </h2>
                    <p className="text-sm mt-2">
                      LMFAO coins are the main currency of LMFAO.tech. You can earn LMFAO coins by uploading memes and liking others memes. You{"'"}ll also gain 5 LMFAO when someone likes any of your post (if they have enough HAHA coins) 
                    </p>
                  </div>
                  <div className={`flex-1 rounded-md p-3 border-2 ${isDarkMode ? "border-gray-700" : "border-gray-500"}`}>
                    <h2 className={`text-center font-bold text-lg px-3 py-1 rounded-md ${isDarkMode ? "bg-gray-700" : "bg-gray-500 text-white"}`}>
                      Streaks
                    </h2>
                    <p className="text-sm mt-2">
                      Upload a meme through LMFAO.tech every day to keep your streaks. LMFAO coins are awarded based on streaks
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className={`${isDarkMode ? "dark" : null}`}>{children}</div>
    </div>
  );
}

export default DefaultLayout;
