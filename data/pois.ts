import React from "react";
import L from "leaflet";
import { IconType } from "react-icons"; // Import IconType
import ReactDOMServer from "react-dom/server"; // Import for server-side rendering icons to string
import {
  FaCaravan, // Camper
  FaTaxi, // Taxi
  FaUtensils, // Restaurant
  FaGlassMartiniAlt, // Bar
  FaBed, // Hotel
  FaCampground, // Private Accommodation (Tent/Rooms)
  FaTshirt, // Clothing
  FaLandmark, // *** ADDED for Bank ***
  FaStar, // *** ADDED for Activity ***
} from "react-icons/fa"; // Example icons from react-icons
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"; // Fallback Heroicon

// Define POI Types (ensure consistency)
export type PoiType =
  | "camper"
  | "taxi"
  | "restaurant"
  | "bar"
  | "hotel"
  | "private_accommodation"
  | "clothing"
  | "bank"
  | "activity";

// Define the structure for each POI
export interface POI {
  id: number;
  name: string;
  type: PoiType;
  coordinates: L.LatLngExpression; // [latitude, longitude]
  address?: string;
  phone?: string;
  website?: string;
  shortDescription: string;
  details: string; // Longer description for the full page/modal (Italian default)
  iconUrl?: string; // Optional: specific icon override
  // --- NEW Fields ---
  images?: string[]; // Array of image URLs (use relative paths from /public)
  openingHours?: string; // String for now, can be more structured later
  discountInfo?: string;
  tags?: string[];
  // --- NEW Language Fields ---
  name_en?: string;
  shortDescription_en?: string;
  details_en?: string; // English details
  openingHours_en?: string;
  discountInfo_en?: string;
  partyInfo_en?: string;
  partyHours_en?: string;
  // --- Party Info Fields ---
  partyInfo?: string; // e.g., "DJ Set Electro / House"
  partyHours?: string; // e.g., "Ven/Sab: 22:00 - 03:00"
}

// --- Updated POI Data ---
export const poiData: POI[] = [
  {
    id: 1,
    name: "Area Camper Stadio",
    type: "camper",
    coordinates: [45.57, 8.05],
    shortDescription: "Area attrezzata per camper vicino allo stadio.",
    details:
      "Ampia area camper attrezzata con servizi base (acqua, scarico). Prenotazione consigliata durante l'evento. Vicina ai punti navetta.",
    address: "Via Stadio, Biella",
    tags: ["Camper", "Servizi Base", "Stadio"],
    name_en: "Stadium Camper Area",
    shortDescription_en: "Equipped camper area near the stadium.",
    details_en:
      "Large equipped camper area with basic services (water, drainage). Booking recommended during the event. Close to shuttle points.",
  },
  {
    id: 2,
    name: "Ristorante Alpino",
    type: "restaurant",
    coordinates: [45.565, 8.055],
    shortDescription: "Cucina tipica piemontese.",
    details:
      "Offre menù speciali per l'Adunata. Specialità polenta concia e bagna cauda. Ampia sala, consigliata prenotazione.",
    address: "Via Italia 50, Biella",
    phone: "015 123456",
    website: "https://ristorantealpino.example.com",
    openingHours: "Mar-Dom: 12:00-14:30, 19:00-22:30; Lun: Chiuso",
    tags: ["Piemontese", "Tradizionale", "Polenta", "Prenotazione"],
    name_en: "Alpino Restaurant",
    shortDescription_en: "Typical Piedmontese cuisine.",
    details_en:
      "Offers special menus for the Adunata. Specialties include polenta concia and bagna cauda. Large dining room, booking recommended.",
    openingHours_en: "Tue-Sun: 12:00-14:30, 19:00-22:30; Mon: Closed",
  },
  {
    id: 20, // Example ID for Glamour
    name: "Glamour Biella",
    type: "bar", // Could also be restaurant depending on focus
    coordinates: [45.5645, 8.057], // Please adjust coordinates
    shortDescription: "Cocktail bar e ristorante moderno.",
    details:
      "Locale trendy nel centro di Biella, perfetto per aperitivi, cene e serate. Ampia selezione di cocktail e vini. Cucina ricercata con opzioni vegetariane.",
    address: "Via Umberto I, 20, Biella", // Example address
    phone: "015 987654",
    website: "https://glamourbiella.example.com",
    images: ["/images/glamour1.jpg"],
    openingHours:
      "Mar-Gio: 18:00-01:00\nVen-Sab: 18:00-02:30\nDom: 18:00-00:00\nLun: Chiuso",
    discountInfo:
      "Sconto 10% per tesserati ANA (esclusi eventi speciali e Sabato sera).",
    partyInfo: "DJ Set Elettronica/House",
    partyHours: "Ven/Sab: 22:30 - 02:30",
    tags: ["Cocktail", "Aperitivo", "Cena", "Moderno", "Musica", "Vegetariano"],
    // --- EN Fields Added ---
    name_en: "Glamour Biella",
    shortDescription_en: "Modern cocktail bar and restaurant.",
    details_en:
      "Trendy venue in the center of Biella, perfect for aperitifs, dinners, and evenings out. Wide selection of cocktails and wines. Refined cuisine with vegetarian options.",
    openingHours_en:
      "Tue-Thu: 18:00-01:00\nFri-Sat: 18:00-02:30\nSun: 18:00-00:00\nMon: Closed",
    discountInfo_en:
      "10% discount for ANA members (excluding special events and Saturday nights).",
    partyInfo_en: "DJ Set Electronic/House",
    partyHours_en: "Fri/Sat: 22:30 - 02:30",
  },
  {
    id: 30, // Example ID for Bank
    name: "Banca Sella Biella Centro",
    type: "bank", // Use the new type
    coordinates: [45.566, 8.053], // Adjust coordinates
    shortDescription: "Sportello Bancomat e filiale.",
    details:
      "Filiale Banca Sella con sportello ATM accessibile H24. Consulenza su appuntamento.",
    address: "Via Pietro Micca, 10, Biella",
    phone: "015 35011",
    website: "https://www.sella.it",
    openingHours: "Lun-Ven: 08:30-13:30, 14:45-16:15\nATM: H24",
    tags: ["Banca", "Bancomat", "ATM", "Servizi Finanziari"],
    name_en: "Banca Sella Biella Center",
    shortDescription_en: "ATM and branch.",
    details_en:
      "Banca Sella branch with 24/7 accessible ATM. Consultation by appointment.",
    openingHours_en: "Mon-Fri: 08:30-13:30, 14:45-16:15\nATM: 24/7",
  },
  {
    id: 31, // Example ID for Activity
    name: "Parco Avventura Veglio",
    type: "activity", // Use the new type
    coordinates: [45.628, 8.123], // Example coordinates outside Biella center
    shortDescription: "Percorsi avventura sugli alberi.",
    details:
      "Parco divertimenti con percorsi acrobatici adatti a varie età e livelli di difficoltà. Area picnic disponibile.",
    address: "Località Veglio, Biella", // Fictional address part
    website: "https://parcoavventuraveglio.example.com",
    openingHours: "Sab-Dom: 10:00-18:00 (Stagionale, verificare sito)",
    tags: ["Avventura", "Famiglie", "Natura", "Sport", "Divertimento"],
    name_en: "Veglio Adventure Park",
    shortDescription_en: "Adventure courses in the trees.",
    details_en:
      "Amusement park with acrobatic courses suitable for various ages and difficulty levels. Picnic area available.",
    openingHours_en: "Sat-Sun: 10:00-18:00 (Seasonal, check website)",
  },
  // ... Add many more points
];

// --- NEW: Define Colors and Icons per Type ---
interface PoiTypeStyle {
  color: string; // Hex color string
  icon: IconType | React.ForwardRefExoticComponent<any>; // React Icon Component or Heroicon component
}

export const poiTypeStyles: Record<PoiType | "default", PoiTypeStyle> = {
  camper: { color: "#3B82F6", icon: FaCaravan }, // Blue
  taxi: { color: "#F59E0B", icon: FaTaxi }, // Amber
  restaurant: { color: "#F97316", icon: FaUtensils }, // Orange
  bar: { color: "#A855F7", icon: FaGlassMartiniAlt }, // Purple
  hotel: { color: "#14B8A6", icon: FaBed }, // Teal
  private_accommodation: { color: "#EC4899", icon: FaCampground }, // Pink
  clothing: { color: "#8B5CF6", icon: FaTshirt }, // Violet
  bank: { color: "#0891B2", icon: FaLandmark }, // Added (Teal/Cyan)
  activity: { color: "#84CC16", icon: FaStar }, // Added (Lime Green)
  default: { color: "#6B7280", icon: QuestionMarkCircleIcon }, // Gray fallback
};

// --- Updated Legend Items ---
// Add icon component and color directly
export const legendItems: {
  type: PoiType;
  label: string;
  icon: IconType | React.ForwardRefExoticComponent<any>;
  color: string;
}[] = [
  {
    type: "camper",
    label: "Area Camper",
    icon: poiTypeStyles.camper.icon,
    color: poiTypeStyles.camper.color,
  },
  {
    type: "taxi",
    label: "Punto Taxi",
    icon: poiTypeStyles.taxi.icon,
    color: poiTypeStyles.taxi.color,
  },
  {
    type: "restaurant",
    label: "Ristorante",
    icon: poiTypeStyles.restaurant.icon,
    color: poiTypeStyles.restaurant.color,
  },
  {
    type: "bar",
    label: "Bar",
    icon: poiTypeStyles.bar.icon,
    color: poiTypeStyles.bar.color,
  },
  {
    type: "hotel",
    label: "Hotel",
    icon: poiTypeStyles.hotel.icon,
    color: poiTypeStyles.hotel.color,
  },
  {
    type: "private_accommodation",
    label: "Accoglienza",
    icon: poiTypeStyles.private_accommodation.icon,
    color: poiTypeStyles.private_accommodation.color,
  },
  {
    type: "clothing",
    label: "Punto Abbigliamento/Gadget",
    icon: poiTypeStyles.clothing.icon,
    color: poiTypeStyles.clothing.color,
  },
  {
    type: "bank",
    label: "Banca / ATM",
    icon: poiTypeStyles.bank.icon,
    color: poiTypeStyles.bank.color,
  }, // Added
  {
    type: "activity",
    label: "Attività / Eventi",
    icon: poiTypeStyles.activity.icon,
    color: poiTypeStyles.activity.color,
  }, // Added
];

// --- Updated Function to get custom Leaflet Icon using L.DivIcon ---
export const getPoiIcon = (type: PoiType, isActive = false): L.DivIcon => {
  const style = poiTypeStyles[type] || poiTypeStyles.default;
  const baseSize = 43;
  const scale = isActive ? 1.15 : 1.0; // Define scale factor
  const IconComponent = style.icon;

  // Render the React icon component to an HTML string
  const iconHtmlString = ReactDOMServer.renderToString(
    // We need to manually apply size/color here because it's going into HTML
    // Tailwind classes won't work directly in DivIcon HTML unless Leaflet renders within React tree (not default)
    React.createElement(IconComponent, {
      size: baseSize * 0.6,
      color: "white",
    }) // Icon size relative to container
  );

  // Create the HTML for the DivIcon
  const iconHtml = `
  <div style="
    background-color: ${style.color};
    width: ${baseSize}px;
    height: ${baseSize}px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    border: 2px solid white; /* Add white border for contrast */
    transform: scale(${scale});
    transition: transform 0.1s ease-out;
  ">
    ${iconHtmlString}
  </div>
`;

  return L.divIcon({
    html: iconHtml,
    className: "",
    // Use baseSize for calculations, scaling is visual only
    iconSize: [baseSize, baseSize],
    iconAnchor: [baseSize / 2, baseSize],
    popupAnchor: [0, -baseSize + 5],
  });
};
