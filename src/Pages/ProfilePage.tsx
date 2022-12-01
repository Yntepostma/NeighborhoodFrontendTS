import { selectUser } from "../store/user/selectors";
import { useAppDispatch } from "../store/hooks";
import { useSelector } from "react-redux";
import image from "./images/background4.jpg";

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  console.log("user", user);

  return (
    <div className=" bg-teal-100 bg-scroll">
      <div className="min-h-screen flex justify-left items-left py-10 ml-10">
        <div className="w-48 h-64 rounded-xl bg-white flex flex-col shadow">
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
              Neighborhood: {user?.neighborhood.neighborhood}
            </span>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Change profile picture
            </button>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Change profile settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
