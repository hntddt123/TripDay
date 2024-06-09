import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import fetch from 'isomorphic-fetch';
import { DOG_API_KEY } from '../constants';

interface Breed {
  id: string;
  dogName: string;
  image: {
    url: string
  }
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thedogapi.com/v1',
    fetchFn: fetch,
    prepareHeaders(headers) {
      headers.set('x-api-key', DOG_API_KEY);

      return headers;
    }
  }),
  endpoints(builder) {
    return {
      fetchBreeds: builder.query<Breed[], number | void>({
        query(limit = 3) {
          return `/breeds?limit=${limit}`;
        }
      })
    };
  }
});

export const { useFetchBreedsQuery } = apiSlice;
