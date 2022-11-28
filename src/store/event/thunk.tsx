import axios from "axios";
import { apiUrl } from "../../config";
import { AppDispatch, RootState } from "..";
import { selectToken } from "../user/selectors";

export const getEvents =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = selectToken(getState());
    const response = await axios.get(`${apiUrl}/events`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
  };
