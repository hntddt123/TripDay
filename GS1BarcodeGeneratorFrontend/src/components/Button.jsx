import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Button({ className = '', label, onClick, type, to, ...props }) {
  // If 'to' is provided, render a Link, otherwise render a button
  if (to) {
    return (
      <Link className={`generic-button ${className}`} to={to} {...props}>
        {label}
      </Link>
    );
  }

  return (
    <button className={`generic-button ${className}`} type={type} onClick={onClick} {...props}>
      {label}
    </button>
  );
}

Button.defaultProps = {
  onClick: () => { },
  type: 'button',
  className: 'button text-3xl mt-3',
  to: ''
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  to: PropTypes.string,
};

export default Button;
