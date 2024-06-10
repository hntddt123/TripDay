import { createSlice } from '@reduxjs/toolkit';

const initialMapState = {
  mapStyle: 'mapbox://styles/mapbox/standard',
  viewState: {
    longitude: 121.432915,
    latitude: 25.1580665,
    zoom: 15
  },
  gpsLonLat: { longitude: null, latitude: null },
  markers: []
};

const mapSlice = createSlice({
  name: 'map',
  initialState: initialMapState,
  reducers: {
    setViewState: (state, action) => ({ ...state, viewState: action.payload }),
    setMarker: (state, action) => ({ ...state, markers: [action.payload] }),
    setCurrentLocation: (state, action) => ({ ...state, gpsLonLat: action.payload }),
  }
});

export const { setViewState, setMarker, setCurrentLocation } = mapSlice.actions;
export const mapReducer = mapSlice.reducer;
