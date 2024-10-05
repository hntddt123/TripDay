import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from '../src/redux/reducers/counterReducer';
import { mapReducer } from '../src/redux/reducers/mapReducer';


export const renderWithRedux = (
  component,
  {
    store = configureStore({
      reducer: {
        counterReducer,
        mapReducer
      },
    }),
  } = {}
) => ({
  ...render(<Provider store={store}>{component}</Provider>),
  store,
});
