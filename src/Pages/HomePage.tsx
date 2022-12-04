import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectEvents } from "../store/event/selector";
import { useAppDispatch } from "../store/hooks";
import { useEffect, useState } from "react";
import { getLatLong } from "../store/user/thunk";
import { selectLatLong } from "../store/user/selectors";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { NavLink } from "react-router-dom";
import { selectMarketPlaces } from "../store/marketplace/selector";

import {
  selectToken,
  selectArea,
  selectUserNeighborhood,
} from "../store/user/selectors";
import image from "./images/background6.jpg";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const [lat, setLat] = useState<number>(0);
  const [lon, setLon] = useState<number>(0);
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const neighborhood = useSelector(selectUserNeighborhood);
  const events = useSelector(selectEvents);
  const marketplaces = useSelector(selectMarketPlaces);

  useEffect(() => {
    if (neighborhood) {
      dispatch(getLatLong(neighborhood.postal));
    }
  }, [dispatch, neighborhood]);

  const latLong = useSelector(selectLatLong);

  useEffect(() => {
    if (latLong) {
      setLat(latLong.lat);
      setLon(latLong.lng);
    }
  }, [latLong]);

  return (
    <div
      style={{ backgroundImage: `url(${image}) `, backgroundSize: "cover" }}
      className="bg-fixed h-screen"
    >
      <div className="flex justify-around">
        {lat === 0 ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="mr-2 mt-20 ml-20 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <MapContainer
            center={[lat, lon]}
            zoom={14}
            scrollWheelZoom={true}
            style={{
              borderRadius: "10px",
              border: "2px solid white",
              height: "35vw",
              width: "45vw",
              margin: "20px",
              padding: "20px",
              boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {!toggle
              ? events?.map((event) => (
                  <Marker
                    key={event.title}
                    position={[event.latitude, event.longtitude]}
                  >
                    <Popup>
                      <img
                        alt={event.title}
                        className="object-contain"
                        src={event.imageUrl}
                      />
                      <NavLink to={`/events/${event.id}`}>
                        <p>
                          <strong>{event.title}</strong>
                        </p>
                      </NavLink>
                    </Popup>
                  </Marker>
                ))
              : marketplaces?.map((marketplace) => (
                  <Marker
                    key={marketplace.title}
                    position={[marketplace.latitude, marketplace.longtitude]}
                  >
                    <Popup>
                      <img
                        alt={marketplace.title}
                        className="object-contain"
                        src={marketplace.imageUrl}
                      />
                      <NavLink to={`/marketplace/${marketplace.id}`}>
                        <p>
                          <strong>{marketplace.title}</strong>
                        </p>
                      </NavLink>
                    </Popup>
                  </Marker>
                ))}
          </MapContainer>
        )}

        <div className="max-w-sm rounded opacity-80 bg-white overflow-hidden h-4/6 mt-20 shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              Welcome to NeighborHood!
            </div>
            <p className="text-gray-700 text-base">
              Connect with your neighbors through events, the marketplace or the
              messageboard. <br></br>
              <br></br>Click on the map to see to which <strong>events</strong>{" "}
              are hosted in your neighborhood. <br></br> <br></br>Or have a look
              what your neighbors are asking for or offering through the{" "}
              <strong>marketplace</strong>
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {neighborhood?.council}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {neighborhood?.neighborhood}
            </span>
            <br></br>

            <button
              className="inline-block px-6 py-2 mt-2 ml-2 border-2 border-teal-600 text-teal-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              onClick={() => setToggle(!toggle)}
            >
              {!toggle ? "Show Market Place items" : "Show Events"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
