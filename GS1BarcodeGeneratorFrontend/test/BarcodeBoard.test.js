import { render, screen } from '@testing-library/react';
import BarcodeBoard from '../src/components/BarcodeBoard';

test('renders BarcodeBoard and BarcodeCard has a select button', () => {
  render(<BarcodeBoard />);
  const BarcodeCardButton = screen.getByRole('button');
  expect(BarcodeCardButton).toBeInTheDocument();
});
