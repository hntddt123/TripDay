import PropTypes from 'prop-types';
import CustomButton from './CustomButton';

function BarcodeBoard({ label, component }) {
  return (
    <div className='container card text-left mx-auto border-amber-400'>
      <div className='grid'>
        <h1 className='text-4xl mb-4'>{label}</h1>
        {component}
        <CustomButton label='Back' to='/' />
      </div>
    </div>
  );
}

BarcodeBoard.propTypes = {
  label: PropTypes.string,
  component: PropTypes.node
};

export default BarcodeBoard;
