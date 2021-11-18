import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CategoryObject = {
  label: string, value?: string
};

export type IndicatorRelatedFilters = Readonly<{
  year: number,
  region: string,
  unit: string,
  category: CategoryObject,
  scenario: string,
  visualization: string
}>;

const initialState = {
  year: null,
  category: { label: 'category_1' },
} as IndicatorRelatedFilters;

export const indicatorSlice = createSlice({
  name: 'indicator-filters',
  initialState,
  reducers: {
    setRelatedFilters: (
      state: IndicatorRelatedFilters,
      action: PayloadAction<{ [key: string]: string | number | CategoryObject }>,
    ) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const {
  setRelatedFilters,
} = indicatorSlice.actions;

export default indicatorSlice.reducer;
