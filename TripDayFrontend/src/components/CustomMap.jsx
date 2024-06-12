import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Map, { Marker, FullscreenControl, GeolocateControl, Source, Layer } from 'react-map-gl';
import { setViewState, setMarker, setCurrentLocation } from '../redux/reducers/mapReducer';
import { MAPBOX_API_KEY } from '../constants/constants';

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

export default function CustomMap({ data }) {
  const mapStyle = useSelector((state) => state.mapReducer.mapStyle);
  const viewState = useSelector((state) => state.mapReducer.viewState);
  const mapMarkers = useSelector((state) => state.mapReducer.markers);
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

  const getClickMarkers = () => ((mapMarkers.length > 0) ? mapMarkers.map((marker) => (
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


  const getProximityMarkers = () => (
    ((data && data.results.length > 0) ? data.results.map((marker, i) => (
      <div key={marker.fsq_id}>
        <Marker longitude={marker.geocodes.main.longitude} latitude={marker.geocodes.main.latitude}>
          <div className='text-4xl'>🍱</div>
        </Marker>
        <Marker
          longitude={marker.geocodes.main.longitude}
          latitude={marker.geocodes.main.latitude}
          offset={[0, 40]}
        >
          <div className='cardPOIMarker text-2xl  text-orange-400'>{`${i + 1} ${marker.name}`}</div>
        </Marker>
      </div>
    )) : null)
  );

  return (
    <Map
      {...viewState}
      onMove={onMove}
      onClick={handleClick}
      style={{ width: '100%', height: '90vh', borderRadius: 15 }}
      mapStyle={mapStyle}
      mapLib={import('mapbox-gl')}
      mapboxAccessToken={MAPBOX_API_KEY}
    >
      <GeolocateControl positionOptions={{ enableHighAccuracy: true }} onGeolocate={handleCurrentLocation} showUserHeading />
      <FullscreenControl position='top-left' />
      {getClickMarkers()}
      {getProximityMarkers()}
    </Map>
  );
}

const LocationPropType = PropTypes.shape({
  address: PropTypes.string,
  census_block: PropTypes.string,
  country: PropTypes.string,
  cross_street: PropTypes.string,
  formatted_address: PropTypes.string,
  locality: PropTypes.string,
  postcode: PropTypes.string,
  region: PropTypes.string,
});

const GeocodePropType = PropTypes.shape({
  latitude: PropTypes.number,
  longitude: PropTypes.number,
});

const CategoryPropType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  icon: PropTypes.shape({
    prefix: PropTypes.string,
    suffix: PropTypes.string,
  }),
});

const ChainPropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
});

const ResultPropType = PropTypes.shape({
  fsq_id: PropTypes.string,
  categories: PropTypes.arrayOf(CategoryPropType),
  chains: PropTypes.arrayOf(ChainPropType),
  distance: PropTypes.number,
  geocodes: PropTypes.shape({
    main: GeocodePropType,
    roof: GeocodePropType,
  }),
  link: PropTypes.string,
  location: LocationPropType,
  name: PropTypes.string,
  timezone: PropTypes.string,
});

const FoursquareResponsePropTypes = PropTypes.shape({
  results: PropTypes.arrayOf(ResultPropType),
});

CustomMap.propTypes = {
  data: FoursquareResponsePropTypes,
};
