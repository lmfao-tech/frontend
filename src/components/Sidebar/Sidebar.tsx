import React from "react";
import {
  UsersIcon,
  DesktopComputerIcon,
  UserIcon,
  PlusIcon,
  FilterIcon,
  HomeIcon,
} from "@heroicons/react/solid";
import SidebarIcon from "./SidebarIcon";
import Link from "next/link";
import { useHaha } from "~/contexts/HahaContext";
import { useRouter } from "next/router";

function Sidebar() {
  const { mod } = useHaha();
  const router = useRouter();

  const currentPath = router.pathname;
  const isHome = currentPath === "/";
  const isCommunity = currentPath === "/community";
  const isCreate = currentPath === "/create";
  const isDashboard = currentPath === "/dash";

  return (
    <div className="bg-white dark:bg-[#242424]  z-10">
      {/* Mobile */}
      <div className="fixed bottom-0 flex items-center justify-between w-full h-20 px-8 bg-white md:hidden dark:bg-[#242424] drop-shadow-2xl">
        <Link href="/">
          <div
            className={`rounded-full ${
              isHome && "dark:bg-slate-700/50 bg-slate-400/20"
            }`}
          >
            <SidebarIcon
              icon={<HomeIcon className="w-6 h-6 text-cyan-500" />}
            />
          </div>
        </Link>

        <Link href="/community">
          <div
            className={`rounded-full ${
              isCommunity && "dark:bg-slate-700/50 bg-slate-400/20"
            }`}
          >
            <SidebarIcon
              icon={<UsersIcon className="w-6 h-6 text-blue-400" />}
            />
          </div>
        </Link>

        <Link href="/create">
          <div
            className={`rounded-full ${
              isCreate && "dark:bg-slate-700/50 bg-slate-400/20"
            }`}
          >
            <SidebarIcon
              icon={<PlusIcon className="w-6 h-6 text-gray-400" />}
            />
          </div>
        </Link>

        {mod && (
          <Link href="/mod">
            <div>
              <SidebarIcon
                icon={<FilterIcon className="w-6 h-6 text-red-500" />}
              />
            </div>
          </Link>
        )}

        <SidebarIcon icon={<UserIcon className="w-6 h-6 text-yellow-400" />} />

        <Link href="/dash">
          <div
            className={`rounded-full ${
              isDashboard && "dark:bg-slate-700/50 bg-slate-400/20"
            }`}
          >
            <SidebarIcon
              icon={<DesktopComputerIcon className="w-6 h-6 text-gray-400" />}
            />
          </div>
        </Link>
      </div>

      {/* Larger devices */}
      <div className="sticky top-0 flex-col items-center justify-center hidden min-h-screen border-gray-300 shadow-md md:flex w-28 border-1">
        <div className="ml-10 space-y-7">
          <Link href="/">
            <div
              data-tip="Home"
              data-place="right"
              className={`rounded-full ${
                isHome && "dark:bg-slate-700/50 bg-slate-500/10"
              }`}
            >
              <SidebarIcon
                icon={<HomeIcon className="w-6 h-6 text-cyan-500" />}
              />
            </div>
          </Link>

          <Link href="/community">
            <div
              data-tip="Community"
              data-place="right"
              className={`rounded-full ${
                isCommunity && "dark:bg-slate-700/50 bg-slate-500/10"
              }`}
            >
              <SidebarIcon
                icon={<UsersIcon className="w-6 h-6 text-blue-400" />}
              />
            </div>
          </Link>

          <SidebarIcon
            icon={<UserIcon className="w-6 h-6 text-yellow-400" />}
            data-tip="Profile"
          />
          <Link href="/dash">
            <div
              data-tip="Dashboard"
              data-place="right"
              className={`rounded-full ${
                isDashboard && "dark:bg-slate-700/50 bg-slate-500/10"
              }`}
            >
              <SidebarIcon
                icon={<DesktopComputerIcon className="w-6 h-6 text-gray-400" />}
                data-tip="Dashboard"
              />
            </div>
          </Link>
          <Link href="/create">
            <div
              data-tip="Create"
              data-place="right"
              className={`rounded-full ${
                isCreate && "dark:bg-slate-700/50 bg-slate-500/10"
              }`}
            >
              <SidebarIcon
                icon={<PlusIcon className="w-6 h-6 text-gray-400" />}
                data-tip="Upload"
              />
            </div>
          </Link>

          {mod && (
            <Link href="/mod">
              <div>
                <SidebarIcon
                  icon={<FilterIcon className="w-6 h-6 text-red-500" />}
                  data-tip="Moderation"
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
