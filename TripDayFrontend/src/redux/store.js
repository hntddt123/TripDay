import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './reducers/counterReducer';
import { mapReducer } from './reducers/mapReducer';
import { markerReducer } from './reducers/markerReducer';
import { mapboxApi } from '../api/mapboxSliceAPI';

const store = configureStore({
  reducer: {
    counterReducer,
    mapReducer,
    markerReducer,
    [mapboxApi.reducerPath]: mapboxApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mapboxApi.middleware)
});

export default store;
