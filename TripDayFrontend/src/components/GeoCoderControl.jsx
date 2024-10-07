import { useState, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useControl, Marker } from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {
  setViewState
} from '../redux/reducers/mapReducer';

const noop = () => { };

export default function GeocoderControl({ mapboxAccessToken, position,
  onLoading = noop, onResult = noop, onResults = noop, onError = noop, marker = true }) {
  const [geocoderMarker, setGeocoderMarker] = useState(true);

  const viewState = useSelector((state) => state.mapReducer.viewState);
  const dispatch = useDispatch();

  useControl(
    () => {
      const ctrl = new MapboxGeocoder({
        marker: false,
        accessToken: mapboxAccessToken
      });
      ctrl.on('loading', onLoading);
      ctrl.on('results', onResults);
      ctrl.on('result', (event) => {
        onResult(event);

        const { result } = event;
        const location = result && (result.center || (result.geometry?.type === 'Point' && result.geometry.coordinates));
        if (location && marker) {
          const markerProps = typeof marker === 'object' ? marker : {};
          setGeocoderMarker(<Marker {...markerProps} longitude={location[0]} latitude={location[1]} />);
        } else {
          setGeocoderMarker(null);
        }
        dispatch(setViewState({ latitude: location[1], longitude: location[0], pitch: viewState.pitch, zoom: 16 }));
      });
      ctrl.on('error', onError);
      return ctrl;
    },
    {
      position: position
    }
  );

  return geocoderMarker;
}
