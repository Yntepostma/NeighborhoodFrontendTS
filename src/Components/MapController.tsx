import { useEffect } from "react";
import { useMap, Marker } from "react-leaflet";

const MapController = ({
  lat,
  lon,
}: {
  lat: number | null;
  lon: number | null;
}) => {
  const map = useMap();
  useEffect(() => {
    if (lat !== null && lon !== null) {
      map.panTo([lat, lon]);
    }
  }, [lat, lon, map]);

  if (lat !== null && lon !== null) {
    return <Marker position={[lat, lon]}></Marker>;
  }
  return <></>;
};

export default MapController;
