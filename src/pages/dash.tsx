import React from 'react'
import Profile from '~/components/ProfileBar/ProfileBar'
import NotFeedPage from '~/components/layouts/NotFeedPage'
import Head from 'next/head';

function dash() {
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

// @ts-ignore
dash.getLayout = (page: ReactElement) => {
  return <NotFeedPage>{page}</NotFeedPage>;
};

export default dash