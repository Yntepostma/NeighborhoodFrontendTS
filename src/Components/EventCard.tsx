import { NavLink } from "react-router-dom";
import { deleteEvent } from "../store/event/thunk";
import { useAppDispatch } from "../store/hooks";
import { selectUser } from "../store/user/selectors";
import { useSelector } from "react-redux";

export type EventProps = {
  title: string;
  description: string;
  imageUrl: string;
  date: Date;
  latitude: number;
  longitude: number;
  id: number;
};

export const EventCard = ({ id, title, description, imageUrl }: EventProps) => {
  const dispatch = useAppDispatch();

  const user = useSelector(selectUser);

  return (
    <div className="max-w-sm min-h-100 mb-5 mr-5 bg-white border ml-4 border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" src={imageUrl} alt={title} />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <NavLink
          to={`/events/${id}`}
          className="inline-flex items-center px-3 mr-2 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Get Details
        </NavLink>
        <button
          onClick={() => dispatch(deleteEvent(id))}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Delete event
        </button>
      </div>
    </div>
  );
};
