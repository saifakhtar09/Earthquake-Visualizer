import React, { useMemo } from 'react';
import { useEarthquake } from '../context/EarthquakeContext.jsx';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';
import { magnitudeRanges } from "../utils/magnitudeScale.js";

function Chart() {
  const { state } = useEarthquake();
  const { earthquakes } = state;

  // Magnitude distribution
  const magnitudeDistribution = useMemo(() => {
    if (!earthquakes || earthquakes.length === 0) return [];
    const ranges = magnitudeRanges.map(r => ({ ...r, count: 0 }));
    earthquakes.forEach(eq => {
      const magnitude = eq.properties.mag || 0;
      ranges.forEach(range => {
        if (magnitude >= range.min && magnitude < range.max) range.count++;
      });
    });
    return ranges;
  }, [earthquakes]);

  // Hourly distribution
  const hourlyDistribution = useMemo(() => {
    if (!earthquakes || earthquakes.length === 0) return [];
    const hours = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      count: 0,
      label: `${i.toString().padStart(2, '0')}:00`
    }));
    const now = new Date();
    earthquakes.forEach(eq => {
      const eqTime = new Date(eq.properties.time);
      const hoursDiff = (now - eqTime) / (1000 * 60 * 60);
      if (hoursDiff <= 24) hours[eqTime.getHours()].count++;
    });
    return hours;
  }, [earthquakes]);

  // Stats
  const stats = useMemo(() => {
    if (!earthquakes || earthquakes.length === 0) {
      return { total: 0, maxMagnitude: 0, avgMagnitude: 0, maxDepth: 0 };
    }
    const magnitudes = earthquakes.map(eq => eq.properties.mag).filter(m => m !== null && m !== undefined);
    const depths = earthquakes.map(eq => eq.geometry.coordinates[2]).filter(d => d !== null && d !== undefined);
    return {
      total: earthquakes.length,
      maxMagnitude: Math.max(...magnitudes) || 0,
      avgMagnitude: magnitudes.length > 0 ? magnitudes.reduce((s, m) => s + m, 0) / magnitudes.length : 0,
      maxDepth: Math.max(...depths) || 0
    };
  }, [earthquakes]);

  const maxCount = Math.max(...magnitudeDistribution.map(i => i.count), 0);
  const maxHourlyCount = Math.max(...hourlyDistribution.map(i => i.count), 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 sm:p-6">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 size={20} className="text-emerald-600" />
        <h2 className="text-base sm:text-lg font-semibold text-slate-800">
          Earthquake Analytics
        </h2>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-50 rounded-lg p-4 text-center">
          <Activity size={20} className="mx-auto mb-2 text-slate-600" />
          <div className="text-xl sm:text-2xl font-bold text-slate-800">{stats.total}</div>
          <div className="text-xs sm:text-sm text-slate-600">Total Events</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <TrendingUp size={20} className="mx-auto mb-2 text-red-600" />
          <div className="text-xl sm:text-2xl font-bold text-red-600">
            {stats.maxMagnitude.toFixed(1)}
          </div>
          <div className="text-xs sm:text-sm text-slate-600">Max Magnitude</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-blue-600">
            {stats.avgMagnitude.toFixed(1)}
          </div>
          <div className="text-xs sm:text-sm text-slate-600">Avg Magnitude</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-purple-600">
            {stats.maxDepth.toFixed(0)} km
          </div>
          <div className="text-xs sm:text-sm text-slate-600">Max Depth</div>
        </div>
      </div>

      {/* Magnitude Distribution */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="text-sm sm:text-md font-medium text-slate-700 mb-4">
          Magnitude Distribution
        </h3>
        <div className="space-y-3 min-w-[320px]">
          {magnitudeDistribution.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <div className="w-20 sm:w-24 text-xs sm:text-sm text-slate-600 flex-shrink-0">
                {item.label}
              </div>
              <div className="flex-1 bg-slate-100 rounded-full h-5 sm:h-6 relative overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
                  style={{
                    backgroundColor: item.color,
                    width: maxCount > 0 ? `${(item.count / maxCount) * 100}%` : '0%'
                  }}
                >
                  {item.count > 0 && (
                    <span className="text-white text-[10px] sm:text-xs font-medium">
                      {item.count}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-10 sm:w-12 text-xs sm:text-sm text-slate-600 text-right">
                {stats.total > 0 ? ((item.count / stats.total) * 100).toFixed(0) : 0}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Chart */}
      <div className="overflow-x-auto">
        <h3 className="text-sm sm:text-md font-medium text-slate-700 mb-4">
          24-Hour Activity Pattern
        </h3>
        <div className="flex items-end space-x-1 h-28 sm:h-32 bg-slate-50 rounded-lg p-2 sm:p-4 min-w-[400px]">
          {hourlyDistribution.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-emerald-500 rounded-t transition-all duration-300 hover:bg-emerald-600"
                style={{
                  height: maxHourlyCount > 0 ? `${(item.count / maxHourlyCount) * 100}%` : '2px',
                  minHeight: '2px'
                }}
                title={`${item.label}: ${item.count} earthquakes`}
              />
              {idx % 4 === 0 && (
                <div className="text-[10px] sm:text-xs text-slate-500 mt-1 transform -rotate-45 origin-top">
                  {item.hour}h
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-[10px] sm:text-xs text-slate-500 mt-2 text-center">
          Hours (UTC) - Hover over bars for details
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="text-[10px] sm:text-xs text-slate-500">
          <p className="mb-1">
            <strong>Data Source:</strong> USGS Earthquake Hazards Program - Last 24 hours
          </p>
          <p>
            <strong>Update Frequency:</strong> Real-time data updated every 5 minutes
          </p>
        </div>
      </div>
    </div>
  );
}

export default Chart;
