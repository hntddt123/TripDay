/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { setSelectedPOI, setViewState, setIsShowingAddtionalMarker } from '../redux/reducers/mapReducer';

function NearbyPOIList({ poi }) {
  const dispatch = useDispatch();

  const handlePOIListItemClick = (marker) => () => {
    dispatch(setIsShowingAddtionalMarker(false));
    dispatch(setSelectedPOI(marker.fsq_id));
    dispatch(setViewState({ latitude: marker.geocodes.main.latitude, longitude: marker.geocodes.main.longitude, zoom: 17 }));
  };

  return (
    <div>
      {(poi && poi.results.length > 0) ? poi.results.map((marker, i) => (
        <button className='flex cardPOI justify-between items-center' key={marker.fsq_id} onClick={handlePOIListItemClick(marker)}>
          <div className='text-2xl '>{`${i + 1} - ${marker.name} (${marker.location.address})`}</div>
          <div className='text-2xl '>{`${marker.distance} m`}</div>
        </button>
      )) : null}
    </div>
  );
}

export default NearbyPOIList;
