import { useAppDispatch } from "../store/hooks";
import { selectMarketPlaceById } from "../store/marketplace/selector";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import image from "./images/background5.jpg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { NavLink } from "react-router-dom";

export const DetailsMarketPage = () => {
  const { id } = useParams();
  const intId: number = parseInt(id!);

  const dispatch = useAppDispatch();
  const marketplace = useSelector(selectMarketPlaceById(intId));

  return (
    <div className=" bg-teal-100 bg-scroll">
      <div className="flex-row">
        <div>
          <div className="w-3/6 bg-white border ml-4 border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <img
              className="rounded-t-lg"
              src={marketplace?.imageUrl}
              alt={marketplace?.title}
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {marketplace?.title}
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {marketplace?.description}
              </p>
              <div className="flex-row">
                <NavLink
                  to="/"
                  className="inline-flex mr-3 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  contact
                </NavLink>
                <NavLink
                  to="/"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  send response
                </NavLink>
              </div>
            </div>
          </div>
          {!marketplace ? (
            ""
          ) : (
            <MapContainer
              center={[marketplace.latitude, marketplace.longtitude]}
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
                position={[marketplace.latitude, marketplace.longtitude]}
              ></Marker>
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
};
