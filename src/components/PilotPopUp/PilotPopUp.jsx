import React, { useState } from "react";
import { fallback, ICAO_TO_IATA, MAP_UTIL } from "../../utils/Constant";
import styles from "./PilotPopup.module.css";

const labelStyle = {
  fontWeight: 500,
  color: "#555",
  marginRight: "6px",
};

const valueStyle = {
  fontWeight: 600,
};

const lineStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "13px",
  marginBottom: "4px",
};

const sectionStyle = {
  marginBottom: "8px",
};

const fallbackLogo = fallback.FALLBACK_LOGO;

const PilotPopup = ({ pilot }) => {
  if (!pilot) return null;

  const fp = pilot.flight_plan || {};
  const icao = pilot.callsign?.slice(0, 3)?.toUpperCase() || "";
  const iata = ICAO_TO_IATA[icao];
  const airlineLogo = iata
    ? MAP_UTIL.AIRLINE_LOGO_URL.replace(":iata", iata)
    : fallbackLogo;

  const [logoError, setLogoError] = useState(false);

  const getETA = () => {
    const enroute = fp.enroute_time;
    const logonTime = pilot.logon_time;

    if (!enroute || !logonTime) return null;

    const match = enroute.match(/^(\d{2})(\d{2})$/);
    if (!match) return null;

    const [_, hh, mm] = match;
    const durationMs = (+hh * 60 + +mm) * 60 * 1000;

    const departureTime = new Date(logonTime);
    const eta = new Date(departureTime.getTime() + durationMs);

    const now = new Date();
    const remainingMs = eta - now;

    if (remainingMs <= 0) return null;

    const remHours = Math.floor(remainingMs / 3600000);
    const remMinutes = Math.floor((remainingMs % 3600000) / 60000);

    return {
      utcTime: eta.toUTCString().slice(17, 22), // HH:MM
      remaining: `in ${remHours}h ${remMinutes}m`,
    };
  };

  const eta = getETA();

  return (
    <div style={{ fontSize: "13px", lineHeight: "1.4", maxWidth: "100%" }}>
      <div
        style={{
          ...sectionStyle,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <img
          src={logoError ? fallbackLogo : airlineLogo}
          alt="Airline"
          className={styles.airlineLogo}
          onError={() => setLogoError(true)}
        />
        <div>
          <strong style={{ fontSize: "14px" }}>✈ {pilot.callsign}</strong>
          <br />
          <span style={{ color: "gray", fontSize: "11px" }}>
            CID: {pilot.cid} {pilot.name}
          </span>
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={lineStyle}>
          <span style={labelStyle}>Route:</span>
          <span style={valueStyle}>
            {fp.departure || "N/A"} → {fp.arrival || "N/A"}
          </span>
        </div>

        <div style={lineStyle}>
          <span style={labelStyle}>Aircraft:</span>
          <span style={valueStyle}>{fp.aircraft_short || "N/A"}</span>
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={lineStyle}>
          <span style={labelStyle}>Alt:</span>
          <span style={valueStyle}>{pilot.altitude} ft</span>
        </div>

        <div style={lineStyle}>
          <span style={labelStyle}>Spd:</span>
          <span style={valueStyle}>{pilot.groundspeed} kts</span>
        </div>

        <div style={lineStyle}>
          <span style={labelStyle}>Hdg:</span>
          <span style={valueStyle}>{pilot.heading}°</span>
        </div>

        <div style={lineStyle}>
          <span style={labelStyle}>Squawk:</span>
          <span style={valueStyle}>{pilot.transponder || "N/A"}</span>
        </div>

        {eta && (
          <>
            <div style={lineStyle}>
              <span style={labelStyle}>ETA:</span>
              <span style={valueStyle}>{eta.utcTime} UTC</span>
            </div>
            <div style={lineStyle}>
              <span style={labelStyle}>Remaining:</span>
              <span style={valueStyle}>{eta.remaining}</span>
            </div>
          </>
        )}
      </div>

      {fp.route && (
        <div style={{ fontSize: "12px" }}>
          <strong>🗺️ Route:</strong>
          <br />
          <textarea
            readOnly
            value={fp.route}
            rows={3}
            style={{
              width: "100%",
              fontSize: "11px",
              fontFamily: "monospace",
              resize: "none",
              overflow: "auto",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "4px",
              marginTop: "4px",
              backgroundColor: "#f9f9f9",
              color: "#333",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PilotPopup;
