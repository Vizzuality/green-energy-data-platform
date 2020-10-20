import { createReducer } from '@reduxjs/toolkit';
import initialState from './initial-state';

// ACTIONS
import { setBasemap, setLocation } from './actions';

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setBasemap, (state, { payload }) => {
      return {
        ...state,
        selectedBasemap: payload
      }
    })
    .addCase(setLocation, (state, { payload }) => {
      return {
        ...state,
        lonLat: payload
      }
    })
});

export default reducer;
