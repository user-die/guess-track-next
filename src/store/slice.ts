import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  token: string;
  search: string;
  artist: {};
  searchModal: boolean;
  tracks: any;
  points: number;
  currentTrack: number;
  plug: boolean;
  finish: boolean;
  correct: boolean;
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
  search: "",
  artist: {},
  searchModal: false,
  tracks: null,
  points: 0,
  currentTrack: 0,
  plug: true,
  finish: false,
  correct: false,
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
    setTracks: (state, action) => {
      state.tracks = action.payload;
    },
    nextTrack: (state) => {
      if (state.tracks && state.currentTrack + 1 < state.tracks.length)
        state.currentTrack++;
    },
    addPoint: (state) => {
      state.points++;
    },
    togglePlug: (state, action) => {
      state.plug = action.payload;
    },
    setFinish: (state, action) => {
      state.finish = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    clearState: (state) => {
      state = initialState;
    },
    setCorrect: (state, action) => {
      state.correct = action.payload;
    },
  },
});

export const {
  setToken,
  setArtist,
  showSearchModal,
  hideSearchModal,
  setTracks,
  nextTrack,
  addPoint,
  togglePlug,
  setFinish,
  setSearch,
  clearState,
  setCorrect,
} = counterSlice.actions;

export default counterSlice.reducer;
