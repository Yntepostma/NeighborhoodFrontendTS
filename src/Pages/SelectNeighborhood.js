import { useEffect, useState } from "react";

const SelectNeighborhood = () => {

useEffect(()=>  {
    const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported on this browser");
    } else {
      setStatus("...locating.");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }}
    }, []})

 
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  console.log("latitude:", lat, "longtitude:", lng);

  return <div></div>;
};
