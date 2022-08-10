import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Resp, Status } from "~/types/Request";

interface haha {
  coins: {
    lmfao: number;
    haha: number;
  };
  streaks: {
    current: number;
    longest: number;
  };
  likes: Array<{
    id: string | number;
    authorId: string | number;
    user: any;
  }>;
  like: (id: string | number, authorId: string | number) => Promise<void>;
  unlike: (id: string | number, authorId: string | number) => Promise<void>;
  retweet: (id: string | number) => Promise<any>;
  unretweet: (id: string | number) => Promise<any>;
  follow: (id: string | number, username: string) => Promise<void>;
  unfollow: (id: string | number, username: string) => Promise<void>;
  post: () => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  mod: boolean;
  rank: number;
}

const HahaContext = createContext<haha>({
  coins: {
    lmfao: 0,
    haha: 100,
  },
  streaks: {
    current: 0,
    longest: 0,
  },
  likes: [],
  like: async () => {},
  unlike: async () => {},
  retweet: async () => {},
  unretweet: async () => {},
  follow: async () => {},
  unfollow: async () => {},
  post: async () => {},
  deletePost: async () => {},
  mod: false,
  rank: 0,
});

const HahaProvider = ({ children }: any) => {
  const [hahaCoins, setHahaCoins] = useState<number>(0);
  const [lmfaoCoins, setLmfaoCoins] = useState<number>(0);
  const [mod, setMod] = useState<boolean>(false);
  const [streaks, setStreaks] = useState<{
    current: number;
    longest: number;
  }>({
    current: 0,
    longest: 0,
  });
  const [likes, setLikes] = useState<
    Array<{
      id: string | number;
      authorId: string | number;
      user: any;
    }>
  >([]);
  const [rank, setRank] = useState<number>(0);

  const like = async (id: string | number, authorId: string | number) => {
    const resp = await fetch(`/api/twitter/tweet/like?id=${id}`);
    const data: Resp = await resp.json();

    if (data.success === Status.Success) {
      const r = await fetch(`/api/db/like?id=${id}&authorId=${authorId}`);
      const d: Resp = await r.json();
      if (d.success === Status.Success) {
        setLmfaoCoins(d.data.user.lmfaoCoins);
        setHahaCoins(d.data.user.hahaCoins);
      }
    }
  };
  const unlike = async (id: string | number, authorId: string | number) => {
    const resp = await fetch(`/api/twitter/tweet/unlike?id=${id}`);
    const data: Resp = await resp.json();

    if (data.success === Status.Success) {
      const r = await fetch(`/api/db/unlike?id=${id}&authorId=${authorId}`);
      const d: Resp = await r.json();
      if (d.success === Status.Success) {
        setHahaCoins(d.data.user.hahaCoins);
        setLmfaoCoins(d.data.user.lmfaoCoins);
      }
    }
  };
  const retweet = async (id: string | number) => {
    const resp = await fetch(`/api/twitter/tweet/retweet?id=${id}`);
    return await resp.json();
  };
  const unretweet = async (id: string | number) => {
    const resp = await fetch(`/api/twitter/tweet/unretweet?id=${id}`);
    return await resp.json();
  };

  const post = async () => {};

  const deletePost = async (id: string) => {};
  const revivePost = async (id: string) => {};

  const follow = async (id: string | number, username: string) => {
    const resp = await fetch(`/api/twitter/tweet/follow?id=${id}&username=${username}`);
    const data = await resp.json();
    console.log(data);
    const old = localStorage.getItem("follows");
    
    if (old) {
      const ummYeah = JSON.parse(old);
      ummYeah[`${id}`] = true;
      localStorage.setItem("follows", JSON.stringify(ummYeah));
    } else {
      const yeah: any = {};
      yeah[`${id}`] = true;
      localStorage.setItem("follows", JSON.stringify(yeah));
    }
  };

  const unfollow = async (id: string | number, username: string) => {
    const resp = await fetch(`/api/twitter/tweet/unfollow?id=${id}&username=${username}`);
    const data = await resp.json();
    console.log(data);
    const old = localStorage.getItem("follows");

    if (old) {
      const ummYeah = JSON.parse(old);
      ummYeah[`${id}`] = true;
      localStorage.setItem("follows", JSON.stringify(ummYeah));
    } else {
      const yeah: any = {};
      yeah[`${id}`] = true;
      localStorage.setItem("follows", JSON.stringify(yeah));
    }
  };

  useEffect(() => {
    (async function () {
      const resp = await fetch(`/api/db/user`);
      const data: Resp = await resp.json();
      if (data.success == Status.Success) {
        setHahaCoins(data.data.hahaCoins);
        setLmfaoCoins(data.data.lmfaoCoins);
        setLikes(data.data.likes);
        setMod(data.data.mod);
        setStreaks({
          current: data.data.current_streak,
          longest: data.data.longest_streak,
        });
        setRank(data.data.rank);
      }
    })();
  }, []);

  return (
    <HahaContext.Provider
      value={{
        coins: {
          lmfao: lmfaoCoins,
          haha: hahaCoins,
        },
        like,
        likes,
        unlike,
        retweet,
        unretweet,
        post,
        follow,
        unfollow,
        mod,
        deletePost,
        streaks,
        rank,
      }}
    >
      {children}
    </HahaContext.Provider>
  );
};

export const useHaha = () => {
  return useContext(HahaContext);
};

export default HahaProvider;
