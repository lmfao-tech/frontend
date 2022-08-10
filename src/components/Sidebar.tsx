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
import { useSession } from "next-auth/react";
import { AnimateSharedLayout, motion } from "framer-motion";

function SidebarIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <button>
      <div className="p-2 duration-150 ease-out rounded-full cursor-pointer hover:scale-125">
        {icon}
      </div>
    </button>
  );
}

function Item({
  link,
  tip,
  icon,
  check,
  home,
}: {
  check?: string;
  home?: boolean;
  link: string;
  tip: string;
  icon: JSX.Element | JSX.Element[];
}) {
  const router = useRouter();
  const currentPath = router.pathname;

  let isHere = currentPath.startsWith(check ? check : link);

  if (home) {
    isHere = currentPath === "/";
  }

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30
  };

  return (
    <Link passHref href={link}>
      <a className="relative">
        {isHere && (
          <motion.div layoutId="on" initial={false} transition={spring} className="absolute top-0 right-0 rounded-full w-12 h-12 flex justify-center items-center dark:bg-slate-700/50 bg-slate-400/20"></motion.div>
        )}
        <div
          className={`rounded-full w-12 h-12 flex justify-center items-center`}
          data-tip={tip}
          data-place="right"
        >
          <SidebarIcon icon={icon} />
        </div>
      </a>
    </Link>
  );
}

function Sidebar() {
  const { mod } = useHaha();
  const router = useRouter();
  const { data: session } = useSession();

  const currentPath = router.pathname;
  const isHome = currentPath === "/";
  const isCommunity = currentPath === "/community";
  const isCreate = currentPath === "/create";
  const isDashboard = currentPath === "/dash";
  const isProfile = currentPath === `/u/[username]`;
  return (
    <div className="bg-white dark:bg-[#242424]  z-10">
      {/* Mobile */}
      <div className="fixed bottom-0 flex items-center justify-between w-full h-20 px-8 bg-white md:hidden dark:bg-[#242424] drop-shadow-2xl">
        <Link href="/">
          <div
            className={`rounded-full ${isHome && "dark:bg-slate-700/50 bg-slate-400/20"
              }`}
          >
            <SidebarIcon
              icon={<HomeIcon className="w-6 h-6 text-cyan-500" />}
            />
          </div>
        </Link>

        <Link href="/community">
          <div
            className={`rounded-full ${isCommunity && "dark:bg-slate-700/50 bg-slate-400/20"
              }`}
          >
            <SidebarIcon
              icon={<UsersIcon className="w-6 h-6 text-blue-400" />}
            />
          </div>
        </Link>

        {session && (
          <Link href="/create">
            <div
              className={`rounded-full ${isCreate && "dark:bg-slate-700/50 bg-slate-400/20"
                }`}
            >
              <SidebarIcon
                icon={<PlusIcon className="w-6 h-6 text-gray-400" />}
              />
            </div>
          </Link>
        )}

        {mod && (
          <Link href="/mod">
            <div>
              <SidebarIcon
                icon={<FilterIcon className="w-6 h-6 text-red-500" />}
              />
            </div>
          </Link>
        )}

        {session && (
          <Link href={`/u/${session?.twitter?.twitterHandle}`}>
            <div
              className={`rounded-full ${isProfile && "dark:bg-slate-700/50 bg-slate-400/20"
                }`}
            >
              <SidebarIcon
                icon={<UserIcon className="w-6 h-6 text-yellow-400" />}
              />
            </div>
          </Link>
        )}

        <Link href="/dash">
          <div
            className={`rounded-full ${isDashboard && "dark:bg-slate-700/50 bg-slate-400/20"
              }`}
          >
            <SidebarIcon
              icon={<DesktopComputerIcon className="w-6 h-6 text-gray-400" />}
            />
          </div>
        </Link>
      </div>

      {/* Larger devices */}
      <AnimateSharedLayout>

        <div className="sticky top-0 flex-col items-center justify-center hidden min-h-screen border-gray-300 shadow-md md:flex w-28 border-1">
          <div className="ml-10 flex flex-col gap-1 space-y-7">
            <Item
              link="/"
              tip="Home"
              icon={<HomeIcon className="w-6 h-6 text-cyan-500" />}
              home={true}
            />

            <Item
              link="/community"
              tip="Community"
              icon={<UsersIcon className="w-6 h-6 text-blue-400" />}
            />

            {session && (
              <Item
                link={`/u/${session?.twitter?.twitterHandle}`}
                tip="Profile"
                icon={<UserIcon className="w-6 h-6 text-yellow-400" />}
                check="/u"
              />
            )}

            <Item
              link="/dash"
              tip="Dashboard"
              icon={<DesktopComputerIcon className="w-6 h-6 text-gray-400" />}
            />

            {session && (
              <Item
                link="/create"
                tip="Create"
                icon={<PlusIcon className="w-6 h-6 text-gray-400" />}
              />
            )}

            {mod && (
              <Item
                link="/mod"
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
      </AnimateSharedLayout>
    </div>
  );
}

export default Sidebar;
