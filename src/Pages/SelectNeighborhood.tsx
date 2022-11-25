import { useEffect, useState } from "react";
import { getPostcode } from "../store/user/thunk";
import { useAppDispatch } from "../store/hooks";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

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
  }, [lat]);

  return <div></div>;
};
