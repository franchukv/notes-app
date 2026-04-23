import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PageState {
  title: string;
}

const initialState: PageState = {
  title: '',
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPageTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
  selectors: {
    selectPageTitle: (state) => state.title,
  },
});

export const { setPageTitle } = pageSlice.actions;
export const { selectPageTitle } = pageSlice.selectors;
