import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BarcodeBoard from './components/BarcodeBoard';
import CustomButton from './components/CustomButton';

function App() {
  return (
    <BrowserRouter basename='/'>
      <header className='text-4xl text-center p-2 bg-amber-400'>
        GS1 QR Code Generator
      </header>
      <Routes>
        <Route
          path='/'
          element={(
            <div className='grid grid-cols-1 text-center ml-40 mr-40'>
              <CustomButton label='New Barcode' to='/newbarcode' />
              <CustomButton label='View Barcodes' to='/barcodes' />
            </div>
          )}
        />
        <Route
          path='/newbarcode'
          element={<BarcodeBoard label='Create Barcode' />}
        />
        <Route
          path='/barcodes'
          element={<BarcodeBoard label='History Barcodes' />}
        />
        <Route
          path='*'
          element={<div><h2 className='text-4xl'>404 not found</h2></div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
