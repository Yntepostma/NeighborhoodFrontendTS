import { useState, useEffect, FormEvent } from "react";
import { useSelector } from "react-redux";
import image from "./images/background.jpg";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/user/thunk";
import { useNavigate } from "react-router-dom";
import { selectToken } from "../store/user/selectors";

export interface Login {
  emailAddress: string;
  password: string;
}

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const loginDetails: Login = {
      emailAddress,
      password,
    };
    dispatch(login(loginDetails));
    setEmailAddress("");
    setPassword("");
  };

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${image}) `, backgroundSize: "cover" }}
      >
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <h2>Welcome to NeighborHooD</h2>
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-20 ">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h3 className="mb-8 text-2xl text-center">Log in</h3>

              <form onSubmit={handleSubmit}>
                <input
                  className="block border border-grey-light w-full p-2 rounded mb-4"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className="block border border-grey-light w-full p-2 rounded mb-4"
                  type="text"
                  placeholder="email address"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />

                <button
                  className="block border w-full text-center py-3 rounded bg-green-700 text-white hover:bg-green-dark focus:outline-none my-1"
                  type="submit"
                >
                  Log in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
