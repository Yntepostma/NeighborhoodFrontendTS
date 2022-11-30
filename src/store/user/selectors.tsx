import { RootState } from "..";

export const selectToken = (ReduxState: RootState) => ReduxState.user.token;
export const selectArea = (ReduxState: RootState) =>
  ReduxState.user.neighborhood;
export const selectLatLong = (ReduxState: RootState) => ReduxState.user.latlng;
export const selectUser = (ReduxState: RootState) => ReduxState.user.user;
