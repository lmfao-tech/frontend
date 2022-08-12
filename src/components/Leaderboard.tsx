import React, { useState } from 'react'
import { Avatar } from 'flowbite-react'
import logo_white from "~/../public/logo-white.png";
import logo_black from "~/../public/logo-black.png";
import { useAtom } from 'jotai';
import darkModeAtom from '~/atoms/darkmode';
import Image from "next/image"
import Link from 'next/link';
import { AnimateSharedLayout, motion } from 'framer-motion';

interface Props {
  coins: number;
  rank: number;
  name: string;
  avatar: string;
  onMouseOver: () => void;
  onMouseLeave: () => void;
  over: boolean;
}

function LeaderboardIcon({ coins, rank, name, avatar, over, onMouseOver, onMouseLeave }: Props) {
  
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30
  };

  return (
    <a onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} className='px-5' href={`/u/${name}`} target="_blank" rel="noreferrer">
      <div className="relative">
        {over && <motion.div layoutId="leaderboardItem" initial={false} transition={spring} className="absolute z-10 top-0 right-0 w-full h-full bg-black/10 rounded-md"/>}
        <div className="px-3 py-2 flex justify-betweem items-center gap-2 text-black dark:text-white">
          <span>#{rank}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} className="rounded-full w-9 h-9" alt="av" />
          
          <span>{name}</span>

          <span className='ml-auto flex'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={darkMode ? "/logo-white.png" : "/logo-black.png"} alt="lmfao" className='w-7 h-7' />
            {coins}
          </span>
        </div>
      </div>
      {/* <div className="py-1 mx-5 relative rounded-md hover:cursor-pointer">
        {over && (
          <motion.div layoutId="leaderboardItem" initial={false} transition={spring} className="z-[99] absolute top-0 right-0 w-full h-full rounded-md hover:bg-slate-500/20 dark:hover:bg-slate-500/30"></motion.div>
        )}
        <div className="z-[100] flex items-center gap-2 px-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500">
            #{rank}
          </span>
          <span>
            <Avatar img={avatar} rounded={true} alt="avatar" size="sm" />
          </span>
          <span>{name}</span>
          <span className="flex ml-auto">
            <Image
              src={darkMode ? logo_white : logo_black}
              width={25}
              height={25}
              alt="LMFAO coins"
            />{" "}
            {coins}
          </span>
        </div>
      </div> */}
    </a>
  );
}

function Leaderboard({ rank }: { rank: number }) {

  const [over, setOver] = useState(0);
  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch("/api/db/getLeaderboard")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }, [])

  return (
    <AnimateSharedLayout>
      <div className="w-full py-3 text-black rounded-2xl bg-slate-200 dark:bg-slate-500/30 dark:text-white">
        <h1 className="text-lg text-center">Leaderboard</h1>
        <span className="px-5">
          Your rank:{" "}
          <span className=" text-transparent bg-blue-600 bg-clip-text dark:bg-gradient-to-r dark:from-yellow-100 dark:via-yellow-300 dark:to-yellow-500">
            #{rank}
          </span>
        </span>
        <div className="flex flex-col h-48 py-2 overflow-y-scroll scrollbar-thin xl:h-72 2xl:h-96 ">
          {data.map((user, index) => (
            <LeaderboardIcon
              key={index}
              rank={index + 1}
              coins={user.lmfaoCoins}
              name={user.name}
              avatar={`https://unavatar.io/twitter/${user.name}`}
              over={over === index + 1}
              onMouseOver={() => setOver(index + 1)}
              onMouseLeave={() => setOver(0)}
            />
          ))}
        </div>
      </div>
    </AnimateSharedLayout>
  );
}

export default Leaderboard
