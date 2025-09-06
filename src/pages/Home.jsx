import React, { useEffect, useCallback, useState } from "react";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import { useEarthquake } from "../context/EarthquakeContext";
import { fetchEarthquakes } from "../services/api";
import { RefreshCw, AlertTriangle, List, Map as MapIcon, LayoutGrid } from "lucide-react";
import { APP_CONFIG, ERROR_MESSAGES } from "../utils/constants";

const Home = () => {
  const { state, dispatch } = useEarthquake();
  const { loading, error } = state;
  const [refreshing, setRefreshing] = useState(false);
  const [activeView, setActiveView] = useState('both'); // 'map', 'data', 'both'

  const loadEarthquakes = useCallback(async () => {
    const controller = new AbortController();
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "CLEAR_ERROR" });

      const data = await fetchEarthquakes("all_day", {
        signal: controller.signal,
      });
      dispatch({ type: "SET_EARTHQUAKES", payload: data.features || [] });
    } catch (err) {
      if (err.name !== "AbortError") {
        dispatch({
          type: "SET_ERROR",
          payload: err.message || ERROR_MESSAGES.GENERIC_ERROR,
        });
      }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
      setRefreshing(false);
    }
    return () => controller.abort();
  }, [dispatch]);

  useEffect(() => {
    loadEarthquakes();
  }, [loadEarthquakes]);

  useEffect(() => {
    const interval = setInterval(loadEarthquakes, APP_CONFIG.REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [loadEarthquakes]);

  // Auto-switch to 'both' view on desktop, keep user choice on mobile/tablet
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && activeView !== 'both') {
        setActiveView('both');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeView]);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Simple Error Banner */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
          <button
            onClick={loadEarthquakes}
            className="text-red-600 hover:text-red-800 font-medium text-sm px-3 py-1 rounded hover:bg-red-100"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Simple Header with View Toggle */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Earthquake Monitor</h1>
        
        <div className="flex items-center gap-3">
          {/* View Toggle - Only show on mobile/tablet */}
          <div className="lg:hidden flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveView('map')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeView === 'map'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MapIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveView('data')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeView === 'data'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveView('both')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeView === 'both'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>

          {/* Refresh Button */}
          <button
            onClick={() => {
              setRefreshing(true);
              loadEarthquakes();
            }}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Layout - Always show both */}
        <div className="hidden lg:flex flex-1">
          {/* Map Section */}
          <div className="flex-1 relative bg-white">
            {loading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
                  <p className="text-gray-600">Loading earthquake data...</p>
                </div>
              </div>
            )}
            <Map />
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-white border-l border-gray-200">
            <Sidebar />
          </div>
        </div>

        {/* Mobile/Tablet Layout - Show based on activeView */}
        <div className="lg:hidden flex-1 relative">
          {/* Map View */}
          {(activeView === 'map' || activeView === 'both') && (
            <div className={`${activeView === 'both' ? 'h-1/2' : 'h-full'} bg-white relative`}>
              {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
                    <p className="text-gray-600 text-sm">Loading...</p>
                  </div>
                </div>
              )}
              <Map />
            </div>
          )}

          {/* Data View */}
          {(activeView === 'data' || activeView === 'both') && (
            <div className={`${
              activeView === 'both' 
                ? 'h-1/2 border-t border-gray-200' 
                : 'h-full'
            } bg-white`}>
              <Sidebar />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;