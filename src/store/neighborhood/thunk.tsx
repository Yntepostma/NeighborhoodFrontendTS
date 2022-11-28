import axios from "axios";
import { apiUrl } from "../../config";
import { AppDispatch, RootState } from "..";
import { setNeighborHood } from "./slice";

export type Neighborhood = {
  id: number;
  postal: string;
  neighborhood: string;
  area: string;
  council: string;
};

export const getNeighborhood =
  (postcode: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const response = await axios.get(`${apiUrl}/neighborhoods/${postcode}`);
    const { council, area, id, neighborhood, postal } = response.data;
    const neighborHood: Neighborhood = {
      council,
      area,
      id,
      neighborhood,
      postal,
    };
    dispatch(setNeighborHood(neighborHood));
  };
