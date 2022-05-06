import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TripBoard from './components/TripBoard';
import NewAdventureButton from './components/NewAdventureButton';

function App() {
  return (
    <BrowserRouter>
      <header className='text-4xl text-center mb-5 p-2 bg-amber-400'>
        TripDay
      </header>
      <Routes>
        <Route
          path='/'
          element={(
            <div className='grid grid-cols-1 justify-items-center'>
              <NewAdventureButton />
              <div>
                <button
                  type='button'
                  className='button text-3xl mt-3'
                >
                  View Memories
                </button>
              </div>
            </div>
          )}
        />
        <Route
          path='/tripboard'
          element={<TripBoard />}
        />
        <Route
          path='*'
          element={<div><h2 className='text-4xl'>Trip not found</h2></div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
