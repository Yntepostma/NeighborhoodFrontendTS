import { configureStore } from "@reduxjs/toolkit";
import neighborhoodReducer from "./neighborhood/slice";

const store = configureStore({
  reducer: {
    neighborhood: neighborhoodReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
