import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducerslices/counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
