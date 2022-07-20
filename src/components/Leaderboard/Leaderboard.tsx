import React from 'react'
import LeaderboardIcon from './LeaderboardElement';

// TODO: Query database to get top 10 users
const top10 = [
    {
        name: 'JohnDoe',
        avatar: 'https://i.pravatar.cc/300',
        coins: {
            haha: 100,
            lmfao: 200
        }
    },
    {
        name: 'JaneDoe',
        avatar: 'https://i.pravatar.cc/229',
        coins: {
            haha: 200,
            lmfao: 300
        }
    },
]

function Leaderboard() {
  return (
    <div>
      <div className="w-full rounded-2xl py-3 bg-slate-200 dark:bg-slate-500/30 dark:text-white">
        <h1 className="text-center text-lg">Leaderboard</h1>
        <div className="flex py-2 flex-col gap-1 overflow-y-scroll scrollbar-thin h-48 xl:h-72 2xl:h-96 ">
            {top10.map((user, index) => (
                <LeaderboardIcon key={index} rank={index + 1} coins={user.coins} name={user.name} avatar={user.avatar} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard