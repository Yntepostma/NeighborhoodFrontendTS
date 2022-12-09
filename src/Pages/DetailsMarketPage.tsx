import axios from "axios";
import { useAppDispatch } from "../store/hooks";
import { selectMarketPlaceById } from "../store/marketplace/selector";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import image from "./images/background6.jpg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { NavLink } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { apiUrl } from "../config";
import { createResponse } from "../store/marketplace/thunk";

export const DetailsMarketPage = () => {
  const getUser =
    (id: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      console.log("Hello");
      const response = await axios.get(`${apiUrl}/marketplaces/user/${id}`);
      console.log("response user", response.data.emailAddress);
    };

  const { id } = useParams();
  const intId: number = parseInt(id!);

  const [toggle, setToggle] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const dispatch = useAppDispatch();
  const marketplace = useSelector(selectMarketPlaceById(intId));
  const userName = marketplace?.user.userName;
  console.log("marketplace", marketplace);

  useEffect(() => {
    if (marketplace) {
      dispatch(getUser(marketplace.userId));
    }
  }, [marketplace]);

  const sendNewMessage = () => {};

  return (
    <div
      style={{ backgroundImage: `url(${image}) `, backgroundSize: "cover" }}
      className="bg-fixed h-screen"
    >
      <div className="inline-flex flex-col mt-28 items-center opacity-90 mb-5 ml-36 w-9/12 bg-white border rounded-lg shadow-md md:flex-row justify-between  hover:bg-gray-100 hover:opacity:75 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-fill h-44 ml-2 rounded-lg"
          src={marketplace?.imageUrl}
          alt={marketplace?.title}
        />
        <div className="flex flex-col justify-between  max-w-10 p-4 leading-normal">
          <h5 className="mb-2 text-2xl decoration-solid font-bold tracking-tight text-teal-700 dark:text-white">
            {marketplace?.title}
          </h5>
          <div>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {marketplace?.description}
            </p>

            {/* {marketplace?.categories.map((cat) => {
              return (
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {cat.name}
                </span>
              );
            })} */}
            <br></br>
            <br></br>
            <button
              onClick={() => setToggle(!toggle)}
              className="inline-block px-6 py-2 mt-2 ml-2 border-2 border-teal-600 text-teal-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              Respond
            </button>
            <button className="inline-block px-6 py-2 mt-2 ml-2 border-2 border-teal-600 text-teal-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
              Chat
            </button>
          </div>
        </div>
        {!marketplace ? (
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
          <div>
            <MapContainer
              center={[marketplace.latitude, marketplace.longtitude]}
              zoom={15}
              scrollWheelZoom={true}
              style={{
                height: "20vw",
                width: "25vw",
                borderTopRightRadius: "10%",
                borderBottomRightRadius: "10%",
              }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[marketplace.latitude, marketplace.longtitude]}
              ></Marker>
            </MapContainer>
          </div>
        )}
      </div>
      {toggle ? (
        <div className="block p-2 ml-36 rounded-lg text-teal-700 shadow-lg  bg-white w-6/12 mb-6 content-center">
          <strong>Leave a Message:</strong>
          <br></br>

          <input
            type="text"
            className="min-w-full h-12"
            placeholder="Your message"
            value={message}
            onChange={(e: any) => setMessage(e.target.value)}
          />
          <button
            onClick={() => {
              dispatch(createResponse(intId, message));
              setMessage("");
            }}
            className="inline-block px-6 py-2 mt-2 ml-2 border-2 border-teal-600 text-teal-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            send
          </button>
        </div>
      ) : !marketplace ? (
        ""
      ) : marketplace.responses.length > 0 ? (
        <div className="flex-col items-center opacity-90 ml-36 w-6/12 bg-white border rounded-lg shadow-md md:flex-row justify-between  hover:bg-gray-100 hover:opacity:75 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <p className="ml-2 text-teal-700">
            <strong className="text-teal-700">Responses: </strong>
          </p>
          {marketplace.responses.map((res) => {
            return (
              <div>
                <span className="ml-2">
                  <strong>{userName}</strong>
                </span>
                {""}
                <span className="ml-5" key={res.id}>
                  {res.response}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
