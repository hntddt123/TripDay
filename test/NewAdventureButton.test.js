import { render, screen } from '@testing-library/react';
import NewAdventureButton from '../src/components/NewAdventureButton';

test('renders NewAdventureButton button', () => {
  render(<NewAdventureButton />);
  const ButtonElement = screen.getByText(/New Adventure/i);
  expect(ButtonElement).toBeInTheDocument();
});
