import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Subgroup = {
  current: string,
};

const initialState = {
  current: '',
} as Subgroup;

export const subgroupSlice = createSlice({
  name: 'subgroup',
  initialState,
  reducers: {
    setSubgroup: (state: Subgroup, action: PayloadAction<string>) => ({
      ...state,
      current: action.payload,
    }),
  },
});

export const { setSubgroup } = subgroupSlice.actions;

export default subgroupSlice.reducer;
