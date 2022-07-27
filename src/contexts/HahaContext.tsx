import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { Resp, Status } from "~/types/Request";

interface haha {
    coins: {
        lmfao: number;
        haha: number;
    };
    likes: Array<{
        id: string | number;
        authorId: string | number;
        user: any;
    }>;
    like: (id: string | number, authorId: string | number) => Promise<void>;
    unlike: (id: string | number, authorId: string | number) => Promise<void>;
    retweet: (id: string | number) => Promise<void>;
    unretweet: (id: string | number) => Promise<void>;
    follow: (id: string | number) => Promise<void>;
    unfollow: (id: string | number) => Promise<void>;
    post: () => Promise<void>;
}

const HahaContext = createContext<haha>({
    coins: {
        lmfao: 0,
        haha: 100
    },
    likes: [],
    like: async () => {},
    unlike: async () => {},
    retweet: async () => {},
    unretweet: async () => {},
    follow: async () => {},
    unfollow: async () => {},
    post: async () => {}
});

const HahaProvider = ({ children }: any) => {
    const [hahaCoins, setHahaCoins] = useState<number>(0);
    const [lmfaoCoins, setLmfaoCoins] = useState<number>(0);
    const [likes, setLikes] = useState<Array<{
        id: string | number;
        authorId: string | number;
        user: any;
    }>>([]);

    const like = async (id: string | number, authorId: string | number) => {
        
        const resp = await fetch(`/api/twitter/tweet/like?id=${id}`);
        const data: Resp = await resp.json();
        
        if (data.success === Status.Success) {
            const r = await fetch(`api/db/like?id=${id}&authorId=${authorId}`);
            const d: Resp = await r.json();
            if (d.success === Status.Success) {
                setLmfaoCoins(d.data.user.lmfaoCoins)
                setHahaCoins(d.data.user.hahaCoins)
            }
        }

    }
    const unlike = async (id: string | number, authorId: string | number) => {
        
        const resp = await fetch(`/api/twitter/tweet/unlike?id=${id}`);
        const data: Resp = await resp.json();
        
        if (data.success === Status.Success) {
            const r = await fetch(`api/db/unlike?id=${id}&authorId=${authorId}`);
            const d: Resp = await r.json();
            if (d.success === Status.Success) {
                setHahaCoins(d.data.user.hahaCoins)
                setLmfaoCoins(d.data.user.lmfaoCoins)
            }
        }

    }
    const retweet = async (id: string | number) => {
        const resp = await fetch(
            `/api/twitter/tweet/retweet?id=${id}`
        );
        return (await resp.json());
    }
    const unretweet = async (id: string | number) => {
        const resp = await fetch(
            `/api/twitter/tweet/unretweet?id=${id}`
        );
        return (await resp.json());
    }

    const post = async () => {
        
    }

    const follow = async (id: string | number) => {
        const resp = await fetch(
            `/api/twitter/tweet/follow?id=${id}`
        );
        console.log(await resp.json())

        const old = localStorage.getItem("follows");
        
        if (old) {
            const ummYeah = JSON.parse(old);
            ummYeah[`${id}`] = true;
            localStorage.setItem('follows', JSON.stringify(ummYeah))
        } else {
            const yeah: any = {};
            yeah[`${id}`] = true;
            localStorage.setItem('follows', JSON.stringify(yeah))
        }
    }

    const unfollow = async (id: string | number) => {
        const resp = await fetch(
            `/api/twitter/tweet/unfollow?id=${id}`
        );
        const old = localStorage.getItem("follows");
        
        if (old) {
            const ummYeah = JSON.parse(old);
            ummYeah[`${id}`] = true;
            localStorage.setItem('follows', JSON.stringify(ummYeah))
        } else {
            const yeah: any = {};
            yeah[`${id}`] = true;
            localStorage.setItem('follows', JSON.stringify(yeah))
        }
    }

    useEffect(() => {
        (async function() {
            
            const resp = await fetch(`/api/db/user`);
            const data: Resp = await resp.json();
            
            if (data.success == Status.Success) {
                setHahaCoins(data.data.hahaCoins);
                setLmfaoCoins(data.data.lmfaoCoins);
                setLikes(data.data.likes);
            }
        
        })()
    },[])

    return (
        <HahaContext.Provider value={{
            coins: {
                lmfao: lmfaoCoins,
                haha: hahaCoins
            }, like, likes, unlike, retweet, unretweet, post, follow, unfollow
        }}>
            {children}
        </HahaContext.Provider>
    )
}

export const useHaha = () => {
    return useContext(HahaContext);
}

export default HahaProvider;
