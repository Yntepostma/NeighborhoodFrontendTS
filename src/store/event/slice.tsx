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

type State = {
  events: Event[];
};

const initialState: State = {
  events: [],
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
  },
});

export const { setEvents } = eventSlice.actions;
export default eventSlice.reducer;
