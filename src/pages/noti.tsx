import { ReactElement } from "react";
import FeedPage from "~/components/layouts/FeedPage";
import NextPageWithLayout from "~/types/NextPageWithLayout";

const Notification: NextPageWithLayout = () => {
  return (
    <div className="p-10">
        <h1 className="text-2xl font-bold dark:text-white">Notifications</h1>

        <div className="flex flex-row">
            <div></div>
        </div>
    </div>
  )
}

Notification.getLayout = (page: ReactElement) => <FeedPage>{page}</FeedPage>

export default Notification;