import { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { googleApiKey } from "../config";

export type Location = {
  lat: number;
  lng: number;
};

export const MapLocation = () => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: `${googleApiKey}` });

  return (
    <div>
      {!isLoaded ? (
        "loading..."
      ) : (
        <GoogleMap
          zoom={10}
          center={{ lat: 5, lng: 40 }}
          mapContainerClassName="h-full"
        />
      )}
    </div>
  );
};
