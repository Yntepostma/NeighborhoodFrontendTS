import axios from "axios";
import { apiUrl } from "../../config";
import { AppDispatch, RootState } from "..";
import { selectToken } from "../user/selectors";
import { setMarketPlaces, setCategories } from "./slice";
import { geoKey } from "../../config";

type newMarketPlace = {
  street: string;
  zipCode: string;
  houseNumber: number;
  title: string;
  description: string;
  imageUrl: string;
  category: number;
};

export const getMarketPlaces =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = selectToken(getState());
    const response = await axios.get(`${apiUrl}/marketplace`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("response", response);
    dispatch(setMarketPlaces(response.data));
  };

export const getUser =
  (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const response = await axios.get(`${apiUrl}/events/user`);
    console.log("response", response);
  };

export const deleteMarketPlace =
  (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = selectToken(getState());
    const response = await axios.delete(`${apiUrl}/marketplace/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
  };

export const getCategories =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const response = await axios.get(`${apiUrl}/events/categories`);
    dispatch(setCategories(response.data));
  };

export const createMarketPlace =
  ({
    zipCode,
    street,
    houseNumber,
    title,
    description,
    imageUrl,
    category,
  }: newMarketPlace) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?housenumber=${houseNumber}&street=${street}&postcode=${zipCode}&&format=json&apiKey=${geoKey}`
    );
    const token = selectToken(getState());
    const latitude = response.data.results[0].lat;
    const longtitude = response.data.results[0].lon;
    const response2 = await axios.post(
      `${apiUrl}/marketplace`,
      {
        title,
        description,
        imageUrl,
        latitude,
        longtitude,
        category,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("responnse from backend", response2);
    dispatch(getMarketPlaces());
  };
