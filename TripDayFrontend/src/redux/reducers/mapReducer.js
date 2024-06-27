import { createSlice } from '@reduxjs/toolkit';

const initialMapState = {
  mapStyle: 'mapbox://styles/mapbox/standard',
  viewState: {
    longitude: 153.4250000,
    latitude: 22.4250000,
    pitch: 30,
    zoom: 1.5
  },
  gpsLonLat: { longitude: null, latitude: null },
  markers: [],
  selectedPOI: '',
  selectedPOIIcon: '',
  selectedPOILonLat: { longitude: null, latitude: null },
  selectedPOIRadius: 500, // 100 ~ 1000m
  selectedPOICount: 20, // 5 ~ 50
  isFullPOIname: true,
  isShowingOnlySelectedPOI: false,
  isShowingAddtionalPopUp: false,
  isShowingSideBar: false,
  isNavigating: false
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
    setSelectedPOILonLat: (state, action) => ({ ...state, selectedPOILonLat: action.payload }),
    setSelectedPOIRadius: (state, action) => ({ ...state, selectedPOIRadius: action.payload }),
    setSelectedPOICount: (state, action) => ({ ...state, selectedPOICount: action.payload }),
    setIsFullPOIname: (state, action) => ({ ...state, isFullPOIname: action.payload }),
    setIsShowingOnlySelectedPOI: (state, action) => ({ ...state, isShowingOnlySelectedPOI: action.payload }),
    setIsShowingAddtionalPopUp: (state, action) => ({ ...state, isShowingAddtionalPopUp: action.payload }),
    setIsNavigating: (state, action) => ({ ...state, isNavigating: action.payload }),
    setIsShowingSideBar: (state, action) => ({ ...state, isShowingSideBar: action.payload })
  }
});

export const {
  setViewState,
  setMarker,
  setCurrentLocation,
  setSelectedPOI,
  setSelectedPOIIcon,
  setSelectedPOILonLat,
  setSelectedPOIRadius,
  setSelectedPOICount,
  setIsFullPOIname,
  setIsShowingOnlySelectedPOI,
  setIsShowingAddtionalPopUp,
  setIsNavigating,
  setIsShowingSideBar
} = mapSlice.actions;

export const mapReducer = mapSlice.reducer;
