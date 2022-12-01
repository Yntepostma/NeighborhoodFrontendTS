import axios from "axios";
import { apiUrl } from "../../config";
import { AppDispatch, RootState } from "..";
import { selectToken } from "../user/selectors";
import { setEvents, setCategories } from "./slice";
import { geoKey } from "../../config";

type newEvent = {
  street: string;
  zipCode: string;
  houseNumber: number;
  title: string;
  description: string;
  imageUrl: string;
  date: Date;
  category: number;
};

export const getEvents =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = selectToken(getState());
    const response = await axios.get(`${apiUrl}/events`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setEvents(response.data));
    console.log("events", response.data);
  };

export const deleteEvent =
  (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = selectToken(getState());
    const response = await axios.delete(`${apiUrl}/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(getEvents());
  };

export const getCategories =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const response = await axios.get(`${apiUrl}/events/categories`);
    dispatch(setCategories(response.data));
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
    category,
  }: newEvent) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?housenumber=${houseNumber}&street=${street}&postcode=${zipCode}&&format=json&apiKey=${geoKey}`
    );
    const token = selectToken(getState());
    const latitude = response.data.results[0].lat;
    const longtitude = response.data.results[0].lon;
    const response2 = await axios.post(
      `${apiUrl}/events`,
      {
        title,
        description,
        imageUrl,
        latitude,
        longtitude,
        date,
        category,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(getEvents());
  };

export const addAttendee =
  (eventId: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = selectToken(getState());
    const response = await axios.post(
      `${apiUrl}/events/${eventId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("response", response);
  };
