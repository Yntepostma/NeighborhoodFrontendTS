import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getPostcode,
  addNeighborhood,
  getLatLongSignUp,
} from "../store/user/thunk";
import { getNeighborhood } from "../store/neighborhood/thunk";
import { selectLatLongSignUp, selectToken } from "../store/user/selectors";
import { selectNeighborhood } from "../store/neighborhood/selector";
import { useAppDispatch } from "../store/hooks";
import image from "./images/background6.jpg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import { selectArea } from "../store/user/selectors";
import MapController from "../Components/MapController";

export const SelectNeighborhood = () => {
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [lat, setLat] = useState<number>(0);
  const [lon, setLon] = useState<number>(0);
  const [lon2, setLon2] = useState<number | null>(null);
  const [lat2, setLat2] = useState<number | null>(null);
  // const [latLon2, setLatLon2] = useState<{lat: number, lon: number} | null>(null)
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
    if (lat !== 0) {
      dispatch(getPostcode(lat, lon));
    }
  }, [dispatch, lon, lat]);

  const neighborhood = useSelector(selectArea);
  const postal = neighborhood?.postal;
  const selectedNeighborhood = useSelector(selectNeighborhood);
  const latLong = useSelector(selectLatLongSignUp);

  useEffect(() => {
    if (latLong.lat !== 0) {
      setLat2(latLong.lat);
      setLon2(latLong.lng);
    }
  }, [latLong.lat, latLong.lng]);

  return (
    <div
      style={{
        backgroundImage: `url(${image}) `,
        backgroundSize: "cover",
      }}
      className="bg-fixed h-screen"
    >
      <div className="flex justify-around">
        <div className="flex-wrap mt-6">
          {!lat ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
              zoom={15}
              scrollWheelZoom={true}
              style={{
                border: "solid 2px white",
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
              <Marker position={[lat, lon]}></Marker>
              <MapController lat={lat2} lon={lon2} />
            </MapContainer>
          )}
        </div>
        <div className="flex-col mt-6">
          <div>
            <div className="block p-10 rounded-lg opacity-75 shadow-lg bg-white w-4/6 mb-6 content-center">
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                Your current location is:
              </h5>
              <p className="text-gray-700 text-base mb-4">
                {`Postal: ${neighborhood?.postal} ${""}
                  City: ${neighborhood?.council}
                  Neighborhood: ${neighborhood?.neighborhood}`}
                <br></br>
              </p>
              <NavLink to="/">
                <button
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={(event: any) => dispatch(addNeighborhood(postal))}
                >
                  Add this Neighborhood
                </button>
              </NavLink>
            </div>
          </div>

          <div>
            <div className="block p-6 rounded-lg shadow-lg opacity-80 bg-white w-4/6">
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                Add neighborhood manually
              </h5>
              <p className="text-gray-700 text-base mb-4">
                <input
                  className="block border border-grey-light p-2 rounded mb-4 w-40 ml-2"
                  type="text"
                  value={zip}
                  onChange={(e: any) => setZip(e.target.value)}
                  placeholder="zip code"
                />
                <div>
                  <button
                    type="button"
                    className="ml-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={(e: any) => {
                      dispatch(getNeighborhood(zip));
                      dispatch(getLatLongSignUp(zip));
                    }}
                  >
                    search
                  </button>{" "}
                  <NavLink to="/">
                    <button
                      type="button"
                      className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      onClick={(e: any) => dispatch(addNeighborhood(zip))}
                    >
                      add
                    </button>
                  </NavLink>
                  <br></br>
                  {selectedNeighborhood.council === ""
                    ? ""
                    : `${"   "}
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
