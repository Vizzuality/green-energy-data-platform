import { createReducer } from '@reduxjs/toolkit';
import initialState from './initial-state';

// ACTIONS
import { setBasemap, setLocation } from './actions';

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setBasemap, (state, { payload }) => ({
      ...state,
      selectedBasemap: payload,
    }))
    .addCase(setLocation, (state, { payload }) => ({
      ...state,
      lonLat: payload,
    }));
});

export default reducer;
