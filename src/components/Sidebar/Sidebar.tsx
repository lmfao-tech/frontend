import React from "react";
import { SparklesIcon, UsersIcon, CogIcon, UserIcon, PlusIcon } from "@heroicons/react/solid";
import Home from "../icons/Home";
import SidebarIcon from "./SidebarIcon";

function Sidebar() {
  return (
    <div className="dark:bg-slate-800">
      <div className="md:hidden dark:bg-slate-800 fixed bg-white flex items-center justify-between bottom-0 drop-shadow-2xl px-16 h-20 w-full">
        <SidebarIcon
          icon={<SparklesIcon className="w-6 h-6 text-yellow-200" />}
          tooltip="Feed"
        />

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

      <div className="hidden sticky w-[7vw] top-0 md:flex flex-col items-center justify-center min-h-screen border-gray-300 shadow-md border-1">
        <div className="space-y-7">
          <SidebarIcon
            icon={<SparklesIcon className="w-6 h-6 text-yellow-200" />}
            tooltip="Feed"
          />
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
