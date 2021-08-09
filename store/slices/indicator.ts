import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IndicatorFilters = {
  year: number,
  start_year?: number,
  end_year?: number,
  region: string,
  unit: string,
};

const initialState = {
  year: null,
} as IndicatorFilters;

export const indicatorSlice = createSlice({
  name: 'indicator-filters',
  initialState,
  reducers: {
    setFilters: (
      state: IndicatorFilters,
      action: PayloadAction<{ [key: string]: string | number }>,
    ) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const {
  setFilters,
} = indicatorSlice.actions;

export default indicatorSlice.reducer;
