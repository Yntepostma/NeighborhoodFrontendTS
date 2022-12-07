import { RootState } from "..";

export const selectMessage = (ReduxState: RootState) =>
  ReduxState.appState.message;
