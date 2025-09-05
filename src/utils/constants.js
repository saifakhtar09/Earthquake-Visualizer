// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary',
  ENDPOINTS: {
    ALL_DAY: 'all_day.geojson',
    ALL_WEEK: 'all_week.geojson'
  }
};

// App Constants
export const APP_CONFIG = {
  REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes
  MAP_DEFAULT_CENTER: [39.8283, -98.5795], // US center
  MAP_DEFAULT_ZOOM: 4
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  NO_DATA: 'No earthquake data available.',
  GENERIC_ERROR: 'Something went wrong. Please try again.'
};