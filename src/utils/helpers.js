/**
 * Utility functions for the Earthquake Visualizer application
 * Contains helper functions for data processing, formatting, and calculations
 */

// ==================== DATE & TIME UTILITIES ====================

/**
 * Format earthquake timestamp to human-readable relative time
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Formatted time string (e.g., "2h ago", "5m ago")
 */
export function formatRelativeTime(timestamp) {
  if (!timestamp) return 'Unknown';
  
  const now = new Date();
  const earthquakeTime = new Date(timestamp);
  const diffMs = now - earthquakeTime;
  
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return earthquakeTime.toLocaleDateString();
}

/**
 * Format timestamp to full date and time string
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Formatted date and time
 */
export function formatFullDateTime(timestamp) {
  if (!timestamp) return 'Unknown';
  
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });
}

/**
 * Get time zone offset string
 * @returns {string} Time zone offset (e.g., "UTC-8", "UTC+5")
 */
export function getTimeZoneOffset() {
  const offset = new Date().getTimezoneOffset();
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  const sign = offset <= 0 ? '+' : '-';
  
  return `UTC${sign}${hours.toString().padStart(2, '0')}${minutes > 0 ? ':' + minutes.toString().padStart(2, '0') : ''}`;
}

// ==================== MAGNITUDE UTILITIES ====================

/**
 * Get color based on earthquake magnitude using scientific classification
 * @param {number} magnitude - Earthquake magnitude
 * @returns {string} Hex color code
 */
export function getMagnitudeColor(magnitude) {
  if (magnitude >= 7.0) return '#8B0000'; // Dark red for major
  if (magnitude >= 6.0) return '#EF4444'; // Red for strong
  if (magnitude >= 4.5) return '#F97316'; // Orange for moderate
  if (magnitude >= 2.5) return '#EAB308'; // Yellow for light
  if (magnitude >= 1.0) return '#84CC16'; // Light green for micro
  return '#22C55E'; // Green for minor
}

/**
 * Get marker size based on earthquake magnitude
 * @param {number} magnitude - Earthquake magnitude
 * @returns {number} Marker radius in pixels
 */
export function getMagnitudeSize(magnitude) {
  if (magnitude >= 7.0) return 16;
  if (magnitude >= 6.0) return 14;
  if (magnitude >= 4.5) return 12;
  if (magnitude >= 2.5) return 10;
  if (magnitude >= 1.0) return 8;
  return 6;
}

/**
 * Get magnitude classification label
 * @param {number} magnitude - Earthquake magnitude
 * @returns {string} Classification label
 */
export function getMagnitudeLabel(magnitude) {
  if (magnitude >= 8.0) return 'Great';
  if (magnitude >= 7.0) return 'Major';
  if (magnitude >= 6.0) return 'Strong';
  if (magnitude >= 4.5) return 'Moderate';
  if (magnitude >= 2.5) return 'Light';
  if (magnitude >= 1.0) return 'Micro';
  return 'Minor';
}

/**
 * Get magnitude description with effects
 * @param {number} magnitude - Earthquake magnitude
 * @returns {string} Description of earthquake effects
 */
export function getMagnitudeDescription(magnitude) {
  if (magnitude >= 8.0) return 'Devastating damage, felt over very large areas';
  if (magnitude >= 7.0) return 'Serious damage over large areas, felt over very large areas';
  if (magnitude >= 6.0) return 'Strong to violent shaking, damage to buildings';
  if (magnitude >= 4.5) return 'Moderate shaking, some damage to weak structures';
  if (magnitude >= 2.5) return 'Weak shaking, rarely causes damage';
  if (magnitude >= 1.0) return 'Very weak shaking, not felt by people';
  return 'Generally not felt by people';
}

// ==================== GEOGRAPHIC UTILITIES ====================

/**
 * Format depth with appropriate units and description
 * @param {number} depth - Depth in kilometers
 * @returns {string} Formatted depth string
 */
export function formatDepth(depth) {
  if (depth === null || depth === undefined) return 'Unknown';
  
  const depthKm = Math.abs(depth);
  let description = '';
  
  if (depthKm < 70) description = ' (shallow)';
  else if (depthKm < 300) description = ' (intermediate)';
  else description = ' (deep)';
  
  return `${depthKm.toFixed(1)} km${description}`;
}

/**
 * Calculate distance between two geographic points using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Convert degrees to radians
 * @param {number} degrees - Angle in degrees
 * @returns {number} Angle in radians
 */
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Format coordinates to readable string
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {string} Formatted coordinates
 */
export function formatCoordinates(lat, lng) {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';
  
  return `${Math.abs(lat).toFixed(3)}°${latDir}, ${Math.abs(lng).toFixed(3)}°${lngDir}`;
}

// ==================== DATA PROCESSING UTILITIES ====================

/**
 * Filter earthquakes by minimum magnitude
 * @param {Array} earthquakes - Array of earthquake objects
 * @param {number} minMagnitude - Minimum magnitude threshold
 * @returns {Array} Filtered earthquake array
 */
export function filterEarthquakesByMagnitude(earthquakes, minMagnitude) {
  if (!earthquakes || !Array.isArray(earthquakes)) return [];
  
  return earthquakes.filter(earthquake => {
    const magnitude = earthquake.properties?.mag;
    return magnitude !== null && magnitude !== undefined && magnitude >= minMagnitude;
  });
}

/**
 * Sort earthquakes by specified criteria
 * @param {Array} earthquakes - Array of earthquake objects
 * @param {string} sortBy - Sort criteria ('magnitude', 'time', 'depth')
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted earthquake array
 */
export function sortEarthquakes(earthquakes, sortBy = 'magnitude', order = 'desc') {
  if (!earthquakes || !Array.isArray(earthquakes)) return [];
  
  return [...earthquakes].sort((a, b) => {
    let valueA, valueB;
    
    switch (sortBy) {
      case 'magnitude':
        valueA = a.properties?.mag || 0;
        valueB = b.properties?.mag || 0;
        break;
      case 'time':
        valueA = a.properties?.time || 0;
        valueB = b.properties?.time || 0;
        break;
      case 'depth':
        valueA = a.geometry?.coordinates?.[2] || 0;
        valueB = b.geometry?.coordinates?.[2] || 0;
        break;
      default:
        return 0;
    }
    
    if (order === 'asc') {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });
}

/**
 * Get earthquake statistics from array
 * @param {Array} earthquakes - Array of earthquake objects
 * @returns {Object} Statistics object
 */
export function getEarthquakeStatistics(earthquakes) {
  if (!earthquakes || !Array.isArray(earthquakes) || earthquakes.length === 0) {
    return {
      total: 0,
      maxMagnitude: 0,
      minMagnitude: 0,
      averageMagnitude: 0,
      maxDepth: 0,
      minDepth: 0,
      averageDepth: 0,
      timeRange: { start: null, end: null }
    };
  }
  
  const magnitudes = earthquakes
    .map(eq => eq.properties?.mag)
    .filter(mag => mag !== null && mag !== undefined);
  
  const depths = earthquakes
    .map(eq => eq.geometry?.coordinates?.[2])
    .filter(depth => depth !== null && depth !== undefined);
  
  const times = earthquakes
    .map(eq => eq.properties?.time)
    .filter(time => time !== null && time !== undefined);
  
  return {
    total: earthquakes.length,
    maxMagnitude: magnitudes.length > 0 ? Math.max(...magnitudes) : 0,
    minMagnitude: magnitudes.length > 0 ? Math.min(...magnitudes) : 0,
    averageMagnitude: magnitudes.length > 0 ? magnitudes.reduce((sum, mag) => sum + mag, 0) / magnitudes.length : 0,
    maxDepth: depths.length > 0 ? Math.max(...depths) : 0,
    minDepth: depths.length > 0 ? Math.min(...depths) : 0,
    averageDepth: depths.length > 0 ? depths.reduce((sum, depth) => sum + depth, 0) / depths.length : 0,
    timeRange: {
      start: times.length > 0 ? Math.min(...times) : null,
      end: times.length > 0 ? Math.max(...times) : null
    }
  };
}

// ==================== VALIDATION UTILITIES ====================

/**
 * Validate earthquake data object
 * @param {Object} earthquake - Earthquake object to validate
 * @returns {boolean} True if valid earthquake object
 */
export function isValidEarthquake(earthquake) {
  return (
    earthquake &&
    earthquake.type === 'Feature' &&
    earthquake.properties &&
    earthquake.geometry &&
    earthquake.geometry.type === 'Point' &&
    Array.isArray(earthquake.geometry.coordinates) &&
    earthquake.geometry.coordinates.length >= 2 &&
    typeof earthquake.properties.mag === 'number' &&
    typeof earthquake.properties.time === 'number'
  );
}

/**
 * Sanitize earthquake data array
 * @param {Array} earthquakes - Array of earthquake objects
 * @returns {Array} Array of valid earthquake objects
 */
export function sanitizeEarthquakeData(earthquakes) {
  if (!Array.isArray(earthquakes)) return [];
  
  return earthquakes.filter(isValidEarthquake);
}

// ==================== URL & SHARING UTILITIES ====================

/**
 * Generate shareable URL for specific earthquake
 * @param {Object} earthquake - Earthquake object
 * @returns {string} Shareable URL
 */
export function generateShareableUrl(earthquake) {
  if (!earthquake || !earthquake.geometry) return window.location.href;
  
  const [lng, lat] = earthquake.geometry.coordinates;
  const magnitude = earthquake.properties?.mag || 0;
  
  const params = new URLSearchParams({
    lat: lat.toFixed(4),
    lng: lng.toFixed(4),
    mag: magnitude.toFixed(1),
    id: earthquake.id || ''
  });
  
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

/**
 * Parse URL parameters for earthquake data
 * @returns {Object|null} Parsed earthquake parameters or null
 */
export function parseUrlParameters() {
  const params = new URLSearchParams(window.location.search);
  
  const lat = parseFloat(params.get('lat'));
  const lng = parseFloat(params.get('lng'));
  const mag = parseFloat(params.get('mag'));
  const id = params.get('id');
  
  if (isNaN(lat) || isNaN(lng)) return null;
  
  return { lat, lng, mag: isNaN(mag) ? 0 : mag, id };
}

// ==================== PERFORMANCE UTILITIES ====================

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ==================== EXPORT UTILITIES ====================

/**
 * Export earthquake data as CSV
 * @param {Array} earthquakes - Array of earthquake objects
 * @returns {string} CSV formatted string
 */
export function exportToCSV(earthquakes) {
  if (!earthquakes || earthquakes.length === 0) return '';
  
  const headers = ['ID', 'Magnitude', 'Location', 'Latitude', 'Longitude', 'Depth (km)', 'Time', 'URL'];
  const csvRows = [headers.join(',')];
  
  earthquakes.forEach(earthquake => {
    const { properties, geometry } = earthquake;
    const [lng, lat, depth] = geometry.coordinates;
    
    const row = [
      earthquake.id || '',
      properties.mag || '',
      `"${properties.place || ''}"`,
      lat.toFixed(4),
      lng.toFixed(4),
      depth ? depth.toFixed(1) : '',
      formatFullDateTime(properties.time),
      properties.url || ''
    ];
    
    csvRows.push(row.join(','));
  });
  
  return csvRows.join('\n');
}

/**
 * Download data as file
 * @param {string} data - Data to download
 * @param {string} filename - Name of the file
 * @param {string} type - MIME type
 */
export function downloadFile(data, filename, type = 'text/plain') {
  const blob = new Blob([data], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}