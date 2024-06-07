import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TripBoard from './components/TripBoard';
import TripsList from './components/TripsList';
import CustomButton from './components/CustomButton';

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
            </div>
          )}
        />
        <Route
          path='/newtrip'
          element={<TripBoard label='Create Trip' />}
        />
        <Route
          path='/trips'
          element={<TripBoard label='History Trips' component={<TripsList />} />}
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
