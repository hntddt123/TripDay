import { screen } from '@testing-library/react';
import App from '../src/App';
import { renderWithRedux } from './renderWithRedux';

test('Canary Test', () => {
  expect(1).toBe(1);
});

test('renders QR Code Generator title', () => {
  renderWithRedux(<App />);
  const linkElement = screen.getByText(/GS1 QR Code Generator/i);
  expect(linkElement).toBeInTheDocument();
});
