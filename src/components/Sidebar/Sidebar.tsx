import React from "react";
import { SparklesIcon, UsersIcon } from "@heroicons/react/solid";
import { Tooltip } from "flowbite-react";
import SidebarIcon from "./SidebarIcon";

function Sidebar() {
  return (
    <div>
      <div className="flex flex-col justify-center space-y-5 items-center w-20 min-h-screen border-1 shadow-md border-gray-300">
        <SidebarIcon
          icon={<SparklesIcon className="h-6 w-6 text-yellow-300" />}
          tooltip="Feed"
        />

        <SidebarIcon
          icon={<UsersIcon className="h-6 w-6 text-blue-400" />}
          tooltip="Memes from your friends"
        />
      </div>
    </div>
  );
}

export default Sidebar;
