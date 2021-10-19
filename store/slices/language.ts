import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LanguageProps = {
  current: string,
};

const initialState = {
  current: '',
} as LanguageProps;

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state: LanguageProps, action: PayloadAction<string>) => ({
      ...state,
      current: action.payload,
    }),
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
