import { createSlice } from "@reduxjs/toolkit";
import { Middleware } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

export type User = {
  userName: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  phoneNumber?: string;
  profilePicture?: string;
};

type Token = string | null;
type Neighborhood = {
  postal: string;
  neighborhood: string;
  council: string;
  area: string;
};

type State = {
  user: User;
  token: Token;
  neighborhood: Neighborhood;
};

const initialState: State = {
  user: {
    userName: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    phoneNumber: "",
    profilePicture: "",
  },
  token: localStorage.getItem("token"),
  neighborhood: { postal: "", council: "", neighborhood: "", area: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    tokenStillValid: (state, action) => {
      state.user = action.payload.user;
    },
    setArea: (state, action) => {
      console.log("payload", action.payload);
      state.neighborhood = action.payload;
    },
  },
});

export const { loginSuccess, tokenStillValid, setArea } = userSlice.actions;
export default userSlice.reducer;
