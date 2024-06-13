import { Marker } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { FoursquareResponsePropTypes } from '../constants/fourSqaurePropTypes';

export default function ProximityMarkersInfo({ data }) {
  const selectedPOI = useSelector((state) => state.mapReducer.selectedPOI);

  if (data && data.results.length > 0) {
    const filteredResult = data.results.filter((marker) => marker.fsq_id === selectedPOI)[0];
    if (filteredResult) {
      return (
        <div key={filteredResult.fsq_id}>
          <Marker
            longitude={filteredResult.geocodes.main.longitude}
            latitude={filteredResult.geocodes.main.latitude}
            offset={[0, -40]}
          >
            <div className='cardPOIAddInfo text-2xl  text-orange-400'>{`${filteredResult.name}`}</div>
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
