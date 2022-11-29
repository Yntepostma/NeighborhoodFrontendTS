import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { useEffect, useState } from "react";
import { getNeighborhood } from "../store/neighborhood/thunk";
import { Neighborhood } from "../store/neighborhood/thunk";
import { RootState } from "../store";
import { Middleware } from "@reduxjs/toolkit";
import { selectToken } from "../store/user/selectors";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  console.log(token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      <h1>Homepage</h1>
    </div>
  );
};
