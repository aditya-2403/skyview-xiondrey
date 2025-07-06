import L from "leaflet";

// ATC icon (static)
export const atcIcon = new L.DivIcon({
  html: `<div style="background: #2c3e50; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; justify-content: center; align-items: center;">🎧</div>`,
  className: "",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Function to generate a rotated pilot icon based on heading
export const getPilotIcon = (heading = 0) => {
  return new L.DivIcon({
    html: `<img src="https://i.ibb.co/4wnzDh7K/plane-1.png"
                style="transform: rotate(${
                  (heading + 360) % 360
                }deg); width: 25px; height: 25px;" />`,
    className: "",
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};
