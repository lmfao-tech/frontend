import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useAuth = () => {
    const [user,setUser] = useState(null);
    const [accessToken,setAccessToken] = useLocalStorage("","lmfao-access-token");
    const [refreshToken,setRefreshToken] = useLocalStorage("","lmfao-refresh-token");

    useEffect(() => {
        
    },[accessToken,refreshToken]);

}

export default useAuth;