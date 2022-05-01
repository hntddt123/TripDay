import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <header className='text-5xl text-center mt-5 mb-5 text-amber-400'>
        TripDay
      </header>
      <Routes>
        <Route
          path='/'
          element={(
            <div className='grid grid-cols-1 justify-items-center'>
              <div>
                <button
                  type='button'
                  className='button text-3xl mt-3 bg-amber-300 hover:bg-amber-400'
                >
                  New Adventure
                </button>
              </div>
              <div>
                <button
                  type='button'
                  className='button text-3xl mt-3 bg-amber-300 hover:bg-amber-400'
                >
                  View Memories
                </button>
              </div>
            </div>
          )}
        />
        <Route
          path='/tripboard'
          element={<div>tripboard</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
