import React from "react";
import {
  SparklesIcon,
  UsersIcon,
  CogIcon,
  UserIcon,
  PlusIcon,
  FireIcon,
} from "@heroicons/react/solid";
import Home from "../icons/Home";
import SidebarIcon from "./SidebarIcon";
import Link from "next/link";

function Sidebar() {
  return (
    <div className="dark:bg-slate-800">
      <div className="fixed bottom-0 flex items-center justify-between w-full h-20 px-16 bg-white md:hidden dark:bg-slate-800 drop-shadow-2xl">
        <Link href="/">
          <SidebarIcon
            icon={<SparklesIcon className="w-6 h-6 text-yellow-200" />}
            tooltip="Feed"
          />
        </Link>

        <Link href="/hot">
          <SidebarIcon
            icon={<FireIcon className="w-6 h-6 text-orange-400" />}
            tooltip="Hot memes"
          />
        </Link>

        <SidebarIcon
          icon={<UsersIcon className="w-6 h-6 text-blue-400" />}
          tooltip="Memes from your friends"
        />

        <SidebarIcon
          icon={<UserIcon className="w-6 h-6 text-yellow-400" />}
          tooltip="Profile"
        />

        <SidebarIcon
          icon={<CogIcon className="w-6 h-6 text-gray-400" />}
          tooltip="Settings"
        />

        <SidebarIcon
          icon={<PlusIcon className="w-6 h-6 text-gray-400" />}
          tooltip="Upload yours"
        />

        {/* TODO: Implement Sidebar toggle  */}
        {/* <SidebarIcon
          icon={<ChevronDoubleRightIcon className="w-6 h-6 text-gray-400" />}
          tooltip="Open menu"
        /> */}
      </div>

      <div className="sticky top-0 flex-col items-center justify-center hidden min-h-screen border-gray-300 shadow-md md:flex w-28 border-1">
        <div className="ml-10 space-y-7">
          <Link href="/">
            <div>
              <SidebarIcon
                icon={<SparklesIcon className="w-6 h-6 text-yellow-200" />}
                tooltip="Feed"
              />
            </div>
          </Link>

          <Link href="/hot">
            <div>
              <SidebarIcon
                icon={<FireIcon className="w-6 h-6 text-orange-400" />}
                tooltip="Hot memes"
              />
            </div>
          </Link>

          <SidebarIcon
            icon={<UsersIcon className="w-6 h-6 text-blue-400" />}
            tooltip="Memes from your friends"
          />
          <SidebarIcon
            icon={<UserIcon className="w-6 h-6 text-yellow-400" />}
            tooltip="Profile"
          />
          <SidebarIcon
            icon={<CogIcon className="w-6 h-6 text-gray-400" />}
            tooltip="Settings"
          />
          <SidebarIcon
            icon={<PlusIcon className="w-6 h-6 text-gray-400" />}
            tooltip="Upload yours"
          />
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
