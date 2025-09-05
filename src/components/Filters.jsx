import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useEarthquake } from '../context/EarthquakeContext.jsx';

const Filters = () => {
  const { state, dispatch } = useEarthquake();
  const { filters, earthquakes, filteredEarthquakes } = state;
  const [showFilters, setShowFilters] = useState(false);

  const handleMagnitudeChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    dispatch({ type: 'SET_FILTERS', payload: { minMagnitude: value } });
  };

  const handleRegionChange = (e) => {
    dispatch({ type: 'SET_FILTERS', payload: { region: e.target.value } });
  };

  const resetFilters = () => {
    dispatch({ type: 'SET_FILTERS', payload: { minMagnitude: 0, region: '' } });
  };

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Header */}
      <div className="px-3 sm:px-4 py-2 sm:py-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-xs sm:text-sm"
          >
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filters</span>
          </button>

          {/* Count */}
          <div className="text-xs sm:text-sm text-gray-600">
            <span className="font-medium">{filteredEarthquakes.length}</span>
            <span> of </span>
            <span className="font-medium">{earthquakes.length}</span>
            <span> earthquakes</span>
          </div>
        </div>

        {/* Reset */}
        {(filters.minMagnitude > 0 || filters.region) && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 px-2 py-1 text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Filter Controls */}
      {showFilters && (
        <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4">
            {/* Magnitude */}
            <div className="space-y-2">
              <label htmlFor="magnitude" className="block text-xs sm:text-sm font-medium text-gray-700">
                Minimum Magnitude
              </label>
              <div>
                <input
                  type="range"
                  id="magnitude"
                  min="0"
                  max="9"
                  step="0.1"
                  value={filters.minMagnitude}
                  onChange={handleMagnitudeChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mt-1">
                  <span>0.0</span>
                  <span className="font-medium text-blue-600">
                    {filters.minMagnitude.toFixed(1)}
                  </span>
                  <span>9.0</span>
                </div>
              </div>
            </div>

            {/* Region */}
            <div className="space-y-2">
              <label htmlFor="region" className="block text-xs sm:text-sm font-medium text-gray-700">
                Search by Region
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
                <input
                  type="text"
                  id="region"
                  placeholder="e.g., California, Japan..."
                  value={filters.region}
                  onChange={handleRegionChange}
                  className="w-full pl-8 sm:pl-10 pr-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                {filters.region && (
                  <button
                    onClick={() => handleRegionChange({ target: { value: '' } })}
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mt-3 sm:mt-4">
            <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Quick Filters</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'All', min: 0 },
                { label: 'Minor 3.0+', min: 3 },
                { label: 'Light 4.0+', min: 4 },
                { label: 'Moderate 5.0+', min: 5 },
                { label: 'Strong 6.0+', min: 6 },
                { label: 'Major 7.0+', min: 7 },
              ].map((f) => (
                <button
                  key={f.min}
                  onClick={() => dispatch({ type: 'SET_FILTERS', payload: { minMagnitude: f.min } })}
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                    filters.minMagnitude === f.min
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
