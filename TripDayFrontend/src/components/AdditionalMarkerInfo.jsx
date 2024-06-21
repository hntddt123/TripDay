/* eslint-disable react/prop-types */
import { Marker } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { FoursquareResponsePropTypes } from '../constants/fourSqaurePropTypes';
import CustomButton from './CustomButton';
import { setIsShowingAddtionalMarker, setIsShowingOnlySelectedPOI } from '../redux/reducers/mapReducer';

export default function ProximityMarkersInfo({ data, getPOIPhotosQueryResult }) {
  const selectedPOI = useSelector((state) => state.mapReducer.selectedPOI);
  const isShowingAddtionalMarker = useSelector((state) => state.mapReducer.isShowingAddtionalMarker);
  const dispatch = useDispatch();

  const handleCloseButton = () => {
    dispatch(setIsShowingAddtionalMarker(false));
    dispatch(setIsShowingOnlySelectedPOI(false));
  };

  const formatPhotos = () => ((getPOIPhotosQueryResult.data && getPOIPhotosQueryResult.data.length > 0)
    ? getPOIPhotosQueryResult.data.map((photo) => (
      <img
        key={photo.id}
        className='m-1'
        src={`${photo.prefix}96x96${photo.suffix}`}
        alt={`${photo.prefix}96x96${photo.suffix}`}
      />
    )) : null);

  const getPhotos = () => {
    if (getPOIPhotosQueryResult.isFetching) {
      return 'Loading';
    }
    if (getPOIPhotosQueryResult.isError) {
      return 'Photo Not Found';
    }
    if (getPOIPhotosQueryResult.isSuccess) {
      return formatPhotos();
    }
    return null;
  };

  if (data && data.results.length > 0 && isShowingAddtionalMarker) {
    const filteredResult = data.results.filter((marker) => marker.fsq_id === selectedPOI)[0];
    if (filteredResult) {
      return (
        <div key={filteredResult.fsq_id}>
          <Marker
            longitude={filteredResult.geocodes.main.longitude}
            latitude={filteredResult.geocodes.main.latitude}
            offset={[0, 120]}
          >
            <CustomButton label='x' onClick={handleCloseButton} />
            <div className='flex flex-wrap cardPOIAddInfo text-2xl text-orange-400'>
              <div className='text-2xl'>{`${filteredResult.name} (${filteredResult.location.address}) ${filteredResult.distance} m`}</div>
              {getPhotos()}
            </div>
          </Marker>
        </div>
      );
    }
  }
  return null;
}

ProximityMarkersInfo.propTypes = {
  data: FoursquareResponsePropTypes,
};
