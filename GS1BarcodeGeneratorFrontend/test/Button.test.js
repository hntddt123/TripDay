import { render, screen } from '@testing-library/react';
import Button from '../src/components/Button';

test('renders button with NewBarcodesButton Label', () => {
  render(<Button label='New Barcodes' />);
  const ButtonElement = screen.getByText(/New Barcodes/i);
  expect(ButtonElement).toBeInTheDocument();
});

