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
    <div className="p-2 rounded-full cursor-pointer hover:bg-slate-100">
      <Tooltip content={tooltip} placement="right">
        {icon}
      </Tooltip>
    </div>
  );
}

export default SidebarIcon;
