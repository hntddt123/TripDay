import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../src/redux/reducerslices/counterSlice';

export const renderWithRedux = (
  component,
  {
    initialState,
    store = configureStore({ reducer: { counter: counterReducer }, preloadedState: initialState }),
  } = {}
) => ({
  ...render(<Provider store={store}>{component}</Provider>),
  store,
});
