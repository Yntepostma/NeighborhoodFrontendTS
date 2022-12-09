import { RootState } from "..";
import { Category } from "./slice";

export const selectEvents = (ReduxState: RootState) => ReduxState.event.events;

export const selectEventById = (id: number) => (ReduxState: RootState) => {
  const clonedArray = ReduxState.event.events;
  const selectedEvent = clonedArray.find((event) => {
    return event.id === id;
  });
  return selectedEvent;
};

export const selectCategories = (ReduxState: RootState) =>
  ReduxState.event.categories;
