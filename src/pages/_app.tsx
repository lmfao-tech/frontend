import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import { NextPage } from "next";


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  // @ts-ignore
  const getLayout = Component.getLayout || ((page:NextPage) => page);

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      {getLayout(<Component {...pageProps} />)}
      <Script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></Script>
    </SessionProvider>
  );
}

export default MyApp;
