import { getEvents } from "../store/event/thunk";
import { useAppDispatch } from "../store/hooks";
import { useState, useEffect } from "react";
import { createEvent, getCategories } from "../store/event/thunk";
import { useSelector } from "react-redux";
import { selectEvents, selectCategories } from "../store/event/selector";
import { FormEvent } from "react";
import DatePicker from "react-date-picker";
import { EventCard } from "../Components/EventCard";
import image from "./images/background6.jpg";

export const EventPage = () => {
  const categories = useSelector(selectCategories);

  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [houseNumber, setHouseNumber] = useState<number | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [showForm, setShowForm] = useState<boolean>(false);
  const [category, setCategory] = useState<number>(0);
  const [filterCategory, setFilterCategory] = useState<number>(0);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getEvents());
  }, [dispatch]);

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
        category,
      };
      dispatch(createEvent(newEvent));
      setShowForm(!showForm);
    }
  };

  const events = useSelector(selectEvents);
  console.log("events", events);

  return (
    <div
      style={{ backgroundImage: `url(${image}) `, backgroundSize: "cover" }}
      className="bg-fixed"
    >
      <div>
        <div className="flex">
          <button
            className="inline-block px-6 py-2 mt-2 ml-2 border-2 border-teal-600 text-teal-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            onClick={() => setShowForm(!showForm)}
          >
            {!showForm ? "Add Event" : "hide Form"}
          </button>
        </div>

        {!showForm ? (
          ""
        ) : (
          <div>
            <div className="block p-6 ml-2 rounded-lg shadow-lg opacity-80 bg-white w-6/12 mb-6 content-center">
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
                    placeholder="Select Category"
                    className="block border border-grey-light p-2 rounded mb-4 w-40 ml-2"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
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
                  className="inline-block px-6 py-2 border-2 border-teal-600 text-teal-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                >
                  Add Event
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <h1 className="text-5xl text-center font-bold text-teal-700 mt-0 mb-6">
        Events
      </h1>
      {!events ? (
        "Loading"
      ) : showForm ? (
        ""
      ) : (
        <div className="flex flex-row flex-wrap justify-left">
          {events.map((item) => {
            return (
              <EventCard
                key={item.id}
                id={item.id}
                title={item.title}
                imageUrl={item.imageUrl}
                description={item.description}
                date={item.date}
                latitude={item.latitude}
                longitude={item.longtitude}
                categories={item.categories}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
