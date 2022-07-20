import Sidebar from "~/components/Sidebar/Sidebar";
import TopBar from "~/components/TopBar";
import ProfileBar from "~/components/ProfileBar/ProfileBar";
import DefaultLayout from "./DefaultLayout";
import PullToRefresh from "react-simple-pull-to-refresh";
import { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/solid";
import { Spinner } from "flowbite-react";
import FeedPost from "../Feed/FeedPost";

function FeedPage({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<number>(0);

  async function handleRefresh() {
    setState(state + 1);
    // await window.location.reload();
  }

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 lg:grid-cols-6">
        <div className="flex w-full col-span-1 lg:col-span-4 dark:bg-[#222e42]">
          <Sidebar />
          <div className="min-h-screen" key={state}>
            <div className="sticky top-0 z-10">
              <TopBar />
            </div>
            <div className="overflow-hidden">
              <PullToRefresh
                pullingContent={
                  <div className="flex items-center justify-center text-black dark:text-white mt-4 animate-bounce">
                    <ArrowDownIcon className="h-6 w-6" />
                    Pull down to refresh <ArrowDownIcon className="h-6 w-6" />{" "}
                  </div>
                }
                refreshingContent={
                  <div className="flex items-center justify-center text-black dark:text-white mt-4 animate-bounce">
                    <span className="mr-6">Refreshing</span>{" "}
                    <Spinner aria-label="Loading" />
                  </div>
                }
                onRefresh={handleRefresh}
              >
                <div>{children}</div>
              </PullToRefresh>
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-2">
          <ProfileBar />
        </div>
      </div>
    </DefaultLayout>
  );
}

export default FeedPage;
