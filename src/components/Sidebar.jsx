import React from "react";
import Filters from "./Filters.jsx";
import EarthquakeList from "./EarthquakeList.jsx";

const Sidebar = () => {
  return (
    <div className="
      w-full 
      lg:flex-1 lg:max-w-md 
      border-t lg:border-t-0 lg:border-l border-gray-200 
      flex flex-col 
      h-[40vh] sm:h-[50vh] lg:h-auto
    ">
      {/* Filters Section */}
      <div className="p-3 sm:p-4 border-b lg:border-b-0">
        <Filters />
      </div>

      {/* Earthquake List */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <EarthquakeList />
      </div>
    </div>
  );
};

export default Sidebar;
