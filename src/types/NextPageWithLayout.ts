import type { NextPage } from "next";
import type {ReactElement} from "react";

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout(pageProps: P): ReactElement;
};

export default NextPageWithLayout;