import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Filter = {
  name: string
};

interface IndicatorsStateProps {
  filters: Filter[],
}

const initialState = {
  filters: [],
} as IndicatorsStateProps;

export const filtersSlice = createSlice({
  name: 'indicator',
  initialState,
  reducers: {
    addFilter: (state: Filter, action: PayloadAction<string>) => ({
      ...state,
      filters: action.payload,
    }),
  },
});

export const { addFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
