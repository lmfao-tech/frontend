import React from 'react'
import {useSession} from "next-auth/react"
import { useRouter } from 'next/router'

function Index() {
    const session = useSession()
    const router = useRouter()

    // TODO: @yxshv pls lol
    // If user is logged in, redirect to /home.
    // otherwise, redirect to what-is.lmfao.tech
  return (
    <div>
        LMFAO
    </div>
  )
}

export default Index