import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('Canary Test', () => {
  expect(1).toBe(1);
});

test('renders QR Code Generator title', () => {
  render(<App />);
  const linkElement = screen.getByText(/GS1 QR Code Generator/i);
  expect(linkElement).toBeInTheDocument();
});
