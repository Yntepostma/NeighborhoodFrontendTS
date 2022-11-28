import { createSlice } from "@reduxjs/toolkit";

type Event = {
  title: string;
  description: Text;
  imageUrl: string;
  latitude: number;
  longitude: number;
  userId: number;
  neighborhoodId: number;
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
    setEvents: (state, action) => {},
  },
});

export const {} = eventSlice.actions;
export default eventSlice.reducer;
