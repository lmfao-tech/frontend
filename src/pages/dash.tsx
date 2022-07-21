import React from 'react'
import type { ReactElement } from 'react';
import Profile from '~/components/ProfileBar/ProfileBar'
import NotFeedPage from '~/components/layouts/NotFeedPage'
import Head from 'next/head';
import NextPageWithLayout from "~/types/NextPageWithLayout";

const dash: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Dashboard | LMFAO.tech</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Profile />
    </div>
  );
}

dash.getLayout = (page: ReactElement) => {
  return <NotFeedPage>{page}</NotFeedPage>;
};

export default dash