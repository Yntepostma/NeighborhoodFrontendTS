import { useEffect, useState } from "react";
import { getPostcode, getMap } from "../store/user/thunk";
import { useAppDispatch } from "../store/hooks";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import image from "./images/background.jpg";
import { geoKey } from "../config";

export const SelectNeighborhood = () => {
  const dispatch = useAppDispatch();
  const [lat, setLat] = useState<number>(0);
  const [lon, setLon] = useState<number>(0);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported on this browser");
    } else {
      setStatus("...locating.");
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus("");
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });
    }
  }, []);

  useEffect(() => {
    if (lat !== 0) dispatch(getPostcode(lat, lon));
  }, [dispatch, lon, lat]);

  useEffect(() => {
    if (lat !== 0) dispatch(getMap(lat, lon));
  }, [dispatch, lat, lon]);

  return (
    <div>
      <div>
        <h2>Title</h2>
        <p>Your current location is: </p>
        {!lat ? (
          "Loading"
        ) : (
          <img
            className="rounded"
            src={`https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${lon},${lat}&zoom=14&apiKey=${geoKey}`}
            alt="map"
          />
        )}
      </div>
    </div>
  );
};
