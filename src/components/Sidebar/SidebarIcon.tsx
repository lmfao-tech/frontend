import React from "react";
import { Tooltip } from "flowbite-react";

function SidebarIcon({
  icon,
  tooltip,
}: {
  icon: React.ReactNode;
  tooltip: string;
}) {
  return (
    <div className="p-2 duration-150 ease-out rounded-full cursor-pointer hover:scale-125">
      <Tooltip content={tooltip} placement="right">
        {icon}
      </Tooltip>
    </div>
  );
}

export default SidebarIcon;
