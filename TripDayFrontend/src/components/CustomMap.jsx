import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Map, { FullscreenControl, GeolocateControl } from 'react-map-gl';
import { FoursquareResponsePropTypes } from '../constants/fourSqaurePropTypes';
import { setViewState, setMarker, setCurrentLocation } from '../redux/reducers/mapReducer';
import { MAPBOX_API_KEY } from '../constants/constants';
// import ClickMarker from './ClickMarker';
import ProximityMarkers from './ProximityMarkers';
import AdditionalMarkerInfo from './AdditionalMarkerInfo';

// react-map-gl component
export default function CustomMap({ data }) {
  const mapStyle = useSelector((state) => state.mapReducer.mapStyle);
  const viewState = useSelector((state) => state.mapReducer.viewState);
  const mapRef = useRef();
  const dispatch = useDispatch();

  const onMove = useCallback((event) => {
    dispatch(setViewState(event.viewState));
  }, []);

  const handleCurrentLocation = (event) => {
    dispatch(setCurrentLocation({
      longitude: event.coords.longitude,
      latitude: event.coords.latitude
    }));
  };

  const handleClick = (event) => {
    const newid = new Date().getTime();
    const { lng, lat } = event.lngLat;

    const newMarker = {
      id: newid,
      lng: lng,
      lat: lat
    };
    dispatch(setMarker(newMarker));
  };

  return (
    <Map
      ref={mapRef}
      {...viewState}
      onMove={onMove}
      onClick={handleClick}
      style={{ width: '100%', height: '90vh', borderRadius: 15 }}
      mapStyle={mapStyle}
      mapLib={import('mapbox-gl')}
      mapboxAccessToken={MAPBOX_API_KEY}
      cooperativeGestures
    >
      <GeolocateControl positionOptions={{ enableHighAccuracy: true }} onGeolocate={handleCurrentLocation} showUserHeading />
      <FullscreenControl position='top-left' />
      {/* {mapRef ? <ClickMarker /> : null} */}
      <ProximityMarkers data={data} />
      <AdditionalMarkerInfo data={data} />
    </Map>
  );
}

CustomMap.propTypes = {
  data: FoursquareResponsePropTypes,
};
