import { createSlice } from "@reduxjs/toolkit";
import { Middleware } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { stat } from "fs/promises";

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

type Latlng = {
  lat: number;
  lng: number;
};

type State = {
  user: User;
  token: Token;
  neighborhood: Neighborhood;
  latlng: Latlng;
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
  latlng: { lat: 0, lng: 0 },
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
      state.neighborhood = action.payload;
    },
    setLatlng: (state, action) => {
      state.latlng = action.payload;
      console.log(state.latlng);
    },
  },
});

export const { loginSuccess, tokenStillValid, setArea, setLatlng } =
  userSlice.actions;
export default userSlice.reducer;
