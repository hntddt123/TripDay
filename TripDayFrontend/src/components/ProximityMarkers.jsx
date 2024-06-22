import { Marker } from 'react-map-gl';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPOI, setViewState, setIsShowingAddtionalPopUp, setIsShowingOnlySelectedPOI } from '../redux/reducers/mapReducer';
import { FoursquareResponsePropTypes } from '../constants/fourSqaurePropTypes';

// eslint-disable-next-line react/prop-types
export default function ProximityMarkers({ data, getPOIPhotosQueryTrigger }) {
  const selectedPOIIcon = useSelector((state) => state.mapReducer.selectedPOIIcon);
  const selectedPOI = useSelector((state) => state.mapReducer.selectedPOI);
  const isfullPOIname = useSelector((state) => state.mapReducer.isfullPOIname);
  const isShowingOnlySelectedPOI = useSelector((state) => state.mapReducer.isShowingOnlySelectedPOI);
  const viewState = useSelector((state) => state.mapReducer.viewState);
  const dispatch = useDispatch();

  const setPOIPhotosQuery = (fsqId) => ({ fsqId });

  const handlePOIMarkerClick = (marker) => {
    getPOIPhotosQueryTrigger(setPOIPhotosQuery(marker.fsq_id));
    dispatch(setIsShowingAddtionalPopUp(true));
    dispatch(setIsShowingOnlySelectedPOI(true));
    dispatch(setSelectedPOI(marker.fsq_id));
    dispatch(setViewState({ latitude: marker.geocodes.main.latitude, longitude: marker.geocodes.main.longitude, zoom: viewState.zoom }));
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
          <button className='cardPOIMarker text-xl text-orange-500'>
            {`${i + 1}`}{isfullPOIname ? ` ${marker.name} ${marker.distance}m` : null}
          </button>
        </Marker>
      </div>
    ));
  }
  if (data && data.results.length > 0 && isShowingOnlySelectedPOI) {
    const filteredResult = data.results.filter((marker) => marker.fsq_id === selectedPOI)[0];
    if (filteredResult) {
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
            <button className='cardPOIMarker text-xl text-orange-500'>
              {isfullPOIname ? ` ${filteredResult.name} ${filteredResult.distance}m` : null}
            </button>
          </Marker>
        </div>
      );
    }
  }
}

ProximityMarkers.propTypes = {
  data: FoursquareResponsePropTypes,
};
