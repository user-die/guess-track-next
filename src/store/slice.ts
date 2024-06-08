import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  token: string;
  artist: {};
  searchModal: boolean;
}

export type Artist = {
  name: string;
  image: string;
  genres: string[];
  id: string;
  url: string;
};

const initialState: CounterState = {
  token: "",
  artist: {},
  searchModal: false,
};

export const counterSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setArtist: (state, action: PayloadAction<Artist>) => {
      state.artist = action.payload;
    },
    showSearchModal: (state) => {
      state.searchModal = true;
    },
    hideSearchModal: (state) => {
      state.searchModal = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setArtist, showSearchModal, hideSearchModal } =
  counterSlice.actions;

export default counterSlice.reducer;
