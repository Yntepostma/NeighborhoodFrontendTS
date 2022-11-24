import { createSlice } from "@reduxjs/toolkit";
import { Middleware } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

interface Neighborhood {
  zipcode: string;
  neighborhood: string;
  city: string;
  area: string;
  id: number;
}

interface NeighborhoodState {
  neighborhoods: Neighborhood;
}
const initialState: NeighborhoodState = {
  neighborhoods: { zipcode: "", neighborhood: "", city: "", area: "", id: 0 },
};

export const neighborhoodSlice = createSlice({
  name: "neighborhood",
  initialState,
  reducers: {
    setNeighborHood: (state, action) => {
      state.neighborhoods = action.payload;
    },
  },
});

export const { setNeighborHood } = neighborhoodSlice.actions;
export default neighborhoodSlice.reducer;
// export const selectCount = (state: RootState) => state.counter.value
