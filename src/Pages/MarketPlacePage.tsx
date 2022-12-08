import { getMarketPlaces } from "../store/marketplace/thunk";
import { useAppDispatch } from "../store/hooks";
import { useState, useEffect } from "react";
import { getCategories } from "../store/event/thunk";
import { createMarketPlace } from "../store/marketplace/thunk";
import { useSelector } from "react-redux";
import { selectCategories } from "../store/event/selector";
import { selectMarketPlaces } from "../store/marketplace/selector";
import { FormEvent } from "react";
import { MarketPlaceCard } from "../Components";
import image from "./images/background6.jpg";

export const MarketPlacePage = () => {
  const categories = useSelector(selectCategories);

  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [houseNumber, setHouseNumber] = useState<number | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [category, setCategory] = useState<number>(0);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getMarketPlaces());
  }, [dispatch]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (houseNumber !== null) {
      const newMarketPlace = {
        title,
        description,
        imageUrl,
        street,
        houseNumber,
        zipCode,
        category,
      };
      dispatch(createMarketPlace(newMarketPlace));
    }
  };

  const marketplaces = useSelector(selectMarketPlaces);
  console.log("marketplaces", marketplaces);

  return (
    <div
      style={{ backgroundImage: `url(${image}) `, backgroundSize: "cover" }}
      className="bg-fixed"
    >
      <div>
        <button
          className="inline-block px-6 py-2 mt-2 ml-2 border-2 border-teal-600 text-teal-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          onClick={() => setShowForm(!showForm)}
        >
          {!showForm ? "Add Item" : "hide Form"}
        </button>

        {!showForm ? (
          ""
        ) : (
          <div>
            <div className="block p-6 ml-2 rounded-lg opacity-80 shadow-lg bg-white w-6/12 mb-6 content-center">
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                Add an item to Market Place:
              </h5>
              <div className="flex row">
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
                  Add Item
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <h1 className="text-5xl text-center font-bold text-teal-700 mt-0 mb-6">
        Market Place
      </h1>
      {!marketplaces ? (
        "Loading"
      ) : showForm ? (
        ""
      ) : (
        <div className="flex flex-row flex-wrap justify-between">
          {marketplaces.map((item) => {
            return (
              <div>
                <MarketPlaceCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  imageUrl={item.imageUrl}
                  description={item.description}
                  latitude={item.latitude}
                  longitude={item.longtitude}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
