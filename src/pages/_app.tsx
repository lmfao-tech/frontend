import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import Sidebar from "~/components/Sidebar/Sidebar";
import MainPage from "~/components/MainPage";
import Profile from "~/components/ProfileBar/Profile";
import TopBar from "~/components/TopBar";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <div className="grid grid-cols-1 lg:grid-cols-4">
        <div className="flex w-full col-span-3">
          <Sidebar />
          <div>
            <TopBar />
            <Component {...pageProps} />
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-1">
          <Profile />
        </div>
      </div>
      <Script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></Script>
    </SessionProvider>
  );
}

export default MyApp;
