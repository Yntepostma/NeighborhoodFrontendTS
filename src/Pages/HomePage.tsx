import { useDispatch } from "react-redux";
import { useAppDispatch } from "../store/hooks";
import { useEffect, useState } from "react";
import { getNeighborhood } from "../store/neighborhood/thunk";
import { Neighborhood } from "../store/neighborhood/thunk";
import { RootState } from "../store";
import { Middleware } from "@reduxjs/toolkit";

export const HomePage = () => {
  const dispatch = useAppDispatch();

  const postal: string = "1057PG";

  useEffect(() => {
    dispatch(getNeighborhood(postal));
  });

  return (
    <div>
      <h1>Homepage</h1>
    </div>
  );
};
