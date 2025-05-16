import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  page: number;
  content: any[];
  isSearching: boolean;
  isMobile: boolean;
}

const initialState: GlobalState = {
  page: 0,
  content: [],
  isSearching: false,
  isMobile: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setContent: (state, action: PayloadAction<any[]>) => {
      state.content = action.payload;
    },
    toggleSearch: (state) => {
      state.isSearching = !state.isSearching;
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
  },
});

export const { setPage, setContent, toggleSearch, setIsMobile } =
  globalSlice.actions;

export default globalSlice.reducer;
