import { useDispatch, useSelector } from 'react-redux';
import CustomMap from './CustomMap';
import CustomButton from './CustomButton';
import { useLazyGetNearbyPOIQuery } from '../api/mapboxSliceAPI';
import { setSelectedPOI, setCurrentLocation } from '../redux/reducers/mapReducer';

const gpsIcon = '🛰️';
const restaurantIcon = '🍱';
const hotelIcon = '🛌';
const carIcon = '🚘';

function TripsList() {
  const [trigger, { data: poi, isLoading, isFetching, error }] = useLazyGetNearbyPOIQuery();
  const gpsLonLat = useSelector((state) => state.mapReducer.gpsLonLat);
  const dispatch = useDispatch();

  const setPOIQuery = (ll, radius, limit, category, icon) => ({ ll, radius, limit, category, icon });

  const isLonLat = () => (gpsLonLat.longitude !== null && gpsLonLat.latitude !== null);

  function success(position) {
    const { longitude, latitude } = position.coords;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    dispatch(setCurrentLocation({
      longitude: longitude,
      latitude: latitude
    }));
  }

  function gpsError() {
    console.log('Unable to retrieve your location');
  }

  const handleGPSButton = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, gpsError);
    } else {
      console.log('Geolocation not supported');
    }
  };

  const handleRestaurantButton = () => {
    if (isLonLat()) {
      trigger(setPOIQuery(`${gpsLonLat.latitude},${gpsLonLat.longitude}`, 500, 20, '4d4b7105d754a06374d81259', restaurantIcon));
    }
  };

  const handleHotelButton = () => {
    if (isLonLat()) {
      trigger(setPOIQuery(`${gpsLonLat.latitude},${gpsLonLat.longitude}`, 500, 20, '4bf58dd8d48988d1fa931735', hotelIcon));
    }
  };

  const handleCarButton = () => {
    if (isLonLat()) {
      trigger(setPOIQuery(`${gpsLonLat.latitude},${gpsLonLat.longitude}`, 500, 20, '4d4b7105d754a06379d81259', carIcon));
    }
  };

  const handlePOIListItemClick = (marker) => () => {
    dispatch(setSelectedPOI(marker.fsq_id));
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
        {(error) ? `Error: ${error.message}` : null}
      </div>
    </div>
  );

  const getNearbyPOIList = () => (
    <div>
      {(poi && poi.results.length > 0) ? poi.results.map((marker, i) => (
        <button className='flex cardPOI justify-between items-center' key={marker.fsq_id} onClick={handlePOIListItemClick(marker)}>
          <div className='text-2xl '>{`${i + 1} - ${marker.name} (${marker.location.address})`}</div>
          <div className='text-2xl '>{`${marker.distance} m`}</div>
        </button>
      )) : null}
    </div>
  );

  const getLocation = () => ((isLonLat()) ? (
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

  return (
    <div className='container mx-auto'>
      <div>
        <CustomButton label={gpsIcon} onClick={handleGPSButton} />
        <CustomButton label={restaurantIcon} onClick={handleRestaurantButton} disabled={!isLonLat()} />
        <CustomButton label={hotelIcon} onClick={handleHotelButton} disabled={!isLonLat()} />
        <CustomButton label={carIcon} onClick={handleCarButton} disabled={!isLonLat()} />
      </div>
      {getLoadingStatus()}
      {getLocation()}
      <CustomMap data={(poi) || null} />
      {getNearbyPOIList()}
      {/* <CustomButton label='Save' /> */}
    </div>
  );
}

export default TripsList;
