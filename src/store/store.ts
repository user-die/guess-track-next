import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice";
import { getToken } from "./getToken";
import { spotiApi } from "./spotiApi";

export const store = configureStore({
  reducer: {
    store: counterReducer,
    [getToken.reducerPath]: getToken.reducer,
    [spotiApi.reducerPath]: spotiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(getToken.middleware)
      .concat(spotiApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
