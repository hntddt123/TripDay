import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import fetch from 'isomorphic-fetch';
import { FOURSQUARE_API_KEY } from '../constants/constants';

/*
  Use mapbox api v6
  https://api.foursquare.com/v3/places/search?ll=25.1593548,121.4296176&categories=4d4b7105d754a06374d81259&radius=500
  4d4b7105d754a06374d81259 restaurants
  4bf58dd8d48988d1fa931735 hotels
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
    getNearbyPOI: builder.query({
      query: ({ ll, radius, limit, category }) => `places/search?ll=${ll}&radius=${radius}&limit=${limit}&categories=${category}&sort=DISTANCE`,
    })
  }),
});

export const { useLazyGetNearbyPOIQuery } = mapboxApi;
