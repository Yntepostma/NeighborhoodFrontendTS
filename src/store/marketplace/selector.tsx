import { RootState } from "..";

export const selectMarketPlaces = (ReduxState: RootState) =>
  ReduxState.marketplace.marketplaces;

export const selectMarketPlaceById =
  (id: number) => (ReduxState: RootState) => {
    const clonedArray = ReduxState.marketplace.marketplaces;
    const selectedMarketPlace = clonedArray.find((marketplace) => {
      return marketplace.id === id;
    });
    return selectedMarketPlace;
  };
