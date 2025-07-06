export const ICAO_TO_IATA = {
  AAL: "AA", // American Airlines
  ABW: "RU", // AirBridgeCargo Airlines
  ACA: "AC", // Air Canada
  AFL: "SU", // Aeroflot Russian Airlines
  AFR: "AF", // Air France
  AIC: "AI", // Air India
  AMX: "AM", // Aeromexico
  ANZ: "NZ", // Air New Zealand
  ASA: "AS", // Alaska Airlines
  ASQ: "EV", // ExpressJet Airlines
  AUA: "OS", // Austrian Airlines
  AZA: "AZ", // ITA Airways (formerly Alitalia)

  BAW: "BA", // British Airways
  BEL: "SN", // Brussels Airlines
  BER: "AB", // Air Berlin (defunct, for legacy)
  BMA: "BM", // bmi British Midland (defunct)
  BOX: "3S", // Aerologic
  BTI: "BT", // airBaltic

  CCA: "CA", // Air China
  CFG: "DE", // Condor
  CPA: "CX", // Cathay Pacific
  CRL: "H2", // Sky Airline
  CSN: "CZ", // China Southern
  CSH: "MU", // China Eastern
  CUB: "CU", // Cubana

  DAL: "DL", // Delta Air Lines
  DLH: "LH", // Lufthansa
  DKH: "DK", // Sunclass Airlines

  EIN: "EI", // Aer Lingus
  ETD: "EY", // Etihad Airways
  ETI: "ET", // Ethiopian Airlines
  EVA: "BR", // EVA Air

  FIN: "AY", // Finnair
  FDX: "FX", // FedEx Express
  FFT: "F9", // Frontier Airlines

  GIA: "GA", // Garuda Indonesia
  GLO: "G3", // Gol Transportes Aéreos

  HAL: "HA", // Hawaiian Airlines
  HDA: "HX", // Hong Kong Airlines
  HVN: "VN", // Vietnam Airlines

  IBS: "I2", // Iberia Express
  ICE: "FI", // Icelandair
  IBE: "IB", // Iberia
  IRA: "IR", // Iran Air
  IGO: "6E", // IndiGo

  JAL: "JL", // Japan Airlines
  JBU: "B6", // JetBlue Airways
  JAI: "9W", // Jet Airways (India, defunct)
  JZR: "J9", // Jazeera Airways

  KAC: "KU", // Kuwait Airways
  KAL: "KE", // Korean Air
  KLM: "KL", // KLM Royal Dutch Airlines
  KZR: "KC", // Air Astana

  LAN: "LA", // LATAM Airlines
  LDY: "LD", // Level
  LOT: "LO", // LOT Polish Airlines
  LRC: "LR", // Lacsa

  MAS: "MH", // Malaysia Airlines
  MDA: "YM", // Montenegro Airlines
  MEA: "ME", // Middle East Airlines
  MON: "ZB", // Monarch Airlines (defunct)
  MSR: "MS", // EgyptAir
  MXD: "MX", // Mexicana (defunct)

  NAX: "DY", // Norwegian Air Shuttle
  NKS: "NK", // Spirit Airlines
  NWA: "NW", // Northwest Airlines (defunct)

  OHY: "8Q", // Onur Air (defunct)
  OMA: "WY", // Oman Air

  PAL: "PR", // Philippine Airlines
  PGT: "PC", // Pegasus Airlines
  PIA: "PK", // Pakistan International Airlines

  QFA: "QF", // Qantas
  QTR: "QR", // Qatar Airways

  RAM: "AT", // Royal Air Maroc
  RJA: "RJ", // Royal Jordanian
  RYR: "FR", // Ryanair

  SAS: "SK", // Scandinavian Airlines
  SBI: "S7", // S7 Airlines
  SDM: "5N", // Severstal Aircompany
  SIA: "SQ", // Singapore Airlines
  SVA: "SV", // Saudia
  SWR: "LX", // SWISS
  SWA: "WN", // Southwest Airlines

  TAM: "JJ", // LATAM Brasil (formerly TAM)
  TAP: "TP", // TAP Air Portugal
  THA: "TG", // Thai Airways
  THT: "TN", // Air Tahiti Nui
  THY: "TK", // Turkish Airlines
  TRA: "HV", // Transavia

  UAE: "EK", // Emirates
  UAL: "UA", // United Airlines
  UPS: "5X", // UPS Airlines
  UZB: "HY", // Uzbekistan Airways

  VIR: "VS", // Virgin Atlantic
  VLG: "VY", // Vueling Airlines
  VOZ: "VA", // Virgin Australia
  VDA: "VI", // Volga-Dnepr Airlines
  VTI: "UK", // Volga-Dnepr Airlines

  WZZ: "W6", // Wizz Air
  WOW: "WW", // WOW Air (defunct)

  YZR: "Y9", // YTO Cargo Airlines
};

export const getCircleStyleByFacility = (facility) => {
  switch (facility) {
    case 1: // Delivery
      return { color: "#6c757d", fillColor: "#adb5bd" };
    case 2: // Ground
      return { color: "#198754", fillColor: "#71d6a1" };
    case 3: // Tower
      return { color: "#fd7e14", fillColor: "#ffc078" };
    case 4: // Approach
      return { color: "#0d6efd", fillColor: "#74c0fc" };
    case 5: // Departure
      return { color: "#6f42c1", fillColor: "#d0bfff" };
    case 6: // Center
      return { color: "#d63384", fillColor: "#f783ac" };
    default: // Unknown
      return { color: "#adb5bd", fillColor: "#dee2e6" };
  }
};

export const fallback = {
  FALLBACK_LOGO: "https://cdn-icons-png.flaticon.com/512/194/194938.png",
};

export const MAP_UTIL = {
  AIRLINE_LOGO_URL:
    "https://images.daisycon.io/airline/?width=100&height=70&color=ffffff&iata=:iata",
};
