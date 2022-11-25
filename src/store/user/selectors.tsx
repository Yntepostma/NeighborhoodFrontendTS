import { RootState } from "..";

export const selectToken = (ReduxState: RootState) => ReduxState.user.token;
