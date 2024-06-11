import { useSelector } from 'react-redux';
import CustomMap from './CustomMap';
import CustomButton from './CustomButton';
import { useLazyGetNearbyRestaurantsQuery } from '../api/mapboxSliceAPI';

function TripsList() {
  const [trigger, { data: restaurants, isLoading, error }] = useLazyGetNearbyRestaurantsQuery();
  const gpsLonLat = useSelector((state) => state.mapReducer.gpsLonLat);

  const restaurantQuery = { ll: `${gpsLonLat.latitude},${gpsLonLat.longitude}`, radius: 500, limit: 20 };

  const handleRestaurantButton = () => {
    if (gpsLonLat.longitude && gpsLonLat.latitude) {
      trigger(restaurantQuery);
    }
  };

  const getNearbyPOIList = () => (
    <div>
      {(restaurants && restaurants.results.length > 0) ? restaurants.results.map((marker, i) => (
        <div key={marker.fsq_id}>
          <div className='text-2xl  text-red-600'>{`${i + 1}: ${marker.name}`}</div>
        </div>
      )) : null}
      {(isLoading) ? 'Loading...' : null}
      {(error) ? `Error: ${error.message}` : null}
    </div>
  );

  const getLocation = () => ((gpsLonLat.longitude && gpsLonLat.latitude) ? (
    <div>
      <div className='text-2xl'>
        {`Longtitude: ${gpsLonLat.longitude}`}
      </div>
      <div className='text-2xl'>
        {`Latitude: ${gpsLonLat.latitude}`}
      </div>
    </div>
  ) : null);

  return (
    <div className='container mx-auto'>
      <div>
        {/* <Counter /> */}
        <CustomButton label='🍴' onClick={handleRestaurantButton} />
        <CustomButton label='🛏️' />
        <CustomButton label='🚲' />
      </div>
      {(gpsLonLat.longitude && gpsLonLat.latitude) ? null : 'Press location button to get current GPS location'}
      {getLocation()}
      {getNearbyPOIList()}

      <CustomMap data={(restaurants) || null} />
      {/* <CustomButton label='Save' /> */}
    </div>
  );
}

export default TripsList;
