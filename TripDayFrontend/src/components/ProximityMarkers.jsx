import { Marker } from 'react-map-gl';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSelectedPOI,
  setViewState,
  setIsShowingAddtionalPopUp,
  setIsShowingOnlySelectedPOI,
  setSelectedPOILonLat
} from '../redux/reducers/mapReducer';
import { FourSquareResponsePropTypes } from '../constants/fourSquarePropTypes';
import CustomButton from './CustomButton';

// eslint-disable-next-line react/prop-types
export default function ProximityMarkers({ data, getPOIPhotosQueryTrigger }) {
  const selectedPOIIcon = useSelector((state) => state.mapReducer.selectedPOIIcon);
  const selectedPOI = useSelector((state) => state.mapReducer.selectedPOI);
  const isFullPOIname = useSelector((state) => state.mapReducer.isFullPOIname);
  const isShowingOnlySelectedPOI = useSelector((state) => state.mapReducer.isShowingOnlySelectedPOI);
  const isShowingAddtionalPopUp = useSelector((state) => state.mapReducer.isShowingAddtionalPopUp);
  const viewState = useSelector((state) => state.mapReducer.viewState);
  const dispatch = useDispatch();
  const setPOIPhotosQuery = (fsqId) => ({ fsqId });

  const handlePOIMarkerClick = (marker) => {
    getPOIPhotosQueryTrigger(setPOIPhotosQuery(marker.fsq_id));
    dispatch(setSelectedPOI(marker.fsq_id));
    dispatch(setSelectedPOILonLat({
      longitude: marker.geocodes.main.longitude,
      latitude: marker.geocodes.main.latitude
    }));
    dispatch(setViewState({ latitude: marker.geocodes.main.latitude, longitude: marker.geocodes.main.longitude, zoom: viewState.zoom }));
    dispatch(setIsShowingAddtionalPopUp(true));
    dispatch(setIsShowingOnlySelectedPOI(true));
  };

  if ((data && data.results.length > 0 && !isShowingOnlySelectedPOI)) {
    return data.results.map((marker, i) => (
      <div key={marker.fsq_id}>
        <Marker longitude={marker.geocodes.main.longitude} latitude={marker.geocodes.main.latitude}>
          <div className='text-4xl'>{selectedPOIIcon}</div>
        </Marker>
        <Marker
          onClick={() => handlePOIMarkerClick(marker)}
          longitude={marker.geocodes.main.longitude}
          latitude={marker.geocodes.main.latitude}
          offset={[0, 40]}
        >
          <CustomButton
            className={`cardPOIMarker text-xl ${isShowingAddtionalPopUp ? 'blur-sm' : null}`}
            label={`${i + 1} ${isFullPOIname ? `${marker.name} ${marker.distance}m` : ''}`}
          />
        </Marker>
      </div>
    ));
  }
  if (data && data.results.length > 0 && isShowingOnlySelectedPOI) {
    const filteredResult = data.results.filter((marker) => marker.fsq_id === selectedPOI)[0];
    if (filteredResult) {
      const filterText = (isFullPOIname) ? `${filteredResult.name} ${filteredResult.distance}m` : `${filteredResult.distance}m`;

      return (
        <div key={filteredResult.fsq_id}>
          <Marker longitude={filteredResult.geocodes.main.longitude} latitude={filteredResult.geocodes.main.latitude}>
            <div className='text-4xl'>{selectedPOIIcon}</div>
          </Marker>
          <Marker
            onClick={() => handlePOIMarkerClick(filteredResult)}
            longitude={filteredResult.geocodes.main.longitude}
            latitude={filteredResult.geocodes.main.latitude}
            offset={[0, 40]}
          >
            <CustomButton className='cardPOIMarker' label={filterText} />
          </Marker>
        </div>
      );
    }
  }
}

ProximityMarkers.propTypes = {
  data: FourSquareResponsePropTypes,
};
