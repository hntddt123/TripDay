import { createSlice } from '@reduxjs/toolkit';

const initialMapState = {
  mapStyle: 'mapbox://styles/mapbox/standard',
  viewState: {
    longitude: 153.4250000,
    latitude: 22.4250000,
    zoom: 1
  },
  gpsLonLat: { longitude: null, latitude: null },
  markers: [],
  selectedPOI: '',
  selectedPOIIcon: ''
};

const mapSlice = createSlice({
  name: 'map',
  initialState: initialMapState,
  reducers: {
    setViewState: (state, action) => ({ ...state, viewState: action.payload }),
    setMarker: (state, action) => ({ ...state, markers: [action.payload] }),
    setCurrentLocation: (state, action) => ({ ...state, gpsLonLat: action.payload }),
    setUserOption: (state, action) => ({ ...state, userOption: { searchCategory: action.payload } }),
    setSelectedPOI: (state, action) => ({ ...state, selectedPOI: action.payload }),
    setSelectedPOIIcon: (state, action) => ({ ...state, selectedPOIIcon: action.payload }),
  }
});

export const { setViewState, setMarker, setCurrentLocation, setSelectedPOI, setSelectedPOIIcon } = mapSlice.actions;
export const mapReducer = mapSlice.reducer;
