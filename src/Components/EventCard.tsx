import { NavLink } from "react-router-dom";
import { deleteEvent } from "../store/event/thunk";
import { useAppDispatch } from "../store/hooks";
import { selectUser } from "../store/user/selectors";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Category } from "../store/event/slice";
import moment from "moment";
import { getCategories } from "../store/marketplace/thunk";

export type EventProps = {
  title: string;
  description: string;
  imageUrl: string;
  date: Date;
  latitude: number;
  longitude: number;
  id: number;
  categories: Category[];
};

export const EventCard = ({
  id,
  title,
  description,
  imageUrl,
  date,
  longitude,
  latitude,
  categories,
}: EventProps) => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

  return (
    <div className="flex flex-col items-center opacity-90 mb-5 ml-28 w-9/12 bg-white border rounded-lg shadow-md md:flex-row justify-between  hover:bg-gray-100 hover:opacity:75 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img
        className="object-cover h-44 ml-2 rounded-lg"
        src={imageUrl}
        alt={title}
      />
      <div className="flex flex-col justify-between  max-w-10 p-4 leading-normal">
        <h5 className="mb-2 text-2xl decoration-solid font-bold tracking-tight text-blue-900 dark:text-white">
          {title}
        </h5>
        <div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>

          {categories.map((cat) => {
            return (
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {cat.name}
              </span>
            );
          })}
          <br></br>
          <br></br>
          <span className="ml-5">
            <strong>{moment(date).format("MMM Do YY")}</strong>
          </span>
          <NavLink to={`/events/${id}`}>
            <button className="inline-flex items-center px-3 py-2 ml-10 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Details
            </button>
          </NavLink>
        </div>
      </div>

      <div>
        <MapContainer
          center={[latitude, longitude]}
          zoom={15}
          scrollWheelZoom={true}
          style={{
            height: "20vw",
            width: "25vw",
            borderTopRightRadius: "10%",
            borderBottomRightRadius: "10%",
          }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}></Marker>
        </MapContainer>
      </div>
    </div>
  );
};
