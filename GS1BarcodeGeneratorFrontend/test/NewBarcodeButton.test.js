import { render, screen } from '@testing-library/react';
import NewBarcodeButton from '../src/components/NewBarcodeButton';

test('renders NewAdventureButton button', () => {
  render(<NewBarcodeButton />);
  const ButtonElement = screen.getByText(/New Barcode/i);
  expect(ButtonElement).toBeInTheDocument();
});
