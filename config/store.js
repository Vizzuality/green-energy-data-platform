import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import reducer from 'modules';

const makeStore = () => configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default createWrapper(makeStore);
