import { NavLink } from "react-router-dom";
import { deleteMarketPlace } from "../store/marketplace/thunk";
import { useAppDispatch } from "../store/hooks";
import { selectUser } from "../store/user/selectors";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import moment from "moment";

export type MarketPlaceProps = {
  title: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  id: number;
};

export const MarketPlaceCard = ({
  id,
  title,
  description,
  imageUrl,
  latitude,
  longitude,
}: MarketPlaceProps) => {
  const dispatch = useAppDispatch();

  const user = useSelector(selectUser);

  return (
    <div className="p-10">
      <div className="w-80 rounded overflow-hidden opacity-90 shadow-md">
        <img className="w-80 h-64" src={imageUrl} alt="Mountain" />
        <div className="px-6 bg-white py-4">
          <div className="font-bold bg-white text-xl">{title}</div>
          <br></br>
          <NavLink to={`${id}`}>
            <button className="inline-block px-6 py-2 mt-2 ml-2 border-2 border-teal-600 text-teal-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
              Details
            </button>
          </NavLink>
        </div>
        {/* <div className="px-6 pt-4 h-24 bg-white pb-2">
          {categories.map((cat) => {
            return (
              <span className="inline-flex bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {cat.name}
              </span>
            );
          })}
          <br></br>
        </div> */}
      </div>
    </div>
  );
};
