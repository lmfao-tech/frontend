import { ReactElement } from "react";
import dynamic from 'next/dynamic';
import FeedPage from "~/components/layouts/FeedPage";
import NextPageWithLayout from "~/types/NextPageWithLayout";
import {
  NovuProvider,
  NotificationBell,
} from "@novu/notification-center";
import { useSession } from "next-auth/react";
import darkModeAtom from "~/atoms/darkmode";
import { useAtom } from "jotai";
import Notifications from "~/components/Notification";

const NotificationCenter = dynamic(async () => (await import("@novu/notification-center")).NotificationCenter, {
  ssr: false
})

const Notification: NextPageWithLayout = () => {
  
  const { data: session } = useSession();
  const [dark, setDark] = useAtom(darkModeAtom);

  return (
    <div className="">
      <NovuProvider
        subscriberId={session?.twitter.twitterHandle}
        applicationIdentifier={process.env.NEXT_PUBLIC_NOVUI!}
      >
        <Notifications />
      </NovuProvider>
    </div>
  )
}

Notification.getLayout = (page: ReactElement) => <FeedPage>{page}</FeedPage>

export default Notification;