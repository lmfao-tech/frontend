import React from "react";
import { SparklesIcon, UsersIcon, CogIcon, UserIcon, PlusIcon } from "@heroicons/react/solid";
import Home from "../icons/Home";
import SidebarIcon from "./SidebarIcon";

function Sidebar() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-16 min-h-screen space-y-5 border-gray-300 shadow-md border-1">
        <SidebarIcon
          icon={<Home/>}
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
