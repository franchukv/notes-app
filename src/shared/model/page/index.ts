import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PageState {
  documentTitle: string;
  headerTitle: string;
}

const initialState: PageState = {
  documentTitle: '',
  headerTitle: '',
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPageTitles: (state, action: PayloadAction<PageState>) => {
      state.documentTitle = action.payload.documentTitle;
      state.headerTitle = action.payload.headerTitle;
    },
  },
  selectors: {
    selectDocumentTitle: (state) => state.documentTitle,
    selectHeaderTitle: (state) => state.headerTitle,
  },
});

export const { setPageTitles } = pageSlice.actions;
export const { selectDocumentTitle, selectHeaderTitle } = pageSlice.selectors;
