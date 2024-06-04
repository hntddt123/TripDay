import { screen } from '@testing-library/react';
import { act } from 'react';

import Counter from '../src/components/Counter';
import { incrementCount, decrementCount } from '../src/redux/reducers/counterReducer';
import { renderWithRedux } from './renderWithRedux';

test('renders with initial state', () => {
  renderWithRedux(<Counter />);
  expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
});

test('increments the counter from 0 to 1', () => {
  const { store } = renderWithRedux(<Counter />);
  act(() => {
    store.dispatch(incrementCount(0));
  });
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});

test('decrements the counter from 1 to 0', () => {
  const { store } = renderWithRedux(<Counter />, { initialState: { counter: { count: 1 } } });
  act(() => {
    store.dispatch(decrementCount(1));
  });
  expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
});
