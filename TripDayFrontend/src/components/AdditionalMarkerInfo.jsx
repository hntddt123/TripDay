/* eslint-disable react/prop-types */
import { Popup } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { FoursquareResponsePropTypes } from '../constants/fourSqaurePropTypes';
import CustomButton from './CustomButton';
import { setIsShowingAddtionalPopUp, setIsShowingOnlySelectedPOI } from '../redux/reducers/mapReducer';

export default function ProximityMarkersInfo({ data, getPOIPhotosQueryResult }) {
  const selectedPOI = useSelector((state) => state.mapReducer.selectedPOI);
  const isShowingAddtionalPopUp = useSelector((state) => state.mapReducer.isShowingAddtionalPopUp);
  const dispatch = useDispatch();

  const handleCloseButton = () => {
    dispatch(setIsShowingAddtionalPopUp(false));
    dispatch(setIsShowingOnlySelectedPOI(false));
  };

  const formatPhotos = () => ((getPOIPhotosQueryResult.data && getPOIPhotosQueryResult.data.length > 0)
    ? getPOIPhotosQueryResult.data.map((photo) => (
      <img
        key={photo.id}
        className='picture'
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex='0'
        src={`${photo.prefix}400x400${photo.suffix}`}
        alt={`${photo.prefix}400x400${photo.suffix}`}
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

  if (data && data.results.length > 0 && isShowingAddtionalPopUp) {
    const filteredResult = data.results.filter((marker) => marker.fsq_id === selectedPOI)[0];
    if (filteredResult) {
      return (
        <div>
          <Popup
            key={filteredResult.geocodes.main.longitude + filteredResult.geocodes.main.latitude}
            longitude={filteredResult.geocodes.main.longitude}
            latitude={filteredResult.geocodes.main.latitude}
            anchor='bottom'
            closeOnClick={false}
            closeButton={false}
            style={{ display: 'none' }}
          />
          <div
            className='mapboxgl-popup-content text-xl cardPOIAddInfo text-orange-500'
            style={{ borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.7)' }}
          >
            <CustomButton className='cancelButton text-orange-950' label='X' onClick={handleCloseButton} />
            <div className='text-xl'>
              {` ${filteredResult.name} (${filteredResult.location.address}) ${filteredResult.distance} m`}
            </div>
            <div className='flex cardPOIAddInfoPictures'>
              {getPhotos()}
            </div>
          </div>
        </div>
      );
    }
  }
  return null;
}

ProximityMarkersInfo.propTypes = {
  data: FoursquareResponsePropTypes,
};
