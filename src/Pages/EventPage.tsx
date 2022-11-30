import { getEvents } from "../store/event/thunk";
import { useAppDispatch } from "../store/hooks";
import { useState, useEffect } from "react";
import { createEvent } from "../store/event/thunk";
import { useSelector } from "react-redux";
import { selectEvents } from "../store/event/selector";
import { FormEvent } from "react";
import DatePicker from "react-date-picker";
import { EventCard, EventProps } from "../Components/EventCard";
import image from "./images/background4.jpg";
import Select from "react-select";

type OptionType = {
  id: number;
  value: string;
  label: string;
};

export const EventPage = () => {
  const options: OptionType[] = [
    { id: 0, value: "", label: "" },
    { id: 1, value: "Social interaction", label: "Social interaction" },
    { id: 2, value: "Sports and Exercise", label: "Sports and Exercise" },
    { id: 3, value: "Help and Support", label: "Help and Support" },
    { id: 4, value: "Social interaction", label: "Social interaction" },
    { id: 5, value: "Volunteer", label: "Volunteer" },
    { id: 6, value: "Goods and Services", label: "Goods and Services" },
    { id: 7, value: "Yoga & Spirituality", label: "Yoga & Spirituality" },
  ];

  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [houseNumber, setHouseNumber] = useState<number | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [showForm, setShowForm] = useState<boolean>(true);
  const [category, setCategory] = useState<number>();

  console.log("category", category);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (houseNumber !== null) {
      const newEvent = {
        title,
        description,
        imageUrl,
        street,
        houseNumber,
        zipCode,
        date,
      };
      dispatch(createEvent(newEvent));
    }
  };

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  const events = useSelector(selectEvents);
  console.log("events", events);

  return (
    <div
      style={{ backgroundImage: `url(${image}) `, backgroundSize: "cover" }}
      className="bg-center h-screen"
    >
      <div>
        <button
          className="inline-flex items-center px-3 ml-2 mt-2 mb-2 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={() => setShowForm(!showForm)}
        >
          {!showForm ? "Add Event" : "hide Form"}
        </button>
        {!showForm ? (
          ""
        ) : (
          <div>
            <div className="block p-6 ml-2 rounded-lg shadow-lg bg-white w-7/12 mb-6 content-center">
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                Add an event:
              </h5>
              <div className="flex row">
                <h3 className="mr-5">
                  Date:{" "}
                  <DatePicker
                    className="absolute"
                    onChange={setDate}
                    value={date}
                  />
                </h3>
                <h3 className="flex row">
                  <p>Select Category </p> {"   "}
                  <select
                    onChange={(e) => setCategory(parseInt(e.target.value))}
                    className="block border border-grey-light p-2 rounded mb-4 w-40 ml-2"
                  >
                    {options.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.value}
                      </option>
                    ))}
                  </select>
                </h3>
              </div>
              <br></br>
              <form onSubmit={handleSubmit}>
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
                      type="number"
                      value={houseNumber!}
                      onChange={(e: any) => setHouseNumber(e.target.value)}
                      placeholder="House Number"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Add Event
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      {!events
        ? "Loading"
        : showForm
        ? ""
        : events.map((item) => {
            return (
              <div className="flex-row">
                <EventCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  imageUrl={item.imageUrl}
                  description={item.description}
                  date={item.date}
                  latitude={item.latitude}
                  longitude={item.longtitude}
                />
              </div>
            );
          })}
    </div>
  );
};
