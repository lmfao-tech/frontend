import React from 'react'
import Profile from '~/components/ProfileBar/ProfileBar'
import CreatePage from '~/components/layouts/CreatePage'

function dash() {
  return (
    <div>
        <Profile />
    </div>
  )
}

// @ts-ignore
dash.getLayout = (page: ReactElement) => {
  return <CreatePage>{page}</CreatePage>;
};

export default dash