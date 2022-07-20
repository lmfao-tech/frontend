import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import { NextPage } from "next";
import Head from "next/head";
import HahaProvider from "~/contexts/HahaContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  // @ts-ignore
  const getLayout = Component.getLayout || ((page:NextPage) => page);


  return (
    <HahaProvider>
      <SessionProvider session={session} refetchInterval={5 * 60}>
          <Head>
            <link rel="manifest" href="/manifest.json" />
            <link rel="shortcut icon" href="/icons/maskable.png" />
            <link rel="apple-touch-icon" href="/icons/maskable.png"></link>
          </Head>
          {getLayout(<Component {...pageProps} />)}
          <Script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></Script>
      </SessionProvider>
    </HahaProvider>
  );
}

export default MyApp;
