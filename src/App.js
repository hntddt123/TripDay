import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <header className='text-3xl font-bold'>
        TripDay
      </header>
      <div>
        <div>
          <button type='button'>
            Start New Adventure
          </button>
        </div>
        <div>
          <button type='button'>
            View Memories
          </button>
        </div>
      </div>
      <Routes>
        <Route
          path='/tripboard'
          element={<div>tripboard</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
