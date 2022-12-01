import axios from "axios";
import { AppDispatch, RootState } from "../index";
import { NewUser } from "../../Pages/SignupPage";
import { User } from "./slice";
import { apiUrl } from "../../config";
import { setNeighborHood } from "../neighborhood/slice";
import { setUserNeighborHood } from "./slice";
import { selectToken } from "./selectors";
import { getMarketPlaces } from "../marketplace/thunk";
import {
  loginSuccess,
  tokenStillValid,
  setArea,
  setLatlng,
  setLatlngSignUp,
  logOut,
} from "./slice";
import { Login } from "../../Pages/LoginPage";
import { geoKey } from "../../config";
import { getEvents } from "../event/thunk";

export const getPostcode =
  (lat: number, lon: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}6&lon=${lon}8&type=postcode&format=json&apiKey=${geoKey}`
    );
    const postcode = response.data.results[0].postcode;
    const responseArea = await axios.get(`${apiUrl}/neighborhoods/${postcode}`);
    dispatch(setArea(responseArea.data));
  };

export const getLatLong =
  (postal: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?text=${postal}&lang=en&limit=10&type=postcode&filter=countrycode:nl&apiKey=${geoKey}`
    );
    const data = response.data.features[0].properties;

    const latlong = { lat: data.lat, lng: data.lon };
    dispatch(setLatlng(latlong));
  };

export const getLatLongSignUp =
  (postal: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?text=${postal}&lang=en&limit=10&type=postcode&filter=countrycode:nl&apiKey=${geoKey}`
    );
    const data = response.data.features[0].properties;
    console.log(data);
    const latlong = { lat: data.lat, lng: data.lon };
    dispatch(setLatlngSignUp(latlong));
  };

export const addNeighborhood =
  (postal: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = selectToken(getState());
    const response = await axios.post(
      `${apiUrl}/neighborhoods`,
      { postal },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(setNeighborHood(response.data));
    console.log(response);
  };

export const signUp =
  (user: NewUser) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
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
      dispatch(loginSuccess(response.data));
      dispatch(setUserNeighborHood(response.data.user.neighborhood));
      dispatch(getEvents());
      dispatch(getMarketPlaces());
    } catch (error: any) {
      console.log(error.message);
    }
  };

export const getUserWithStoredToken =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = selectToken(getState());
    if (token === null) return;
    try {
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setUserNeighborHood(response.data.neighborhood));
      dispatch(tokenStillValid({ user: response.data }));
      dispatch(getEvents());
      dispatch(getMarketPlaces());
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      dispatch(logOut());
    }
  };
