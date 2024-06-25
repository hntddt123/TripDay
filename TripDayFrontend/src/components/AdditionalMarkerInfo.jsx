/* eslint-disable react/prop-types */
import { Popup } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { FoursquareResponsePropTypes } from '../constants/fourSqaurePropTypes';
import CustomButton from './CustomButton';
import { setIsShowingAddtionalPopUp, setIsShowingOnlySelectedPOI, setIsNavigating } from '../redux/reducers/mapReducer';

export default function ProximityMarkersInfo({ data, getPOIPhotosQueryResult, getDirectionsQueryTrigger }) {
  const selectedPOI = useSelector((state) => state.mapReducer.selectedPOI);
  const selectedPOILonLat = useSelector((state) => state.mapReducer.selectedPOILonLat);
  const gpsLonLat = useSelector((state) => state.mapReducer.gpsLonLat);
  const isShowingAddtionalPopUp = useSelector((state) => state.mapReducer.isShowingAddtionalPopUp);
  const dispatch = useDispatch();

  const setRouteQuery = (lonStart, latStart, lonEnd, latEnd) => ({ lonStart, latStart, lonEnd, latEnd });

  const handleCloseButton = () => {
    dispatch(setIsShowingAddtionalPopUp(false));
    dispatch(setIsShowingOnlySelectedPOI(false));
  };

  const handleDirectionButton = () => {
    getDirectionsQueryTrigger(setRouteQuery(
      gpsLonLat.longitude,
      gpsLonLat.latitude,
      selectedPOILonLat.longitude,
      selectedPOILonLat.latitude
    ));
    dispatch(setIsShowingAddtionalPopUp(false));
    dispatch(setIsShowingOnlySelectedPOI(true));
    dispatch(setIsNavigating(true));
  };

  const formatPhotos = () => ((getPOIPhotosQueryResult.data && getPOIPhotosQueryResult.data.length > 0)
    ? getPOIPhotosQueryResult.data.map((photo) => (
      <button key={photo.id} tabIndex={0} className='pictureContainer'>
        <img
          className='picture'
          src={`${photo.prefix}400x400${photo.suffix}`}
          alt={`${photo.prefix}400x400${photo.suffix}`}
        />
      </button>
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
        <div className='flex'>
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
            className='mapboxgl-popup-content text-xl cardPOIAddInfo'
            style={{ borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.7)', overflow: 'auto', width: '100%' }}
          >
            <CustomButton className='cancelButton text-orange-950' label='X' onClick={handleCloseButton} />
            <CustomButton className='poiButton justify-center' label='Get Direction' onClick={handleDirectionButton} />
            <div className='text-2xl'>
              {`${filteredResult.name} (${filteredResult.location.address}) ${filteredResult.distance} m`}
            </div>
            <div className='cardPOIAddInfoPictures'>
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
