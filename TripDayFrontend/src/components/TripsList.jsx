import { useState } from 'react';
import { useFetchBreedsQuery } from '../api/dogsSliceAPI.ts';

function TripsList() {
  const [numDogs, setNumDogs] = useState(3);
  const { data = [], isFetching, isError } = useFetchBreedsQuery(numDogs);

  return (
    <div>
      <div className='text-4xl'>
        <p>{isFetching ? 'Loading...' : ''}</p>
        <p>{isError ? 'Error Fetching' : ''}</p>
        <select value={numDogs} onChange={(e) => setNumDogs(Number(e.target.value))}>
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Breed</th>
          </tr>
        </thead>
        <tbody>
          {data.map((breed) => (
            <tr key={breed.id}>
              <td className='size-1/2'>{breed.name}</td>
              <td className='size-1/2'>
                <img className='w-full h-auto rounded size-1/2' src={breed.image.url} alt={breed.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TripsList;
