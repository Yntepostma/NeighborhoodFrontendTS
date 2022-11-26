import React from "react";
import { useRef, useState, useEffect } from "react";

export const Maps: React.FC<{}> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);
  return <div ref={ref}></div>;
};
