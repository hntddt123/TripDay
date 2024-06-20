import PropTypes from 'prop-types';
import CustomButton from './CustomButton';

function TripBoard({ label, component }) {
  return (
    <div className='cardTrip text-left mx-auto'>
      <div className='grid'>
        <h1 className='cardTitle text-4xl mb-4'>{label}</h1>
        <div>
          {component}
        </div>
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
