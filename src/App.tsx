import { Sign } from "crypto";
import React from "react";
import "./App.css";
import { getUserWithStoredToken } from "./store/user/thunk";
import { HomePage, SignupPage, LoginPage } from "./Pages";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { Routes, Route } from "react-router-dom";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
