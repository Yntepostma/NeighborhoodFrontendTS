import { DEFAULT_MESSAGE_TIMEOUT } from "../../config";
import { setMessage, clearMessage } from "./slice";
import { AppDispatch, RootState } from "..";

export const showMessageWithTimeout =
  (
    variant: string,
    dismissable: boolean,
    text: string,
    timeOutMilliSeconds: number
  ) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setMessage({ variant, dismissable, text }));

    const timeout = timeOutMilliSeconds || DEFAULT_MESSAGE_TIMEOUT;

    setTimeout(() => dispatch(clearMessage()), timeout);
  };
