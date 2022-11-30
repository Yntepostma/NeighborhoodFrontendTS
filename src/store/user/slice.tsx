import { createSlice } from "@reduxjs/toolkit";

export type User = {
  userName: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  phoneNumber?: string;
  profilePicture?: string;
  id: number;
};

type Token = string | null;
type CurrentNeighborhood = {
  postal: string;
  neighborhood: string;
  council: string;
  area: string;
};

type Neighborhood = {
  id: number;
  postal: string;
  neighborhood: string;
  council: string;
  area: string;
};

type Latlng = {
  lat: number;
  lng: number;
};

type Message = string;

type State = {
  user: User;
  token: Token;
  currentNeighborhood: CurrentNeighborhood;
  neighborhood: Neighborhood;
  latlng: Latlng;
  message: Message;
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
    id: 0,
  },
  token: localStorage.getItem("token"),
  currentNeighborhood: { postal: "", council: "", neighborhood: "", area: "" },
  neighborhood: { id: 0, postal: "", council: "", neighborhood: "", area: "" },
  latlng: { lat: 0, lng: 0 },
  message: "",
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
      state.currentNeighborhood = action.payload;
    },
    setLatlng: (state, action) => {
      state.latlng = action.payload;
      console.log(state.latlng);
    },
    logOut: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.user = {
        userName: "",
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        phoneNumber: "",
        profilePicture: "",
        id: 0,
      };
    },
    setUserNeighborHood: (state, action) => {
      state.neighborhood = action.payload;
      console.log("state", state.neighborhood);
    },
  },
});

export const {
  loginSuccess,
  tokenStillValid,
  setArea,
  setLatlng,
  logOut,
  setUserNeighborHood,
} = userSlice.actions;
export default userSlice.reducer;
