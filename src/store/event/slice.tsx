import { createSlice } from "@reduxjs/toolkit";

export type Event = {
  title: string;
  description: Text | null;
  imageUrl: string;
  latitude: number;
  longitude: number;
  userId: number;
  neighborhoodId: number;
};

type LatLong = {
  lat: number;
  lon: number;
};

type State = {
  events: Event[];
  latLong: LatLong;
};

const initialState: State = {
  events: [],
  latLong: { lat: 0, lon: 0 },
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setLatLong: (state, action) => {
      state.latLong = { lat: action.payload.lat, lon: action.payload.lon };
      console.log("state", state.latLong);
    },
  },
});

export const { setEvents, setLatLong } = eventSlice.actions;
export default eventSlice.reducer;
