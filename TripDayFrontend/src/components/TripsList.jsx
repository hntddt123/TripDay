import { useSelector } from 'react-redux';
import CustomMap from './CustomMap';
import CustomButton from './CustomButton';
import { useLazyGetNearbyPOIQuery } from '../api/mapboxSliceAPI';

const restaurantIcon = '🍱';
const hotelIcon = '🛌';
const carIcon = '🚘';

function TripsList() {
  const [trigger, { data: poi, isLoading, isFetching, error }] = useLazyGetNearbyPOIQuery();
  const gpsLonLat = useSelector((state) => state.mapReducer.gpsLonLat);

  const setPOIQuery = (ll, radius, limit, category, icon) => ({ ll, radius, limit, category, icon });

  const handleRestaurantButton = () => {
    if (gpsLonLat.longitude && gpsLonLat.latitude) {
      trigger(setPOIQuery(`${gpsLonLat.latitude},${gpsLonLat.longitude}`, 500, 20, '4d4b7105d754a06374d81259', restaurantIcon));
    }
  };

  const handleHotelButton = () => {
    if (gpsLonLat.longitude && gpsLonLat.latitude) {
      trigger(setPOIQuery(`${gpsLonLat.latitude},${gpsLonLat.longitude}`, 500, 20, '4bf58dd8d48988d1fa931735', hotelIcon));
    }
  };

  const handleCarButton = () => {
    if (gpsLonLat.longitude && gpsLonLat.latitude) {
      trigger(setPOIQuery(`${gpsLonLat.latitude},${gpsLonLat.longitude}`, 500, 20, '4d4b7105d754a06379d81259', carIcon));
    }
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
        <div className='flex cardPOI justify-between items-center' key={marker.fsq_id}>
          <div className='text-2xl '>{`${i + 1} - ${marker.name} (${marker.location.address})`}</div>
          <div className='text-2xl '>{`${marker.distance} m`}</div>
        </div>
      )) : null}
    </div>
  );

  const getLocation = () => ((gpsLonLat.longitude && gpsLonLat.latitude) ? (
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
        {/* <Counter /> */}
        <CustomButton label={restaurantIcon} onClick={handleRestaurantButton} />
        <CustomButton label={hotelIcon} onClick={handleHotelButton} />
        <CustomButton label={carIcon} onClick={handleCarButton} />
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
