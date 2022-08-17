import "../styles/globals.css";
import "../styles/tooltip.css";
import "subjx/dist/style/subjx.css";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import Head from "next/head";
import HahaProvider from "~/contexts/HahaContext";
import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { NextComponentType } from "next";
import { ReactNode } from "react";
import HelpProvider from "~/contexts/HelpContext";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import NextNProgress from "nextjs-progressbar";
import Honeybadger from "@honeybadger-io/js";

Honeybadger.configure({
  apiKey: "hbp_W0WSiK0UpfuV4O8Ov5z3Mu4G4F4OLy0qduDz",
  environment: "production",
});

const LmfaoTech: NextComponentType<
  AppContext,
  AppInitialProps,
  AppLayoutProps
> = ({ Component, pageProps: { session, ...pageProps } }: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
        <HahaProvider>
          <HelpProvider>
            <Head>
              <link rel="manifest" href="/manifest.json" />
              <link rel="shortcut icon" href="/icons/maskable.png" />
              <link rel="apple-touch-icon" href="/icons/maskable.png"></link>
            </Head>
            <NextNProgress color="linear-gradient(to right, #9061F9, #E74694)" />
            <Toaster />
            <AnimatePresence>
              <div id="modals"></div>
            </AnimatePresence>
            {getLayout(<Component {...pageProps} />)}
            <Script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></Script>
          </HelpProvider>
        </HahaProvider>
    </SessionProvider>
  );
};

export default LmfaoTech;
