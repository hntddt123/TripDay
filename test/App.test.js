import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('Canary Test', () => {
  expect(1).toBe(1);
});

test('renders Trip Day title', () => {
  render(<App />);
  const linkElement = screen.getByText(/TripDay/i);
  expect(linkElement).toBeInTheDocument();
});
