import { useEffect, useState } from "react";
import { getPostcode, addNeighborhood } from "../store/user/thunk";
import { getNeighborhood } from "../store/neighborhood/thunk";
import { selectNeighborhood } from "../store/neighborhood/selector";
import { useAppDispatch } from "../store/hooks";
import { useMap } from "react-leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import { selectArea } from "../store/user/selectors";

export const SelectNeighborhood = () => {
  const dispatch = useAppDispatch();
  const [lat, setLat] = useState<number>(0);
  const [lon, setLon] = useState<number>(0);
  const [zip, setZip] = useState<string>("");
  const [loadstatus, setLoadStatus] = useState<string>("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoadStatus("Geolocation is not supported on this browser");
    } else {
      setLoadStatus("...locating.");
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });
    }
  }, []);

  useEffect(() => {
    if (lat !== 0) dispatch(getPostcode(lat, lon));
  }, [dispatch, lon, lat]);

  const neighborhood = useSelector(selectArea);
  const postal = neighborhood?.postal;
  const selectedNeighborhood = useSelector(selectNeighborhood);
  console.log("sel", selectedNeighborhood);

  return (
    <div className="flex-auto">
      <p>Your current location is:</p>
      {`postal: ${neighborhood?.postal}
        city: ${neighborhood?.council}
        neighborhood: ${neighborhood?.neighborhood}`}
      <br></br>
      <br></br>
      <button
        type="button"
        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={(event: any) => dispatch(addNeighborhood(postal))}
      >
        Add this Neighborhood
      </button>
      <h4>Add neighborhood Manually</h4>
      <input
        type="text"
        value={zip}
        onChange={(e: any) => setZip(e.target.value)}
        placeholder="zip code"
      />
      <br></br>
      <button
        type="button"
        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={(e: any) => dispatch(getNeighborhood(zip))}
      >
        search
      </button>{" "}
      <button
        type="button"
        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={(e: any) => dispatch(addNeighborhood(zip))}
      >
        add
      </button>
      <div>
        city: {selectedNeighborhood.council}, neighborhood:{" "}
        {selectedNeighborhood.neighborhood}
      </div>
      {!lat ? (
        "Loading"
      ) : (
        <MapContainer
          center={[lat, lon]}
          zoom={15}
          scrollWheelZoom={true}
          style={{
            border: "2px solid",
            borderRadius: "10px",
            height: "30vw",
            width: "40vw",
            maxWidth: "500px",
            maxHeight: "400px",
            margin: "0px 19.5%",
          }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lon]}></Marker>
        </MapContainer>
      )}
    </div>
  );
};
