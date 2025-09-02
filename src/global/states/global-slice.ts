import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Screen } from "../enums";

export interface GlobalState {
  page: number;
  content: any[];
  isSearching: boolean;
  screen: Screen;
}

const initialState: GlobalState = {
  page: 0,
  content: [],
  isSearching: false,
  screen: Screen.Mobile,
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
    setScreen: (state, action: PayloadAction<Screen>) => {
      state.screen = action.payload;
    },
  },
});

export const { setPage, setContent, toggleSearch, setScreen } =
  globalSlice.actions;

export default globalSlice.reducer;
