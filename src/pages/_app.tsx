import "../styles/globals.css";
import "../styles/tooltip.css";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import { NextPage } from "next";
import Head from "next/head";
import HahaProvider from "~/contexts/HahaContext";
import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { NextComponentType } from "next";
import { ReactNode } from "react";

const LmfaoTech: NextComponentType<
  AppContext,
  AppInitialProps,
  AppLayoutProps
> = ({ Component, pageProps: { session, ...pageProps } }: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

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
};

export default LmfaoTech;
