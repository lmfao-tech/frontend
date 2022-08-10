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
import Head from "next/head";
import useNotifs from "~/hooks/useNotifs";

const NotificationCenter = dynamic(async () => (await import("@novu/notification-center")).NotificationCenter, {
  ssr: false
})

const Notification: NextPageWithLayout = () => {

  const { data: session } = useSession();
  const [dark, setDark] = useAtom(darkModeAtom);
  const unseens = useNotifs();

  return (
    <div className="">
      <Head>
        <title>{unseens > 0 ? (unseens > 9 ? "(9+) " : `(${unseens}) `) : " "}Notifications | LMFAO.tech</title>
      </Head>
      <Notifications />
    </div>
  )
}

Notification.getLayout = (page: ReactElement) => <FeedPage>{page}</FeedPage>

export default Notification;