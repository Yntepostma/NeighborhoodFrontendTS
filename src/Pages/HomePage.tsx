import axios from "axios";
import { geoKey } from "../config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectEvents } from "../store/event/selector";
import { useAppDispatch } from "../store/hooks";
import { useEffect, useState } from "react";
import { getLatLong } from "../store/user/thunk";
import { selectLatLong } from "../store/user/selectors";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import {
  selectToken,
  selectArea,
  selectUserNeighborhood,
} from "../store/user/selectors";
import image from "./images/background5.jpg";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const [lat, setLat] = useState<number>(0);
  const [lon, setLon] = useState<number>(0);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const neighborhood = useSelector(selectUserNeighborhood);
  const events = useSelector(selectEvents);
  const localEvents = events?.filter((event) => {
    return event.neighborhoodId === neighborhood?.id;
  });
  console.log("local", localEvents);

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
      className="bg-center h-screen"
    >
      <div className="flex justify-around">
        {lat === 0 ? (
          "loading"
        ) : (
          <MapContainer
            center={[lat, lon]}
            zoom={15}
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
            {localEvents?.map((event) => (
              <Marker
                key={event.title}
                position={[event.latitude, event.longtitude]}
              >
                <Popup>
                  <img
                    alt={event.title}
                    style={{ width: "100px", borderRadius: "0.5em" }}
                    src={event.imageUrl}
                  />
                  <p>{event.title}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        <div className="max-w-sm rounded bg-white overflow-hidden h-4/6 mt-20 shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              Welcome to Neighborhood!
            </div>
            <p className="text-gray-700 text-base">
              Connect with your neighbors through events, the marketplace or the
              messageboard. <br></br>
              <br></br>Click on the map to see to which events are hosted in
              your neighborhood.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {neighborhood?.council}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {neighborhood?.neighborhood}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
