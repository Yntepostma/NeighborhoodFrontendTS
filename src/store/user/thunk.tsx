import axios from "axios";
import { AppDispatch, RootState } from "../index";
import { User } from "./slice";
import { apiUrl } from "../../config";
import { selectToken } from "./selectors";
import { loginSuccess, tokenStillValid } from "./slice";
import { Login } from "../../Pages/LoginPage";
import { geoKey } from "../../config";

export const getPostcode =
  (lat: number, lon: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}6&lon=${lon}8&type=postcode&format=json&apiKey=${geoKey}`
    );
    console.log(response);
  };

export const getMap =
  (lat: number, lon: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const response = await axios.get(
      `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${lon},${lat}&zoom=14&apiKey=${geoKey}`
    );
    console.log(response);
  };

export const signUp =
  (user: User) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { userName, firstName, lastName, emailAddress, password } = user;
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        userName,
        firstName,
        lastName,
        emailAddress,
        password,
      });
      dispatch(loginSuccess(response.data));
      console.log(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

export const login =
  (loginDetails: Login) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { emailAddress, password } = loginDetails;
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        emailAddress,
        password,
      });
      console.log("response in thunk", response);
    } catch (error: any) {
      console.log(error.message);
    }
  };

export const getUserWithStoredToken =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = selectToken(getState());
    console.log(token);
    if (token === null) return;
    try {
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(tokenStillValid({ user: response.data }));
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
    }
  };
