import { useEffect, useState } from "react";
import airports from "../../utils/airports.json";

export const useMapData = () => {
  const [pilots, setPilots] = useState([]);
  const [controllers, setControllers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://data.vatsim.net/v3/vatsim-data.json");
      const data = await res.json();

      setPilots(data.pilots || []);

      const mappedAtc = (data.controllers || [])
        .map((c) => {
          if (
            typeof c.latitude === "number" &&
            typeof c.longitude === "number"
          ) {
            return c; // already has coordinates
          }

          const icao = c.callsign?.split("_")[0]?.toUpperCase();
          const airport = airports[icao];

          if (airport && airport.lat && airport.lon) {
            return {
              ...c,
              latitude: airport.lat,
              longitude: airport.lon,
            };
          }

          return null; // discard if no fallback coords found
        })
        .filter(Boolean);
      setControllers(mappedAtc);
    };

    fetchData();
    const interval = setInterval(fetchData, 15000);

    return () => clearInterval(interval);
  }, []);

  return { pilots, controllers };
};
