import PropTypes from 'prop-types';
import CustomButton from './CustomButton';

function BarcodeBoard({ label }) {
  return (
    <div className='card border-amber-400 ml-40 mr-40'>
      <div>
        <h1 className='text-4xl mb-4'>{label}</h1>
      </div>
      <div>
        <CustomButton label='Back' to='/' />
      </div>
    </div>
  );
}

BarcodeBoard.propTypes = {
  label: PropTypes.string,
};

export default BarcodeBoard;
