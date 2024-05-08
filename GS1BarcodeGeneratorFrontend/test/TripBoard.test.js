import { render, screen } from '@testing-library/react';
import TripBoard from '../src/components/TripBoard';

test('renders TripBoard and TripCard has a select button', () => {
  render(<TripBoard />);
  const TripCardButton = screen.getByRole('button');
  expect(TripCardButton).toBeInTheDocument();
});
