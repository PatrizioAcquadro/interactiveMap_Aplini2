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
  | "clothing";

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
    // --- New Fields Added ---
    images: [
      "/images/glamour/img1.jpg", // MAKE SURE THESE EXIST IN public/images/glamour/
      "/images/glamour/img2.jpg",
      "/images/glamour/img3.jpg",
    ],
    openingHours:
      "Mar-Gio: 18:00-01:00\nVen-Sab: 18:00-02:30\nDom: 18:00-00:00\nLun: Chiuso", // Use \n for new lines
    discountInfo:
      "Sconto 10% per tesserati ANA (esclusi eventi speciali e Sabato sera).",
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
