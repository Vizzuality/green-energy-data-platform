import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Map = {
  selectedBasemap: string,
  lonLat: [{ lon:number, Lat: number }],
};

const initialState = {
  selectedBasemap: 'light',
  lonLat: null,
  isLoading: false,
  error: false,
} as Map;

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setBasemap: (state: Map, action: PayloadAction<string>) => ({
      ...state,
      selectedBasemap: action.payload,
    }),
    setLocation: (state, action) => ({
      ...state,
      lonLat: action.payload,
    }),
  },
});

export default mapSlice.reducer;
