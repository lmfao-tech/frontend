import React from 'react'
import LeaderboardIcon from './LeaderboardElement';


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
      <div className="w-full rounded-2xl py-3 bg-slate-200 dark:bg-slate-500/30 dark:text-white">
        <h1 className="text-center text-lg">Leaderboard</h1>
        <div className="flex py-2 flex-col gap-1 overflow-y-scroll scrollbar-thin h-48 xl:h-72 2xl:h-96 ">
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