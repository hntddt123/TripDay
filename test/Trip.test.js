import { render, screen } from '@testing-library/react';
import Trip from '../src/components/Trip';

test('renders NewAdventureButton button', () => {
  render(<Trip />);
  const ButtonElement = screen.getByText(/Trips UI Here/i);
  expect(ButtonElement).toBeInTheDocument();
});
