import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CategoryObject = {
  label: string, value?: string
};

export type IndicatorCompareFilters = {
  year: number,
  region: string,
  unit: string,
  category: CategoryObject,
  scenario: string,
  visualization: string,
};

const initialState = {
  year: null,
  scenario: null,
} as IndicatorCompareFilters;

export const indicatorSlice = createSlice({
  name: 'indicator-compare-filters',
  initialState,
  reducers: {
    setCompareFilters: (
      state: IndicatorCompareFilters,
      action: PayloadAction<{ [key: string]: string | number | CategoryObject }>,
    ) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const {
  setCompareFilters,
} = indicatorSlice.actions;

export default indicatorSlice.reducer;
