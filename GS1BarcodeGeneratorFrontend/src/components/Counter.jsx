import { useSelector, useDispatch } from 'react-redux';
import { incrementCount, decrementCount } from '../redux/reducers/counterReducer';

function Counter() {
  const count = useSelector((state) => state.counterReducer.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(incrementCount(count))}>Increment</button>
      <button onClick={() => dispatch(decrementCount(count))}>Decrement</button>
    </div>
  );
}

export default Counter;
