// USGS Earthquake API utility functions
const USGS_API_BASE = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary';

/**
 * Fetches earthquake data from USGS API
 * @param {string} timeframe - Time period for earthquakes (e.g., 'all_day', 'all_week')
 * @returns {Promise<Object>} GeoJSON earthquake data
 */
export const fetchEarthquakes = async (timeframe = 'all_day') => {
  try {
    const response = await fetch(`${USGS_API_BASE}/${timeframe}.geojson`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Validate the response structure
    if (!data.features || !Array.isArray(data.features)) {
      throw new Error('Invalid data format received from API');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    throw new Error(`Failed to fetch earthquake data: ${error.message}`);
  }
};

/**
 * Formats earthquake magnitude for display
 * @param {number} magnitude - Raw magnitude value
 * @returns {string} Formatted magnitude string
 */
export const formatMagnitude = (magnitude) => {
  if (magnitude === null || magnitude === undefined) {
    return 'N/A';
  }
  return magnitude.toFixed(1);
};

/**
 * Formats earthquake time for display
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Formatted date and time string
 */
export const formatTime = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
};

/**
 * Gets color based on earthquake magnitude
 * @param {number} magnitude - Earthquake magnitude
 * @returns {string} CSS color class or hex color
 */
export const getMagnitudeColor = (magnitude) => {
  if (!magnitude) return '#6B7280'; // gray-500
  
  if (magnitude >= 7) return '#DC2626'; // red-600 - Major
  if (magnitude >= 6) return '#EA580C'; // orange-600 - Strong  
  if (magnitude >= 5) return '#D97706'; // amber-600 - Moderate
  if (magnitude >= 4) return '#CA8A04'; // yellow-600 - Light
  if (magnitude >= 3) return '#65A30D'; // lime-600 - Minor
  return '#10B981'; // emerald-500 - Micro
};

/**
 * Gets earthquake severity label based on magnitude
 * @param {number} magnitude - Earthquake magnitude
 * @returns {string} Severity label
 */
export const getMagnitudeLabel = (magnitude) => {
  if (!magnitude) return 'Unknown';
  
  if (magnitude >= 8) return 'Great';
  if (magnitude >= 7) return 'Major';
  if (magnitude >= 6) return 'Strong';
  if (magnitude >= 5) return 'Moderate';
  if (magnitude >= 4) return 'Light';
  if (magnitude >= 3) return 'Minor';
  return 'Micro';
};

/**
 * Calculates distance between two coordinates (Haversine formula)
 * @param {number} lat1 - First point latitude
 * @param {number} lon1 - First point longitude
 * @param {number} lat2 - Second point latitude
 * @param {number} lon2 - Second point longitude
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};