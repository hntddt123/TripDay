/* eslint-disable react/prop-types */
import { Marker } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { FoursquareResponsePropTypes } from '../constants/fourSqaurePropTypes';

export default function ProximityMarkersInfo({ data, getPOIPhotosQueryResult }) {
  const selectedPOI = useSelector((state) => state.mapReducer.selectedPOI);
  const isShowingAddtionalMarker = useSelector((state) => state.mapReducer.isShowingAddtionalMarker);

  const formatPhotos = () => ((getPOIPhotosQueryResult.data && getPOIPhotosQueryResult.data.length > 0)
    ? getPOIPhotosQueryResult.data.map((photo) => (
      <img
        key={photo.id}
        className='m-1'
        src={`${photo.prefix}120x120${photo.suffix}`}
        alt={`${photo.prefix}120x120${photo.suffix}`}
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
            offset={[0, 130]}
          >
            <div className='flex flex-wrap cardPOIAddInfo text-2xl text-orange-400'>
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
