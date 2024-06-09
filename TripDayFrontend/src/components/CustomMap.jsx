import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Map from 'react-map-gl';

import { MAPBOX_API_KEY } from '../constants';

import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapView() {
  const mapStyle = useSelector((state) => state.mapReducer.mapStyle);
  const viewState = useSelector((state) => state.mapReducer.viewState);
  const dispatch = useDispatch();

  const onMove = useCallback((evt) => {
    dispatch({ type: 'setViewState', payload: evt.viewState });
  }, []);

  return (
    <Map
      {...viewState}
      onMove={onMove}
      style={{ width: '100%', height: 400 }}
      mapStyle={mapStyle}
      mapLib={import('mapbox-gl')}
      mapboxAccessToken={MAPBOX_API_KEY}
    />
  );
}
