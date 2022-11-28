import { RootState } from "..";

export const selectNeighborhood = (reduxState: RootState) =>
  reduxState.neighborhood.neighborhoods;
