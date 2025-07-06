import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polyline,
  useMap,
} from "react-leaflet";
import { useMapData } from "./useMapData";
import { getPilotIcon, atcIcon } from "./icons";
import MapControls from "./MapControls";
import PilotPopup from "../../components/PilotPopUp";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getCircleStyleByFacility } from "../../utils/Constant";
import airports from "../../utils/airports.json";

// Fix Leaflet default icon path issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "",
  iconUrl: "",
  shadowUrl: "",
});

const FACILITY_MAP = {
  0: "Observer",
  1: "Clearance Delivery",
  2: "Ground",
  3: "Tower",
  4: "Approach",
  5: "Departure",
  6: "Center",
};

const MapView = () => {
  const { pilots, controllers } = useMapData();
  const [showPilots, setShowPilots] = useState(true);
  const [showAtc, setShowAtc] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredAtc, setHoveredAtc] = useState(null);
  const [tileTheme, setTileTheme] = useState("dark");
  const [routeCoords, setRouteCoords] = useState(null);

  const tileUrls = {
    light: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    satellite:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  };

  const tooltipRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const filteredPilots = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return pilots.filter((p) => {
      return (
        p.callsign?.toLowerCase().includes(q) ||
        p.cid?.toString().includes(q) ||
        p.flight_plan?.departure?.toLowerCase().includes(q) ||
        p.flight_plan?.arrival?.toLowerCase().includes(q)
      );
    });
  }, [pilots, searchQuery]);

  useEffect(() => {
    const moveTooltip = (e) => {
      mouseRef.current = { x: e.clientX + 15, y: e.clientY + 15 };
      if (tooltipRef.current) {
        tooltipRef.current.style.left = `${mouseRef.current.x}px`;
        tooltipRef.current.style.top = `${mouseRef.current.y}px`;
      }
    };

    window.addEventListener("mousemove", moveTooltip);
    return () => window.removeEventListener("mousemove", moveTooltip);
  }, []);

  const handlePopupOpen = (pilot) => {
    const depIcao = pilot.flight_plan?.departure?.toUpperCase();
    const arrIcao = pilot.flight_plan?.arrival?.toUpperCase();

    if (depIcao && arrIcao && airports[depIcao] && airports[arrIcao]) {
      const from = [airports[depIcao].lat, airports[depIcao].lon];
      const to = [airports[arrIcao].lat, airports[arrIcao].lon];
      setRouteCoords([from, to]);
    } else {
      setRouteCoords(null);
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <input
        type="text"
        placeholder="Search callsign, CID, ICAO..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 1000,
          padding: "8px 12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          width: "240px",
          fontSize: "14px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      />

      <MapControls
        showPilots={showPilots}
        setShowPilots={setShowPilots}
        showAtc={showAtc}
        setShowAtc={setShowAtc}
        pilotCount={pilots.length}
        atcCount={controllers.length}
        tileTheme={tileTheme}
        setTileTheme={setTileTheme}
      />

      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url={tileUrls[tileTheme]}
        />

        {/* Route Polyline */}
        {routeCoords && (
          <Polyline
            positions={routeCoords}
            pathOptions={{
              color: "lime",
              weight: 2.5,
              opacity: 0.8,
              dashArray: "5 8",
            }}
          />
        )}

        {/* Pilots */}
        {showPilots &&
          filteredPilots.map((pilot) => (
            <Marker
              key={`pilot-${pilot.cid}`}
              position={[pilot.latitude, pilot.longitude]}
              icon={getPilotIcon(pilot.heading)}
            >
              <Popup
                maxWidth={300}
                eventHandlers={{
                  add: () => handlePopupOpen(pilot),
                  remove: () => setRouteCoords(null),
                }}
              >
                <PilotPopup pilot={pilot} />
              </Popup>
            </Marker>
          ))}

        {/* ATC Controllers */}
        {showAtc &&
          controllers.map((atc) =>
            atc.latitude && atc.longitude ? (
              <React.Fragment key={`atc-${atc.cid}`}>
                <Marker position={[atc.latitude, atc.longitude]} icon={atcIcon}>
                  <Popup>
                    🎧 {atc.callsign}
                    <br />
                    Frequency: {atc.frequency}
                  </Popup>
                </Marker>

                <Circle
                  center={[atc.latitude, atc.longitude]}
                  radius={atc.visual_range * 1852}
                  eventHandlers={{
                    mouseover: () => setHoveredAtc(atc),
                    mouseout: () => setHoveredAtc(null),
                  }}
                  pathOptions={{
                    ...getCircleStyleByFacility(atc.facility),
                    fillOpacity: 0.15,
                    weight: 1.5,
                    dashArray: "4 2",
                  }}
                />
              </React.Fragment>
            ) : null
          )}
      </MapContainer>

      {/* Hover Tooltip */}
      <div
        ref={tooltipRef}
        style={{
          position: "fixed",
          display: hoveredAtc ? "block" : "none",
          background: "#fff",
          padding: "8px 10px",
          borderRadius: "6px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          fontSize: "12px",
          zIndex: 2000,
          pointerEvents: "none",
          maxWidth: "240px",
          lineHeight: "1.4",
          color: "#333",
        }}
      >
        {hoveredAtc && (
          <>
            <strong>🎧 {hoveredAtc.callsign || "N/A"}</strong>
            <br />
            Frequency: {hoveredAtc.frequency || "N/A"}
            <br />
            Facility: {FACILITY_MAP[hoveredAtc.facility] || "Unknown"}
            <br />
            Range: {(hoveredAtc.visual_range || "0") + " NM"}
            <br />
            CID: {hoveredAtc.cid || "N/A"}
          </>
        )}
      </div>
    </div>
  );
};

export default MapView;
