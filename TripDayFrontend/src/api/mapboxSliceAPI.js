import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import fetch from 'isomorphic-fetch';
import { FOURSQUARE_API_KEY } from '../constants';

/*
  Use mapbox api v6
  https://api.foursquare.com/v3/places/search?ll=25.1593548,121.4296176&categories=4d4b7105d754a06374d81259&radius=500
  authorization: APIKEY
*/
export const mapboxApi = createApi({
  reducerPath: 'mapboxApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.foursquare.com/v3/',
    fetchFn: fetch,
    prepareHeaders: (headers) => {
      headers.set('Authorization', FOURSQUARE_API_KEY);
    }
  }),
  endpoints: (builder) => ({
    getNearbyRestaurants: builder.query({
      query: ({ ll, radius, limit }) => `places/search?ll=${ll}&radius=${radius}&limit=${limit}&categories=4d4b7105d754a06374d81259`,
    })
  }),
});

export const { useLazyGetNearbyRestaurantsQuery } = mapboxApi;
