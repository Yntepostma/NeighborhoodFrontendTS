import axios from "axios";
import { apiUrl } from "../../config";
import { AppDispatch, RootState } from "..";
import { selectToken } from "../user/selectors";
import { setEvents } from "./slice";
import { geoKey } from "../../config";
import { setLatLong } from "./slice";

type newEvent = {
  street: string;
  zipCode: string;
  houseNumber: number;
  title: string;
  description: string;
  imageUrl: string;
  date: Date;
};

export const getEvents =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = selectToken(getState());
    const response = await axios.get(`${apiUrl}/events`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setEvents(response.data));
  };

export const createEvent =
  ({
    zipCode,
    street,
    houseNumber,
    title,
    description,
    imageUrl,
    date,
  }: newEvent) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?housenumber=${houseNumber}&street=${street}&postcode=${zipCode}&&format=json&apiKey=${geoKey}`
    );
    const token = selectToken(getState());
    const latitude = response.data.results[0].lat;
    const longtitude = response.data.results[0].lon;
    console.log("lat", latitude, "lon", longtitude);
    const response2 = await axios.post(
      `${apiUrl}/events`,
      {
        title,
        description,
        imageUrl,
        latitude,
        longtitude,
        date,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("responnse from backend", response2);
  };
