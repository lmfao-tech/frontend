import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import { useAtom } from "jotai";
import darkModeAtom from "~/atoms/darkmode";
import Sidebar from "~/components/Sidebar/Sidebar";
import TopBar from "~/components/TopBar";
import Profile from "~/components/ProfileBar/Profile";
import { useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
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
            <Component {...pageProps} />
          </div>
        </div>
        <Profile />
      </div>
      <Script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></Script>
    </SessionProvider>
  );
}

export default MyApp;
