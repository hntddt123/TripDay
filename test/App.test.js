import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('Canary Test', () => {
  expect(1).toBe(1);
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
