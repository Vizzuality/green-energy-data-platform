import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Indicator = {
  year: number,
  start_year: number,
  end_year: number,
  region: string,
};

const initialState = {
  year: null,
} as Indicator;

export const indicatorSlice = createSlice({
  name: 'indicator',
  initialState,
  reducers: {
    setYear: (state: Indicator, action: PayloadAction<number>) => ({
      ...state,
      year: action.payload,
    }),
    setStartYear: (state: Indicator, action: PayloadAction<number>) => ({
      ...state,
      start_year: action.payload,
    }),
    setEndYear: (state: Indicator, action: PayloadAction<number>) => ({
      ...state,
      end_year: action.payload,
    }),
    setRegion: (state: Indicator, action: PayloadAction<string>) => ({
      ...state,
      region: action.payload,
    }),
  },
});

export const {
  setYear, setStartYear, setEndYear, setRegion,
} = indicatorSlice.actions;

export default indicatorSlice.reducer;
