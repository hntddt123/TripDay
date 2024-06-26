import PropTypes from 'prop-types';
import CustomButton from './CustomButton';

function TripBoard({ label, component }) {
  return (
    <div className='cardTrip text-left mx-auto'>
      <div className='grid'>
        <div>
          {component}
        </div>
        <h1 className='cardTitle text-2xl'>{label}</h1>
        <CustomButton label='Back' to='/' />
      </div>
    </div>
  );
}

TripBoard.propTypes = {
  label: PropTypes.string,
  component: PropTypes.node
};

export default TripBoard;
