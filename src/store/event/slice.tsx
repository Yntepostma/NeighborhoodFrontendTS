import { createSlice } from "@reduxjs/toolkit";

export type Event = {
  title: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longtitude: number;
  userId: number;
  neighborhoodId: number;
  date: Date;
  id: number;
};

type Category = {
  id: number;
  name: string;
};

type State = {
  events: Event[];
  categories: Category[];
};

const initialState: State = {
  events: [],
  categories: [],
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setEvents, setCategories } = eventSlice.actions;
export default eventSlice.reducer;
