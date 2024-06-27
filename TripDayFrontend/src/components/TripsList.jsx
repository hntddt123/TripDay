import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query/react';
import Toggle from 'react-toggle';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactSlider from 'react-slider';
import { useLazyGetNearbyPOIQuery, useLazyGetPOIPhotosQuery } from '../api/foursquareSliceAPI';
import {
  setViewState,
  setIsFullPOIname,
  setIsShowingOnlySelectedPOI,
  setSelectedPOI,
  setSelectedPOICount,
  setSelectedPOIRadius
} from '../redux/reducers/mapReducer';
import CustomMap from './CustomMap';
import CustomButton from './CustomButton';

const restaurantIcon = '🍱';
const hotelIcon = '🛌';
const carIcon = '🚘';

function TripsList() {
  const [getNearbyPOIQueryTrigger, { data: poi, isLoading, isFetching, isSuccess, error }] = useLazyGetNearbyPOIQuery();
  const [getPOIPhotosQueryTrigger, getPOIPhotosQueryResult] = useLazyGetPOIPhotosQuery(isSuccess ? poi : skipToken);

  const mapRef = useRef();
  const gpsLonLat = useSelector((state) => state.mapReducer.gpsLonLat);
  const isFullPOIname = useSelector((state) => state.mapReducer.isFullPOIname);
  const selectedPOICount = useSelector((state) => state.mapReducer.selectedPOICount);
  const selectedPOIRadius = useSelector((state) => state.mapReducer.selectedPOIRadius);
  const dispatch = useDispatch();

  const setPOIQuery = (ll, radius, limit, category, icon) => ({ ll, radius, limit, category, icon });

  const hasLonLat = () => (gpsLonLat.longitude !== null && gpsLonLat.latitude !== null);

  const handleRestaurantButton = () => {
    if (hasLonLat()) {
      getNearbyPOIQueryTrigger(setPOIQuery(
        `${gpsLonLat.latitude},${gpsLonLat.longitude}`,
        selectedPOIRadius,
        selectedPOICount,
        '4d4b7105d754a06374d81259',
        restaurantIcon
      ));
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
      getNearbyPOIQueryTrigger(setPOIQuery(
        `${gpsLonLat.latitude},${gpsLonLat.longitude}`,
        selectedPOIRadius,
        selectedPOICount,
        '4bf58dd8d48988d1fa931735',
        hotelIcon
      ));
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
      getNearbyPOIQueryTrigger(setPOIQuery(
        `${gpsLonLat.latitude},${gpsLonLat.longitude}`,
        selectedPOIRadius,
        selectedPOICount,
        '4d4b7105d754a06379d81259',
        carIcon
      ));
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
    dispatch(setIsFullPOIname(!isFullPOIname));
  };

  const handleItemCountChange = (count) => {
    dispatch(setSelectedPOICount(count));
  };

  const handleRadiusChange = (radius) => {
    dispatch(setSelectedPOIRadius(radius));
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
        {`Longtitude: ${(gpsLonLat.longitude.toFixed(8))}`}
      </div>
      <div className='text-2xl'>
        {`Latitude: ${gpsLonLat.latitude.toFixed(8)}`}
      </div>
    </div>
  ) : <div className='cardInfo text-2xl'>Press location button to get current GPS location for searching</div>);

  const getPlaceNameToggle = () => (
    <div className='text-2xl m-2'>
      Place Name
      <Toggle
        className='ml-2 align-middle'
        icons={false}
        defaultChecked={isFullPOIname}
        onChange={handleFullNameToggle}
      />
    </div>
  );

  return (
    <div className='mx-auto'>
      {getPlaceNameToggle()}
      <div className='text-2xl ml-2'>
        Item Count
        <ReactSlider
          className='slider'
          markClassName='sliderMark'
          thumbClassName='sliderThumbCount'
          trackClassName='sliderTrackCount'
          defaultValue={20}
          marks={[10, 15, 20, 25, 30, 35, 40, 45, 50]}
          step={5}
          min={10}
          max={50}
          // eslint-disable-next-line react/prop-types
          renderThumb={(props, state) => <div {...props} key={props.key}>{state.valueNow}</div>}
          // eslint-disable-next-line react/prop-types
          renderTrack={(props, state) => <div {...props} key={props.key}>{state.valueNow}</div>}
          onChange={(value) => handleItemCountChange(value)}
        />
        Radius (meter)
        <ReactSlider
          className='slider'
          markClassName='sliderMark'
          thumbClassName='sliderThumbRadius'
          trackClassName='sliderTrackRadius'
          defaultValue={500}
          marks={[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]}
          step={100}
          min={100}
          max={1000}
          // eslint-disable-next-line react/prop-types
          renderThumb={(props, state) => <div {...props} key={props.key}>{state.valueNow}</div>}
          onChange={(value) => handleRadiusChange(value)}
        />
        <div className='m-1'>
          <CustomButton className='poiButton' label={restaurantIcon} onClick={handleRestaurantButton} disabled={!hasLonLat()} />
          <CustomButton className='poiButton' label={hotelIcon} onClick={handleHotelButton} disabled={!hasLonLat()} />
          <CustomButton className='poiButton' label={carIcon} onClick={handleCarButton} disabled={!hasLonLat()} />
        </div>
        {getLoadingStatus()}
      </div>
      <div ref={mapRef}>
        <CustomMap
          data={(poi) || null}
          getPOIPhotosQueryResult={(getPOIPhotosQueryResult) || null}
          getPOIPhotosQueryTrigger={getPOIPhotosQueryTrigger}
        />
      </div>
      {getLocation()}
      {/* <CustomButton label='Save' /> */}
    </div>
  );
}

export default TripsList;
