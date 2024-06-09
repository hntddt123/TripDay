const initialMapState = {
  mapStyle: 'mapbox://styles/mapbox/standard',
  viewState: {
    longitude: 121.432915,
    latitude: 25.1580665,
    zoom: 15
  }
};

export const mapReducer = (state = initialMapState, action) => {
  switch (action.type) {
    case 'setViewState':
      return { ...state, viewState: action.payload };

    default:
      return state;
  }
};
