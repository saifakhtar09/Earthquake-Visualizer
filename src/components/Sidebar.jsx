import React from "react";
import Filters from "./Filters.jsx";
import EarthquakeList from "./EarthquakeList.jsx";
import { useEarthquake } from "../context/EarthquakeContext.jsx";

const Sidebar = () => {
  const { state } = useEarthquake();
  const { filteredEarthquakes } = state;

  return (
    <div className="
      w-full 
      lg:flex-1 lg:max-w-md 
      border-t lg:border-t-0 lg:border-l border-gray-200 
      flex flex-col
      h-full
    ">
      
      {/* Filters Section */}
      <div className="p-3 sm:p-4 border-b lg:border-b-0">
        <Filters />
      </div>

      {/* Earthquake List */}
      <div className="flex-1 overflow-y-auto">
        <EarthquakeList />
      </div>

      {/* Footer */}
      <div className="p-3 bg-white border-t shadow-md text-gray-700 text-sm text-center">
        Showing {filteredEarthquakes.length} earthquakes from the past 24 hours
      </div>

    </div>
  );
};

export default Sidebar;
