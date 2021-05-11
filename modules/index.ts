import { combineReducers } from '@reduxjs/toolkit';
import map from './map/reducers';

export const rootReducer = combineReducers({
  map,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
