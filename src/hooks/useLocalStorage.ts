import { useEffect, useState } from "react";

const useLocalStorage = (initVal: string, key: string) => {
    const getValFromLS = () => {
        return localStorage.getItem(key)
            ? JSON.parse(localStorage.getItem(key)!)
            : initVal;
    };

    const [value, setValue] = useState(getValFromLS());

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
};

export default useLocalStorage;