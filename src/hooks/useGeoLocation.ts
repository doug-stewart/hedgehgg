import { useState } from "react";
import { LATITUDE, LONGITUDE } from "../config";

type Geolocation = null | {
  latitude: number;
  longitude: number;
};

export const useGeoLocation = () => {
  const [geolocation, setGeolocation] = useState<Geolocation>(null);

  if (geolocation === null) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeolocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setGeolocation({
          latitude: LATITUDE,
          longitude: LONGITUDE,
        });
      },
    );
  }

  return geolocation;
};
