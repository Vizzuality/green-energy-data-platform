import { configureStore, combineReducers } from '@reduxjs/toolkit';
import type { ReducersMapObject } from '@reduxjs/toolkit';
import group from './slices/group';
import subgroup from './slices/subgroup';
import indicator from './slices/indicator';
import indicator_compare from './slices/indicator_compare';
import indicator_related from './slices/indicator_related';
import search from './slices/search';
import language from './slices/language';

const staticReducers = {
  group,
  subgroup,
  indicator,
  indicator_compare,
  indicator_related,
  search,
  language,
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
