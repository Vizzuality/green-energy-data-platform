import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Group = {
  current: string,
};

const initialState = {
  current: '',
} as Group;

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setSubgroup: (state: Group, action: PayloadAction<string>) => ({
      ...state,
      current: action.payload,
    }),
  },
});

export const { setSubgroup } = groupSlice.actions;

export default groupSlice.reducer;
