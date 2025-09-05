import React, { useEffect, useCallback, useState } from "react";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import { useEarthquake } from "../context/EarthquakeContext";
import { fetchEarthquakes } from "../services/api";
import { RefreshCw, AlertTriangle } from "lucide-react";
import { APP_CONFIG, ERROR_MESSAGES } from "../utils/constants";

const Home = () => {
  const { state, dispatch } = useEarthquake();
  const { loading, error } = state;
  const [refreshing, setRefreshing] = useState(false);

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

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Error Banner */}
      {error && (
        <div
          role="alert"
          className="bg-red-50 border-b border-red-200 px-4 py-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span className="text-red-800 text-sm">{error}</span>
          </div>
          <button
            onClick={loadEarthquakes}
            className="text-red-700 hover:text-red-900 text-sm font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* Map Section */}
        <div className="relative min-h-[300px] lg:min-h-0 flex-[2]">
          <button
            onClick={() => {
              setRefreshing(true);
              loadEarthquakes();
            }}
            disabled={refreshing}
            className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-50 disabled:bg-gray-100 p-2 rounded-lg shadow border border-gray-200"
          >
            <RefreshCw
              className={`h-5 w-5 text-gray-700 ${
                refreshing ? "animate-spin" : ""
              }`}
            />
          </button>

          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                <p className="text-gray-600">Loading earthquake data...</p>
              </div>
            </div>
          )}

          <Map />
        </div>

        {/* Sidebar Section */}
        <div className="flex-1 border-t lg:border-t-0 lg:border-l border-gray-200 bg-white min-h-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
