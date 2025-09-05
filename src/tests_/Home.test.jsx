import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from '../pages/Home';
import { EarthquakeProvider } from '../context/EarthquakeContext';
import * as api from '../services/api';

vi.mock('../services/api');

const mockData = {
  features: [
    {
      id: '1',
      properties: {
        place: 'Test Location',
        mag: 4.5,
        time: Date.now()
      },
      geometry: {
        coordinates: [-120, 36, 10]
      }
    }
  ]
};

describe('Home', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders home page', async () => {
    api.fetchEarthquakes.mockResolvedValue(mockData);
    
    render(
      <EarthquakeProvider>
        <Home />
      </EarthquakeProvider>
    );
    
    // Just test that the component renders without crashing
    expect(document.body).toBeInTheDocument();
  });
});