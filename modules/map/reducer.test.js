import {
  setLocation,
} from './actions';

import reducer from './reducers';
import initialState from './initial-state';

test('MAP__SET_LOCATION', () => {
  const action = setLocation([0, 0]);
  const newState = reducer(initialState, action);
  expect(newState).toEqual({ ...initialState, lonLat: ([0, 0]) });
});
