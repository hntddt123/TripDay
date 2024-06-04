import { screen } from '@testing-library/react';
import { act } from 'react';

import Counter from '../src/components/Counter';
import { increment, decrement } from '../src/redux/reducerslices/counterSlice';
import { renderWithRedux } from './renderWithRedux';

test('renders with initial state', () => {
  renderWithRedux(<Counter />);
  expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
});

test('increments the counter', () => {
  const { store } = renderWithRedux(<Counter />);
  act(() => {
    store.dispatch(increment());
  });
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});

test('decrements the counter', () => {
  const { store } = renderWithRedux(<Counter />, { initialState: { counter: { count: 1 } } });
  act(() => {
    store.dispatch(decrement());
  });
  expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
});
