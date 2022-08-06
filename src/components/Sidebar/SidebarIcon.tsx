import React from "react";
import { Tooltip } from "flowbite-react";

function SidebarIcon({
  icon
}: {
  icon: React.ReactNode;
}) {
  return (
    <button>
      <div className="p-2 duration-150 ease-out rounded-full cursor-pointer hover:scale-125">
        {icon}
      </div>
    </button>
  );
}

export default SidebarIcon;
