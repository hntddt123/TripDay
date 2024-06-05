import { useSelector, useDispatch } from 'react-redux';
import { incrementCount, decrementCount } from '../redux/reducers/counterReducer';
import CustomButton from './CustomButton';

function Counter() {
  const count = useSelector((state) => state.counterReducer.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <CustomButton label='+' onClick={() => dispatch(incrementCount(count))}>Increment</CustomButton>
      <CustomButton label='-' onClick={() => dispatch(decrementCount(count))}>Decrement</CustomButton>
    </div>
  );
}

export default Counter;
