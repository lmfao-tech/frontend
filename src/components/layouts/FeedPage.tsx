import Sidebar from "~/components/Sidebar";
import TopBar from "~/components/TopBar";
import ProfileBar from "~/components/ProfileBar/ProfileBar";
import DefaultLayout from "./DefaultLayout";
import PullToRefresh from "react-simple-pull-to-refresh";
import { useState } from "react";
import { ArrowDownIcon } from "@heroicons/react/solid";
import { Spinner } from "flowbite-react";

function FeedPage({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<number>(0);

  async function handleRefresh() {
    setState(state + 1);
  }

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 lg:grid-cols-7">
        <div className="flex w-full col-span-1 lg:col-span-5 bg-[#e2e8f0] dark:bg-[#101010]">
          <Sidebar />
          <div className="w-full min-h-screen" key={state}>
            <div className="sticky top-0 z-10">
              <TopBar />
            </div>
            <div className="overflow-hidden">
              <PullToRefresh
                pullingContent={
                  <div className="flex items-center justify-center mt-4 text-black dark:text-white animate-bounce">
                    <ArrowDownIcon className="w-6 h-6" />
                    Pull down to refresh <ArrowDownIcon className="w-6 h-6" />{" "}
                  </div>
                }
                refreshingContent={
                  <div className="flex items-center justify-center mt-4 text-black dark:text-white animate-bounce">
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
