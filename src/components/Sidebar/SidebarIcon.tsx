import React from "react";
import { Tooltip } from "flowbite-react";

function SidebarIcon({
  icon,
  tooltip,
  position = "right",
  mobile = false,
}: {
  icon: React.ReactNode;
  tooltip?: string;
  position?: "right" | "left" | "top" | "bottom";
  mobile?: boolean;
}) {
  return (
    <button>
      <div className="p-2 duration-150 ease-out rounded-full cursor-pointer hover:scale-125">
        {!mobile ? (
          <Tooltip content={tooltip} placement={position}>
            {icon}
          </Tooltip>
        ) : (
          icon
        )}
      </div>
    </button>
  );
}

export default SidebarIcon;
