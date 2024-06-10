import { createSlice } from '@reduxjs/toolkit';

const initialMarkerState = {
  markers: []
};

const markerSlice = createSlice({
  name: 'marker',
  initialState: initialMarkerState,
  reducers: {
    createMarker: (state, action) => ({ ...state, markers: [...state.markers, action.payload] }),
    removeMarker: (state, action) => ({
      ...state,
      markers: [state.markers.filter((marker) => marker.id !== action.payload.id)]
    }),
    resetAllMarker: (state) => ({
      ...state,
      markers: []
    })
  }
});

export const { createMarker, removeMarker, resetAllMarker } = markerSlice.actions;
export const markerReducer = markerSlice.reducer;
