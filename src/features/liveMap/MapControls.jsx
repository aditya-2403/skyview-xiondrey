import React from "react";

const MapControls = ({
  showPilots,
  setShowPilots,
  showAtc,
  setShowAtc,
  pilotCount = 0,
  atcCount = 0,
  tileTheme,
  setTileTheme,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: 20,
        background: "#fff",
        padding: "14px 18px",
        borderRadius: "12px",
        zIndex: 1000,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        fontSize: "14px",
        width: "220px",
        fontFamily: "system-ui, sans-serif",
        transition: "all 0.2s ease-in-out",
        color: "black",
      }}
    >
      <div style={{ marginBottom: "12px", fontWeight: 700, fontSize: "15px" }}>
        🗺️ Live Map Controls
      </div>

      <label
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <span>✈️ Show Pilots</span>
        <input
          type="checkbox"
          checked={showPilots}
          onChange={() => setShowPilots(!showPilots)}
        />
      </label>

      <label
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <span>🎧 Show ATC</span>
        <input
          type="checkbox"
          checked={showAtc}
          onChange={() => setShowAtc(!showAtc)}
        />
      </label>

      <div style={{ marginBottom: "10px" }}>
        <label
          htmlFor="tile-theme"
          style={{ fontWeight: 600, display: "block", marginBottom: "4px" }}
        >
          🧱 Map Theme
        </label>
        <select
          id="tile-theme"
          value={tileTheme}
          onChange={(e) => setTileTheme(e.target.value)}
          style={{
            width: "100%",
            padding: "4px 6px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "13px",
          }}
        >
          <option value="light">🗺️ Light</option>
          <option value="dark">🌙 Dark</option>
          <option value="satellite">🛰️ Satellite</option>
        </select>
      </div>

      <div
        style={{
          borderTop: "1px solid #eee",
          paddingTop: "10px",
          fontSize: "13px",
          color: "#555",
          lineHeight: 1.5,
        }}
      >
        <div>
          🧑‍✈️ Pilots Online: <strong>{pilotCount}</strong>
        </div>
        <div>
          🛰️ ATC Online: <strong>{atcCount}</strong>
        </div>
      </div>
    </div>
  );
};

export default MapControls;
