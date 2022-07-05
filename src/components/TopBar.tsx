import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

function TopBar() {
  return (
    <div>
      <div className="flex items-center justify-between h-20 mx-5 md:h-16">
        <div className="w-full text-lg font-bold md:text-2xl font-trispace text-slate-800">
          😂 LMFAO
          <span className="text-sm font-semibold text-slate-600">.tech</span>
        </div>
        <div className="flex items-center w-full h-10 rounded-lg bg-slate-100 text-slate-300">
          <SearchIcon className="w-6 h-6 mx-2" />
          <input
            className="w-full h-10 p-2 text-black border-none rounded-lg bg-slate-100 focus:border-none"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
