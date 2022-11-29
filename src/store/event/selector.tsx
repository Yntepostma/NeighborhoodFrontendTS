import { RootState } from "..";

export const selectLatLong = (reduxState: RootState) =>
  reduxState.event.latLong;
