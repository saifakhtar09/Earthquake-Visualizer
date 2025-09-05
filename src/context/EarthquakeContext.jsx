import React, { createContext, useContext, useReducer } from 'react';

const EarthquakeContext = createContext();

// Initial state for earthquake data and app state
const initialState = {
  earthquakes: [],
  filteredEarthquakes: [],
  selectedEarthquake: null,
  loading: false,
  error: null,
  filters: {
    minMagnitude: 0,
    region: ''
  }
};

// Reducer to manage earthquake state
const earthquakeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_EARTHQUAKES':
      return {
        ...state,
        earthquakes: action.payload,
        filteredEarthquakes: action.payload,
        loading: false,
        error: null
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    case 'SET_SELECTED_EARTHQUAKE':
      return {
        ...state,
        selectedEarthquake: action.payload
      };
    
    case 'SET_FILTERS':
      const newFilters = { ...state.filters, ...action.payload };
      const filtered = state.earthquakes.filter(earthquake => {
        const magnitude = earthquake.properties.mag || 0;
        const place = earthquake.properties.place?.toLowerCase() || '';
        
        const matchesMagnitude = magnitude >= newFilters.minMagnitude;
        const matchesRegion = !newFilters.region || 
          place.includes(newFilters.region.toLowerCase());
        
        return matchesMagnitude && matchesRegion;
      });
      
      return {
        ...state,
        filters: newFilters,
        filteredEarthquakes: filtered
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
};

// Context Provider Component
export const EarthquakeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(earthquakeReducer, initialState);
  
  return (
    <EarthquakeContext.Provider value={{ state, dispatch }}>
      {children}
    </EarthquakeContext.Provider>
  );
};

// Custom hook to use earthquake context
export const useEarthquake = () => {
  const context = useContext(EarthquakeContext);
  if (!context) {
    throw new Error('useEarthquake must be used within EarthquakeProvider');
  }
  return context;
};