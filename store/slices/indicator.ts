import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Indicator = {
  year: string,
};

const initialState = {
  year: '',
} as Indicator;

export const groupSlice = createSlice({
  name: 'indicator',
  initialState,
  reducers: {
    setYear: (state: Indicator, action: PayloadAction<string>) => ({
      ...state,
      year: action.payload,
    }),
  },
});

export const { setYear } = groupSlice.actions;

export default groupSlice.reducer;
