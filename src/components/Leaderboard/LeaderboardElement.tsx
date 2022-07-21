import React from 'react'
import { Avatar } from 'flowbite-react'
import Image from "next/image"


function LeaderboardIcon({coins,rank, name, avatar}: {coins: number,rank:number, name:string, avatar:string}) {
  return (
    <div>
      <div className="flex items-center gap-2 px-5">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500">
          #{rank}
        </span>
        <span>
          <Avatar img={avatar} rounded={true} alt="avatar" size="sm" />
        </span>
        <span>{name}</span>
        <span className="flex ml-auto">
          <Image src="/icons/icon-192x192.png" width={25} height={25} alt="LMFAO coins"/> {coins}</span>
      </div>
    </div>
  );
}

export default LeaderboardIcon