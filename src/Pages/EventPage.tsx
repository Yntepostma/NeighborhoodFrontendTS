import { getEvents } from "../store/event/thunk";
import { useAppDispatch } from "../store/hooks";
import { useState, useEffect } from "react";
import { getLatLong } from "../store/event/thunk";
import { useSelector } from "react-redux";
import { selectLatLong } from "../store/event/selector";

export const EventPage = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [zipCode, setZipCode] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [houseNumber, setHouseNumber] = useState<number>(0);

  const getLocation = () => {
    const location = dispatch(getLatLong({ zipCode, street, houseNumber }));
    console.log("location", location);
  };

  const latLong = useSelector(selectLatLong);

  useEffect(() => {
    if (latLong.lat !== 0) {
      setLatitude(latLong.lat);
      setLongitude(latLong.lon);
    }
  }, [latLong]);

  useEffect(() => {
    if (latLong.lat !== 0) {
      const newEvent = { title, description, imageUrl, latitude, longitude };
      console.log("newEvent", newEvent);
    }
  }, []);

  return (
    <div>
      <div>
        <div className="block p-6 rounded-lg shadow-lg bg-white w-4/6 mb-6 content-center">
          <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
            Add an event:
          </h5>

          <div className="text-gray-700 text-base mb-4">
            <div className="flex-row">
              <input
                className="block border border-grey-light p-2 rounded mb-4 w-40 ml-2"
                type="text"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                placeholder="Title"
              />
              <input
                className="block border border-grey-light p-2 rounded mb-4 w-40 ml-2"
                type="text"
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                placeholder="Description"
              />
              <input
                className="block border border-grey-light p-2 rounded mb-4 w-40 ml-2"
                type="text"
                value={imageUrl}
                onChange={(e: any) => setImageUrl(e.target.value)}
                placeholder="image url"
              />
            </div>
            <div className="flex row">
              <input
                className="block border border-grey-light p-2 rounded mb-4 w-40 ml-2"
                type="text"
                value={zipCode}
                onChange={(e: any) => setZipCode(e.target.value)}
                placeholder="Zip Code"
              />
              <input
                className="block border border-grey-light p-2 rounded mb-4 w-40 ml-2"
                type="text"
                value={street}
                onChange={(e: any) => setStreet(e.target.value)}
                placeholder="Street"
              />
              <input
                className="block border border-grey-light p-2 rounded mb-4 w-40 ml-2"
                type="text"
                value={houseNumber}
                onChange={(e: any) => setHouseNumber(e.target.value)}
                placeholder="House Number"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => getLocation()}
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Add Event
          </button>
        </div>
      </div>
      <h2>Events</h2>
      <button type="button" onClick={() => dispatch(getEvents())}>
        click
      </button>
    </div>
  );
};
