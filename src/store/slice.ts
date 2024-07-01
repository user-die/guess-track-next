import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Artist = {
  name: string;
  image: string;
  genres: string[];
  id: string;
  url: string;
};

interface CounterState {
  token: string;
  search: string;
  artist: Artist;
  searchModal: boolean;
  tracks: any;
  points: number;
  currentTrack: number;
  plug: boolean;
  finish: boolean;
  correct: boolean;
  guessedTracks: any;
}

const initialState: CounterState = {
  token: "",
  search: "",
  artist: {
    name: "",
    image: "",
    genres: [],
    id: "",
    url: "",
  },
  searchModal: false,
  tracks: [],
  points: 0,
  currentTrack: 0,
  plug: true,
  finish: false,
  correct: false,
  guessedTracks: [],
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
    setCorrect: (state, action) => {
      state.correct = action.payload;
    },
    deletePoints: (state) => {
      state.points = 0;
    },
    deleteCurrentTrack: (state) => {
      state.currentTrack = 0;
    },
    addGuessedTrack: (state, action) => {
      state.guessedTracks = [...state.guessedTracks, action.payload];
    },
    deleteGuessedTracks: (state) => {
      state.guessedTracks = [];
    },
    setCurrentTrack: (state) => {
      state.currentTrack = state.tracks.length - 1;
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
  setCorrect,
  deletePoints,
  deleteCurrentTrack,
  addGuessedTrack,
  deleteGuessedTracks,
  setCurrentTrack,
} = counterSlice.actions;

export default counterSlice.reducer;
