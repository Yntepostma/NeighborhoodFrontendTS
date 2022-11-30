import { Sign } from "crypto";
import React from "react";
import "./App.css";
import { getUserWithStoredToken } from "./store/user/thunk";
import {
  HomePage,
  SignupPage,
  LoginPage,
  SelectNeighborhood,
  EventPage,
  DetailsEventPage,
  ProfilePage,
} from "./Pages";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "./Components";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/select" element={<SelectNeighborhood />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/events/:id" element={<DetailsEventPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
