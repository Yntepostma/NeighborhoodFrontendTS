import { createSlice } from "@reduxjs/toolkit";
import { User } from "../user/slice";

type Response = {
  id: number;
  response: string;
  userId: number;
  neighborhoodId: number;
  user: User;
};

export type MarketPlace = {
  title: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longtitude: number;
  userId: number;
  neighborhoodId: number;
  id: number;
  responses: Response[];
  user: User;
};

type Category = {
  id: number;
  name: string;
};

type State = {
  marketplaces: MarketPlace[];
  categories: Category[];
};

const initialState: State = {
  marketplaces: [],
  categories: [],
};

export const eventSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    setMarketPlaces: (state, action) => {
      state.marketplaces = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setMarketPlaces, setCategories } = eventSlice.actions;
export default eventSlice.reducer;
