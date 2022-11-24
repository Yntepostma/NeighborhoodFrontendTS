import axios from "axios";
import { AppDispatch, RootState } from "../index";
import { User } from "./slice";
import { apiUrl } from "../../config";

export const signUp =
  (user: User) => async (dispatch: AppDispatch, getState: () => RootState) => {
    console.log("user:", user);
    const response = await axios.post(`${apiUrl}/auth/signup`, user);
    console.log(response);
  };
