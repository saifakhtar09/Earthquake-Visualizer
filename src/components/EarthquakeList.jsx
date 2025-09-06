import React from 'react';
import { MapPin, Clock, AlertTriangle, ExternalLink } from 'lucide-react';
import { useEarthquake } from '../context/EarthquakeContext.jsx';
import { formatMagnitude, formatTime, getMagnitudeColor, getMagnitudeLabel } from '../services/api.js';

const EarthquakeItem = ({ earthquake, isSelected, onClick }) => {
  const { properties, geometry } = earthquake;
  const [lng, lat] = geometry.coordinates;
  const magnitude = properties.mag || 0;
  const magnitudeColor = getMagnitudeColor(magnitude);

  return (
    <div
      className={`p-3 sm:p-4 border-b border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${
        isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
      }`}
      onClick={() => onClick(earthquake)}
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
            {properties.place || 'Unknown Location'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {lat.toFixed(3)}, {lng.toFixed(3)}
          </p>
        </div>

        {/* Magnitude Badge */}
        <div className="flex flex-col items-end gap-1">
          <span
            className="px-2 py-1 rounded-full text-white text-xs sm:text-sm font-bold"
            style={{ backgroundColor: magnitudeColor }}
          >
            M {formatMagnitude(magnitude)}
          </span>
          <span className="text-[10px] sm:text-xs text-gray-500">
            {getMagnitudeLabel(magnitude)}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>{formatTime(properties.time)}</span>
        </div>
        {properties.depth && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{properties.depth.toFixed(1)} km depth</span>
          </div>
        )}
        {properties.tsunami === 1 && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-red-600 font-medium">
            <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Tsunami Warning</span>
          </div>
        )}
      </div>

      {/* External Link */}
      {properties.url && (
        <div className="mt-3 pt-2 border-t border-gray-100">
          <a
            href={properties.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>USGS Details</span>
          </a>
        </div>
      )}
    </div>
  );
};

const EarthquakeList = () => {
  const { state, dispatch } = useEarthquake();
  const { filteredEarthquakes, selectedEarthquake, loading, error } = state;

  const handleEarthquakeSelect = (earthquake) => {
    dispatch({ type: 'SET_SELECTED_EARTHQUAKE', payload: earthquake });
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <p className="text-sm sm:text-base text-gray-600">Loading earthquakes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center p-4 sm:p-6">
        <div className="text-center">
          <AlertTriangle className="h-10 w-10 sm:h-12 sm:w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Error Loading Data</h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (filteredEarthquakes.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-4 sm:p-6">
        <div className="text-center">
          <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No Earthquakes Found</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Try adjusting your filters or check back later for new data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 sm:p-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          Recent Earthquakes
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          Click on any earthquake to view details on the map
        </p>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto earthquake-list max-h-[calc(100vh-180px)] sm:max-h-[calc(100vh-220px)] md:max-h-[calc(100vh-260px)]">
        {filteredEarthquakes
          .sort((a, b) => (b.properties.time || 0) - (a.properties.time || 0))
          .map((eq, i) => (
            <EarthquakeItem
              key={eq.id || i}
              earthquake={eq}
              isSelected={selectedEarthquake?.id === eq.id}
              onClick={handleEarthquakeSelect}
            />
          ))}
      </div>
    </div>
  );
};

export default EarthquakeList;
