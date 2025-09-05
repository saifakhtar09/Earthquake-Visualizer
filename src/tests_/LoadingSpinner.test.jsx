import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

// Simple test component
const LoadingSpinner = () => (
  <div>Loading earthquakes...</div>
);

describe('LoadingSpinner', () => {
  it('renders loading message', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText(/Loading earthquakes/i)).toBeInTheDocument();
  });
});