import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CategoryObject = {
  label: string, value?: string
};

export type IndicatorFilters = Readonly<{
  year: number,
  region: string,
  unit: string,
  category: CategoryObject,
  scenario: string,
  visualization: string
}>;

const initialState = {
  year: null,
} as IndicatorFilters;

export const indicatorSlice = createSlice({
  name: 'indicator-filters',
  initialState,
  reducers: {
    setFilters: (
      state: IndicatorFilters,
      action: PayloadAction<{ [key: string]: string | number | CategoryObject }>,
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
