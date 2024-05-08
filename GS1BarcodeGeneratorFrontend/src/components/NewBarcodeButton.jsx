import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function NewBarcodeButton() {
  const navigate = useNavigate();

  const newBarcodeHandler = useCallback(() => {
    navigate('/barcodes');
    // navigate(`/barcode/${barcode.id}`);
  });

  return (
    <div>
      <button
        type='button'
        className='button text-3xl mt-3'
        onClick={newBarcodeHandler}
      >
        New Barcodes
      </button>
    </div>
  );
}

export default NewBarcodeButton;
