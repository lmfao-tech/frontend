import React from 'react'
import Profile from '~/components/ProfileBar/ProfileBar'
import DefaultLayout from '~/components/layouts/DefaultLayout'

function dash() {
  return (
    <div>
        <Profile />
    </div>
  )
}

// @ts-ignore
dash.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default dash