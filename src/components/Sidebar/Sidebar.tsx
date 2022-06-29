import React from "react";
import { SparklesIcon, UsersIcon, CogIcon, ChevronDoubleRightIcon, UserIcon, PlusIcon } from "@heroicons/react/solid";
import { Tooltip } from "flowbite-react";
import SidebarIcon from "./SidebarIcon";

function Sidebar() {
  return (
    <div>
      <div className="md:hidden fixed bg-white flex items-center gap-2 bottom-0 drop-shadow-2xl justify-center h-14 w-full">
        <SidebarIcon
          icon={<SparklesIcon className="w-6 h-6 text-yellow-300" />}
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
      <div className="hidden md:flex flex-col items-center justify-center w-20 min-h-screen space-y-5 border-gray-300 shadow-md border-1">
        <SidebarIcon
          icon={<SparklesIcon className="w-6 h-6 text-yellow-300" />}
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
    </div>
  );
}

export default Sidebar;
