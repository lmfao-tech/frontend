import { HeartIcon, UserAddIcon, UserRemoveIcon } from '@heroicons/react/solid';
import { useNotifications } from '@novu/notification-center';
import { Spinner } from 'flowbite-react';
import Head from 'next/head';
import React, { useEffect } from 'react';

function timeDifference(current: Date, previous: Date) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current.valueOf() - previous.valueOf();

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ` second${Math.round(elapsed / 1000) > 1 ? "s" : ""} ago`;
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ` minute${Math.round(elapsed / msPerMinute) > 1 ? "s" : ""} ago`;
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ` hour${Math.round(elapsed / msPerHour) > 1 ? "s" : ""} ago`;
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed / msPerDay) + ` day${Math.round(elapsed / msPerDay) > 1 ? "s" : ""} ago`;
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed / msPerMonth) + ` month${Math.round(elapsed / msPerMonth) > 1 ? "s" : ""} ago`;
    }

    else {
        return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
}


const Notifications = () => {

    const {
        notifications,
        fetchNextPage,
        hasNextPage,
        fetching,
        markAsSeen,
        refetch
    } = useNotifications();

    const [unseens, setUnseens] = React.useState(0);

    const [nLoading, setNLoading] = React.useState(false);

    useEffect(() => {
        let tutol = 0;
        for (const notif of notifications) {
            if (!notif.seen) {
                tutol++;
            }
        }
        setUnseens(tutol);
    }, [notifications])

    return (
        <div className="p-10 lg:px-36">
            <Head>
                <title>{unseens > 0 ? `(${unseens}) ` : " "}Notifications | LMFAO.tech</title>
            </Head>
            <h1 className="relative text-2xl font-bold dark:text-white">
                Notifications
                {unseens > 0 && <div className="absolute top-0 -left-2 h-2 w-2 rounded-full bg-red-600" />}

                <div className='flex mt-2 flex-col gap-2'>
                    {notifications.map((notif, index) => {
                        !notif.seen && markAsSeen(notif._id)
                        return (
                            <div className='border relative flex gap-2 items-center border-gray-400/20 bg-gray-400/20 dark:border-[#292929] dark:bg-[#292929] rounded-md p-2' key={index}>
                                <div className={`inline-block ${notif.seen ? "dark:bg-white bg-gray-700" : "dark:bg-gray-500 bg-gray-400"} w-1 rounded-md h-7 min-h-full`} />
                                <div className='inline-block'>
                                    <h1 className="text-sm flex items-center justify-center gap-2 text-gray-800 dark:text-white">
                                        {notif.templateIdentifier === 'likedyourpost' && (
                                            <HeartIcon
                                                className={`w-6 h-6 text-red-600`} />
                                        )}
                                        {notif.templateIdentifier === 'followedyou' && (
                                            <>
                                                {
                                                    notif.payload.what === "followed" ? (
                                                        <UserAddIcon
                                                            className={`w-6 h-6 text-blue-300`}
                                                        />
                                                    ) : (
                                                        <UserRemoveIcon
                                                            className={`w-6 h-6 text-red-400`}
                                                        />
                                                    )
                                                }
                                            </>
                                        )}
                                        {`${notif.content}`}<br />
                                        <span className='text-xs text-gray-500 font-bold'>{timeDifference((new Date), new Date(notif.createdAt))}</span>
                                    </h1>
                                </div>
                            </div>
                        );
                    })}
                    {hasNextPage && (
                        <div className="flex justify-center items-center w-full">
                            <button onClick={async () => {
                                setNLoading(true);
                                await fetchNextPage();
                                setNLoading(false);
                            }} className='mt-5 flex justify-center items-center gap-2 text-sm px-4 transition-[background-color] py-2 hover:bg-rose-600 hover:text-white border-2 border-rose-600 rounded-md'>
                                Show More
                                {nLoading && (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </h1>
        </div>
    )
}

export default Notifications;