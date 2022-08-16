import React from "react";
import {
  UsersIcon,
  DesktopComputerIcon,
  UserIcon,
  PlusIcon,
  FilterIcon,
  SparklesIcon,
  HomeIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useHaha } from "~/contexts/HahaContext";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { AnimateSharedLayout, motion } from "framer-motion";

function SidebarIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="p-2 duration-150 ease-out rounded-full cursor-pointer hover:scale-125">
      {icon}
    </div>
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
    damping: 30,
  };

  return (
    <Link passHref href={link}>
      <a className="relative">
        {isHere && (
          <motion.div
            layoutId="on"
            initial={false}
            transition={spring}
            className="absolute top-0 right-0 w-12 h-12 rounded-full dark:bg-slate-700/50 bg-slate-400/20"
          ></motion.div>
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

  return (
    <div className="bg-white dark:bg-[#242424]  z-50">
      {/* Mobile */}
      <div className="fixed bottom-0 flex items-center justify-between w-full h-20 px-8 bg-white md:hidden dark:bg-[#242424] drop-shadow-2xl">
        <Item
          link="/home"
          tip="Home"
          icon={<HomeIcon className="w-6 h-6 text-cyan-500" />}
        />

        <Item
          link="/explore"
          tip="Community"
          icon={<SparklesIcon className="w-6 h-6 text-yellow-400" />}
        />

        {session && (
          <Item
            link={`/u/${session?.twitter?.twitterHandle}`}
            tip="Profile"
            icon={<UserIcon className="w-6 h-6 text-blue-400" />}
            check="/u"
          />
        )}

        <Item
          link="/dash"
          tip="Dashboard"
          icon={<DesktopComputerIcon className="w-6 h-6 text-gray-400" />}
        />

        <Item
          link="/create"
          tip="Create"
          icon={<PlusIcon className="w-6 h-6 text-gray-400" />}
        />

        {mod && (
          <Item
            link="/mod"
            tip="Moderation"
            icon={<FilterIcon className="w-6 h-6 text-red-500" />}
          />
        )}
      </div>

      {/* Larger devices */}
      <AnimateSharedLayout>
        <div className="sticky top-0 flex-col items-center justify-center hidden min-h-screen border-gray-300 shadow-md md:flex w-28 border-1">
          <div className="flex flex-col gap-1 ml-10 space-y-7">
            <Item
              link="/home"
              tip="Home"
              icon={<HomeIcon className="w-6 h-6 text-cyan-500" />}
            />

            <Item
              link="/explore"
              tip="Discover memes"
              icon={<SparklesIcon className="w-6 h-6 text-yellow-400" />}
            />

            {session && (
              <Item
                link={`/u/${session?.twitter?.twitterHandle}`}
                tip="Profile"
                icon={<UserIcon className="w-6 h-6 text-blue-400" />}
                check="/u"
              />
            )}

            <Item
              link="/dash"
              tip="Dashboard"
              icon={<DesktopComputerIcon className="w-6 h-6 text-gray-400" />}
            />

            <Item
              link="/create"
              tip="Create"
              icon={<PlusIcon className="w-6 h-6 text-gray-400" />}
            />

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
