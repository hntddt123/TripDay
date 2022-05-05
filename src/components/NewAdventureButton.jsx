import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function NewAdventureButton() {
  const navigate = useNavigate();

  const newAdventureHandler = useCallback(() => {
    navigate('/tripboard');
    // navigate(`/trip/${trip.id}`);
  });

  return (
    <div>
      <button
        type='button'
        className='button text-3xl mt-3 bg-amber-300 hover:bg-amber-400'
        onClick={newAdventureHandler}
      >
        New Adventure
      </button>
    </div>
  );
}

export default NewAdventureButton;
