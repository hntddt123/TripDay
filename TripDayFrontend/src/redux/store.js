import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './reducers/counterReducer';
import { mapReducer } from './reducers/mapReducer';
import { foursquareApi } from '../api/foursquareSliceAPI';
import { mapboxApi } from '../api/mapboxSliceAPI';

const store = configureStore({
  reducer: {
    counterReducer,
    mapReducer,
    [foursquareApi.reducerPath]: foursquareApi.reducer,
    [mapboxApi.reducerPath]: mapboxApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(foursquareApi.middleware, mapboxApi.middleware)
});

export default store;
