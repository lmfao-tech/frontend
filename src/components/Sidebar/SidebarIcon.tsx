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
    <div className="cursor-pointer rounded-full p-2 hover:bg-slate-100">
      <Tooltip content={tooltip} placement="right" animation="duration-500">
        {icon}
      </Tooltip>
    </div>
  );
}

export default SidebarIcon;
