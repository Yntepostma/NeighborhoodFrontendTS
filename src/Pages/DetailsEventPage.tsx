import { useAppDispatch } from "../store/hooks";
import { selectEventById } from "../store/event/selector";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import image from "./images/background5.jpg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { NavLink } from "react-router-dom";
import { addAttendee } from "../store/event/thunk";

export const DetailsEventPage = () => {
  const { id } = useParams();
  const intId: number = parseInt(id!);

  const dispatch = useAppDispatch();
  const event = useSelector(selectEventById(intId));
  console.log(event);

  return (
    <div className=" bg-teal-100 bg-scroll">
      <div>
        <div className="w-3/6 bg-white border ml-4 flex-row border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <img
            className="rounded-t-lg"
            src={event?.imageUrl}
            alt={event?.title}
          />

          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {event?.title}
            </h5>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {event?.description}
            </p>
            <div className="flex-row">
              <button
                onClick={() => dispatch(addAttendee(intId))}
                className="inline-flex mr-3 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Join
              </button>
              <NavLink
                to="/"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to agenda
              </NavLink>
            </div>
            {!event ? (
              ""
            ) : (
              <div>
                <MapContainer
                  center={[event.latitude, event.longtitude]}
                  zoom={15}
                  scrollWheelZoom={true}
                  style={{
                    borderRadius: "10px",
                    height: "20vw",
                    width: "25vw",
                    margin: "0 100px",
                    boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[event.latitude, event.longtitude]}
                  ></Marker>
                </MapContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
