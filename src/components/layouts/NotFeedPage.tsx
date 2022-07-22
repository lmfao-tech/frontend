import Sidebar from "~/components/Sidebar/Sidebar";
import TopBar from "~/components/TopBar";
import DefaultLayout from "./DefaultLayout";

function NotFeedPage({ children }: { children: React.ReactNode }) {
  return (
    <DefaultLayout>
      <div className="">
        <div className="flex w-full dark:bg-[#141414]">
          <Sidebar />
          <div className="w-full">
            <div className="sticky top-0 z-10">
              <TopBar />
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default NotFeedPage;
