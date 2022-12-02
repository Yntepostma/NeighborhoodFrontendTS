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
      className="bg-center"
    >
      <div className="flex justify-around">
        {lat === 0 ? (
          <div className="flex justify-center items-center">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
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
              Welcome to Neighborhood!
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
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
