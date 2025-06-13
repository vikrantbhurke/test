import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Session } from "next-auth";

export interface GlobalState {
  session: Session | null;
  page: number;
  content: any[];
  isSearching: boolean;
  isMobile: boolean;
}

const initialState: GlobalState = {
  session: null,
  page: 0,
  content: [],
  isSearching: false,
  isMobile: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
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

export const { setSession, setPage, setContent, toggleSearch, setIsMobile } =
  globalSlice.actions;

export default globalSlice.reducer;
