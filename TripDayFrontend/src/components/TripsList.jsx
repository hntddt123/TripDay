import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CustomMap from './CustomMap';
import CustomButton from './CustomButton';
import { useLazyGetNearbyRestaurantsQuery } from '../api/mapboxSliceAPI';
import { createMarker } from '../redux/reducers/markerReducer';

function TripsList() {
  const [trigger, { data: restaurants, isLoading, isError, error, isSuccess }] = useLazyGetNearbyRestaurantsQuery();
  const gpsLonLat = useSelector((state) => state.mapReducer.gpsLonLat);
  const apiMarkers = useSelector((state) => state.markerReducer.markers);
  const dispatch = useDispatch();

  const restaurantQuery = { ll: `${gpsLonLat.latitude},${gpsLonLat.longitude}`, radius: 500, limit: 20 };

  const setPOIMarkers = () => {
    Object.keys(restaurants.results).forEach((i) => {
      const newMarker = {
        id: restaurants.results[i].fsq_id,
        locationName: restaurants.results[i].name,
        lng: restaurants.results[i].geocodes.main.longitude,
        lat: restaurants.results[i].geocodes.main.latitude
      };
      dispatch(createMarker(newMarker));
    });
  };

  useEffect(() => {
    if (restaurants) {
      setPOIMarkers();
    }
    // console.log('restaurants updated');
  }, [restaurants]);

  const handleRestaurantButton = () => {
    if (gpsLonLat.longitude && gpsLonLat.latitude) {
      trigger(restaurantQuery);
    }
  };

  const getNearbyPOIList = () => (
    <div>
      {(isSuccess) ? apiMarkers.map((marker, i) => (
        <div key={marker.id}>
          <div className='text-2xl  text-red-600'>{`${i + 1}: ${marker.locationName}`}</div>
        </div>
      )) : null}
      {(isLoading) ? 'Loading...' : null}
      {(isError) ? `Error: ${error.message}` : null}
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

      <CustomMap />
      <CustomButton label='Save' />
    </div>
  );
}

export default TripsList;
