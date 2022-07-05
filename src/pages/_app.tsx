import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Component {...pageProps} />
      <Script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></Script>
    </SessionProvider>
  );
}

export default MyApp;
