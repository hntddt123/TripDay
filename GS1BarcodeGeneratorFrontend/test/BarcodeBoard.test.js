import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BarcodeBoard from '../src/components/BarcodeBoard';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

test('renders BarcodeBoard', () => {
  renderWithRouter(<BarcodeBoard />);
  expect(screen.getByText((content, element) => element.tagName.toLowerCase() === 'h1')).toBeInTheDocument();
});
