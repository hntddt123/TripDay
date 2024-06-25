/* eslint-disable react/prop-types */
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Map, { FullscreenControl, GeolocateControl, NavigationControl } from 'react-map-gl';
import { FoursquareResponsePropTypes } from '../constants/fourSqaurePropTypes';
import { setViewState, setMarker, setCurrentLocation, setIsShowingOnlySelectedPOI } from '../redux/reducers/mapReducer';
import { MAPBOX_API_KEY } from '../constants/constants';
import { useLazyGetDirectionsQuery } from '../api/mapboxSliceAPI';
// import ClickMarker from './ClickMarker';
import ProximityMarkers from './ProximityMarkers';
import AdditionalMarkerInfo from './AdditionalMarkerInfo';
import DirectionLayer from './DirectionLayer';
import NearbyPOIList from './NearbyPOIList';

// react-map-gl component
export default function CustomMap({ data, getPOIPhotosQueryResult, getPOIPhotosQueryTrigger }) {
  const [getDirectionsQueryTrigger, getDirectionsQueryResults] = useLazyGetDirectionsQuery();

  const mapStyle = useSelector((state) => state.mapReducer.mapStyle);
  const viewState = useSelector((state) => state.mapReducer.viewState);
  const isShowingAddtionalPopUp = useSelector((state) => state.mapReducer.isShowingAddtionalPopUp);
  const isNavigating = useSelector((state) => state.mapReducer.isNavigating);

  const mapRef = useRef();
  const geoControlRef = useRef();
  const [mapLoaded, setMapLoaded] = useState(false);
  const dispatch = useDispatch();
  const mapCSSStyle = { width: '100vw', height: '90vh', borderRadius: 10 };

  const handleStyleLoad = () => {
    setMapLoaded(true);
  };

  const onMove = useCallback((event) => {
    dispatch(setViewState(event.viewState));
  }, []);

  const handleCurrentLocation = (event) => {
    dispatch(setCurrentLocation({
      longitude: event.coords.longitude,
      latitude: event.coords.latitude,
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
    if (!isNavigating) {
      dispatch(setIsShowingOnlySelectedPOI(false));
    }
  };

  return (
    <Map
      ref={mapRef}
      {...viewState}
      onMove={onMove}
      onClick={handleClick}
      onLoad={handleStyleLoad}
      style={mapCSSStyle}
      mapStyle={mapStyle}
      mapLib={import('mapbox-gl')}
      mapboxAccessToken={MAPBOX_API_KEY}
      projection='mercator'

    >
      <FullscreenControl position='top-left' />
      <GeolocateControl
        ref={geoControlRef}
        position='top-left'
        positionOptions={{ enableHighAccuracy: true }}
        onGeolocate={handleCurrentLocation}
        showUserHeading
        showUserLocation
        trackUserLocation
      />
      <NavigationControl />
      <ProximityMarkers data={data} getPOIPhotosQueryTrigger={getPOIPhotosQueryTrigger} />
      <AdditionalMarkerInfo data={data} getPOIPhotosQueryResult={getPOIPhotosQueryResult} getDirectionsQueryTrigger={getDirectionsQueryTrigger} />
      {/* {(mapLoaded) ? <ClickMarker /> : null} */}
      {(mapLoaded) ? (
        <DirectionLayer
          getDirectionsQueryResults={getDirectionsQueryResults}
        />
      ) : null}
      <div className={`bottommenu ${isShowingAddtionalPopUp ? 'blur-sm' : null}`}>
        <NearbyPOIList poi={data} />
      </div>
    </Map>
  );
}

CustomMap.propTypes = {
  data: FoursquareResponsePropTypes,
};
