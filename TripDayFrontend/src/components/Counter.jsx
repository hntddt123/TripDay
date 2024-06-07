import { useSelector, useDispatch } from 'react-redux';
import { incrementCount, decrementCount } from '../redux/reducers/counterReducer';
import CustomButton from './CustomButton';

function Counter() {
  const count = useSelector((state) => state.counterReducer.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className='text-2xl'>Count: {count}</h1>
      <div className='grid grid-cols-2'>
        <CustomButton label='+' onClick={() => dispatch(incrementCount(count))}>Increment</CustomButton>
        <CustomButton label='-' onClick={() => dispatch(decrementCount(count))}>Decrement</CustomButton>
      </div>
    </div>
  );
}

export default Counter;
