import { useState, useEffect, FormEvent } from "react";
import { NavLink } from "react-router-dom";
import { User } from "../store/user/slice";
import { useAppDispatch } from "../store/hooks";
import { signUp } from "../store/user/thunk";
import "../App.css";
import image from "./images/background.jpg";
import { selectToken } from "../store/user/selectors";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);

  //   useEffect(() => {
  //     if (token !== null) {
  //       navigate("/");
  //     }
  //   }, [token, navigate]);

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      userName,
      firstName,
      lastName,
      emailAddress,
      password,
    };
    dispatch(signUp(newUser));
    setUserName("");
    setFirstName("");
    setLastName("");
    setEmailAddress("");
    setPassword("");
  };

  return (
    <div style={{ backgroundImage: `url(${image}) `, backgroundSize: "cover" }}>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-20 ">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h3 className="mb-8 text-3xl text-center">Sign up</h3>

            <form onSubmit={handleSubmit}>
              <input
                className="block border border-grey-light w-full p-2 rounded mb-4"
                type="text"
                placeholder="user name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                className="block border border-grey-light w-full p-2 rounded mb-4"
                type="text"
                placeholder="first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="block border border-grey-light w-full p-2 rounded mb-4"
                type="text"
                placeholder="last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                className="block border border-grey-light w-full p-2 rounded mb-4"
                type="text"
                placeholder="email address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
              <input
                className="block border border-grey-light w-full p-2 rounded mb-4"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="block border w-full text-center py-3 rounded bg-green-700 text-white hover:bg-green-dark focus:outline-none my-1"
                type="submit"
              >
                Create Account
              </button>
            </form>
            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Terms of Service
              </a>{" "}
              and
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="text-white mt-6">
            Already have an account?
            <NavLink
              to="/login"
              className="no-underline border-b border-blue text-white"
            >
              Log in
            </NavLink>
            .
          </div>
        </div>
      </div>
    </div>
  );
};
