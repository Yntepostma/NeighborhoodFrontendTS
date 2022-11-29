import { RootState } from "..";

export const selectEvents = (ReduxState: RootState) => ReduxState.event.events;
