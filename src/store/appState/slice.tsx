import { createSlice } from "@reduxjs/toolkit";

type message = {
  variant: string | null;
  dismissable: boolean | null;
  text: string | null;
};

const initialState = {
  message: { variant: null, dismissable: null, text: null },
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = { variant: null, dismissable: null, text: null };
    },
  },
});

export const { setMessage, clearMessage } = appStateSlice.actions;

export default appStateSlice.reducer;
