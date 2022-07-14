import Sidebar from "~/components/Sidebar/Sidebar";
import TopBar from "~/components/TopBar";
import ProfileBar from "~/components/ProfileBar/ProfileBar";
import DefaultLayout from "./DefaultLayout";

function FeedPage({ children }: { children: React.ReactNode }) {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 lg:grid-cols-6">
        <div className="flex w-full col-span-1 lg:col-span-4 dark:bg-[#222e42]">
          <Sidebar />
          <div>
            <div className="sticky top-0">
              <TopBar />
            </div>
            {children}
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
