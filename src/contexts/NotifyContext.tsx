import { useNotifications } from "@novu/notification-center";
import { createContext, useContext, useEffect, useState } from "react";

interface Notify {
    unseens: number;
    readAll: () => void;
}

const NotifyContext = createContext<Notify>({ unseens: 0, readAll: () => { } });

const NotifyProvder = ({ children }: any) => {

    const {
        notifications,
        markAsSeen
    } = useNotifications();

    const [unseens, setUnseens] = useState(0);

    useEffect(() => {
        let tutol = 0;
        for (const notif of notifications) {
            if (!notif.seen) {
                tutol++;
            }
        }
        setUnseens(tutol);
    }, [notifications])

    function read() {

        setUnseens(0);

        for (const notif of notifications) {
            if (!notif.seen) {
                markAsSeen(notif._id)
            }
        }

    }
    return (
        <NotifyContext.Provider value={{ unseens, readAll: read }}>
            {children}
        </NotifyContext.Provider>
    )
}

export const useNotifs = () => {
    const context = useContext(NotifyContext);
    if (!context) {
        throw new Error("useNotifs must be used within a NotifyProvder");
    }
    return context;
}

export default NotifyProvder;