import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Toggle from 'react-toggle';
import { useLazyGetNearbyPOIQuery, useLazyGetPOIPhotosQuery } from '../api/mapboxSliceAPI';
import { setCurrentLocation, setViewState, setIsfullPOIname, setIsShowingOnlySelectedPOI, setSelectedPOI } from '../redux/reducers/mapReducer';
import CustomMap from './CustomMap';
import CustomButton from './CustomButton';
import NearbyPOIList from './NearbyPOIList';

const gpsIcon = '🛰️';
const restaurantIcon = '🍱';
const hotelIcon = '🛌';
const carIcon = '🚘';

function TripsList() {
  const [getNearbyPOIQueryTrigger, { data: poi, isLoading, isFetching, isSuccess, error }] = useLazyGetNearbyPOIQuery();
  const [getPOIPhotosQueryTrigger, getPOIPhotosQueryResult] = useLazyGetPOIPhotosQuery(isSuccess ? poi : skipToken);

  const mapRef = useRef();
  const gpsLonLat = useSelector((state) => state.mapReducer.gpsLonLat);
  const isfullPOIname = useSelector((state) => state.mapReducer.isfullPOIname);
  const dispatch = useDispatch();

  const setPOIQuery = (ll, radius, limit, category, icon) => ({ ll, radius, limit, category, icon });

  const hasLonLat = () => (gpsLonLat.longitude !== null && gpsLonLat.latitude !== null);

  function success(position) {
    const { longitude, latitude } = position.coords;

    dispatch(setCurrentLocation({
      longitude: longitude,
      latitude: latitude
    }));
    dispatch(setViewState({
      longitude: longitude,
      latitude: latitude,
      zoom: 15
    }));
  }

  function gpsError() {
    console.error('Unable to retrieve your location');
  }

  const handleGPSButton = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, gpsError);
    } else {
      console.error('Geolocation not supported');
    }
  };

  const handleRestaurantButton = () => {
    if (hasLonLat()) {
      getNearbyPOIQueryTrigger(setPOIQuery(`${gpsLonLat.latitude},${gpsLonLat.longitude}`, 500, 20, '4d4b7105d754a06374d81259', restaurantIcon));
      dispatch(setViewState({
        longitude: gpsLonLat.longitude,
        latitude: gpsLonLat.latitude,
        zoom: 15
      }));
      dispatch(setIsShowingOnlySelectedPOI(false));
      dispatch(setSelectedPOI(''));
    }
  };

  const handleHotelButton = () => {
    if (hasLonLat()) {
      getNearbyPOIQueryTrigger(setPOIQuery(`${gpsLonLat.latitude},${gpsLonLat.longitude}`, 500, 20, '4bf58dd8d48988d1fa931735', hotelIcon));
      dispatch(setViewState({
        longitude: gpsLonLat.longitude,
        latitude: gpsLonLat.latitude,
        zoom: 15
      }));
      dispatch(setIsShowingOnlySelectedPOI(false));
      dispatch(setSelectedPOI(''));
    }
  };

  const handleCarButton = () => {
    if (hasLonLat()) {
      getNearbyPOIQueryTrigger(setPOIQuery(`${gpsLonLat.latitude},${gpsLonLat.longitude}`, 500, 20, '4d4b7105d754a06379d81259', carIcon));
      dispatch(setViewState({
        longitude: gpsLonLat.longitude,
        latitude: gpsLonLat.latitude,
        zoom: 15
      }));
      dispatch(setIsShowingOnlySelectedPOI(false));
      dispatch(setSelectedPOI(''));
    }
  };

  const handleFullNameToggle = () => {
    dispatch(setIsfullPOIname(!isfullPOIname));
  };

  const getLoadingStatus = () => (
    <div>
      <div>
        {(isLoading ? 'Loading...' : null)}
      </div>
      <div>
        {(isFetching) ? 'Fetching...' : null}
      </div>
      <div>
        {(error) ? `Error: ${error.error}` : null}
      </div>
    </div>
  );

  const getLocation = () => ((hasLonLat()) ? (
    <div className='cardInfo'>
      <div className='text-2xl'>
        Click above options
      </div>
      <div className='text-2xl'>
        {`Longtitude: ${gpsLonLat.longitude}`}
      </div>
      <div className='text-2xl'>
        {`Latitude: ${gpsLonLat.latitude}`}
      </div>
    </div>
  ) : <div className='cardInfo text-2xl'>Press location button to get current GPS location for searching</div>);

  const getPlaceNameToggle = () => (
    <div className='text-2xl'>
      Place Name
      <Toggle
        className='ml-2 align-middle'
        icons={false}
        defaultChecked={isfullPOIname}
        onChange={handleFullNameToggle}
      />
    </div>
  );

  return (
    <div className='mx-auto'>
      {getLocation()}
      {getPlaceNameToggle()}
      <div>
        <CustomButton label={gpsIcon} onClick={handleGPSButton} />
        <CustomButton label={restaurantIcon} onClick={handleRestaurantButton} disabled={!hasLonLat()} />
        <CustomButton label={hotelIcon} onClick={handleHotelButton} disabled={!hasLonLat()} />
        <CustomButton label={carIcon} onClick={handleCarButton} disabled={!hasLonLat()} />
      </div>
      {getLoadingStatus()}
      <div ref={mapRef}>
        <CustomMap
          data={(poi) || null}
          getPOIPhotosQueryResult={(getPOIPhotosQueryResult) || null}
          getPOIPhotosQueryTrigger={getPOIPhotosQueryTrigger}
        />
      </div>
      <NearbyPOIList poi={poi} mapRef={mapRef} />
      {/* <CustomButton label='Save' /> */}
    </div>
  );
}

export default TripsList;
