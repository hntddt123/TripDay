import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BarcodeBoard from './components/BarcodeBoard';
import NewBarcodeButton from './components/NewBarcodeButton';

function App() {
  return (
    <BrowserRouter>
      <header className='text-4xl text-center mb-5 p-2 bg-amber-400'>
        GS1 QR Code Generator
      </header>
      <Routes>
        <Route
          path='/'
          element={(
            <div className='grid grid-cols-1 justify-items-center'>
              <NewBarcodeButton />
              <div>
                <button
                  type='button'
                  className='button text-3xl mt-3'
                >
                  View Barcodes
                </button>
              </div>
            </div>
          )}
        />
        <Route
          path='/barcodes'
          element={<BarcodeBoard />}
        />
        <Route
          path='*'
          element={<div><h2 className='text-4xl'>Code not found</h2></div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
