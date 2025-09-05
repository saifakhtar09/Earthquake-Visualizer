import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Chart from '../components/Chart';
import { EarthquakeProvider } from '../context/EarthquakeContext';

describe('Chart', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <EarthquakeProvider>
        <Chart />
      </EarthquakeProvider>
    );
    expect(container).toBeInTheDocument();
  });
});