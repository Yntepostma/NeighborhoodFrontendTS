import { useEffect, useState } from "react";
import { getPostcode, addNeighborhood, getLatLong } from "../store/user/thunk";
import { getNeighborhood } from "../store/neighborhood/thunk";
import { selectLatLong } from "../store/user/selectors";
import { selectNeighborhood } from "../store/neighborhood/selector";
import { useAppDispatch } from "../store/hooks";
import { useMap } from "react-leaflet";
import image from "./images/backgroundpattern3.jpg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import { selectArea } from "../store/user/selectors";

export const SelectNeighborhood = () => {
  const dispatch = useAppDispatch();
  const [lat, setLat] = useState<number>(0);
  const [lon, setLon] = useState<number>(0);
  const [lon2, setLon2] = useState<number>(0);
  const [lat2, setLat2] = useState<number>(0);
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
  const latLong = useSelector(selectLatLong);

  useEffect(() => {
    if (latLong) {
      setLat2(latLong.lat);
      setLon2(latLong.lng);
    }
  }, []);

  return (
    <div className="bg-teal-50 h-screen">
      <div className="flex justify-around">
        <div className="flex-wrap mt-6">
          {!lat ? (
            "Loading"
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
        <div className="flex-col mt-6">
          <div>
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm mb-6">
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                Your current location is:
              </h5>
              <p className="text-gray-700 text-base mb-4">
                {`Postal: ${neighborhood?.postal} ${""}
                  City: ${neighborhood?.council}
                  Neighborhood: ${neighborhood?.neighborhood}`}
                <br></br>
              </p>
              <button
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={(event: any) => dispatch(addNeighborhood(postal))}
              >
                Add this Neighborhood
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                Add neighborhood manually
              </h5>
              <p className="text-gray-700 text-base mb-4">
                <input
                  className="block border border-grey-light p-2 rounded mb-4 w-40 ml-5"
                  type="text"
                  value={zip}
                  onChange={(e: any) => setZip(e.target.value)}
                  placeholder="zip code"
                />
                <div>
                  <button
                    type="button"
                    className="ml-5 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={(e: any) => {
                      dispatch(getNeighborhood(zip));
                      dispatch(getLatLong("4823HE"));
                    }}
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
                  {""}
                  {!selectedNeighborhood
                    ? ""
                    : `
        City: ${selectedNeighborhood.council}, Neighborhood:${" "}
        ${selectedNeighborhood.neighborhood}`}
                  {""}
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
