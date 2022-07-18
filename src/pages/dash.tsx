import React from 'react'
import Profile from '~/components/ProfileBar/ProfileBar'
import NotFeedPage from '~/components/layouts/NotFeedPage'

function dash() {
  return (
    <div>
        <Profile />
    </div>
  )
}

// @ts-ignore
dash.getLayout = (page: ReactElement) => {
  return <NotFeedPage>{page}</NotFeedPage>;
};

export default dash