import { getEvents } from "../store/event/thunk";
import { useAppDispatch } from "../store/hooks";

export const EventPage = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Events</h2>
      <button type="button" onClick={() => dispatch(getEvents())}>
        click
      </button>
    </div>
  );
};
