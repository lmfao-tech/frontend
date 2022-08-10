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
import HelpProvider from "~/contexts/HelpContext";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { NovuProvider } from "@novu/notification-center";

const LmfaoTech: NextComponentType<
  AppContext,
  AppInitialProps,
  AppLayoutProps
> = ({ Component, pageProps: { session, ...pageProps } }: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <HahaProvider>
        <NovuProvider
          subscriberId={session?.twitter.twitterHandle}
          applicationIdentifier={process.env.NEXT_PUBLIC_NOVUI!}
        >
          <HelpProvider>
            <Head>
              <link rel="manifest" href="/manifest.json" />
              <link rel="shortcut icon" href="/icons/maskable.png" />
              <link rel="apple-touch-icon" href="/icons/maskable.png"></link>
            </Head>
            <Toaster />
            <AnimatePresence>
              <div id="modals"></div>
            </AnimatePresence>
            {getLayout(<Component {...pageProps} />)}
            <Script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></Script>
          </HelpProvider>
        </NovuProvider>
      </HahaProvider>
    </SessionProvider>
  );
};

export default LmfaoTech;
