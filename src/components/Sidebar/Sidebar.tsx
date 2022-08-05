import React from "react";
import {
  UsersIcon,
  DesktopComputerIcon,
  UserIcon,
  PlusIcon,
  FilterIcon,
  HomeIcon
} from "@heroicons/react/solid";
import SidebarIcon from "./SidebarIcon";
import Link from "next/link";
import { useHaha } from "~/contexts/HahaContext";

function Sidebar() {
  const { mod } = useHaha();
  return (
    <div className="bg-white dark:bg-[#242424]  z-10">
      {/* Mobile */}
      <div className="fixed bottom-0 flex items-center justify-between w-full h-20 px-8 bg-white md:hidden dark:bg-[#242424] drop-shadow-2xl">
        <Link href="/">
          <div>
            <SidebarIcon
              icon={<HomeIcon className="w-6 h-6 text-yellow-200" />}
              mobile={true}
            />
          </div>
        </Link>

        <Link href="/community">
          <div>
            <SidebarIcon
              icon={<UsersIcon className="w-6 h-6 text-blue-400" />}
              mobile={true}
            />
          </div>
        </Link>

        <Link href="/create">
          <div>
            <SidebarIcon
              icon={<PlusIcon className="w-6 h-6 text-gray-400" />}
              mobile={true}
            />
          </div>
        </Link>

        {mod && (
          <Link href="/mod">
            <div>
              <SidebarIcon
                icon={<FilterIcon className="w-6 h-6 text-red-500" />}
                mobile={true}
              />
            </div>
          </Link>
        )}

        <SidebarIcon
          icon={<UserIcon className="w-6 h-6 text-yellow-400" />}
          mobile={true}
        />

        <Link href="/dash">
          <div>
            <SidebarIcon
              icon={<DesktopComputerIcon className="w-6 h-6 text-gray-400" />}
              mobile={true}
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
                icon={<HomeIcon className="w-6 h-6 text-yellow-200" />}
                tooltip="Feed"
              />
            </div>
          </Link>

          <Link href="/community">
            <div>
              <SidebarIcon
                icon={<UsersIcon className="w-6 h-6 text-blue-400" />}
                tooltip="Community"
              />
            </div>
          </Link>

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

          {mod && (
            <Link href="/mod">
              <div>
                <SidebarIcon
                  icon={<FilterIcon className="w-6 h-6 text-red-500" />}
                  tooltip="Moderation"
                />
              </div>
            </Link>
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
