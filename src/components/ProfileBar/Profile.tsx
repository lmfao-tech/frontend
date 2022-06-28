import { Avatar, Button } from 'flowbite-react';
import { signIn, useSession } from "next-auth/react";
import { useEffect } from 'react';

export default function Profile() {

  const { data: session } = useSession();

  let av = session?.user?.image;
  if (av) {
    av = (av.slice(0,-11)) + ".jpg";
  } else {
    av = ""
  }

  return (
    <div className=''>
      {session ? (
        <div className='flex flex-col ava px-5 py-10 items-center'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={av}
            className='rounded-full'
            alt='avatar'
            width="100"
          />
        </div>
      ) : (
        <div className='flex flex-col px-10 gap-3 justify-center min-h-screen items-center'>
          <h1 className='text-3xl font-bold main-heading'>
            <span className='bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text' style={{WebkitTextFillColor : "transparent"}}>LMFAO</span>
            .tech
          </h1>
          <p className='text-center text-sm'>A content discovery platform where you can find the best memes across twitter, follow memers and stay for a good laugh!</p>
          <Button
            outline size="lg"
            gradientDuoTone="purpleToPink"
            onClick={() => signIn('twitter')}
          >
            Login
          </Button>
        </div>
      )}
    </div>
  )
}