import { selectUser } from "../store/user/selectors";
import { useAppDispatch } from "../store/hooks";
import { useSelector } from "react-redux";
import image from "./images/background6.jpg";

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  console.log("user", user);

  return (
    <div
      style={{ backgroundImage: `url(${image}) `, backgroundSize: "cover" }}
      className="bg-fixed"
    >
      <div className="min-h-screen flex justify-left items-left py-10 ml-10">
        <div className="w-64 h-64 rounded-xl bg-white flex flex-col shadow">
          <img
            className="w-auto rounded-t-xl"
            src={user?.profilePicture}
            alt="avatar"
          />
          <div className="text-center flex flex-col bg-white rounded-lg p-2">
            <span className="text-base font-bold">{user?.userName}</span>
            <span className="text-s">
              Name: {user?.firstName} {""} {user?.lastName}
            </span>
            <span className="text-s">
              Neighborhood:{user?.neighborhood.neighborhood}
            </span>
            <button className="inline-block px-6 py-2 mt-2 ml-2 border-2 border-teal-600 text-teal-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
              Change profile picture
            </button>
            <button className="inline-block px-6 py-2 mt-2 ml-2 border-2 border-teal-600 text-teal-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
              Change profile settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
