import { useNotifications } from '@novu/notification-center';
import { useEffect, useState } from 'react';

const useNotifs = () => {

    const {
        notifications
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

    return unseens;

}

export default useNotifs;