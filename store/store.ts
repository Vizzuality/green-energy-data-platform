import { configureStore, combineReducers } from '@reduxjs/toolkit';
import type { ReducersMapObject } from '@reduxjs/toolkit';
import rootReducer from 'store/slices';
import group from './slices/group';
import subgroup from './slices/subgroup';

const staticReducers = {
  group,
  subgroup,
};

const asyncReducers = {};

const createReducer = (reducers: ReducersMapObject) => combineReducers({
  ...staticReducers,
  ...reducers,
});

const makeStore = configureStore({
  reducer: createReducer(asyncReducers),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof makeStore.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof makeStore.dispatch;

export default makeStore;
