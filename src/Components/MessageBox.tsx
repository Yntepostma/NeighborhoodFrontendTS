import { useSelector, useDispatch } from "react-redux";
import { selectMessage } from "../store/appState/selector";
import { clearMessage } from "../store/appState/slice";

export const MessageBox = () => {
  const dispatch = useDispatch();

  const message = useSelector(selectMessage);

  const displayMessage = message.text !== null;

  if (!displayMessage) return null;

  return (
    <div className="items-center bg-teal-700 opacity:80 border rounded-lg shadow-md md:flex-row hover:bg-gray-100 hover:opacity:75 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <br></br>
      <p className="text-white text-center">
        <strong>{message.text}</strong>
      </p>
      <br></br>
      <p onClick={() => dispatch(clearMessage())}></p>
    </div>
  );
};
