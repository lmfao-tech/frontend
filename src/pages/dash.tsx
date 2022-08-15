import React from "react";
import { Button } from "flowbite-react";
import type { ReactElement } from "react";
import { signIn } from "next-auth/react";
import Profile from "~/components/ProfileBar";
import NotFeedPage from "~/components/layouts/NotFeedPage";
import Head from "next/head";
import NextPageWithLayout from "~/types/NextPageWithLayout";
import { ChartBarIcon, HeartIcon, SparklesIcon } from "@heroicons/react/solid";
import { useNotifs } from "~/contexts/NotifyContext";
import { BeakerIcon } from "@heroicons/react/outline";

const dash: NextPageWithLayout = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { unseens } = useNotifs();

  return (
    <div>
      <Head>
        <title>
          {unseens > 0 ? (unseens > 9 ? "(9+) " : `(${unseens}) `) : " "}
          Dashboard | LMFAO.tech
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Profile>
        <Button
          outline
          size="lg"
          gradientDuoTone="purpleToPink"
          onClick={() => signIn("twitter")}
        >
          <div className="mr-3">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height={22}
              width={22}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </div>
          Login with Twitter
        </Button>
        
        <iframe src="https://what-is.lmfao.tech/" className="w-full mt-5 mx-[-500px] h-[500px]" />
        
      </Profile>
    </div>
  );
};

dash.getLayout = (page: ReactElement) => {
  return <NotFeedPage>{page}</NotFeedPage>;
};

export default dash;
