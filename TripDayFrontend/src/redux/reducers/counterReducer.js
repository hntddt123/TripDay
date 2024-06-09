import { createAction } from '@reduxjs/toolkit';
import {
  INCREMENT_COUNT,
  DECREMENT_COUNT
} from '../actions/counterActionType';

const initialCounterState = {
  count: 0,
};

export const counterReducer = (state = initialCounterState, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return { ...state, count: action.payload.count + 1 };
    case DECREMENT_COUNT:
      return { ...state, count: action.payload.count - 1 };
    default:
      return state;
  }
};

export const incrementCount = createAction(INCREMENT_COUNT, (count) => ({
  payload: {
    count: count
  }
}));

export const decrementCount = createAction(DECREMENT_COUNT, (count) => ({
  payload: {
    count: count
  }
}));
