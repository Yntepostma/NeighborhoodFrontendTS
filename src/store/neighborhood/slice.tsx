import { createSlice } from "@reduxjs/toolkit";
import { Neighborhood } from "./thunk";

interface NeighborhoodState {
  neighborhoods: Neighborhood;
}
const initialState: NeighborhoodState = {
  neighborhoods: { postal: "", neighborhood: "", council: "", area: "", id: 0 },
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
