import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { Resp } from "~/types/Request";

interface haha {
    coins: {
        lmfao: number;
        haha: number;
    };
    like: () => void;
    retweet: () => void;
    post: () => void;
}

const HahaContext = createContext<haha>({
    coins: {
        lmfao: 0,
        haha: 0
    },
    like: () => {},
    retweet: () => {},
    post: () => {}
});

const HahaProvider = ({ children }: any) => {
    const [hahaCoins, setHahaCoins] = useState<number>(0);
    const [lmfaoCoins, setLmfaoCoins] = useState<number>(0);
    const { data: session } = useSession();

    const like = () => {
        
    }
    const retweet = () => {
        
    }
    const post = () => {
        
    }

    useEffect(() => {
        (async function() {
            
            const resp = await fetch(`/api/db/user`);
            const data: Resp = await resp.json();
            
            if (data.success) {
                setHahaCoins(data.data.haha);
                setLmfaoCoins(data.data.lmfao);
            }
        
        })()
    },[])


    return (
        <HahaContext.Provider value={{
            coins: {
                lmfao: lmfaoCoins,
                haha: hahaCoins
            }, like, retweet, post,
        }}>
            {children}
        </HahaContext.Provider>
    )
}

export const useHaha = () => {
    return useContext(HahaContext);
}

export default HahaContext;