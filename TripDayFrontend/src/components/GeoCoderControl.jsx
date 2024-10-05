import { useState } from 'react';
import { useControl, Marker } from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const noop = () => { };

export default function GeocoderControl({ mapboxAccessToken, position,
  onLoading = noop, onResult = noop, onResults = noop, onError = noop, marker = true,
  proximity, render, language, zoom, flyTo, placeholder, countries, types, minLength, limit, filter, origin }) {
  const [geocoderMarker, setGeocoderMarker] = useState(true);

  const geocoder = useControl(
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
        const location = result
          && (result.center || (result.geometry?.type === 'Point' && result.geometry.coordinates));
        if (location && marker) {
          const markerProps = typeof marker === 'object' ? marker : {};
          setGeocoderMarker(<Marker {...markerProps} longitude={location[0]} latitude={location[1]} />);
        } else {
          setGeocoderMarker(null);
        }
      });
      ctrl.on('error', onError);
      return ctrl;
    },
    {
      position: position
    }
  );

  if (geocoder._map) {
    if (geocoder.getProximity() !== proximity && proximity !== undefined) {
      geocoder.setProximity(proximity);
    }
    if (geocoder.getRenderFunction() !== render && render !== undefined) {
      geocoder.setRenderFunction(render);
    }
    if (geocoder.getLanguage() !== language && language !== undefined) {
      geocoder.setLanguage(language);
    }
    if (geocoder.getZoom() !== zoom && zoom !== undefined) {
      geocoder.setZoom(zoom);
    }
    if (geocoder.getFlyTo() !== flyTo && flyTo !== undefined) {
      geocoder.setFlyTo(flyTo);
    }
    if (geocoder.getPlaceholder() !== placeholder && placeholder !== undefined) {
      geocoder.setPlaceholder(placeholder);
    }
    if (geocoder.getCountries() !== countries && countries !== undefined) {
      geocoder.setCountries(countries);
    }
    if (geocoder.getTypes() !== types && types !== undefined) {
      geocoder.setTypes(types);
    }
    if (geocoder.getMinLength() !== minLength && minLength !== undefined) {
      geocoder.setMinLength(minLength);
    }
    if (geocoder.getLimit() !== limit && limit !== undefined) {
      geocoder.setLimit(limit);
    }
    if (geocoder.getFilter() !== filter && filter !== undefined) {
      geocoder.setFilter(filter);
    }
    if (geocoder.getOrigin() !== origin && origin !== undefined) {
      geocoder.setOrigin(origin);
    }
  }
  return geocoderMarker;
}
