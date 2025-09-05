import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEarthquake } from "../context/EarthquakeContext.jsx";
import {
  formatMagnitude,
  formatTime,
  getMagnitudeColor,
  getMagnitudeLabel,
} from "../services/api.js";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

/**
 * Creates a custom marker icon based on earthquake magnitude
 */
const createCustomIcon = (magnitude) => {
  const color = getMagnitudeColor(magnitude);
  const size = Math.max(8, Math.min(30, (magnitude || 1) * 4));

  return L.divIcon({
    className: "custom-earthquake-marker",
    html: `
      <div style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${Math.max(8, size * 0.4)}px;
        font-weight: bold;
        color: white;
        cursor: pointer;
      ">${formatMagnitude(magnitude)}</div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

const Map = () => {
  const { state, dispatch } = useEarthquake();
  const { filteredEarthquakes, selectedEarthquake } = state;
  const mapRef = useRef();

  // Center map on selected earthquake
  useEffect(() => {
    if (selectedEarthquake && mapRef.current) {
      const map = mapRef.current;
      const [lng, lat] = selectedEarthquake.geometry.coordinates;
      map.setView([lat, lng], 8, { animate: true });
    }
  }, [selectedEarthquake]);

  const handleMarkerClick = (earthquake) => {
    dispatch({ type: "SET_SELECTED_EARTHQUAKE", payload: earthquake });
  };

  return (
    <div className="w-full h-full relative"> {/* ✅ Now respects parent height */}
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="h-full w-full z-0"
        ref={mapRef}
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
      >
        {/* Tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          maxZoom={18}
        />

        {/* Markers */}
        {filteredEarthquakes.map((earthquake, index) => {
          const [lng, lat] = earthquake.geometry.coordinates;
          const { properties } = earthquake;

          if (!lat || !lng || isNaN(lat) || isNaN(lng)) return null;

          return (
            <Marker
              key={earthquake.id || index}
              position={[lat, lng]}
              icon={createCustomIcon(properties.mag)}
              eventHandlers={{ click: () => handleMarkerClick(earthquake) }}
            >
              <Popup className="custom-popup">
                <div className="p-2 max-w-[80vw] sm:max-w-[300px]">
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2">
                    {properties.title ||
                      properties.place ||
                      "Unknown Location"}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="px-2 py-1 rounded-full text-white text-xs sm:text-sm font-bold"
                      style={{
                        backgroundColor: getMagnitudeColor(properties.mag),
                      }}
                    >
                      M {formatMagnitude(properties.mag)}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {getMagnitudeLabel(properties.mag)}
                    </span>
                  </div>

                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Time:</span>
                      <span className="text-gray-600">
                        {formatTime(properties.time)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Depth:</span>
                      <span className="text-gray-600">
                        {properties.depth
                          ? `${properties.depth.toFixed(1)} km`
                          : "N/A"}
                      </span>
                    </div>

                    {properties.tsunami && (
                      <div className="flex justify-between">
                        <span className="font-medium text-red-600">
                          Tsunami:
                        </span>
                        <span className="text-red-600 font-bold">Warning</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        Coordinates:
                      </span>
                      <span className="text-gray-600 text-[10px] sm:text-xs">
                        {lat.toFixed(3)}, {lng.toFixed(3)}
                      </span>
                    </div>
                  </div>

                  {properties.url && (
                    <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200">
                      <a
                        href={properties.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium"
                      >
                        View USGS Details →
                      </a>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 bg-white rounded-lg shadow-lg p-2 sm:p-3 z-10 w-[150px] sm:w-auto">
        <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 sm:mb-2">
          Magnitude Scale
        </h4>
        <div className="space-y-1 text-[10px] sm:text-xs">
          {[
            { min: 7, label: "Major (7.0+)", color: getMagnitudeColor(7) },
            { min: 6, label: "Strong (6.0-6.9)", color: getMagnitudeColor(6) },
            { min: 5, label: "Moderate (5.0-5.9)", color: getMagnitudeColor(5) },
            { min: 4, label: "Light (4.0-4.9)", color: getMagnitudeColor(4) },
            { min: 3, label: "Minor (3.0-3.9)", color: getMagnitudeColor(3) },
            { min: 0, label: "Micro (<3.0)", color: getMagnitudeColor(2) },
          ].map((item) => (
            <div key={item.min} className="flex items-center gap-1 sm:gap-2">
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;
