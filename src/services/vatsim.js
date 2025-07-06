export const fetchVatsimData = async () => {
  const url = "https://data.vatsim.net/v3/vatsim-data.json";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch VATSIM data");
  return res.json();
};
