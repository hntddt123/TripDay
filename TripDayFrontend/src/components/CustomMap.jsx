import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Map, { Marker, FullscreenControl, GeolocateControl, Source, Layer } from 'react-map-gl';
import { setViewState, setMarker, setCurrentLocation } from '../redux/reducers/mapReducer';
import { MAPBOX_API_KEY } from '../constants';

import 'mapbox-gl/dist/mapbox-gl.css';

const createGeoJSONCircle = (center, radiusInMeters, points = 64) => {
  const coords = {
    longitude: center[0],
    latitude: center[1],
  };

  const km = radiusInMeters / 1000;

  const ret = [];
  const distanceX = km / (111.320 * Math.cos((coords.latitude * Math.PI) / 180));
  const distanceY = km / 110.574;

  let theta;
  let x;
  let y;

  for (let i = 0; i < points; i++) {
    theta = (i / points) * (2 * Math.PI);
    x = distanceX * Math.cos(theta);
    y = distanceY * Math.sin(theta);

    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]);

  return {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [ret],
    },
  };
};

const drawRadius = (lng, lat) => createGeoJSONCircle([lng, lat], 500);

export default function MapView() {
  const mapStyle = useSelector((state) => state.mapReducer.mapStyle);
  const viewState = useSelector((state) => state.mapReducer.viewState);
  const mapMarkers = useSelector((state) => state.mapReducer.markers);
  const apiMarkers = useSelector((state) => state.markerReducer.markers);
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

  const getClickMakers = () => ((mapMarkers.length > 0) ? mapMarkers.map((marker) => (
    <div key={marker.id}>
      <Marker longitude={marker.lng} latitude={marker.lat}>
        <div className='text-4xl'>📍</div>
      </Marker>
      <Marker longitude={marker.lng} latitude={marker.lat} offset={[0, 30]}>
        <div className='text-2xl  text-red-600'>{marker.restaurantName}</div>
      </Marker>

      <Source id='circle-data' type='geojson' data={drawRadius(marker.lng, marker.lat)}>
        <Layer
          id='circle-layer'
          type='fill'
          paint={{
            'fill-color': '#777',
            'fill-opacity': 0.3,
          }}
        />
      </Source>
    </div>
  )) : null);

  const getProximityMakers = () => ((apiMarkers.length > 0) ? apiMarkers.map((marker) => (
    <div key={marker.id}>
      <Marker longitude={marker.lng} latitude={marker.lat}>
        <div className='text-4xl'>📍</div>
      </Marker>
      <Marker longitude={marker.lng} latitude={marker.lat} offset={[0, 30]}>
        <div className='text-2xl  text-red-600'>{marker.locationName}</div>
      </Marker>
    </div>
  )) : null);

  return (
    <Map
      {...viewState}
      onMove={onMove}
      onClick={handleClick}
      style={{ width: '100%', height: '80vh' }}
      mapStyle={mapStyle}
      mapLib={import('mapbox-gl')}
      mapboxAccessToken={MAPBOX_API_KEY}
    >
      <GeolocateControl positionOptions={{ enableHighAccuracy: true }} onGeolocate={handleCurrentLocation} showUserHeading />
      <FullscreenControl position='top-left' />
      {getClickMakers()}
      {getProximityMakers()}
    </Map>
  );
}
