import { RootState } from "..";

export const selectToken = (ReduxState: RootState) => ReduxState.user.token;
export const selectArea = (ReduxState: RootState) =>
  ReduxState.user.neighborhood;
