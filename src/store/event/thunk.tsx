import axios from "axios";
import { apiUrl } from "../../config";
import { AppDispatch, RootState } from "..";
import { selectToken } from "../user/selectors";
import { setEvents } from "./slice";
import { geoKey } from "../../config";
import { setLatLong } from "./slice";

type Location = {
  street: string;
  zipCode: string;
  houseNumber: number;
};

export const getEvents =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = selectToken(getState());
    const response = await axios.get(`${apiUrl}/events`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setEvents(response.data));
  };

export const getLatLong =
  ({ zipCode, street, houseNumber }: Location) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?housenumber=${houseNumber}&street=${street}&postcode=${zipCode}&&format=json&apiKey=${geoKey}`
    );
    console.log("Response from API", response.data.results[0]);
    dispatch(setLatLong(response.data.results[0]));
  };

export const createEvent =
  (newEvent: Event) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { title, description, imageUrl, longitude, latitude };
    const response = await axios.post(`${apiUrl}/events`, {
      title,
      description,
    });
  };
