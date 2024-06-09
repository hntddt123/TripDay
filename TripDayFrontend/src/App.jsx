import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TripBoard from './components/TripBoard';
import TripsList from './components/TripsList';
import CustomButton from './components/CustomButton';
import { MODE } from './constants';

function App() {
  return (
    <BrowserRouter basename='/'>
      <header className='text-4xl text-center p-2 bg-lime-400'>
        Trip Day
      </header>
      <Routes>
        <Route
          path='/'
          element={(
            <div className='grid grid-cols-1 text-center container mx-auto'>
              <CustomButton label='New Trip' to='/newtrip' />
              <CustomButton label='View Trips' to='/trips' />
              <p className='text-2xl'>Version: {MODE}</p>
            </div>
          )}
        />
        <Route
          path='/newtrip'
          element={<TripBoard label='Current Adventure' component={<TripsList />} />}
        />
        <Route
          path='/trips'
          element={<TripBoard label='Memories' />}
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
