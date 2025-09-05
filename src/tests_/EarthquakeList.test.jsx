import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EarthquakeList from '../components/EarthquakeList';
import { EarthquakeProvider } from '../context/EarthquakeContext';

describe('EarthquakeList', () => {
  it('shows no earthquakes message when list is empty', () => {
    render(
      <EarthquakeProvider>
        <EarthquakeList />
      </EarthquakeProvider>
    );
    
    // Since no earthquakes are loaded initially, it should show the empty state
    expect(screen.getByText(/No Earthquakes Found/i)).toBeInTheDocument();
  });
});