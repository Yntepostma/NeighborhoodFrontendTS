import { useEffect } from "react";
import { useMap, Marker } from "react-leaflet";
import * as L from "leaflet";

const MapController = ({
  lat,
  lon,
}: {
  lat: number | null;
  lon: number | null;
}) => {
  const LeafIcon = L.Icon.extend({
    options: {},
  });

  // @ts-ignore
  const greenIcon = new LeafIcon({
    iconUrl:
      "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-green.png?raw=true",
  });

  const map = useMap();
  useEffect(() => {
    if (lat !== null && lon !== null) {
      map.panTo([lat, lon]);
    }
  }, [lat, lon, map]);

  if (lat !== null && lon !== null) {
    return <Marker icon={greenIcon} position={[lat, lon]}></Marker>;
  }
  return <></>;
};

export default MapController;
