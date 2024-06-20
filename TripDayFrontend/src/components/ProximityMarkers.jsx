import { Marker } from 'react-map-gl';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPOI, setViewState } from '../redux/reducers/mapReducer';
import { FoursquareResponsePropTypes } from '../constants/fourSqaurePropTypes';

export default function ProximityMarkers({ data }) {
  const selectedPOIIcon = useSelector((state) => state.mapReducer.selectedPOIIcon);
  const isfullPOIname = useSelector((state) => state.mapReducer.isfullPOIname);
  const dispatch = useDispatch();

  const handlePOIMarkerClick = (marker) => {
    dispatch(setSelectedPOI(marker.fsq_id));
    dispatch(setViewState({ latitude: marker.geocodes.main.latitude, longitude: marker.geocodes.main.longitude, zoom: 17 }));
  };

  return (
    ((data && data.results.length > 0) ? data.results.map((marker, i) => (
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
          <button className='cardPOIMarker text-2xl text-orange-400'>{`${i + 1}`}{isfullPOIname ? ` ${marker.name}` : null}</button>
        </Marker>
      </div>
    )) : null)
  );
}

ProximityMarkers.propTypes = {
  data: FoursquareResponsePropTypes,
};
