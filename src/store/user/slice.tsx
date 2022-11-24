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

type Token = {
  token: string;
};

type State = {
  user: User;
  token: Token;
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
  token: { token: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
