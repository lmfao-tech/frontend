import React from 'react'
import { Avatar } from 'flowbite-react'
import logo_white from "~/../public/logo-white.png";
import logo_black from "~/../public/logo-black.png";
import { useAtom } from 'jotai';
import darkModeAtom from '~/atoms/darkmode';
import Image from "next/image"

interface Props {
  coins: number;
  rank: number;
  name: string;
  avatar: string;
}

function LeaderboardIcon({ coins,rank, name, avatar }: Props) {
  
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  return (
    <div>
      {rank !== 1 && (
        <>
          <div className="px-4 pb-1">
            <div className='h-[2px] w-full rounded-xl bg-slate-300 dark:bg-slate-800/50' />
          </div>
        </>
      )}
      <div className="flex items-center gap-2 px-5">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500">
          #{rank}
        </span>
        <span>
          <Avatar img={avatar} rounded={true} alt="avatar" size="sm" />
        </span>
        <span>{name}</span>
        <span className="flex ml-auto">
          <Image src={darkMode ? logo_white : logo_black} width={25} height={25} alt="LMFAO coins"/> {coins}</span>
      </div>
    </div>
  );
}

function Leaderboard() {

    const [data, setData] = React.useState<any[]>([]);

    React.useEffect(() => {
        fetch('/api/db/getLeaderboard')
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
            }
            );
    }, []);


  return (
    <div>
      <div className="w-full py-3 rounded-2xl bg-slate-200 dark:bg-slate-500/30 dark:text-white">
        <h1 className="text-lg text-center">Leaderboard</h1>
        <div className="flex flex-col h-48 gap-1 py-2 overflow-y-scroll scrollbar-thin xl:h-72 2xl:h-96 ">
          {data.map((user, index) => (
            <LeaderboardIcon
              key={index}
              rank={index + 1}
              coins={user.lmfaoCoins}
              name={user.name}
              avatar={`https://unavatar.io/twitter/${user.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard