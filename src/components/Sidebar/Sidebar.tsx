import React from "react";
import {
  SparklesIcon,
  UsersIcon,
  DesktopComputerIcon,
  UserIcon,
  PlusIcon,
  FireIcon,
} from "@heroicons/react/solid";
import Home from "../icons/Home";
import SidebarIcon from "./SidebarIcon";
import Link from "next/link";

function Sidebar() {
  return (
    <div className="dark:bg-slate-800  z-10">
      {/* Mobile */}
      <div className="fixed bottom-0 flex items-center justify-between w-full h-20 px-16 bg-white md:hidden dark:bg-slate-800 drop-shadow-2xl">
        <Link href="/">
          <div>
            <SidebarIcon
              icon={<SparklesIcon className="w-6 h-6 text-yellow-200" />}
              tooltip="Feed"
              position="top"
            />
          </div>
        </Link>

        <SidebarIcon
          icon={<UsersIcon className="w-6 h-6 text-blue-400" />}
          tooltip="Community"
          position="top"
        />

        <SidebarIcon
          icon={<UserIcon className="w-6 h-6 text-yellow-400" />}
          tooltip="Profile"
          position="top"
        />

        <Link href="/dash">
          <div>
            <SidebarIcon
              icon={<DesktopComputerIcon className="w-6 h-6 text-gray-400" />}
              tooltip="Dashboard"
              position="top"
            />
          </div>
        </Link>

        <Link href="/create">
          <div>
            <SidebarIcon
              icon={<PlusIcon className="w-6 h-6 text-gray-400" />}
              tooltip="Upload"
              position="top"
            />
          </div>
        </Link>
      </div>

      {/* Larger devices */}
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

          <SidebarIcon
            icon={<UsersIcon className="w-6 h-6 text-blue-400" />}
            tooltip="Community"
          />
          <SidebarIcon
            icon={<UserIcon className="w-6 h-6 text-yellow-400" />}
            tooltip="Profile"
          />
          <Link href="/dash">
            <div>
              <SidebarIcon
                icon={<DesktopComputerIcon className="w-6 h-6 text-gray-400" />}
                tooltip="Dashboard"
              />
            </div>
          </Link>
          <Link href="/create">
            <div>
              <SidebarIcon
                icon={<PlusIcon className="w-6 h-6 text-gray-400" />}
                tooltip="Upload"
              />
            </div>
          </Link>
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
