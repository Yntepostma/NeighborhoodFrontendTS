import { configureStore } from "@reduxjs/toolkit";
import neighborhoodReducer from "./neighborhood/slice";
import userReducer from "./user/slice";
import eventReducer from "./event/slice";
import marketPlaceReducer from "./marketplace/slice";

const store = configureStore({
  reducer: {
    neighborhood: neighborhoodReducer,
    user: userReducer,
    event: eventReducer,
    marketplace: marketPlaceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
