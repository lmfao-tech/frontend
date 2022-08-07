import React from "react";
import {
  UsersIcon,
  DesktopComputerIcon,
  UserIcon,
  PlusIcon,
  FilterIcon,
  HomeIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useHaha } from "~/contexts/HahaContext";
import { useRouter } from "next/router";

function SidebarIcon({
  icon
}: {
  icon: React.ReactNode;
}) {
  return (
    <button>
      <div className="p-2 duration-150 ease-out rounded-full cursor-pointer hover:scale-125">
        {icon}
      </div>
    </button>
  );
}

interface Props {
  tip: string;
  icon: JSX.Element[] | JSX.Element;
  route: string;
}

function Item({ tip, icon, route }: Props) {

  const router = useRouter();

  const currentPath = router.pathname;
  const isThis = currentPath === route;

  return (
    <Link href={route}>
      <div
        className={`rounded-full flex justify-center items-center w-12 h-12 ${isThis && "dark:bg-slate-700/50 flex justify-center items-center w-12 h-12 bg-slate-400/20"
          }`}
      >
        <SidebarIcon
          icon={icon}
          data-tip={tip}
          data-place="right"
        />
      </div>
    </Link>
  )

}


function Sidebar() {
  const { mod } = useHaha();
  const router = useRouter();

  const currentPath = router.pathname;

  return (
    <div className="bg-white dark:bg-[#242424]  z-10">
      {/* Mobile */}
      <div className="fixed bottom-0 flex items-center justify-between w-full h-20 px-8 bg-white md:hidden dark:bg-[#242424] drop-shadow-2xl">
        <Item
          route="/"
          tip="Home"
          icon={<HomeIcon className="w-6 h-6 text-cyan-500" />}
        />

        <Item
          route="/community"
          tip="Community"
          icon={<UsersIcon className="w-6 h-6 text-blue-400" />}
        />

        <Item
          route="/create"
          tip="upload"
          icon={<PlusIcon className="w-6 h-6 text-gray-400" />}
        />
        
        <SidebarIcon
          icon={<UserIcon className="w-6 h-6 text-yellow-400" />}
          data-tip="Profile"
        />

        <Item
          route="/dash"
          tip="Dashboard"
          icon={<DesktopComputerIcon className="w-6 h-6 text-gray-400" />}
        />

        {mod && (
          <Item
            route="/mod"
            tip="Moderation"
            icon={<FilterIcon className="w-6 h-6 text-red-500" />}
          />
        )}
      </div>

      {/* Larger devices */}
      <div className="sticky top-0 flex-col items-center justify-center hidden min-h-screen border-gray-300 shadow-md md:flex w-28 border-1">
        <div className="ml-10 space-y-7">
          <Item
            route="/"
            tip="Home"
            icon={<HomeIcon className="w-6 h-6 text-cyan-500" />}
          />

          <Item
            route="/community"
            tip="Community"
            icon={<UsersIcon className="w-6 h-6 text-blue-400" />}
          />

          <SidebarIcon
            icon={<UserIcon className="w-6 h-6 text-yellow-400" />}
            data-tip="Profile"
          />

          <Item
            route="/dash"
            tip="Dashboard"
            icon={<DesktopComputerIcon className="w-6 h-6 text-gray-400" />}
          />

          <Item
            route="/create"
            tip="upload"
            icon={<PlusIcon className="w-6 h-6 text-gray-400" />}
          />

          {mod && (
            <Item
              route="/mod"
              tip="Moderation"
              icon={<FilterIcon className="w-6 h-6 text-red-500" />}
            />
          )}

        </div>

        {/* TODO: Implement Sidebar toggle  */}
        {/* <SidebarIcon
          icon={<ChevronDoubleRightIcon className="w-6 h-6 text-gray-400" />}
          tooltip="Open menu"
        /> */}
      </div>
    </div>
  );
}

export default Sidebar;
