import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GroupSubgroupFilters = {
  searchValue: string,
};

const initialState = {
  searchValue: '',
} as GroupSubgroupFilters;

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (
      state: GroupSubgroupFilters,
      action: PayloadAction<string>,
    ) => ({
      ...state,
      searchValue: action.payload,
    }),
  },
});

export const {
  setSearchValue,
} = searchSlice.actions;

export default searchSlice.reducer;
