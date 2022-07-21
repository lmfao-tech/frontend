import React from "react";
import { Tooltip } from "flowbite-react";

function SidebarIcon({
  icon,
  tooltip,
  position = "right",
}: {
  icon: React.ReactNode;
  tooltip: string;
  position?: "right" | "left" | "top" | "bottom";
  
}) {
  return (
    <button>
      <div className="p-2 duration-150 ease-out rounded-full cursor-pointer hover:scale-125">
        <Tooltip content={tooltip} placement={position}>
          {icon}
        </Tooltip>
      </div>
    </button>
  );
}

export default SidebarIcon;
