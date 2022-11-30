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

import { selectToken, selectArea } from "../store/user/selectors";
import image from "./images/background4.jpg";
import { neighborhoodSlice } from "../store/neighborhood/slice";

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

  const neighborhood = useSelector(selectArea);
  console.log("neighborhood", neighborhood);
  const events = useSelector(selectEvents);
  const localEvents = events?.filter((event) => {
    return event.neighborhoodId === neighborhood?.id;
  });

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
      <h2 className="font-medium bg-wleading-tight text-4xl pt-5 p4-2 mr-4 mb-2 text-grey">
        Welcome to {neighborhood.neighborhood}
      </h2>
      {lat === 0 ? (
        "loading"
      ) : (
        <MapContainer
          center={[lat, lon]}
          zoom={15}
          scrollWheelZoom={true}
          style={{
            borderRadius: "10px",
            height: "35vw",
            width: "45vw",
            margin: "0 10px",
            boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
          }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {localEvents.map((event) => (
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
    </div>
  );
};
