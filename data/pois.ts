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
  FaLandmark, // *** ADDED for Bank ***
  FaStar, // *** ADDED for Activity ***
  FaRestroom,
  FaBriefcaseMedical,
  FaClinicMedical,
  FaHospitalSymbol,
  FaParking,
  FaShoppingBag,
  FaIceCream,
} from "react-icons/fa"; // Example icons from react-icons
import { StopIcon } from "@heroicons/react/24/outline"; // Example: Stop sign outline
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
  | "activity"
  | "ztl"
  | "wc"
  | "pharmacy"
  | "medical_post"
  | "field_hospital"
  | "parking"
  | "gelateria";

// Define the structure for each POI
export interface POI {
  id: number;
  name: string;
  type: PoiType;
  coordinates: L.LatLngExpression; // [latitude, longitude]
  googleRating?: number; // e.g., 4.5
  googleReviewCount?: number; // e.g., 150
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

  // --- Party Info Fields ---
  partyInfo?: string; // e.g., "DJ Set Electro / House"
  partyHours?: string; // e.g., "Ven/Sab: 22:00 - 03:00"

  name_en?: string;
  shortDescription_en?: string;
  details_en?: string; // English details
  openingHours_en?: string;
  discountInfo_en?: string;
  tags_en?: string[];
  partyInfo_en?: string;
  partyHours_en?: string;

  name_es?: string;
  shortDescription_es?: string;
  details_es?: string;
  openingHours_es?: string;
  discountInfo_es?: string;
  tags_es?: string[];
  partyInfo_es?: string;
  partyHours_es?: string;

  name_fr?: string;
  shortDescription_fr?: string;
  details_fr?: string;
  openingHours_fr?: string;
  discountInfo_fr?: string;
  tags_fr?: string[];
  partyInfo_fr?: string;
  partyHours_fr?: string;

  name_de?: string;
  shortDescription_de?: string;
  details_de?: string;
  openingHours_de?: string;
  discountInfo_de?: string;
  tags_de?: string[];
  partyInfo_de?: string;
  partyHours_de?: string;
}

// --- Updated POI Data ---
export const poiData: POI[] = [
  {
    id: 1,
    name: "Area Camper Piazzale C.so Risorgimento",
    name_es: "Área de autocaravanas Piazzale Corso Risorgimento",
    name_fr: "Aire de camping-cars Piazzale Corso Risorgimento",
    name_de: "Wohnmobilstellplatz Piazzale Corso Risorgimento",
    type: "camper",
    coordinates: [45.554479, 8.054535],
    shortDescription: "Area attrezzata per camper.",
    shortDescription_es: "Área equipada para autocaravanas.",
    shortDescription_fr: "Aire équipée pour camping-cars.",
    shortDescription_de: "Ausgestatteter Wohnmobilstellplatz.",
    details: "Ampia area camper. Prenotazioni raccomandate durante l'evento",
    details_es:
      "Amplia área para autocaravanas. Se recomiendan reservas durante el evento.",
    details_fr:
      "Grande aire de camping-cars. Réservations recommandées pendant l’événement.",
    details_de:
      "Großer Wohnmobilstellplatz. Reservierungen werden während der Veranstaltung empfohlen.",
    address: "Corso Risorgimento 37, Biella",
    tags: ["Camper", "Servizi Base"],
    name_en: "Camper Area",
    shortDescription_en: "Equipped camper area.",
    details_en: "Large camper area. Booking recommended during the event.",
    images: ["/images/camper1.png"],
  },
  {
    id: 2,
    name: "Area Camper Piazza Cerruti",
    name_es: "Área de autocaravanas Piazza Cerruti",
    name_fr: "Aire de camping-cars Piazza Cerruti",
    name_de: "Wohnmobilstellplatz Piazza Cerruti",
    type: "camper",
    coordinates: [45.555017, 8.035151],
    shortDescription: "Area attrezzata per camper.",
    shortDescription_es: "Área equipada para autocaravanas.",
    shortDescription_fr: "Aire équipée pour camping-cars.",
    shortDescription_de: "Ausgestatteter Wohnmobilstellplatz.",
    details: "Ampia area camper. Prenotazioni raccomandate durante l'evento",
    details_es:
      "Amplia área para autocaravanas. Se recomiendan reservas durante el evento.",
    details_fr:
      "Grande aire de camping-cars. Réservations recommandées pendant l’événement.",
    details_de:
      "Großer Wohnmobilstellplatz. Reservierungen werden während der Veranstaltung empfohlen.",
    address: "Piazza Silvio Cerruti, Biella",
    tags: ["Camper", "Servizi Base"],
    name_en: "Camper Area",
    shortDescription_en: "Equipped camper area.",
    details_en: "Large camper area. Booking recommended during the event.",
    images: ["/images/camper1.png"],
  },
  {
    id: 3,
    name: "Area Camper Strada del Cervo",
    name_es: "Área de autocaravanas Strada del Cervo",
    name_fr: "Aire de camping-cars Strada del Cervo",
    name_de: "Wohnmobilstellplatz Strada del Cervo",
    type: "camper",
    coordinates: [45.582613, 8.056038],
    shortDescription: "Area attrezzata per camper.",
    shortDescription_es: "Área equipada para autocaravanas.",
    shortDescription_fr: "Aire équipée pour camping-cars.",
    shortDescription_de: "Ausgestatteter Wohnmobilstellplatz.",
    details: "Ampia area camper. Prenotazioni raccomandate durante l'evento",
    details_es:
      "Amplia área para autocaravanas. Se recomiendan reservas durante el evento.",
    details_fr:
      "Grande aire de camping-cars. Réservations recommandées pendant l’événement.",
    details_de:
      "Großer Wohnmobilstellplatz. Reservierungen werden während der Veranstaltung empfohlen.",
    address: "Strada del Cervo 1, Biella",
    tags: ["Camper", "Servizi Base"],
    name_en: "Camper Area",
    shortDescription_en: "Equipped camper area.",
    details_en: "Large camper area. Booking recommended during the event.",
    images: ["/images/camper1.png"],
  },
  {
    id: 4,
    name: "Area Camper Piazza Falcone",
    name_es: "Área de autocaravanas Piazza Falcone",
    name_fr: "Aire de camping-cars Piazza Falcone",
    name_de: "Wohnmobilstellplatz Piazza Falcone",
    type: "camper",
    coordinates: [45.551391, 8.059503],
    shortDescription: "Area attrezzata per camper.",
    shortDescription_es: "Área equipada para autocaravanas.",
    shortDescription_fr: "Aire équipée pour camping-cars.",
    shortDescription_de: "Ausgestatteter Wohnmobilstellplatz.",
    details: "Ampia area camper. Prenotazioni raccomandate durante l'evento",
    details_es:
      "Amplia área para autocaravanas. Se recomiendan reservas durante el evento.",
    details_fr:
      "Grande aire de camping-cars. Réservations recommandées pendant l’événement.",
    details_de:
      "Großer Wohnmobilstellplatz. Reservierungen werden während der Veranstaltung empfohlen.",
    address: "Piazza Falcone, Biella",
    tags: ["Camper", "Servizi Base"],
    name_en: "Camper Area",
    shortDescription_en: "Equipped camper area.",
    details_en: "Large camper area. Booking recommended during the event.",
    images: ["/images/camper1.png"],
  },
  {
    id: 5,
    name: "Area Camper Semperlux",
    name_es: "Área de autocaravanas Semperlux",
    name_fr: "Aire de camping-cars Semperlux",
    name_de: "Wohnmobilstellplatz Semperlux",
    type: "camper",
    coordinates: [45.5422, 8.045951],
    shortDescription: "Area attrezzata per camper.",
    shortDescription_es: "Área equipada para autocaravanas.",
    shortDescription_fr: "Aire équipée pour camping-cars.",
    shortDescription_de: "Ausgestatteter Wohnmobilstellplatz.",
    details: "Ampia area camper. Prenotazioni raccomandate durante l'evento",
    details_es:
      "Amplia área para autocaravanas. Se recomiendan reservas durante el evento.",
    details_fr:
      "Grande aire de camping-cars. Réservations recommandées pendant l’événement.",
    details_de:
      "Großer Wohnmobilstellplatz. Reservierungen werden während der Veranstaltung empfohlen.",
    address: "Via Cascina Nuova 1, Biella",
    tags: ["Camper", "Servizi Base"],
    name_en: "Camper Area",
    shortDescription_en: "Equipped camper area.",
    details_en: "Large camper area. Booking recommended during the event.",
    images: ["/images/camper1.png"],
  },
  {
    id: 6,
    name: "Area Tende Strada del Cervo",
    name_es: "Área de tiendas Strada del Cervo",
    name_fr: "Aire de tentes Strada del Cervo",
    name_de: "Zeltplatz Strada del Cervo",
    type: "private_accommodation",
    coordinates: [45.582963, 8.056037],
    shortDescription: "Area attrezzata per tende.",
    shortDescription_es: "Área equipada para tiendas.",
    shortDescription_fr: "Aire équipée pour tentes.",
    shortDescription_de: "Ausgestatteter Zeltplatz.",
    details: "Ampia area tende. Prenotazioni raccomandate durante l'evento",
    details_es:
      "Amplia área para tiendas. Se recomiendan reservas durante el evento.",
    details_fr:
      "Grande aire de tentes. Réservations recommandées pendant l’événement.",
    details_de:
      "Großer Zeltplatz. Reservierungen werden während der Veranstaltung empfohlen.",
    address: "Strada del Cervo 1, Biella",
    tags: ["Tende", "Servizi Base"],
    name_en: "Campsite",
    shortDescription_en: "Equipped campsite.",
    details_en: "Large campsite. Booking recommended during the event.",
    images: ["/images/tende1.png"],
  },
  {
    id: 7,
    name: "Area Tende Via Liguria",
    name_es: "Área de tiendas Via Liguria",
    name_fr: "Aire de tentes Via Liguria",
    name_de: "Zeltplatz Via Liguria",
    type: "private_accommodation",
    coordinates: [45.55238, 8.061037],
    shortDescription: "Area attrezzata per tende.",
    shortDescription_es: "Área equipada para tiendas.",
    shortDescription_fr: "Aire équipée pour tentes.",
    shortDescription_de: "Ausgestatteter Zeltplatz.",
    details: "Ampia area tende. Prenotazioni raccomandate durante l'evento",
    details_es:
      "Amplia área para tiendas. Se recomiendan reservas durante el evento.",
    details_fr:
      "Grande aire de tentes. Réservations recommandées pendant l’événement.",
    details_de:
      "Großer Zeltplatz. Reservierungen werden während der Veranstaltung empfohlen.",
    address: "Via Valle d'Aosta, Biella",
    tags: ["Tende", "Servizi Base"],
    name_en: "Campsite",
    shortDescription_en: "Equipped campsite.",
    details_en: "Large campsite. Booking recommended during the event.",
    images: ["/images/tende1.png"],
  },
  {
    id: 8,
    name: "Area Tende Parco Corso Rivetti",
    name_es: "Área de tiendas Parque Corso Rivetti",
    name_fr: "Aire de tentes Parc Corso Rivetti",
    name_de: "Zeltplatz Park Corso Rivetti",
    type: "private_accommodation",
    coordinates: [45.559034, 8.069023],
    shortDescription: "Area attrezzata per tende.",
    shortDescription_es: "Área equipada para tiendas.",
    shortDescription_fr: "Aire équipée pour tentes.",
    shortDescription_de: "Ausgestatteter Zeltplatz.",
    details: "Ampia area tende. Prenotazioni raccomandate durante l'evento",
    details_es:
      "Amplia área para tiendas. Se recomiendan reservas durante el evento.",
    details_fr:
      "Grande aire de tentes. Réservations recommandées pendant l’événement.",
    details_de:
      "Großer Zeltplatz. Reservierungen werden während der Veranstaltung empfohlen.",
    address: "Corso Guido Rivetti, Biella",
    tags: ["Tende", "Servizi Base"],
    name_en: "Campsite",
    shortDescription_en: "Equipped campsite.",
    details_en: "Large campsite. Booking recommended during the event.",
    images: ["/images/tende1.png"],
  },
  {
    id: 9,
    name: "Area Tende Campo Allenamento Rugby",
    name_es: "Área de tiendas Campo Entrenamiento Rugby",
    name_fr: "Aire de tentes Terrain d’entraînement Rugby",
    name_de: "Zeltplatz Rugby-Trainingsplatz",
    type: "private_accommodation",
    coordinates: [45.55287, 8.047261],
    shortDescription: "Area attrezzata per tende.",
    shortDescription_es: "Área equipada para tiendas.",
    shortDescription_fr: "Aire équipée pour tentes.",
    shortDescription_de: "Ausgestatteter Zeltplatz.",
    details: "Ampia area tende. Prenotazioni raccomandate durante l'evento",
    details_es:
      "Amplia área para tiendas. Se recomiendan reservas durante el evento.",
    details_fr:
      "Grande aire de tentes. Réservations recommandées pendant l’événement.",
    details_de:
      "Großer Zeltplatz. Reservierungen werden während der Veranstaltung empfohlen.",
    address: "Via Salvo d'Acquisto, Biella",
    tags: ["Tende", "Servizi Base"],
    name_en: "Campsite",
    shortDescription_en: "Equipped campsite.",
    details_en: "Large campsite. Booking recommended during the event.",
    images: ["/images/tende1.png"],
  },
  {
    id: 10,
    name: "Area Tende Prato di Via Jona",
    name_es: "Área de tiendas Prato di Via Jona",
    name_fr: "Aire de tentes Prato di Via Jona",
    name_de: "Zeltplatz Prato di Via Jona",
    type: "private_accommodation",
    coordinates: [45.543902, 8.072677],
    shortDescription: "Area attrezzata per tende.",
    shortDescription_es: "Área equipada para tiendas.",
    shortDescription_fr: "Aire équipée pour tentes.",
    shortDescription_de: "Ausgestatteter Zeltplatz.",
    details: "Ampia area tende. Prenotazioni raccomandate durante l'evento",
    details_es:
      "Amplia área para tiendas. Se recomiendan reservas durante el evento.",
    details_fr:
      "Grande aire de tentes. Réservations recommandées pendant l’événement.",
    details_de:
      "Großer Zeltplatz. Reservierungen werden während der Veranstaltung empfohlen.",
    address: "Via Emanuele Jona, Biella",
    tags: ["Tende", "Servizi Base"],
    name_en: "Campsite",
    shortDescription_en: "Equipped campsite.",
    details_en: "Large campsite. Booking recommended during the event.",
    images: ["/images/tende1.png"],
  },
  {
    id: 11,
    name: "Area Tende Prato Via Ferruccio Nazionale",
    name_es: "Área de tiendas Prato Via Ferruccio Nazionale",
    name_fr: "Aire de tentes Prato Via Ferruccio Nazionale",
    name_de: "Zeltplatz Prato Via Ferruccio Nazionale",
    type: "private_accommodation",
    coordinates: [45.554952, 8.07497],
    shortDescription: "Area attrezzata per tende.",
    shortDescription_es: "Área equipada para tiendas.",
    shortDescription_fr: "Aire équipée pour tentes.",
    shortDescription_de: "Ausgestatteter Zeltplatz.",
    details: "Ampia area tende. Prenotazioni raccomandate durante l'evento",
    details_es:
      "Amplia área para tiendas. Se recomiendan reservas durante el evento.",
    details_fr:
      "Grande aire de tentes. Réservations recommandées pendant l’événement.",
    details_de:
      "Großer Zeltplatz. Reservierungen werden während der Veranstaltung empfohlen.",
    address: "Via Ferruccio Nazionale 3-8, Biella",
    tags: ["Tende", "Servizi Base"],
    name_en: "Campsite",
    shortDescription_en: "Equipped campsite.",
    details_en: "Large campsite. Booking recommended during the event.",
    images: ["/images/tende1.png"],
  },
  {
    id: 200, // Keeping the same ID
    name: "Ristorante Ufficiale Adunata - Piazza Fiume", // Clear name indicating official status and location
    name_en: "Official Adunata Restaurant - Piazza Fiume",
    name_es: "Restaurante Oficial Adunata - Piazza Fiume",
    name_fr: "Restaurant Officiel Adunata - Piazza Fiume",
    name_de: "Offizielles Adunata Restaurant - Piazza Fiume",
    type: "restaurant", // Correct type
    coordinates: [45.568187, 8.053443], // Centered roughly in Piazza Fiume - ADJUST IF NEEDED
    shortDescription: "Punto ristoro ufficiale dell'Adunata 2025.", // Clear, concise description
    shortDescription_en: "Official food point for Adunata 2025.",
    shortDescription_es: "Punto de restauración oficial de la Adunata 2025.",
    shortDescription_fr: "Point de restauration officiel de l'Adunata 2025.",
    shortDescription_de: "Offizieller Verpflegungsstand der Adunata 2025.",
    details:
      "Uno dei punti ristoro ufficiali gestiti dall'organizzazione dell'Adunata Nazionale Alpini Biella 2025. Offre pasti caldi e bevande. Situato in Piazza Fiume. Gli orari specifici saranno definiti dal programma ufficiale dell'evento.", // More detail about its nature
    details_en:
      "One of the official food points managed by the Adunata Nazionale Alpini Biella 2025 organization. Offers hot meals and drinks. Located in Piazza Fiume. Specific opening hours will be defined by the official event program.",
    details_es:
      "Uno de los puntos de restauración oficiales gestionados por la organización Adunata Nazionale Alpini Biella 2025. Ofrece comidas calientes y bebidas. Ubicado en Piazza Fiume. Los horarios específicos serán definidos por el programa oficial del evento.",
    details_fr:
      "Un des points de restauration officiels gérés par l'organisation Adunata Nazionale Alpini Biella 2025. Propose des repas chauds et des boissons. Situé sur la Piazza Fiume. Les horaires spécifiques seront définis par le programme officiel de l'événement.",
    details_de:
      "Einer der offiziellen Verpflegungspunkte, die von der Organisation Adunata Nazionale Alpini Biella 2025 verwaltet werden. Bietet warme Mahlzeiten und Getränke an. Befindet sich auf der Piazza Fiume. Genaue Öffnungszeiten werden durch das offizielle Veranstaltungsprogramm festgelegt.",
    address: "Piazza Fiume (Area Evento), Biella", // General address, indicating event area
    phone: "", // Leave blank unless a specific event contact number is provided
    website: "", // Leave blank unless linked from the official Adunata site
    openingHours: "Orari evento (Vedi Programma Ufficiale)", // Indicate dependence on event schedule
    openingHours_en: "Event hours (See Official Program)",
    openingHours_es: "Horario del evento (Ver Programa Oficial)",
    openingHours_fr: "Horaires de l'événement (Voir Programme Officiel)",
    openingHours_de: "Veranstaltungszeiten (Siehe Offizielles Programm)",
    tags: ["Ristorante", "Adunata", "Ufficiale", "Pasto Caldo", "Evento"], // Relevant tags
    tags_en: ["Restaurant", "Adunata", "Official", "Hot Meal", "Event"],
    tags_es: ["Restaurante", "Adunata", "Oficial", "Comida Caliente", "Evento"],
    tags_fr: ["Restaurant", "Adunata", "Officiel", "Repas Chaud", "Événement"],
    tags_de: [
      "Restaurant",
      "Adunata",
      "Offiziell",
      "Warme Mahlzeit",
      "Veranstaltung",
    ],
    // --- Remove Google Rating/Reviews as they don't apply ---
    // googleRating: undefined,
    // googleReviewCount: undefined,
    images: ["/images/alpiniRestaurant.png"], // Add paths to official photos/renderings if available
    discountInfo: "", // Unlikely unless specified by organizers
    partyInfo: "", // Unlikely for official food point
    partyHours: "", // Unlikely for official food point
  },
  {
    id: 201, // New unique ID
    name: "Ristorante Ufficiale Adunata - Piazza Martiri", // Clear name indicating official status and location
    name_en: "Official Adunata Restaurant - Piazza Martiri",
    name_es: "Restaurante Oficial Adunata - Piazza Martiri",
    name_fr: "Restaurant Officiel Adunata - Piazza Martiri",
    name_de: "Offizielles Adunata Restaurant - Piazza Martiri",
    type: "restaurant", // Correct type
    coordinates: [45.568108, 8.050992], // Approximate Coordinates for Piazza Martiri della Libertà - ADJUST IF NEEDED
    shortDescription: "Punto ristoro ufficiale dell'Adunata 2025.", // Clear, concise description
    shortDescription_en: "Official food point for Adunata 2025.",
    shortDescription_es: "Punto de restauración oficial de la Adunata 2025.",
    shortDescription_fr: "Point de restauration officiel de l'Adunata 2025.",
    shortDescription_de: "Offizieller Verpflegungsstand der Adunata 2025.",
    details:
      "Uno dei punti ristoro ufficiali gestiti dall'organizzazione dell'Adunata Nazionale Alpini Biella 2025. Offre pasti caldi e bevande. Situato in Piazza Martiri della Libertà. Gli orari specifici saranno definiti dal programma ufficiale dell'evento.", // More detail about its nature
    details_en:
      "One of the official food points managed by the Adunata Nazionale Alpini Biella 2025 organization. Offers hot meals and drinks. Located in Piazza Martiri della Libertà. Specific opening hours will be defined by the official event program.",
    details_es:
      "Uno de los puntos de restauración oficiales gestionados por la organización Adunata Nazionale Alpini Biella 2025. Ofrece comidas calientes y bebidas. Ubicado en Piazza Martiri della Libertà. Los horarios específicos serán definidos por el programa oficial del evento.",
    details_fr:
      "Un des points de restauration officiels gérés par l'organisation Adunata Nazionale Alpini Biella 2025. Propose des repas chauds et des boissons. Situé sur la Piazza Martiri della Libertà. Les horaires spécifiques seront définis par le programme officiel de l'événement.",
    details_de:
      "Einer der offiziellen Verpflegungspunkte, die von der Organisation Adunata Nazionale Alpini Biella 2025 verwaltet werden. Bietet warme Mahlzeiten und Getränke an. Befindet sich auf der Piazza Martiri della Libertà. Genaue Öffnungszeiten werden durch das offizielle Veranstaltungsprogramm festgelegt.",
    address: "Piazza Martiri della Libertà (Area Evento), Biella", // General address, indicating event area
    phone: "", // Leave blank unless a specific event contact number is provided
    website: "", // Leave blank unless linked from the official Adunata site
    openingHours: "Orari evento (Vedi Programma Ufficiale)", // Indicate dependence on event schedule
    openingHours_en: "Event hours (See Official Program)",
    openingHours_es: "Horario del evento (Ver Programa Oficial)",
    openingHours_fr: "Horaires de l'événement (Voir Programme Officiel)",
    openingHours_de: "Veranstaltungszeiten (Siehe Offizielles Programm)",
    tags: [
      "Ristorante",
      "Adunata",
      "Ufficiale",
      "Pasto Caldo",
      "Evento",
      "Piazza Martiri",
    ], // Relevant tags, added specific piazza
    tags_en: [
      "Restaurant",
      "Adunata",
      "Official",
      "Hot Meal",
      "Event",
      "Piazza Martiri",
    ],
    tags_es: [
      "Restaurante",
      "Adunata",
      "Oficial",
      "Comida Caliente",
      "Evento",
      "Piazza Martiri",
    ],
    tags_fr: [
      "Restaurant",
      "Adunata",
      "Officiel",
      "Repas Chaud",
      "Événement",
      "Piazza Martiri",
    ],
    tags_de: [
      "Restaurant",
      "Adunata",
      "Offiziell",
      "Warme Mahlzeit",
      "Veranstaltung",
      "Piazza Martiri",
    ],
    // Removed Google Rating/Reviews as they don't apply
    images: ["/images/alpiniRestaurant.png"], // Add paths to official photos/renderings if available
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 202, // New unique ID
    name: "Ristorante Ufficiale Adunata - Via Arnulfo", // Clear name indicating official status and location
    name_en: "Official Adunata Restaurant - Via Arnulfo",
    name_es: "Restaurante Oficial Adunata - Via Arnulfo",
    name_fr: "Restaurant Officiel Adunata - Via Arnulfo",
    name_de: "Offizielles Adunata Restaurant - Via Arnulfo",
    type: "restaurant", // Correct type
    coordinates: [45.564877, 8.052554], // Approximate Coordinates for Via Arnulfo 2-6 area - ADJUST IF NEEDED
    shortDescription: "Punto ristoro ufficiale dell'Adunata 2025.", // Clear, concise description
    shortDescription_en: "Official food point for Adunata 2025.",
    shortDescription_es: "Punto de restauración oficial de la Adunata 2025.",
    shortDescription_fr: "Point de restauration officiel de l'Adunata 2025.",
    shortDescription_de: "Offizieller Verpflegungsstand der Adunata 2025.",
    details:
      "Uno dei punti ristoro ufficiali gestiti dall'organizzazione dell'Adunata Nazionale Alpini Biella 2025. Offre pasti caldi e bevande. Situato nell'area di Via Arnulfo. Gli orari specifici saranno definiti dal programma ufficiale dell'evento.", // More detail about its nature
    details_en:
      "One of unbelievablenational food points managed by the Adunata Nazionale Alpini Biella 2025 organization. Offers hot meals and drinks. Located in the Via Arnulfo area. Specific opening hours will be defined by the official event program.",
    details_es:
      "Uno de los puntos de restauración oficiales gestionados por la organización Adunata Nazionale Alpini Biella 2025. Ofrece comidas calientes y bebidas. Ubicado en la zona de Via Arnulfo. Los horarios específicos serán definidos por el programa oficial del evento.",
    details_fr:
      "Un des points de restauration officiels gérés par l'organisation Adunata Nazionale Alpini Biella 2025. Propose des repas chauds et des boissons. Situé dans la zone de Via Arnulfo. Les horaires spécifiques seront définis par le programme officiel de l'événement.",
    details_de:
      "Einer der offiziellen Verpflegungspunkte, die von der Organisation Adunata Nazionale Alpini Biella 2025 verwaltet werden. Bietet warme Mahlzeiten und Getränke an. Befindet sich im Bereich der Via Arnulfo. Genaue Öffnungszeiten werden durch das offizielle Veranstaltungsprogramm festgelegt.",
    address: "Via Giuseppe Arnulfo, 2-6 (Area Evento), Biella", // Specific address + area indicator
    phone: "", // Leave blank unless a specific event contact number is provided
    website: "", // Leave blank unless linked from the official Adunata site
    openingHours: "Orari evento (Vedi Programma Ufficiale)", // Indicate dependence on event schedule
    openingHours_en: "Event hours (See Official Program)",
    openingHours_es: "Horario del evento (Ver Programa Oficial)",
    openingHours_fr: "Horaires de l'événement (Voir Programme Officiel)",
    openingHours_de: "Veranstaltungszeiten (Siehe Offizielles Programm)",
    tags: [
      "Ristorante",
      "Adunata",
      "Ufficiale",
      "Pasto Caldo",
      "Evento",
      "Via Arnulfo",
    ], // Relevant tags, added specific street
    tags_en: [
      "Restaurant",
      "Adunata",
      "Official",
      "Hot Meal",
      "Event",
      "Via Arnulfo",
    ],
    tags_es: [
      "Restaurante",
      "Adunata",
      "Oficial",
      "Comida Caliente",
      "Evento",
      "Via Arnulfo",
    ],
    tags_fr: [
      "Restaurant",
      "Adunata",
      "Officiel",
      "Repas Chaud",
      "Événement",
      "Via Arnulfo",
    ],
    tags_de: [
      "Restaurant",
      "Adunata",
      "Offiziell",
      "Warme Mahlzeit",
      "Veranstaltung",
      "Via Arnulfo",
    ],
    // Removed Google Rating/Reviews as they don't apply
    images: ["/images/alpiniRestaurant.png"], // Add paths to official photos/renderings if available
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 203, // New unique ID
    name: "Ristorante Ufficiale Adunata - Viale Matteotti", // Clear name indicating official status and location
    name_en: "Official Adunata Restaurant - Viale Matteotti",
    name_es: "Restaurante Oficial Adunata - Viale Matteotti",
    name_fr: "Restaurant Officiel Adunata - Viale Matteotti",
    name_de: "Offizielles Adunata Restaurant - Viale Matteotti",
    type: "restaurant", // Correct type
    coordinates: [45.564209, 8.057686], // Approximate Coordinates for Viale Matteotti 2 - ADJUST IF NEEDED
    shortDescription: "Punto ristoro ufficiale dell'Adunata 2025.", // Clear, concise description
    shortDescription_en: "Official food point for Adunata 2025.",
    shortDescription_es: "Punto de restauración oficial de la Adunata 2025.",
    shortDescription_fr: "Point de restauration officiel de l'Adunata 2025.",
    shortDescription_de: "Offizieller Verpflegungsstand der Adunata 2025.",
    details:
      "Uno dei punti ristoro ufficiali gestiti dall'organizzazione dell'Adunata Nazionale Alpini Biella 2025. Offre pasti caldi e bevande. Situato in Viale Matteotti. Gli orari specifici saranno definiti dal programma ufficiale dell'evento.", // More detail about its nature
    details_en:
      "One of the official food points managed by the Adunata Nazionale Alpini Biella 2025 organization. Offers hot meals and drinks. Located on Viale Matteotti. Specific opening hours will be defined by the official event program.",
    details_es:
      "Uno de los puntos de restauración oficiales gestionados por la organización Adunata Nazionale Alpini Biella 2025. Ofrece comidas calientes y bebidas. Ubicado en Viale Matteotti. Los horarios específicos serán definidos por el programa oficial del evento.",
    details_fr:
      "Un des points de restauration officiels gérés par l'organisation Adunata Nazionale Alpini Biella 2025. Propose des repas chauds et des boissons. Situé sur Viale Matteotti. Les horaires spécifiques seront définis par le programme officiel de l'événement.",
    details_de:
      "Einer der offiziellen Verpflegungspunkte, die von der Organisation Adunata Nazionale Alpini Biella 2025 verwaltet werden. Bietet warme Mahlzeiten und Getränke an. Befindet sich an der Viale Matteotti. Genaue Öffnungszeiten werden durch das offizielle Veranstaltungsprogramm festgelegt.",
    address: "Viale Giacomo Matteotti, 2 (Area Evento), Biella", // Specific address + area indicator
    phone: "", // Leave blank unless a specific event contact number is provided
    website: "", // Leave blank unless linked from the official Adunata site
    openingHours: "Orari evento (Vedi Programma Ufficiale)", // Indicate dependence on event schedule
    openingHours_en: "Event hours (See Official Program)",
    openingHours_es: "Horario del evento (Ver Programa Oficial)",
    openingHours_fr: "Horaires de l'événement (Voir Programme Officiel)",
    openingHours_de: "Veranstaltungszeiten (Siehe Offizielles Programm)",
    tags: [
      "Ristorante",
      "Adunata",
      "Ufficiale",
      "Pasto Caldo",
      "Evento",
      "Viale Matteotti",
    ], // Relevant tags, added specific street
    tags_en: [
      "Restaurant",
      "Adunata",
      "Official",
      "Hot Meal",
      "Event",
      "Viale Matteotti",
    ],
    tags_es: [
      "Restaurante",
      "Adunata",
      "Oficial",
      "Comida Caliente",
      "Evento",
      "Viale Matteotti",
    ],
    tags_fr: [
      "Restaurant",
      "Adunata",
      "Officiel",
      "Repas Chaud",
      "Événement",
      "Viale Matteotti",
    ],
    tags_de: [
      "Restaurant",
      "Adunata",
      "Offiziell",
      "Warme Mahlzeit",
      "Veranstaltung",
      "Viale Matteotti",
    ],
    // Removed Google Rating/Reviews as they don't apply
    images: ["/images/alpiniRestaurant.png"], // Add paths to official photos/renderings if available
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 204, // New unique ID
    name: "Ristorante Ufficiale Adunata - Parcheggio Via Torino", // Clear name indicating official status and location type
    name_en: "Official Adunata Restaurant - Via Torino Parking Area",
    name_es: "Restaurante Oficial Adunata - Aparcamiento Via Torino",
    name_fr: "Restaurant Officiel Adunata - Parking Via Torino",
    name_de: "Offizielles Adunata Restaurant - Parkplatz Via Torino",
    type: "restaurant", // Correct type
    // Coordinates point to a large parking area near Via Torino (e.g., near Gli Orsi).
    // *** ADJUST THESE COORDINATES [45.5480, 8.0655] IF YOU KNOW THE SPECIFIC PARKING AREA ***
    coordinates: [45.562662, 8.058761],
    shortDescription:
      "Punto ristoro ufficiale dell'Adunata 2025 in area parcheggio.", // Clear, concise description
    shortDescription_en:
      "Official food point for Adunata 2025 in parking area.",
    shortDescription_es:
      "Punto de restauración oficial de la Adunata 2025 en zona de aparcamiento.",
    shortDescription_fr:
      "Point de restauration officiel de l'Adunata 2025 dans la zone de parking.",
    shortDescription_de:
      "Offizieller Verpflegungsstand der Adunata 2025 auf dem Parkplatz.",
    details:
      "Uno dei punti ristoro ufficiali gestiti dall'organizzazione dell'Adunata Nazionale Alpini Biella 2025. Offre pasti caldi e bevande. Situato nell'area parcheggio di Via Torino. Gli orari specifici saranno definiti dal programma ufficiale dell'evento.", // More detail about its nature
    details_en:
      "One of the official food points managed by the Adunata Nazionale Alpini Biella 2025 organization. Offers hot meals and drinks. Located in the Via Torino parking area. Specific opening hours will be defined by the official event program.",
    details_es:
      "Uno de los puntos de restauración oficiales gestionados por la organización Adunata Nazionale Alpini Biella 2025. Ofrece comidas calientes y bebidas. Ubicado en la zona de aparcamiento de Via Torino. Los horarios específicos serán definidos por el programa oficial del evento.",
    details_fr:
      "Un des points de restauration officiels gérés par l'organisation Adunata Nazionale Alpini Biella 2025. Propose des repas chauds et des boissons. Situé dans la zone de parking de Via Torino. Les horaires spécifiques seront définis par le programme officiel de l'événement.",
    details_de:
      "Einer der offiziellen Verpflegungspunkte, die von der Organisation Adunata Nazionale Alpini Biella 2025 verwaltet werden. Bietet warme Mahlzeiten und Getränke an. Befindet sich auf dem Parkplatz an der Via Torino. Genaue Öffnungszeiten werden durch das offizielle Veranstaltungsprogramm festgelegt.",
    address: "Via Torino (Area Parcheggio), Biella", // General address indicating parking area
    phone: "", // Leave blank unless a specific event contact number is provided
    website: "", // Leave blank unless linked from the official Adunata site
    openingHours: "Orari evento (Vedi Programma Ufficiale)", // Indicate dependence on event schedule
    openingHours_en: "Event hours (See Official Program)",
    openingHours_es: "Horario del evento (Ver Programa Oficial)",
    openingHours_fr: "Horaires de l'événement (Voir Programme Officiel)",
    openingHours_de: "Veranstaltungszeiten (Siehe Offizielles Programm)",
    tags: [
      "Ristorante",
      "Adunata",
      "Ufficiale",
      "Pasto Caldo",
      "Evento",
      "Via Torino",
      "Parcheggio",
    ], // Relevant tags
    tags_en: [
      "Restaurant",
      "Adunata",
      "Official",
      "Hot Meal",
      "Event",
      "Via Torino",
      "Parking",
    ],
    tags_es: [
      "Restaurante",
      "Adunata",
      "Oficial",
      "Comida Caliente",
      "Evento",
      "Via Torino",
      "Aparcamiento",
    ],
    tags_fr: [
      "Restaurant",
      "Adunata",
      "Officiel",
      "Repas Chaud",
      "Événement",
      "Via Torino",
      "Parking",
    ],
    tags_de: [
      "Restaurant",
      "Adunata",
      "Offiziell",
      "Warme Mahlzeit",
      "Veranstaltung",
      "Via Torino",
      "Parkplatz",
    ],
    // Removed Google Rating/Reviews as they don't apply
    images: ["/images/alpiniRestaurant.png"], // Add paths to official photos/renderings if available
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 205, // New unique ID
    name: "Ristorante Ufficiale Adunata - Largo Cusano", // Clear name indicating official status and location
    name_en: "Official Adunata Restaurant - Largo Cusano",
    name_es: "Restaurante Oficial Adunata - Largo Cusano",
    name_fr: "Restaurant Officiel Adunata - Largo Cusano",
    name_de: "Offizielles Adunata Restaurant - Largo Cusano",
    type: "restaurant", // Correct type
    coordinates: [45.562432, 8.055833], // Approximate Coordinates for Largo Cusano - ADJUST IF NEEDED
    shortDescription: "Punto ristoro ufficiale dell'Adunata 2025.", // Clear, concise description
    shortDescription_en: "Official food point for Adunata 2025.",
    shortDescription_es: "Punto de restauración oficial de la Adunata 2025.",
    shortDescription_fr: "Point de restauration officiel de l'Adunata 2025.",
    shortDescription_de: "Offizieller Verpflegungsstand der Adunata 2025.",
    details:
      "Uno dei punti ristoro ufficiali gestiti dall'organizzazione dell'Adunata Nazionale Alpini Biella 2025. Offre pasti caldi e bevande. Situato in Largo Francesco Cusano. Gli orari specifici saranno definiti dal programma ufficiale dell'evento.", // More detail about its nature
    details_en:
      "One of the official food points managed by the Adunata Nazionale Alpini Biella 2025 organization. Offers hot meals and drinks. Located in Largo Francesco Cusano. Specific opening hours will be defined by the official event program.",
    details_es:
      "Uno de los puntos de restauración oficiales gestionados por la organización Adunata Nazionale Alpini Biella 2025. Ofrece comidas calientes y bebidas. Ubicado en Largo Francesco Cusano. Los horarios específicos serán definidos por el programa oficial del evento.",
    details_fr:
      "Un des points de restauration officiels gérés par l'organisation Adunata Nazionale Alpini Biella 2025. Propose des repas chauds et des boissons. Situé à Largo Francesco Cusano. Les horaires spécifiques seront définis par le programme officiel de l'événement.",
    details_de:
      "Einer der offiziellen Verpflegungspunkte, die von der Organisation Adunata Nazionale Alpini Biella 2025 verwaltet werden. Bietet warme Mahlzeiten und Getränke an. Befindet sich am Largo Francesco Cusano. Genaue Öffnungszeiten werden durch das offizielle Veranstaltungsprogramm festgelegt.",
    address: "Largo Francesco Cusano (Area Evento), Biella", // General address indicating the square
    phone: "", // Leave blank unless a specific event contact number is provided
    website: "", // Leave blank unless linked from the official Adunata site
    openingHours: "Orari evento (Vedi Programma Ufficiale)", // Indicate dependence on event schedule
    openingHours_en: "Event hours (See Official Program)",
    openingHours_es: "Horario del evento (Ver Programa Oficial)",
    openingHours_fr: "Horaires de l'événement (Voir Programme Officiel)",
    openingHours_de: "Veranstaltungszeiten (Siehe Offizielles Programm)",
    tags: [
      "Ristorante",
      "Adunata",
      "Ufficiale",
      "Pasto Caldo",
      "Evento",
      "Largo Cusano",
    ], // Relevant tags
    tags_en: [
      "Restaurant",
      "Adunata",
      "Official",
      "Hot Meal",
      "Event",
      "Largo Cusano",
    ],
    tags_es: [
      "Restaurante",
      "Adunata",
      "Oficial",
      "Comida Caliente",
      "Evento",
      "Largo Cusano",
    ],
    tags_fr: [
      "Restaurant",
      "Adunata",
      "Officiel",
      "Repas Chaud",
      "Événement",
      "Largo Cusano",
    ],
    tags_de: [
      "Restaurant",
      "Adunata",
      "Offiziell",
      "Warme Mahlzeit",
      "Veranstaltung",
      "Largo Cusano",
    ],
    // Removed Google Rating/Reviews as they don't apply
    images: ["/images/alpiniRestaurant.png"], // Add paths to official photos/renderings if available
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 206, // New unique ID
    name: "Ristorante Ufficiale Adunata - Via de Marchi", // Clear name indicating official status and location
    name_en: "Official Adunata Restaurant - Via de Marchi",
    name_es: "Restaurante Oficial Adunata - Via de Marchi",
    name_fr: "Restaurant Officiel Adunata - Via de Marchi",
    name_de: "Offizielles Adunata Restaurant - Via de Marchi",
    type: "restaurant", // Correct type
    coordinates: [45.561657, 8.053124], // Approximate Coordinates for Via de Marchi 1-3 area - ADJUST IF NEEDED
    shortDescription: "Punto ristoro ufficiale dell'Adunata 2025.", // Clear, concise description
    shortDescription_en: "Official food point for Adunata 2025.",
    shortDescription_es: "Punto de restauración oficial de la Adunata 2025.",
    shortDescription_fr: "Point de restauration officiel de l'Adunata 2025.",
    shortDescription_de: "Offizieller Verpflegungsstand der Adunata 2025.",
    details:
      "Uno dei punti ristoro ufficiali gestiti dall'organizzazione dell'Adunata Nazionale Alpini Biella 2025. Offre pasti caldi e bevande. Situato nell'area di Via Gaetano de Marchi. Gli orari specifici saranno definiti dal programma ufficiale dell'evento.", // More detail about its nature
    details_en:
      "One of the official food points managed by the Adunata Nazionale Alpini Biella 2025 organization. Offers hot meals and drinks. Located in the Via Gaetano de Marchi area. Specific opening hours will be defined by the official event program.",
    details_es:
      "Uno de los puntos de restauración oficiales gestionados por la organización Adunata Nazionale Alpini Biella 2025. Ofrece comidas calientes y bebidas. Ubicado en la zona de Via Gaetano de Marchi. Los horarios específicos serán definidos por el programa oficial del evento.",
    details_fr:
      "Un des points de restauration officiels gérés par l'organisation Adunata Nazionale Alpini Biella 2025. Propose des repas chauds et des boissons. Situé dans la zone de Via Gaetano de Marchi. Les horaires spécifiques seront définis par le programme officiel de l'événement.",
    details_de:
      "Einer der offiziellen Verpflegungspunkte, die von der Organisation Adunata Nazionale Alpini Biella 2025 verwaltet werden. Bietet warme Mahlzeiten und Getränke an. Befindet sich im Bereich der Via Gaetano de Marchi. Genaue Öffnungszeiten werden durch das offizielle Veranstaltungsprogramm festgelegt.",
    address: "Via Gaetano de Marchi, 1-3 (Area Evento), Biella", // Specific address range + area indicator
    phone: "", // Leave blank unless a specific event contact number is provided
    website: "", // Leave blank unless linked from the official Adunata site
    openingHours: "Orari evento (Vedi Programma Ufficiale)", // Indicate dependence on event schedule
    openingHours_en: "Event hours (See Official Program)",
    openingHours_es: "Horario del evento (Ver Programa Oficial)",
    openingHours_fr: "Horaires de l'événement (Voir Programme Officiel)",
    openingHours_de: "Veranstaltungszeiten (Siehe Offizielles Programm)",
    tags: [
      "Ristorante",
      "Adunata",
      "Ufficiale",
      "Pasto Caldo",
      "Evento",
      "Via de Marchi",
    ], // Relevant tags
    tags_en: [
      "Restaurant",
      "Adunata",
      "Official",
      "Hot Meal",
      "Event",
      "Via de Marchi",
    ],
    tags_es: [
      "Restaurante",
      "Adunata",
      "Oficial",
      "Comida Caliente",
      "Evento",
      "Via de Marchi",
    ],
    tags_fr: [
      "Restaurant",
      "Adunata",
      "Officiel",
      "Repas Chaud",
      "Événement",
      "Via de Marchi",
    ],
    tags_de: [
      "Restaurant",
      "Adunata",
      "Offiziell",
      "Warme Mahlzeit",
      "Veranstaltung",
      "Via de Marchi",
    ],
    // Removed Google Rating/Reviews as they don't apply
    images: ["/images/alpiniRestaurant.png"], // Add paths to official photos/renderings if available
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 207, // New unique ID
    name: "Ristorante Ufficiale Adunata - Zona Vernato", // Clear name indicating official status and general area
    name_en: "Official Adunata Restaurant - Vernato Area",
    name_es: "Restaurante Oficial Adunata - Zona Vernato",
    name_fr: "Restaurant Officiel Adunata - Zone Vernato",
    name_de: "Offizielles Adunata Restaurant - Vernato Bereich",
    type: "restaurant", // Correct type
    // Coordinates point roughly to the center of the Vernato neighborhood.
    // *** ADJUST THESE COORDINATES [45.5565, 8.0660] IF YOU KNOW THE SPECIFIC LOCATION WITHIN VERNATO ***
    coordinates: [45.560919, 8.049409],
    shortDescription:
      "Punto ristoro ufficiale dell'Adunata 2025 in zona Vernato.", // Clear, concise description mentioning the area
    shortDescription_en:
      "Official food point for Adunata 2025 in the Vernato area.",
    shortDescription_es:
      "Punto de restauración oficial de la Adunata 2025 en la zona de Vernato.",
    shortDescription_fr:
      "Point de restauration officiel de l'Adunata 2025 dans la zone de Vernato.",
    shortDescription_de:
      "Offizieller Verpflegungsstand der Adunata 2025 im Vernato-Bereich.",
    details:
      "Uno dei punti ristoro ufficiali gestiti dall'organizzazione dell'Adunata Nazionale Alpini Biella 2025. Offre pasti caldi e bevande. Situato nella zona del Vernato. Gli orari specifici saranno definiti dal programma ufficiale dell'evento.", // More detail about its nature
    details_en:
      "One of the official food points managed by the Adunata Nazionale Alpini Biella 2025 organization. Offers hot meals and drinks. Located in the Vernato area. Specific opening hours will be defined by the official event program.",
    details_es:
      "Uno de los puntos de restauración oficiales gestionados por la organización Adunata Nazionale Alpini Biella 2025. Ofrece comidas calientes y bebidas. Ubicado en la zona de Vernato. Los horarios específicos serán definidos por el programa oficial del evento.",
    details_fr:
      "Un des points de restauration officiels gérés par l'organisation Adunata Nazionale Alpini Biella 2025. Propose des repas chauds et des boissons. Situé dans la zone de Vernato. Les horaires spécifiques seront définis par le programme officiel de l'événement.",
    details_de:
      "Einer der offiziellen Verpflegungspunkte, die von der Organisation Adunata Nazionale Alpini Biella 2025 verwaltet werden. Bietet warme Mahlzeiten und Getränke an. Befindet sich im Vernato-Bereich. Genaue Öffnungszeiten werden durch das offizielle Veranstaltungsprogramm festgelegt.",
    address: "Zona Vernato (Area Evento), Biella", // General address indicating the neighborhood
    phone: "", // Leave blank unless a specific event contact number is provided
    website: "", // Leave blank unless linked from the official Adunata site
    openingHours: "Orari evento (Vedi Programma Ufficiale)", // Indicate dependence on event schedule
    openingHours_en: "Event hours (See Official Program)",
    openingHours_es: "Horario del evento (Ver Programa Oficial)",
    openingHours_fr: "Horaires de l'événement (Voir Programme Officiel)",
    openingHours_de: "Veranstaltungszeiten (Siehe Offizielles Programm)",
    tags: [
      "Ristorante",
      "Adunata",
      "Ufficiale",
      "Pasto Caldo",
      "Evento",
      "Vernato",
    ], // Relevant tags
    tags_en: [
      "Restaurant",
      "Adunata",
      "Official",
      "Hot Meal",
      "Event",
      "Vernato",
    ],
    tags_es: [
      "Restaurante",
      "Adunata",
      "Oficial",
      "Comida Caliente",
      "Evento",
      "Vernato",
    ],
    tags_fr: [
      "Restaurant",
      "Adunata",
      "Officiel",
      "Repas Chaud",
      "Événement",
      "Vernato",
    ],
    tags_de: [
      "Restaurant",
      "Adunata",
      "Offiziell",
      "Warme Mahlzeit",
      "Veranstaltung",
      "Vernato",
    ],
    // Removed Google Rating/Reviews as they don't apply
    images: ["/images/alpiniRestaurant.png"], // Add paths to official photos/renderings if available
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 301, // New unique ID
    name: "Posto Medico Avanzato - Via Arnulfo", // Name indicating type and location
    name_en: "Advanced Medical Post - Via Arnulfo",
    name_es: "Puesto Médico Avanzado - Via Arnulfo",
    name_fr: "Poste Médical Avancé - Via Arnulfo",
    name_de: "Erweiterter Sanitätsposten - Via Arnulfo",
    type: "medical_post", // Use the new type
    coordinates: [45.564899, 8.051914], // Approximate Coordinates for Via Arnulfo 8-12 - ADJUST IF NEEDED
    shortDescription: "Punto di primo soccorso avanzato per l'Adunata.", // Short description
    shortDescription_en: "Advanced first aid point for the Adunata.",
    shortDescription_es: "Punto de primeros auxilios avanzado para la Adunata.",
    shortDescription_fr: "Poste de premiers secours avancé pour l'Adunata.",
    shortDescription_de: "Erweiterter Erste-Hilfe-Posten für die Adunata.",
    details:
      "Postazione medica avanzata gestita dai servizi sanitari per l'Adunata Nazionale Alpini Biella 2025. Fornisce assistenza medica e primo soccorso per emergenze. Situato nell'area di Via Arnulfo. Fare riferimento al piano sanitario ufficiale per dettagli e orari.", // Detailed description
    details_en:
      "Advanced medical station managed by the health services for the Adunata Nazionale Alpini Biella 2025. Provides medical assistance and first aid for emergencies. Located in the Via Arnulfo area. Refer to the official health plan for details and hours.",
    details_es:
      "Puesto médico avanzado gestionado por los servicios sanitarios para la Adunata Nazionale Alpini Biella 2025. Proporciona asistencia médica y primeros auxilios para emergencias. Ubicado en la zona de Via Arnulfo. Consulte el plan sanitario oficial para obtener detalles y horarios.",
    details_fr:
      "Poste médical avancé géré par les services de santé pour l'Adunata Nazionale Alpini Biella 2025. Fournit une assistance médicale et les premiers secours en cas d'urgence. Situé dans la zone de Via Arnulfo. Consulter le plan sanitaire officiel pour les détails et les horaires.",
    details_de:
      "Vom Gesundheitsdienst für die Adunata Nazionale Alpini Biella 2025 verwalteter erweiterter medizinischer Posten. Bietet medizinische Hilfe und Erste Hilfe bei Notfällen. Befindet sich im Bereich der Via Arnulfo. Einzelheiten und Öffnungszeiten finden Sie im offiziellen Gesundheitsplan.",
    address: "Via Giuseppe Arnulfo, 8-12 (Area Sanitaria), Biella", // Specific address + area indicator
    phone: "", // Usually refer to general emergency numbers (112/118)
    website: "", // N/A
    openingHours: "Orari evento / Emergenze (Vedi Piano Sanitario)", // Indicate dependence on event/emergency plan
    openingHours_en: "Event hours / Emergencies (See Health Plan)",
    openingHours_es: "Horario del evento / Emergencias (Ver Plan Sanitario)",
    openingHours_fr: "Horaires de l'événement / Urgences (Voir Plan Sanitaire)",
    openingHours_de: "Veranstaltungszeiten / Notfälle (Siehe Gesundheitsplan)",
    tags: [
      "Medico",
      "Pronto Soccorso",
      "Emergenza",
      "Adunata",
      "Ufficiale",
      "Via Arnulfo",
      "PMA",
    ], // Relevant tags (PMA=Posto Medico Avanzato)
    tags_en: [
      "Medical",
      "First Aid",
      "Emergency",
      "Adunata",
      "Official",
      "Via Arnulfo",
      "AMP",
    ], // AMP=Advanced Medical Post
    tags_es: [
      "Médico",
      "Primeros Auxilios",
      "Emergencia",
      "Adunata",
      "Oficial",
      "Via Arnulfo",
      "PMA",
    ],
    tags_fr: [
      "Médical",
      "Premiers Secours",
      "Urgence",
      "Adunata",
      "Officiel",
      "Via Arnulfo",
      "PMA",
    ],
    tags_de: [
      "Medizinisch",
      "Erste Hilfe",
      "Notfall",
      "Adunata",
      "Offiziell",
      "Via Arnulfo",
      "EMP",
    ], // EMP=Erweiterter Med. Posten
    // Removed Google Rating/Reviews as they don't apply
    images: ["/images/medicoAlpini.png"], // Add paths to official photos/renderings if available
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 302, // New unique ID
    name: "Posto Medico Avanzato - Via Bertodano", // Name indicating type and location
    name_en: "Advanced Medical Post - Via Bertodano",
    name_es: "Puesto Médico Avanzado - Via Bertodano",
    name_fr: "Poste Médical Avancé - Via Bertodano",
    name_de: "Erweiterter Sanitätsposten - Via Bertodano",
    type: "medical_post", // Use the medical_post type
    coordinates: [45.563119, 8.059629], // Approximate Coordinates for Via Bertodano 8/A - ADJUST IF NEEDED
    shortDescription: "Punto di primo soccorso avanzato per l'Adunata.", // Short description
    shortDescription_en: "Advanced first aid point for the Adunata.",
    shortDescription_es: "Punto de primeros auxilios avanzado para la Adunata.",
    shortDescription_fr: "Poste de premiers secours avancé pour l'Adunata.",
    shortDescription_de: "Erweiterter Erste-Hilfe-Posten für die Adunata.",
    details:
      "Postazione medica avanzata gestita dai servizi sanitari per l'Adunata Nazionale Alpini Biella 2025. Fornisce assistenza medica e primo soccorso per emergenze. Situato in Via Bertodano. Fare riferimento al piano sanitario ufficiale per dettagli e orari.", // Detailed description
    details_en:
      "Advanced medical station managed by the health services for the Adunata Nazionale Alpini Biella 2025. Provides medical assistance and first aid for emergencies. Located on Via Bertodano. Refer to the official health plan for details and hours.",
    details_es:
      "Puesto médico avanzado gestionado por los servicios sanitarios para la Adunata Nazionale Alpini Biella 2025. Proporciona asistencia médica y primeros auxilios para emergencias. Ubicado en Via Bertodano. Consulte el plan sanitario oficial para obtener detalles y horarios.",
    details_fr:
      "Poste médical avancé géré par les services de santé pour l'Adunata Nazionale Alpini Biella 2025. Fournit une assistance médicale et les premiers secours en cas d'urgence. Situé Via Bertodano. Consulter le plan sanitaire officiel pour les détails et les horaires.",
    details_de:
      "Vom Gesundheitsdienst für die Adunata Nazionale Alpini Biella 2025 verwalteter erweiterter medizinischer Posten. Bietet medizinische Hilfe und Erste Hilfe bei Notfällen. Befindet sich an der Via Bertodano. Einzelheiten und Öffnungszeiten finden Sie im offiziellen Gesundheitsplan.",
    address: "Via Bertodano, 8/A (Area Sanitaria), Biella", // Specific address + area indicator
    phone: "", // Usually refer to general emergency numbers (112/118)
    website: "", // N/A
    openingHours: "Orari evento / Emergenze (Vedi Piano Sanitario)", // Indicate dependence on event/emergency plan
    openingHours_en: "Event hours / Emergencies (See Health Plan)",
    openingHours_es: "Horario del evento / Emergencias (Ver Plan Sanitario)",
    openingHours_fr: "Horaires de l'événement / Urgences (Voir Plan Sanitaire)",
    openingHours_de: "Veranstaltungszeiten / Notfälle (Siehe Gesundheitsplan)",
    tags: [
      "Medico",
      "Pronto Soccorso",
      "Emergenza",
      "Adunata",
      "Ufficiale",
      "Via Bertodano",
      "PMA",
    ], // Relevant tags
    tags_en: [
      "Medical",
      "First Aid",
      "Emergency",
      "Adunata",
      "Official",
      "Via Bertodano",
      "AMP",
    ],
    tags_es: [
      "Médico",
      "Primeros Auxilios",
      "Emergencia",
      "Adunata",
      "Oficial",
      "Via Bertodano",
      "PMA",
    ],
    tags_fr: [
      "Médical",
      "Premiers Secours",
      "Urgence",
      "Adunata",
      "Officiel",
      "Via Bertodano",
      "PMA",
    ],
    tags_de: [
      "Medizinisch",
      "Erste Hilfe",
      "Notfall",
      "Adunata",
      "Offiziell",
      "Via Bertodano",
      "EMP",
    ],
    // Removed Google Rating/Reviews as they don't apply
    images: ["/images/medicoAlpini.png"], // Add paths to official photos/renderings if available
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 303, // New unique ID
    name: "Posto Medico Avanzato - Via Tripoli", // Name indicating type and location
    name_en: "Advanced Medical Post - Via Tripoli",
    name_es: "Puesto Médico Avanzado - Via Tripoli",
    name_fr: "Poste Médical Avancé - Via Tripoli",
    name_de: "Erweiterter Sanitätsposten - Via Tripoli",
    type: "medical_post", // Use the medical_post type
    coordinates: [45.559579, 8.055032], // Approximate Coordinates for Via Tripoli 16/A - ADJUST IF NEEDED
    shortDescription: "Punto di primo soccorso avanzato per l'Adunata.", // Short description
    shortDescription_en: "Advanced first aid point for the Adunata.",
    shortDescription_es: "Punto de primeros auxilios avanzado para la Adunata.",
    shortDescription_fr: "Poste de premiers secours avancé pour l'Adunata.",
    shortDescription_de: "Erweiterter Erste-Hilfe-Posten für die Adunata.",
    details:
      "Postazione medica avanzata gestita dai servizi sanitari per l'Adunata Nazionale Alpini Biella 2025. Fornisce assistenza medica e primo soccorso per emergenze. Situato in Via Tripoli. Fare riferimento al piano sanitario ufficiale per dettagli e orari.", // Detailed description
    details_en:
      "Advanced medical station managed by the health services for the Adunata Nazionale Alpini Biella 2025. Provides medical assistance and first aid for emergencies. Located on Via Tripoli. Refer to the official health plan for details and hours.",
    details_es:
      "Puesto médico avanzado gestionado por los servicios sanitarios para la Adunata Nazionale Alpini Biella 2025. Proporciona asistencia médica y primeros auxilios para emergencias. Ubicado en Via Tripoli. Consulte el plan sanitario oficial para obtener detalles y horarios.",
    details_fr:
      "Poste médical avancé géré par les services de santé pour l'Adunata Nazionale Alpini Biella 2025. Fournit une assistance médicale et les premiers secours en cas d'urgence. Situé Via Tripoli. Consulter le plan sanitaire officiel pour les détails et les horaires.",
    details_de:
      "Vom Gesundheitsdienst für die Adunata Nazionale Alpini Biella 2025 verwalteter erweiterter medizinischer Posten. Bietet medizinische Hilfe und Erste Hilfe bei Notfällen. Befindet sich an der Via Tripoli. Einzelheiten und Öffnungszeiten finden Sie im offiziellen Gesundheitsplan.",
    address: "Via Tripoli, 16/A (Area Sanitaria), Biella", // Specific address + area indicator
    phone: "", // Usually refer to general emergency numbers (112/118)
    website: "", // N/A
    openingHours: "Orari evento / Emergenze (Vedi Piano Sanitario)", // Indicate dependence on event/emergency plan
    openingHours_en: "Event hours / Emergencies (See Health Plan)",
    openingHours_es: "Horario del evento / Emergencias (Ver Plan Sanitario)",
    openingHours_fr: "Horaires de l'événement / Urgences (Voir Plan Sanitaire)",
    openingHours_de: "Veranstaltungszeiten / Notfälle (Siehe Gesundheitsplan)",
    tags: [
      "Medico",
      "Pronto Soccorso",
      "Emergenza",
      "Adunata",
      "Ufficiale",
      "Via Tripoli",
      "PMA",
    ], // Relevant tags
    tags_en: [
      "Medical",
      "First Aid",
      "Emergency",
      "Adunata",
      "Official",
      "Via Tripoli",
      "AMP",
    ],
    tags_es: [
      "Médico",
      "Primeros Auxilios",
      "Emergencia",
      "Adunata",
      "Oficial",
      "Via Tripoli",
      "PMA",
    ],
    tags_fr: [
      "Médical",
      "Premiers Secours",
      "Urgence",
      "Adunata",
      "Officiel",
      "Via Tripoli",
      "PMA",
    ],
    tags_de: [
      "Medizinisch",
      "Erste Hilfe",
      "Notfall",
      "Adunata",
      "Offiziell",
      "Via Tripoli",
      "EMP",
    ],
    // Removed Google Rating/Reviews as they don't apply
    images: ["/images/medicoAlpini.png"], // Add paths to official photos/renderings if available
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 304, // New unique ID
    name: "Posto Medico Avanzato - Rione San Biagio", // Name indicating type and location
    name_en: "Advanced Medical Post - San Biagio District",
    name_es: "Puesto Médico Avanzado - Barrio San Biagio",
    name_fr: "Poste Médical Avancé - Quartier San Biagio",
    name_de: "Erweiterter Sanitätsposten - Stadtteil San Biagio",
    type: "medical_post", // Use the medical_post type
    // Coordinates point roughly to the central area of Rione San Biagio (near Chiesa di San Biagio).
    // *** ADJUST THESE COORDINATES [45.5620, 8.0480] IF YOU KNOW THE SPECIFIC LOCATION WITHIN SAN BIAGIO ***
    coordinates: [45.555828, 8.05352],
    shortDescription:
      "Punto di primo soccorso avanzato per l'Adunata nel Rione San Biagio.", // Short description
    shortDescription_en:
      "Advanced first aid point for the Adunata in the San Biagio district.",
    shortDescription_es:
      "Punto de primeros auxilios avanzado para la Adunata en el barrio de San Biagio.",
    shortDescription_fr:
      "Poste de premiers secours avancé pour l'Adunata dans le quartier San Biagio.",
    shortDescription_de:
      "Erweiterter Erste-Hilfe-Posten für die Adunata im Stadtteil San Biagio.",
    details:
      "Postazione medica avanzata gestita dai servizi sanitari per l'Adunata Nazionale Alpini Biella 2025. Fornisce assistenza medica e primo soccorso per emergenze. Situato nel Rione San Biagio. Fare riferimento al piano sanitario ufficiale per dettagli e orari.", // Detailed description
    details_en:
      "Advanced medical station managed by the health services for the Adunata Nazionale Alpini Biella 2025. Provides medical assistance and first aid for emergencies. Located in the San Biagio district. Refer to the official health plan for details and hours.",
    details_es:
      "Puesto médico avanzado gestionado por los servicios sanitarios para la Adunata Nazionale Alpini Biella 2025. Proporciona asistencia médica y primeros auxilios para emergencias. Ubicado en el barrio de San Biagio. Consulte el plan sanitario oficial para obtener detalles y horarios.",
    details_fr:
      "Poste médical avancé géré par les services de santé pour l'Adunata Nazionale Alpini Biella 2025. Fournit une assistance médicale et les premiers secours en cas d'urgence. Situé dans le quartier San Biagio. Consulter le plan sanitaire officiel pour les détails et les horaires.",
    details_de:
      "Vom Gesundheitsdienst für die Adunata Nazionale Alpini Biella 2025 verwalteter erweiterter medizinischer Posten. Bietet medizinische Hilfe und Erste Hilfe bei Notfällen. Befindet sich im Stadtteil San Biagio. Einzelheiten und Öffnungszeiten finden Sie im offiziellen Gesundheitsplan.",
    address: "Rione San Biagio (Area Sanitaria), Biella", // General address indicating the neighborhood
    phone: "", // Usually refer to general emergency numbers (112/118)
    website: "", // N/A
    openingHours: "Orari evento / Emergenze (Vedi Piano Sanitario)", // Indicate dependence on event/emergency plan
    openingHours_en: "Event hours / Emergencies (See Health Plan)",
    openingHours_es: "Horario del evento / Emergencias (Ver Plan Sanitario)",
    openingHours_fr: "Horaires de l'événement / Urgences (Voir Plan Sanitaire)",
    openingHours_de: "Veranstaltungszeiten / Notfälle (Siehe Gesundheitsplan)",
    tags: [
      "Medico",
      "Pronto Soccorso",
      "Emergenza",
      "Adunata",
      "Ufficiale",
      "Rione San Biagio",
      "San Biagio",
      "PMA",
    ], // Relevant tags
    tags_en: [
      "Medical",
      "First Aid",
      "Emergency",
      "Adunata",
      "Official",
      "San Biagio District",
      "San Biagio",
      "AMP",
    ],
    tags_es: [
      "Médico",
      "Primeros Auxilios",
      "Emergencia",
      "Adunata",
      "Oficial",
      "Barrio San Biagio",
      "San Biagio",
      "PMA",
    ],
    tags_fr: [
      "Médical",
      "Premiers Secours",
      "Urgence",
      "Adunata",
      "Officiel",
      "Quartier San Biagio",
      "San Biagio",
      "PMA",
    ],
    tags_de: [
      "Medizinisch",
      "Erste Hilfe",
      "Notfall",
      "Adunata",
      "Offiziell",
      "Stadtteil San Biagio",
      "San Biagio",
      "EMP",
    ],
    // Removed Google Rating/Reviews as they don't apply
    images: ["/images/medicoAlpini.png"], // Add paths to official photos/renderings if available
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 305, // New unique ID
    name: "Posto Medico Avanzato - Area Thes", // Name indicating type and general complex area
    name_en: "Advanced Medical Post - ThesArea",
    name_es: "Puesto Médico Avanzado - Área Thes",
    name_fr: "Poste Médical Avancé - Zone Thes",
    name_de: "Erweiterter Sanitätsposten - Bereich Thes",
    type: "medical_post", // Use the medical_post type
    // Coordinates point to the general area of Thes/Città Studi.
    // *** ADJUST THESE COORDINATES [45.5775, 8.0410] IF YOU KNOW THE SPECIFIC BUILDING/LOCATION ***
    coordinates: [45.559597, 8.041966],
    shortDescription:
      "Punto di primo soccorso avanzato per l'Adunata presso Area Thes.", // Short description
    shortDescription_en:
      "Advanced first aid point for the Adunata at the Thes Area.",
    shortDescription_es:
      "Punto de primeros auxilios avanzado para la Adunata en el Área Thes.",
    shortDescription_fr:
      "Poste de premiers secours avancé pour l'Adunata dans la zone Thes.",
    shortDescription_de:
      "Erweiterter Erste-Hilfe-Posten für die Adunata im Thes-Bereich.",
    details:
      "Postazione medica avanzata gestita dai servizi sanitari per l'Adunata Nazionale Alpini Biella 2025. Fornisce assistenza medica e primo soccorso per emergenze. Situato nell'Area Thes / Città Studi. Fare riferimento al piano sanitario ufficiale per dettagli e orari.", // Detailed description
    details_en:
      "Advanced medical station managed by the health services for the Adunata Nazionale Alpini Biella 2025. Provides medical assistance and first aid for emergencies. Located in the Thes / Città Studi Area. Refer to the official health plan for details and hours.",
    details_es:
      "Puesto médico avanzado gestionado por los servicios sanitarios para la Adunata Nazionale Alpini Biella 2025. Proporciona asistencia médica y primeros auxilios para emergencias. Ubicado en el Área Thes / Città Studi. Consulte el plan sanitario oficial para obtener detalles y horarios.",
    details_fr:
      "Poste médical avancé géré par les services de santé pour l'Adunata Nazionale Alpini Biella 2025. Fournit une assistance médicale et les premiers secours en cas d'urgence. Situé dans la zone Thes / Città Studi. Consulter le plan sanitaire officiel pour les détails et les horaires.",
    details_de:
      "Vom Gesundheitsdienst für die Adunata Nazionale Alpini Biella 2025 verwalteter erweiterter medizinischer Posten. Bietet medizinische Hilfe und Erste Hilfe bei Notfällen. Befindet sich im Bereich Thes / Città Studi. Einzelheiten und Öffnungszeiten finden Sie im offiziellen Gesundheitsplan.",
    address: "Area Thes / Città Studi (Area Sanitaria), Biella", // General address indicating the complex
    phone: "", // Usually refer to general emergency numbers (112/118)
    website: "", // N/A
    openingHours: "Orari evento / Emergenze (Vedi Piano Sanitario)", // Indicate dependence on event/emergency plan
    openingHours_en: "Event hours / Emergencies (See Health Plan)",
    openingHours_es: "Horario del evento / Emergencias (Ver Plan Sanitario)",
    openingHours_fr: "Horaires de l'événement / Urgences (Voir Plan Sanitaire)",
    openingHours_de: "Veranstaltungszeiten / Notfälle (Siehe Gesundheitsplan)",
    tags: [
      "Medico",
      "Pronto Soccorso",
      "Emergenza",
      "Adunata",
      "Ufficiale",
      "Thes",
      "Città Studi",
      "PMA",
    ], // Relevant tags
    tags_en: [
      "Medical",
      "First Aid",
      "Emergency",
      "Adunata",
      "Official",
      "Thes",
      "Città Studi",
      "AMP",
    ],
    tags_es: [
      "Médico",
      "Primeros Auxilios",
      "Emergencia",
      "Adunata",
      "Oficial",
      "Thes",
      "Città Studi",
      "PMA",
    ],
    tags_fr: [
      "Médical",
      "Premiers Secours",
      "Urgence",
      "Adunata",
      "Officiel",
      "Thes",
      "Città Studi",
      "PMA",
    ],
    tags_de: [
      "Medizinisch",
      "Erste Hilfe",
      "Notfall",
      "Adunata",
      "Offiziell",
      "Thes",
      "Città Studi",
      "EMP",
    ],
    // Removed Google Rating/Reviews as they don't apply
    images: ["/images/medicoAlpini.png"], // Add paths to official photos/renderings if available
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 306, // New unique ID
    name: "Ospedale da Campo Adunata - Zona Vernato", // Name indicating type and general area
    name_en: "Adunata Field Hospital - Vernato Area",
    name_es: "Hospital de Campaña Adunata - Zona Vernato",
    name_fr: "Hôpital de Campagne Adunata - Zone Vernato",
    name_de: "Adunata Feldlazarett - Vernato Bereich",
    type: "field_hospital", // Use the new type
    // Using the same approximate Vernato coordinates as before.
    // *** ADJUST THESE COORDINATES [45.5565, 8.0660] IF YOU KNOW THE SPECIFIC LOCATION WITHIN VERNATO ***
    coordinates: [45.560685, 8.049302],
    shortDescription: "Ospedale da campo principale per l'Adunata 2025.", // Short description emphasizing importance
    shortDescription_en: "Main field hospital for Adunata 2025.",
    shortDescription_es: "Hospital de campaña principal para la Adunata 2025.",
    shortDescription_fr: "Hôpital de campagne principal pour l'Adunata 2025.",
    shortDescription_de: "Hauptfeldlazarett für die Adunata 2025.",
    details:
      "Ospedale da campo allestito per l'Adunata Nazionale Alpini Biella 2025, gestito dai servizi sanitari e dalla Protezione Civile. Fornisce un livello di assistenza medica superiore ai Posti Medici Avanzati per emergenze e necessità maggiori. Situato nella zona del Vernato. Fare riferimento al piano sanitario ufficiale per dettagli operativi e orari.", // Detailed description highlighting its role
    details_en:
      "Field hospital set up for the Adunata Nazionale Alpini Biella 2025, managed by health services and Civil Protection. Provides a higher level of medical assistance than Advanced Medical Posts for emergencies and greater needs. Located in the Vernato area. Refer to the official health plan for operational details and hours.",
    details_es:
      "Hospital de campaña instalado para la Adunata Nazionale Alpini Biella 2025, gestionado por los servicios sanitarios y Protección Civil. Proporciona un nivel de asistencia médica superior a los Puestos Médicos Avanzados para emergencias y necesidades mayores. Ubicado en la zona de Vernato. Consulte el plan sanitario oficial para detalles operativos y horarios.",
    details_fr:
      "Hôpital de campagne mis en place pour l'Adunata Nazionale Alpini Biella 2025, géré par les services de santé et la Protection Civile. Fournit un niveau d'assistance médicale supérieur aux Postes Médicaux Avancés pour les urgences et les besoins plus importants. Situé dans la zone de Vernato. Consulter le plan sanitaire officiel pour les détails opérationnels et les horaires.",
    details_de:
      "Für die Adunata Nazionale Alpini Biella 2025 eingerichtetes Feldlazarett, das vom Gesundheitsdienst und dem Zivilschutz verwaltet wird. Bietet ein höheres Maß an medizinischer Versorgung als Erweiterte Sanitätsposten für Notfälle und größere Bedürfnisse. Befindet sich im Vernato-Bereich. Einzelheiten zum Betrieb und zu den Öffnungszeiten finden Sie im offiziellen Gesundheitsplan.",
    address: "Zona Vernato (Ospedale da Campo), Biella", // General address indicating the neighborhood and type
    phone: "", // Usually refer to general emergency numbers (112/118)
    website: "", // N/A
    openingHours: "Operativo H24 durante l'evento (Vedi Piano Sanitario)", // Likely 24h during event, but verify
    openingHours_en: "Operational 24h during event (See Health Plan)",
    openingHours_es: "Operativo 24h durante el evento (Ver Plan Sanitario)",
    openingHours_fr:
      "Opérationnel 24h/24 pendant l'événement (Voir Plan Sanitaire)",
    openingHours_de:
      "Während der Veranstaltung rund um die Uhr geöffnet (Siehe Gesundheitsplan)",
    tags: [
      "Medico",
      "Ospedale da Campo",
      "Emergenza",
      "Adunata",
      "Ufficiale",
      "Vernato",
      "Sanità",
      "Protezione Civile",
    ], // Relevant tags
    tags_en: [
      "Medical",
      "Field Hospital",
      "Emergency",
      "Adunata",
      "Official",
      "Vernato",
      "Healthcare",
      "Civil Protection",
    ],
    tags_es: [
      "Médico",
      "Hospital de Campaña",
      "Emergencia",
      "Adunata",
      "Oficial",
      "Vernato",
      "Sanidad",
      "Protección Civil",
    ],
    tags_fr: [
      "Médical",
      "Hôpital de Campagne",
      "Urgence",
      "Adunata",
      "Officiel",
      "Vernato",
      "Santé",
      "Protection Civile",
    ],
    tags_de: [
      "Medizinisch",
      "Feldlazarett",
      "Notfall",
      "Adunata",
      "Offiziell",
      "Vernato",
      "Gesundheitswesen",
      "Zivilschutz",
    ],
    // Removed Google Rating/Reviews as they don't apply
    images: ["/images/medicoAlpini.png"], // Add paths to official photos/renderings if available
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 32, // Keep the existing ID
    name: "WC Pubblico - Piazza Colonnetti", // Updated location in name
    name_en: "Public WC - Piazza Colonnetti",
    name_es: "WC Público - Piazza Colonnetti",
    name_fr: "WC Public - Piazza Colonnetti",
    name_de: "Öffentliche Toilette - Piazza Colonnetti",
    type: "wc", // Keep the correct type
    coordinates: [45.568446, 8.049719], // Approximate Coordinates for Piazza Colonnetti - ADJUST IF NEEDED
    shortDescription:
      "Servizi igienici pubblici disponibili durante l'Adunata.", // Keep short description
    shortDescription_en: "Public restrooms available during the Adunata.",
    shortDescription_es: "Baños públicos disponibles durante la Adunata.",
    shortDescription_fr: "Toilettes publiques disponibles pendant l'Adunata.",
    shortDescription_de: "Öffentliche Toiletten während der Adunata verfügbar.",
    details:
      "Bagni pubblici situati in Piazza Colonnetti, accessibili durante gli orari principali dell'evento Adunata 2025. La manutenzione sarà potenziata durante i giorni dell'evento.", // Updated location in details
    details_en:
      "Public restrooms located in Piazza Colonnetti, accessible during the main event hours of Adunata 2025. Maintenance will be enhanced during the event days.",
    details_es:
      "Baños públicos ubicados en Piazza Colonnetti, accesibles durante las horas principales del evento Adunata 2025. El mantenimiento se mejorará durante los días del evento.",
    details_fr:
      "Toilettes publiques situées Piazza Colonnetti, accessibles pendant les heures principales de l'événement Adunata 2025. L'entretien sera renforcé pendant les jours de l'événement.",
    details_de:
      "Öffentliche Toiletten an der Piazza Colonnetti, zugänglich während der Hauptveranstaltungszeiten der Adunata 2025. Die Wartung wird während der Veranstaltungstage verstärkt.",
    address: "Piazza Colonnetti, Biella", // Updated address
    phone: "", // No specific phone
    website: "", // No website
    openingHours: "Orari evento (Verificare su programma)", // Event hours, verification needed
    openingHours_en: "Event hours (Check program)",
    openingHours_es: "Horario del evento (Consultar programa)",
    openingHours_fr: "Horaires de l'événement (Consulter le programme)",
    openingHours_de: "Veranstaltungszeiten (Siehe Programm)",
    tags: [
      "WC",
      "Bagno",
      "Servizi Igienici",
      "Pubblico",
      "Adunata",
      "Piazza Colonnetti",
    ], // Updated tags
    tags_en: [
      "WC",
      "Restroom",
      "Sanitary Services",
      "Public",
      "Adunata",
      "Piazza Colonnetti",
    ],
    tags_es: [
      "WC",
      "Baño",
      "Servicios Sanitarios",
      "Público",
      "Adunata",
      "Piazza Colonnetti",
    ],
    tags_fr: [
      "WC",
      "Toilettes",
      "Services Sanitaires",
      "Public",
      "Adunata",
      "Piazza Colonnetti",
    ],
    tags_de: [
      "WC",
      "Toilette",
      "Sanitäre Anlagen",
      "Öffentlich",
      "Adunata",
      "Piazza Colonnetti",
    ],
    images: ["/images/wc.png"], // Keep the image path
    // Ensure other fields not applicable to WC are absent or empty
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 33, // New unique ID
    name: "WC Pubblico - Piazza Unità d'Italia", // Updated location in name
    name_en: "Public WC - Piazza Unità d'Italia",
    name_es: "WC Público - Piazza Unità d'Italia",
    name_fr: "WC Public - Piazza Unità d'Italia",
    name_de: "Öffentliche Toilette - Piazza Unità d'Italia",
    type: "wc", // Keep the correct type
    coordinates: [45.560519, 8.049141], // Approximate Coordinates for Piazza Unità d'Italia - ADJUST IF NEEDED
    shortDescription:
      "Servizi igienici pubblici disponibili durante l'Adunata.", // Keep short description
    shortDescription_en: "Public restrooms available during the Adunata.",
    shortDescription_es: "Baños públicos disponibles durante la Adunata.",
    shortDescription_fr: "Toilettes publiques disponibles pendant l'Adunata.",
    shortDescription_de: "Öffentliche Toiletten während der Adunata verfügbar.",
    details:
      "Bagni pubblici situati in Piazza Unità d'Italia, accessibili durante gli orari principali dell'evento Adunata 2025. La manutenzione sarà potenziata durante i giorni dell'evento.", // Updated location in details
    details_en:
      "Public restrooms located in Piazza Unità d'Italia, accessible during the main event hours of Adunata 2025. Maintenance will be enhanced during the event days.",
    details_es:
      "Baños públicos ubicados en Piazza Unità d'Italia, accesibles durante las horas principales del evento Adunata 2025. El mantenimiento se mejorará durante los días del evento.",
    details_fr:
      "Toilettes publiques situées Piazza Unità d'Italia, accessibles pendant les heures principales de l'événement Adunata 2025. L'entretien sera renforcé pendant les jours de l'événement.",
    details_de:
      "Öffentliche Toiletten an der Piazza Unità d'Italia, zugänglich während der Hauptveranstaltungszeiten der Adunata 2025. Die Wartung wird während der Veranstaltungstage verstärkt.",
    address: "Piazza Unità d'Italia, Biella", // Updated address
    phone: "", // No specific phone
    website: "", // No website
    openingHours: "Orari evento (Verificare su programma)", // Event hours, verification needed
    openingHours_en: "Event hours (Check program)",
    openingHours_es: "Horario del evento (Consultar programa)",
    openingHours_fr: "Horaires de l'événement (Consulter le programme)",
    openingHours_de: "Veranstaltungszeiten (Siehe Programm)",
    tags: [
      "WC",
      "Bagno",
      "Servizi Igienici",
      "Pubblico",
      "Adunata",
      "Piazza Unità d'Italia",
    ], // Updated tags
    tags_en: [
      "WC",
      "Restroom",
      "Sanitary Services",
      "Public",
      "Adunata",
      "Piazza Unità d'Italia",
    ],
    tags_es: [
      "WC",
      "Baño",
      "Servicios Sanitarios",
      "Público",
      "Adunata",
      "Piazza Unità d'Italia",
    ],
    tags_fr: [
      "WC",
      "Toilettes",
      "Services Sanitaires",
      "Public",
      "Adunata",
      "Piazza Unità d'Italia",
    ],
    tags_de: [
      "WC",
      "Toilette",
      "Sanitäre Anlagen",
      "Öffentlich",
      "Adunata",
      "Piazza Unità d'Italia",
    ],
    images: ["/images/wc.png"], // Keep the generic image path
    // Ensure other fields not applicable to WC are absent or empty
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 34, // New unique ID
    name: "WC Pubblico - Rione Centro", // General location in name
    name_en: "Public WC - City Center",
    name_es: "WC Público - Centro Ciudad",
    name_fr: "WC Public - Centre Ville",
    name_de: "Öffentliche Toilette - Stadtzentrum",
    type: "wc", // Keep the correct type
    // Coordinates point roughly to the central area (near Via Italia / Piazza Duomo).
    // *** ADJUST THESE COORDINATES [45.5665, 8.0545] IF YOU KNOW THE SPECIFIC LOCATION WITHIN THE CENTER ***
    coordinates: [45.562905, 8.054404],
    shortDescription:
      "Servizi igienici pubblici disponibili durante l'Adunata nel centro città.", // Mention center
    shortDescription_en:
      "Public restrooms available during the Adunata in the city center.",
    shortDescription_es:
      "Baños públicos disponibles durante la Adunata en el centro de la ciudad.",
    shortDescription_fr:
      "Toilettes publiques disponibles pendant l'Adunata dans le centre-ville.",
    shortDescription_de:
      "Öffentliche Toiletten während der Adunata im Stadtzentrum verfügbar.",
    details:
      "Bagni pubblici situati nel Rione Centro, accessibili durante gli orari principali dell'evento Adunata 2025. Posizione indicativa, potrebbero essercene diversi nell'area. La manutenzione sarà potenziata durante i giorni dell'evento.", // Indicate potential multiple locations
    details_en:
      "Public restrooms located in the City Center district, accessible during the main event hours of Adunata 2025. Location is indicative, there may be several in the area. Maintenance will be enhanced during the event days.",
    details_es:
      "Baños públicos ubicados en el Centro Ciudad, accesibles durante las horas principales del evento Adunata 2025. La ubicación es indicativa, puede haber varios en la zona. El mantenimiento se mejorará durante los días del evento.",
    details_fr:
      "Toilettes publiques situées dans le quartier Centre Ville, accessibles pendant les heures principales de l'événement Adunata 2025. L'emplacement est indicatif, il peut y en avoir plusieurs dans la zone. L'entretien sera renforcé pendant les jours de l'événement.",
    details_de:
      "Öffentliche Toiletten im Stadtzentrum, zugänglich während der Hauptveranstaltungszeiten der Adunata 2025. Der Standort ist indikativ, es können sich mehrere in der Umgebung befinden. Die Wartung wird während der Veranstaltungstage verstärkt.",
    address: "Rione Centro (Varie Posizioni), Biella", // General address indicating the district
    phone: "", // No specific phone
    website: "", // No website
    openingHours: "Orari evento (Verificare su programma)", // Event hours, verification needed
    openingHours_en: "Event hours (Check program)",
    openingHours_es: "Horario del evento (Consultar programa)",
    openingHours_fr: "Horaires de l'événement (Consulter le programme)",
    openingHours_de: "Veranstaltungszeiten (Siehe Programm)",
    tags: [
      "WC",
      "Bagno",
      "Servizi Igienici",
      "Pubblico",
      "Adunata",
      "Rione Centro",
      "Centro",
    ], // Updated tags
    tags_en: [
      "WC",
      "Restroom",
      "Sanitary Services",
      "Public",
      "Adunata",
      "City Center",
      "Center",
    ],
    tags_es: [
      "WC",
      "Baño",
      "Servicios Sanitarios",
      "Público",
      "Adunata",
      "Centro Ciudad",
      "Centro",
    ],
    tags_fr: [
      "WC",
      "Toilettes",
      "Services Sanitaires",
      "Public",
      "Adunata",
      "Centre Ville",
      "Centre",
    ],
    tags_de: [
      "WC",
      "Toilette",
      "Sanitäre Anlagen",
      "Öffentlich",
      "Adunata",
      "Stadtzentrum",
      "Zentrum",
    ],
    images: ["/images/wc.png"], // Keep the generic image path
    // Ensure other fields not applicable to WC are absent or empty
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 35, // Reusing ID, now for WC
    name: "WC Pubblico - Via Arnulfo", // Name indicating type and location
    name_en: "Public WC - Via Arnulfo",
    name_es: "WC Público - Via Arnulfo",
    name_fr: "WC Public - Via Arnulfo",
    name_de: "Öffentliche Toilette - Via Arnulfo",
    type: "wc", // *** CHANGED TYPE TO WC ***
    coordinates: [45.564824, 8.051413], // Approximate Coordinates for Via Arnulfo 9 - ADJUST IF NEEDED
    shortDescription:
      "Servizi igienici pubblici disponibili durante l'Adunata.", // Standard WC description
    shortDescription_en: "Public restrooms available during the Adunata.",
    shortDescription_es: "Baños públicos disponibles durante la Adunata.",
    shortDescription_fr: "Toilettes publiques disponibles pendant l'Adunata.",
    shortDescription_de: "Öffentliche Toiletten während der Adunata verfügbar.",
    details:
      "Bagni pubblici situati in Via Arnulfo, accessibili durante gli orari principali dell'evento Adunata 2025. La manutenzione sarà potenziata durante i giorni dell'evento.", // Standard WC details, updated location
    details_en:
      "Public restrooms located on Via Arnulfo, accessible during the main event hours of Adunata 2025. Maintenance will be enhanced during the event days.",
    details_es:
      "Baños públicos ubicados en Via Arnulfo, accesibles durante las horas principales del evento Adunata 2025. El mantenimiento se mejorará durante los días del evento.",
    details_fr:
      "Toilettes publiques situées Via Arnulfo, accessibles pendant les heures principales de l'événement Adunata 2025. L'entretien sera renforcé pendant les jours de l'événement.",
    details_de:
      "Öffentliche Toiletten an der Via Arnulfo, zugänglich während der Hauptveranstaltungszeiten der Adunata 2025. Die Wartung wird während der Veranstaltungstage verstärkt.",
    address: "Via Giuseppe Arnulfo, 9, Biella", // Correct specific address
    phone: "",
    website: "",
    openingHours: "Orari evento (Verificare su programma)",
    openingHours_en: "Event hours (Check program)",
    openingHours_es: "Horario del evento (Consultar programa)",
    openingHours_fr: "Horaires de l'événement (Consulter le programme)",
    openingHours_de: "Veranstaltungszeiten (Siehe Programm)",
    tags: [
      "WC",
      "Bagno",
      "Servizi Igienici",
      "Pubblico",
      "Adunata",
      "Via Arnulfo",
    ], // Updated tags
    tags_en: [
      "WC",
      "Restroom",
      "Sanitary Services",
      "Public",
      "Adunata",
      "Via Arnulfo",
    ],
    tags_es: [
      "WC",
      "Baño",
      "Servicios Sanitarios",
      "Público",
      "Adunata",
      "Via Arnulfo",
    ],
    tags_fr: [
      "WC",
      "Toilettes",
      "Services Sanitaires",
      "Public",
      "Adunata",
      "Via Arnulfo",
    ],
    tags_de: [
      "WC",
      "Toilette",
      "Sanitäre Anlagen",
      "Öffentlich",
      "Adunata",
      "Via Arnulfo",
    ],
    images: ["/images/wc.png"], // Keep generic WC image path
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 401, // New unique ID for parking
    name: "Parcheggio Auto - Rione San Biagio", // Name indicating type and location
    name_en: "Car Parking - San Biagio District",
    name_es: "Aparcamiento Coches - Barrio San Biagio",
    name_fr: "Parking Voitures - Quartier San Biagio",
    name_de: "PKW-Parkplatz - Stadtteil San Biagio",
    type: "parking", // Use the new type
    // Using the same approximate coordinates for Rione San Biagio as before.
    // *** ADJUST THESE COORDINATES [45.5620, 8.0480] IF YOU KNOW THE SPECIFIC PARKING LOT(S) ***
    coordinates: [45.550722, 8.033904],
    shortDescription: "Area parcheggio per auto disponibile durante l'Adunata.", // Short description
    shortDescription_en: "Car parking area available during the Adunata.",
    shortDescription_es:
      "Zona de aparcamiento para coches disponible durante la Adunata.",
    shortDescription_fr:
      "Zone de stationnement pour voitures disponible pendant l'Adunata.",
    shortDescription_de: "PKW-Parkplatz verfügbar während der Adunata.",
    details:
      "Area designata per il parcheggio di automobili durante l'Adunata Nazionale Alpini Biella 2025, situata nel Rione San Biagio. La capienza e la disponibilità potrebbero variare. Seguire le indicazioni ufficiali dell'evento per l'accesso.", // Detailed description
    details_en:
      "Designated car parking area for the Adunata Nazionale Alpini Biella 2025, located in the San Biagio district. Capacity and availability may vary. Follow official event signage for access.",
    details_es:
      "Zona designada para el aparcamiento de coches durante la Adunata Nazionale Alpini Biella 2025, ubicada en el barrio de San Biagio. La capacidad y disponibilidad pueden variar. Siga las indicaciones oficiales del evento para el acceso.",
    details_fr:
      "Zone désignée pour le stationnement des voitures pendant l'Adunata Nazionale Alpini Biella 2025, située dans le quartier San Biagio. La capacité et la disponibilité peuvent varier. Suivre la signalisation officielle de l'événement pour l'accès.",
    details_de:
      "Ausgewiesener PKW-Parkplatz für die Adunata Nazionale Alpini Biella 2025 im Stadtteil San Biagio. Kapazität und Verfügbarkeit können variieren. Folgen Sie der offiziellen Veranstaltungsbeschilderung für den Zugang.",
    address: "Rione San Biagio (Area Parcheggio), Biella", // General address indicating the neighborhood
    phone: "",
    website: "",
    openingHours: "Accesso durante l'evento (Seguire indicazioni)", // Access depends on event logistics
    openingHours_en: "Access during event (Follow signs)",
    openingHours_es: "Acceso durante el evento (Seguir indicaciones)",
    openingHours_fr: "Accès pendant l'événement (Suivre la signalisation)",
    openingHours_de: "Zugang während der Veranstaltung (Beschilderung folgen)",
    tags: ["Parcheggio", "Auto", "Adunata", "Rione San Biagio", "San Biagio"], // Relevant tags
    tags_en: ["Parking", "Car", "Adunata", "San Biagio District", "San Biagio"],
    tags_es: [
      "Aparcamiento",
      "Coche",
      "Adunata",
      "Barrio San Biagio",
      "San Biagio",
    ],
    tags_fr: [
      "Parking",
      "Voiture",
      "Adunata",
      "Quartier San Biagio",
      "San Biagio",
    ],
    tags_de: [
      "Parkplatz",
      "Auto",
      "Adunata",
      "Stadtteil San Biagio",
      "San Biagio",
    ],
    // Removed Google Rating/Reviews as they don't apply
    images: ["/images/parking.png"], // Add paths to images of the parking area if available
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 402, // New unique ID for parking
    name: "Parcheggio Auto - Via Mino Carlo", // Name indicating type and location
    name_en: "Car Parking - Via Mino Carlo",
    name_es: "Aparcamiento Coches - Via Mino Carlo",
    name_fr: "Parking Voitures - Via Mino Carlo",
    name_de: "PKW-Parkplatz - Via Mino Carlo",
    type: "parking", // Use the parking type
    // Coordinates for Via Mino Carlo, 2 area (likely near Città Studi/Thes).
    // *** ADJUST THESE COORDINATES [45.5758, 8.0430] IF THE EXACT LOT LOCATION IS DIFFERENT ***
    coordinates: [45.546243, 8.06816],
    shortDescription: "Area parcheggio per auto disponibile durante l'Adunata.", // Short description
    shortDescription_en: "Car parking area available during the Adunata.",
    shortDescription_es:
      "Zona de aparcamiento para coches disponible durante la Adunata.",
    shortDescription_fr:
      "Zone de stationnement pour voitures disponible pendant l'Adunata.",
    shortDescription_de: "PKW-Parkplatz verfügbar während der Adunata.",
    details:
      "Area designata per il parcheggio di automobili durante l'Adunata Nazionale Alpini Biella 2025, situata presso Via Mino Carlo, 2. La capienza e la disponibilità potrebbero variare. Seguire le indicazioni ufficiali dell'evento per l'accesso.", // Detailed description
    details_en:
      "Designated car parking area for the Adunata Nazionale Alpini Biella 2025, located at Via Mino Carlo, 2. Capacity and availability may vary. Follow official event signage for access.",
    details_es:
      "Zona designada para el aparcamiento de coches durante la Adunata Nazionale Alpini Biella 2025, ubicada en Via Mino Carlo, 2. La capacidad y disponibilidad pueden variar. Siga las indicaciones oficiales del evento para el acceso.",
    details_fr:
      "Zone désignée pour le stationnement des voitures pendant l'Adunata Nazionale Alpini Biella 2025, située Via Mino Carlo, 2. La capacité et la disponibilité peuvent varier. Suivre la signalisation officielle de l'événement pour l'accès.",
    details_de:
      "Ausgewiesener PKW-Parkplatz für die Adunata Nazionale Alpini Biella 2025 in der Via Mino Carlo 2. Kapazität und Verfügbarkeit können variieren. Folgen Sie der offiziellen Veranstaltungsbeschilderung für den Zugang.",
    address: "Via Mino Carlo, 2, Biella", // Specific address
    phone: "",
    website: "",
    openingHours: "Accesso durante l'evento (Seguire indicazioni)", // Access depends on event logistics
    openingHours_en: "Access during event (Follow signs)",
    openingHours_es: "Acceso durante el evento (Seguir indicaciones)",
    openingHours_fr: "Accès pendant l'événement (Suivre la signalisation)",
    openingHours_de: "Zugang während der Veranstaltung (Beschilderung folgen)",
    tags: [
      "Parcheggio",
      "Auto",
      "Adunata",
      "Via Mino Carlo",
      "Città Studi",
      "Thes",
    ], // Relevant tags
    tags_en: [
      "Parking",
      "Car",
      "Adunata",
      "Via Mino Carlo",
      "Città Studi",
      "Thes",
    ],
    tags_es: [
      "Aparcamiento",
      "Coche",
      "Adunata",
      "Via Mino Carlo",
      "Città Studi",
      "Thes",
    ],
    tags_fr: [
      "Parking",
      "Voiture",
      "Adunata",
      "Via Mino Carlo",
      "Città Studi",
      "Thes",
    ],
    tags_de: [
      "Parkplatz",
      "Auto",
      "Adunata",
      "Via Mino Carlo",
      "Città Studi",
      "Thes",
    ],
    // Removed Google Rating/Reviews as they don't apply
    images: ["/images/parking.png"], // Add paths to images of the parking area if available
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 403, // New unique ID for parking
    name: "Parcheggio Auto - Centro Commerciale Gli Orsi", // Name indicating type and location
    name_en: "Car Parking - Gli Orsi Shopping Center",
    name_es: "Aparcamiento Coches - Centro Comercial Gli Orsi",
    name_fr: "Parking Voitures - Centre Commercial Gli Orsi",
    name_de: "PKW-Parkplatz - Einkaufszentrum Gli Orsi",
    type: "parking", // Use the parking type
    // Coordinates for the main parking area of Gli Orsi.
    // *** VERIFY AND ADJUST [45.5495, 8.0665] IF NEEDED ***
    coordinates: [45.547702, 8.074899],
    shortDescription:
      "Ampio parcheggio presso il centro commerciale, disponibile per l'Adunata.", // Short description
    shortDescription_en:
      "Large parking at the shopping center, available for the Adunata.",
    shortDescription_es:
      "Amplio aparcamiento en el centro comercial, disponible para la Adunata.",
    shortDescription_fr:
      "Grand parking au centre commercial, disponible pour l'Adunata.",
    shortDescription_de:
      "Großer Parkplatz am Einkaufszentrum, verfügbar für die Adunata.",
    details:
      "Ampia area di parcheggio del Centro Commerciale Gli Orsi, designata per l'utilizzo durante l'Adunata Nazionale Alpini Biella 2025. La capienza è elevata ma la disponibilità potrebbe variare nei momenti di punta. Seguire le indicazioni ufficiali dell'evento per l'accesso alle aree riservate.", // Detailed description
    details_en:
      "Large parking area at the Gli Orsi Shopping Center, designated for use during the Adunata Nazionale Alpini Biella 2025. High capacity, but availability may vary during peak times. Follow official event signage for access to reserved areas.",
    details_es:
      "Amplia zona de aparcamiento del Centro Comercial Gli Orsi, designada para su uso durante la Adunata Nazionale Alpini Biella 2025. Alta capacidad, pero la disponibilidad puede variar en horas punta. Siga las indicaciones oficiales del evento para acceder a las áreas reservadas.",
    details_fr:
      "Grande zone de stationnement du Centre Commercial Gli Orsi, désignée pour être utilisée pendant l'Adunata Nazionale Alpini Biella 2025. Grande capacité, mais la disponibilité peut varier aux heures de pointe. Suivre la signalisation officielle de l'événement pour accéder aux zones réservées.",
    details_de:
      "Großer Parkplatzbereich des Einkaufszentrums Gli Orsi, zur Nutzung während der Adunata Nazionale Alpini Biella 2025 ausgewiesen. Hohe Kapazität, Verfügbarkeit kann jedoch zu Spitzenzeiten variieren. Folgen Sie der offiziellen Veranstaltungsbeschilderung für den Zugang zu reservierten Bereichen.",
    address: "Centro Commerciale Gli Orsi (Via B. Bona / Via G. Carso), Biella", // Indicate Shopping Center / nearby streets
    phone: "",
    website: "", // Could add Gli Orsi website if relevant: https://gliorsi.it/
    openingHours: "Accesso durante l'evento (Seguire indicazioni)", // Access depends on event logistics
    openingHours_en: "Access during event (Follow signs)",
    openingHours_es: "Acceso durante el evento (Seguir indicaciones)",
    openingHours_fr: "Accès pendant l'événement (Suivre la signalisation)",
    openingHours_de: "Zugang während der Veranstaltung (Beschilderung folgen)",
    tags: [
      "Parcheggio",
      "Auto",
      "Adunata",
      "Gli Orsi",
      "Centro Commerciale",
      "Via Bona",
      "Via Carso",
    ], // Relevant tags
    tags_en: [
      "Parking",
      "Car",
      "Adunata",
      "Gli Orsi",
      "Shopping Center",
      "Via Bona",
      "Via Carso",
    ],
    tags_es: [
      "Aparcamiento",
      "Coche",
      "Adunata",
      "Gli Orsi",
      "Centro Comercial",
      "Via Bona",
      "Via Carso",
    ],
    tags_fr: [
      "Parking",
      "Voiture",
      "Adunata",
      "Gli Orsi",
      "Centre Commercial",
      "Via Bona",
      "Via Carso",
    ],
    tags_de: [
      "Parkplatz",
      "Auto",
      "Adunata",
      "Gli Orsi",
      "Einkaufszentrum",
      "Via Bona",
      "Via Carso",
    ],
    // Removed Google Rating/Reviews as they don't apply
    images: ["/images/parking.png"], // Add paths to images of the parking area if available
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 501, // Keeping the same ID
    name: "Ottica Mazzoleni Biella", // Correct name
    name_en: "Ottica Mazzoleni Biella (Optician)",
    name_es: "Óptica Mazzoleni Biella",
    name_fr: "Optique Mazzoleni Biella",
    name_de: "Optiker Mazzoleni Biella",
    type: "clothing", // Keeping "Shop/Gadget" type for now
    // --- UPDATED COORDINATES for Via Pietro Micca 31 ---
    coordinates: [45.566179, 8.050573], // Approximate Coordinates - VERIFY/ADJUST IF NEEDED
    shortDescription: "Ottico storico e specializzato nel centro di Biella.", // Updated short description
    shortDescription_en:
      "Historic and specialized optician in the center of Biella.",
    shortDescription_es:
      "Óptica histórica y especializada en el centro de Biella.",
    shortDescription_fr:
      "Opticien historique et spécialisé au centre de Biella.",
    shortDescription_de:
      "Historischer und spezialisierter Optiker im Zentrum von Biella.",
    details:
      "Ottica Mazzoleni (dal 1955) in Via Pietro Micca 31. Ampia scelta occhiali sole/vista, lenti a contatto e riparazioni. Offre esame vista gratuito e veloce (Visionix VR 100). Ideale per necessità durante l'Adunata.",
    details_en:
      "Ottica Mazzoleni (since 1955) at Via Pietro Micca 31. Wide selection of sunglasses/eyeglasses, contact lenses, and repairs. Offers free, fast eye exams (Visionix VR 100). Ideal for needs during the Adunata.",
    details_es:
      "Óptica Mazzoleni (desde 1955) en Via Pietro Micca 31. Amplia selección de gafas de sol/graduadas, lentes de contacto y reparaciones. Ofrece exámenes de la vista gratuitos y rápidos (Visionix VR 100). Ideal para necesidades durante la Adunata.",
    details_fr:
      "Optique Mazzoleni (depuis 1955) Via Pietro Micca 31. Large choix de lunettes de soleil/vue, lentilles de contact et réparations. Propose des examens de vue gratuits et rapides (Visionix VR 100). Idéal pour les besoins pendant l'Adunata.",
    details_de:
      "Optiker Mazzoleni (seit 1955) in Via Pietro Micca 31. Große Auswahl an Sonnen-/Korrektionsbrillen, Kontaktlinsen und Reparaturen. Bietet kostenlose, schnelle Sehtests (Visionix VR 100). Ideal für Bedürfnisse während der Adunata.",
    // --- UPDATED ADDRESS ---
    address: "Via Pietro Micca, 31, 13900 Biella BI", // Corrected Address
    // --- UPDATED PHONE (If different, otherwise keep verified one) ---
    phone: "015 2522439", // Keep the previously found number unless website has different one
    // --- ADD WEBSITE ---
    website: "https://www.otticamazzolenibiella.it/", // Add the actual website
    // --- Opening hours seem standard, keeping previous format ---
    openingHours: "Lun-Sab: 09:30-12:30, 15:30-19:00; Dom: Chiuso",
    openingHours_en: "Mon-Sat: 09:30-12:30, 15:30-19:00; Sun: Closed",
    openingHours_es: "Lun-Sáb: 09:30-12:30, 15:30-19:00; Dom: Cerrado",
    openingHours_fr: "Lun-Sam: 09h30-12h30, 15h30-19h00; Dim: Fermé",
    openingHours_de: "Mo-Sa: 09:30-12:30, 15:30-19:00; So: Geschlossen",
    // --- UPDATED TAGS ---
    tags: [
      "Ottico",
      "Occhiali da Sole",
      "Occhiali da Vista",
      "Lenti a Contatto",
      "Riparazioni",
      "Esame Vista",
      "Centro",
      "Via Micca",
    ], // Added/Updated tags
    tags_en: [
      "Optician",
      "Sunglasses",
      "Eyeglasses",
      "Contact Lenses",
      "Repairs",
      "Eye Exam",
      "City Center",
      "Via Micca",
    ],
    tags_es: [
      "Óptica",
      "Gafas de Sol",
      "Gafas Graduadas",
      "Lentes de Contacto",
      "Reparaciones",
      "Examen Vista",
      "Centro Ciudad",
      "Via Micca",
    ],
    tags_fr: [
      "Opticien",
      "Lunettes de Soleil",
      "Lunettes de Vue",
      "Lentilles de Contact",
      "Réparations",
      "Examen Vue",
      "Centre Ville",
      "Via Micca",
    ],
    tags_de: [
      "Optiker",
      "Sonnenbrillen",
      "Brillen",
      "Kontaktlinsen",
      "Reparaturen",
      "Sehtest",
      "Stadtzentrum",
      "Via Micca",
    ],
    // Add Google Rating/Reviews if available now that it's confirmed business
    googleRating: 4.0, // Example
    googleReviewCount: 1, // Example
    images: ["/images/mazzoleni.png"], // Add paths like ['/images/ottica-mazzoleni-1.jpg']
    discountInfo: "",
    partyInfo: "",
    partyHours: "",
  },
  {
    id: 601, // New unique ID for bars
    name: "Vanilla 2.0",
    name_en: "Vanilla 2.0",
    name_es: "Vanilla 2.0",
    name_fr: "Vanilla 2.0",
    name_de: "Vanilla 2.0",
    type: "bar", // Use the bar type
    coordinates: [45.567683, 8.050385], // Approximate Coordinates for Via Pietro Micca, 39 - VERIFY/ADJUST
    shortDescription: "Bar e locale serale nel centro di Biella.",
    shortDescription_en: "Bar and evening venue in the center of Biella.",
    shortDescription_es: "Bar y local nocturno en el centro de Biella.",
    shortDescription_fr: "Bar et lieu de soirée au centre de Biella.",
    shortDescription_de: "Bar und Abendlokal im Zentrum von Biella.",
    details:
      "Locale situato in Via Pietro Micca, ideale per colazioni, aperitivi e serate. Offre eventi settimanali come karaoke e promozioni speciali sull'apericena.",
    details_en:
      "Venue located on Via Pietro Micca, ideal for breakfast, aperitifs, and evenings out. Offers weekly events like karaoke and special apericena promotions.",
    details_es:
      "Local ubicado en Via Pietro Micca, ideal para desayunos, aperitivos y salidas nocturnas. Ofrece eventos semanales como karaoke y promociones especiales de apericena.",
    details_fr:
      "Établissement situé Via Pietro Micca, idéal pour le petit-déjeuner, l'apéritif et les soirées. Propose des événements hebdomadaires comme le karaoké et des promotions spéciales pour l'apericena.",
    details_de:
      "Lokal in der Via Pietro Micca, ideal für Frühstück, Aperitifs und Abende. Bietet wöchentliche Veranstaltungen wie Karaoke und spezielle Apericena-Aktionen.",
    address: "Via Pietro Micca, 39, 13900 Biella BI", // Provided Address
    phone: "320 6404048", // Provided Phone (removed space for potential tel: link usage)
    website: "https://vanilla2-0.it/", // Add website/social media link if available
    // Formatting Opening Hours
    openingHours: `Lun-Mer: 06:00-21:00\nGio-Ven: 06:00-23:00\nSab: 08:00-23:00\nDom: 08:00-13:00, 16:00-23:00`, // Using newline for readability
    openingHours_en: `Mon-Wed: 06:00-21:00\nThu-Fri: 06:00-23:00\nSat: 08:00-23:00\nSun: 08:00-13:00, 16:00-23:00`,
    openingHours_es: `Lun-Mié: 06:00-21:00\nJue-Vie: 06:00-23:00\nSáb: 08:00-23:00\nDom: 08:00-13:00, 16:00-23:00`,
    openingHours_fr: `Lun-Mer: 06h00-21h00\nJeu-Ven: 06h00-23h00\nSam: 08h00-23h00\nDim: 08h00-13h00, 16h00-23h00`,
    openingHours_de: `Mo-Mi: 06:00-21:00\nDo-Fr: 06:00-23:00\nSa: 08:00-23:00\nSo: 08:00-13:00, 16:00-23:00`,
    // Adding Event Info
    partyInfo: "Karaoke con Devaive Karaoke", // Specify event type/name
    partyInfo_en: "Karaoke with Devaive Karaoke",
    partyInfo_es: "Karaoke con Devaive Karaoke",
    partyInfo_fr: "Karaoké avec Devaive Karaoke",
    partyInfo_de: "Karaoke mit Devaive Karaoke",
    partyHours: "Giovedì dalle 20:00", // Specify event day/time
    partyHours_en: "Thursday from 20:00",
    partyHours_es: "Jueves desde las 20:00",
    partyHours_fr: "Jeudi à partir de 20h00",
    partyHours_de: "Donnerstag ab 20:00 Uhr",
    // Adding Discount/Promo Info
    discountInfo:
      "Venerdì (18:30-21:00): Buffet con pinse illimitate + 1 consumazione - 15€", // Added "+ 1 consumazione"
    discountInfo_en:
      "Friday (18:30-21:00): Buffet with unlimited 'pinse' + 1 drink included - €15",
    discountInfo_es:
      "Viernes (18:30-21:00): Buffet con 'pinse' ilimitadas + 1 consumición incluida - 15€",
    discountInfo_fr:
      "Vendredi (18h30-21h00): Buffet avec 'pinse' illimitées + 1 boisson incluse - 15€",
    discountInfo_de:
      "Freitag (18:30-21:00): Buffet mit unbegrenzten 'Pinse' + 1 Getränk inklusive - 15€",
    tags: [
      "Bar",
      "Caffè",
      "Aperitivo",
      "Serale",
      "Karaoke",
      "Apericena",
      "Centro",
      "Via Micca",
    ], // Relevant tags
    tags_en: [
      "Bar",
      "Cafe",
      "Aperitif",
      "Evening",
      "Karaoke",
      "Apericena",
      "City Center",
      "Via Micca",
    ],
    tags_es: [
      "Bar",
      "Café",
      "Aperitivo",
      "Noche",
      "Karaoke",
      "Apericena",
      "Centro Ciudad",
      "Via Micca",
    ],
    tags_fr: [
      "Bar",
      "Café",
      "Apéritif",
      "Soirée",
      "Karaoké",
      "Apericena",
      "Centre Ville",
      "Via Micca",
    ],
    tags_de: [
      "Bar",
      "Café",
      "Aperitif",
      "Abend",
      "Karaoke",
      "Apericena",
      "Stadtzentrum",
      "Via Micca",
    ],
    // Add Google Rating/Reviews if available
    googleRating: 4.2,
    googleReviewCount: 609,
    images: ["/images/vanilla.png"], // Add paths like ['/images/vanilla-20-1.jpg']
  },
  {
    id: 602, // New unique ID for bars
    name: "Coffee Corner Biella",
    name_en: "Coffee Corner Biella",
    name_es: "Coffee Corner Biella",
    name_fr: "Coffee Corner Biella",
    name_de: "Coffee Corner Biella",
    type: "bar", // Using bar type (could also argue for a 'cafe' type if you add one later)
    // Coordinates for Via P. Micca 29 / Via S. Ferrero corner
    // *** VERIFY/ADJUST COORDINATES [45.5664, 8.0534] IF NEEDED ***
    coordinates: [45.565335, 8.050832],
    shortDescription:
      "Caffetteria e bar in centro, angolo Via Micca/Via Ferrero.",
    shortDescription_en:
      "Café and bar in the center, corner of Via Micca/Via Ferrero.",
    shortDescription_es:
      "Cafetería y bar en el centro, esquina Via Micca/Via Ferrero.",
    shortDescription_fr:
      "Café et bar au centre-ville, coin Via Micca/Via Ferrero.",
    shortDescription_de: "Café und Bar im Zentrum, Ecke Via Micca/Via Ferrero.",
    details:
      "Coffee Corner Biella è un accogliente bar/caffetteria situato all'angolo tra Via Pietro Micca e Via Sebastiano Ferrero. Ideale per colazioni, pause caffè, pranzi veloci o aperitivi durante la giornata. Un punto di ritrovo centrale per una sosta durante l'Adunata.",
    details_en:
      "Coffee Corner Biella is a cozy bar/café located at the corner of Via Pietro Micca and Via Sebastiano Ferrero. Ideal for breakfast, coffee breaks, quick lunches, or daytime aperitifs. A central meeting point for a break during the Adunata.",
    details_es:
      "Coffee Corner Biella es una acogedora cafetería/bar ubicada en la esquina de Via Pietro Micca y Via Sebastiano Ferrero. Ideal para desayunos, pausas para el café, almuerzos rápidos o aperitivos durante el día. Un punto de encuentro céntrico para un descanso durante la Adunata.",
    details_fr:
      "Coffee Corner Biella est un café-bar chaleureux situé à l'angle de la Via Pietro Micca et de la Via Sebastiano Ferrero. Idéal pour le petit-déjeuner, les pauses-café, les déjeuners rapides ou les apéritifs en journée. Un point de rencontre central pour une pause pendant l'Adunata.",
    details_de:
      "Das Coffee Corner Biella ist ein gemütliches Café/Bar an der Ecke Via Pietro Micca und Via Sebastiano Ferrero. Ideal für Frühstück, Kaffeepausen, schnelle Mittagessen oder Aperitifs während des Tages. Ein zentraler Treffpunkt für eine Pause während der Adunata.",
    address: "Via Pietro Micca, 29 (angolo Via S. Ferrero), 13900 Biella BI", // Provided Address
    phone: "339 8506071", // Provided Phone
    website: "https://www.facebook.com/cooffeecornerbiella/", // Provided Facebook link
    // Formatting Opening Hours
    openingHours: `Lun-Sab: 06:00-19:30\nDom: 06:00-13:00`,
    openingHours_en: `Mon-Sat: 06:00-19:30\nSun: 06:00-13:00`,
    openingHours_es: `Lun-Sáb: 06:00-19:30\nDom: 06:00-13:00`,
    openingHours_fr: `Lun-Sam: 06h00-19h30\nDim: 06h00-13h00`,
    openingHours_de: `Mo-Sa: 06:00-19:30\nSo: 06:00-13:00`,
    // No specific event/discount info provided
    partyInfo: "",
    partyHours: "",
    discountInfo: "",
    tags: [
      "Bar",
      "Caffè",
      "Colazione",
      "Aperitivo",
      "Pranzo",
      "Centro",
      "Via Micca",
    ], // Relevant tags
    tags_en: [
      "Bar",
      "Cafe",
      "Breakfast",
      "Aperitif",
      "Lunch",
      "City Center",
      "Via Micca",
    ],
    tags_es: [
      "Bar",
      "Café",
      "Desayuno",
      "Aperitivo",
      "Almuerzo",
      "Centro Ciudad",
      "Via Micca",
    ],
    tags_fr: [
      "Bar",
      "Café",
      "Petit Déjeuner",
      "Apéritif",
      "Déjeuner",
      "Centre Ville",
      "Via Micca",
    ],
    tags_de: [
      "Bar",
      "Café",
      "Frühstück",
      "Aperitif",
      "Mittagessen",
      "Stadtzentrum",
      "Via Micca",
    ],
    // Adding Google Rating/Reviews
    googleRating: 4.6, // Provided rating
    googleReviewCount: 50, // Provided review count
    images: ["/images/coffeCorner.png"], // Add paths like ['/images/coffee-corner-1.jpg']
  },
  {
    id: 603,
    name: "Dolcemanna",
    name_en: "Dolcemanna",
    name_es: "Dolcemanna",
    name_fr: "Dolcemanna",
    name_de: "Dolcemanna",
    type: "bar",
    coordinates: [45.567048, 8.050713], // Via Pietro Micca, 42 - VERIFY/ADJUST
    shortDescription:
      "Bar/pasticceria in centro. Anche piatti tipici serali su prenotazione.",
    shortDescription_en:
      "Bar/pastry shop in center. Also typical evening dishes by reservation.",
    shortDescription_es:
      "Bar/pastelería en centro. También platos típicos por la noche bajo reserva.",
    shortDescription_fr:
      "Bar/pâtisserie au centre. Aussi plats typiques le soir sur réservation.",
    shortDescription_de:
      "Bar/Konditorei im Zentrum. Auch typische Abendgerichte auf Reservierung.",
    // --- SLIGHTLY ADJUSTED DETAILS ---
    details:
      "Situato sulla centrale Via Micca, Dolcemanna è un punto di riferimento per colazioni con pasticceria fresca, pause caffè e aperitivi. Offre orario prolungato nel weekend e la possibilità di gustare piatti tipici su prenotazione (posti limitati). Un ambiente accogliente per una sosta nel cuore dell'Adunata.",
    details_en:
      "Located on the central Via Micca, Dolcemanna is a reference point for breakfasts with fresh pastries, coffee breaks, and aperitifs. Offers extended hours on weekends and the possibility to enjoy typical dishes by reservation (limited seats). A welcoming environment for a break in the heart of the Adunata.",
    details_es:
      "Ubicado en la céntrica Via Micca, Dolcemanna es un punto de referencia para desayunos con bollería fresca, pausas para el café y aperitivos. Ofrece horario extendido los fines de semana y la posibilidad de disfrutar de platos típicos bajo reserva (plazas limitadas). Un ambiente acogedor para un descanso en el corazón de la Adunata.",
    details_fr:
      "Situé sur la Via Micca centrale, Dolcemanna est un point de référence pour les petits déjeuners avec pâtisseries fraîches, les pauses café et les apéritifs. Offre des horaires prolongés le week-end et la possibilité de déguster des plats typiques sur réservation (places limitées). Un environnement accueillant pour une pause au cœur de l'Adunata.",
    details_de:
      "Das Dolcemanna liegt an der zentralen Via Micca und ist ein Bezugspunkt für Frühstück mit frischem Gebäck, Kaffeepausen und Aperitifs. Bietet verlängerte Öffnungszeiten am Wochenende und die Möglichkeit, typische Gerichte nach Reservierung zu genießen (begrenzte Plätze). Eine einladende Umgebung für eine Pause im Herzen der Adunata.",
    // --- END ADJUSTED DETAILS ---
    address: "Via Pietro Micca, 42, 13900 Biella BI",
    phone: "015 2472358",
    website: "https://www.instagram.com/dolce_manna/?hl=it",
    // --- UPDATED Opening Hours ---
    openingHours: `Mar-Gio: 07:00-19:00\nVen-Dom: 06:00-01:00\nLun: Chiuso`, // Consolidated weekend hours
    openingHours_en: `Tue-Thu: 07:00-19:00\nFri-Sun: 06:00-01:00\nMon: Closed`,
    openingHours_es: `Mar-Jue: 07:00-19:00\nVie-Dom: 06:00-01:00\nLun: Cerrado`,
    openingHours_fr: `Mar-Jeu: 07h00-19h00\nVen-Dim: 06h00-01h00\nLun: Fermé`,
    openingHours_de: `Di-Do: 07:00-19:00\nFr-So: 06:00-01:00\nMo: Geschlossen`,
    // --- END UPDATED Opening Hours ---
    partyInfo: "", // Keeping blank unless typical dishes are considered an 'event'
    partyHours: "",
    // --- ADDED Discount/Special Offer Info ---
    discountInfo:
      "Gio/Ven/Sab/Dom sera: Piatti tipici (su prenotazione, posti limitati)", // Describe the offer
    discountInfo_en:
      "Thu/Fri/Sat/Sun evening: Typical dishes (by reservation, limited seats)",
    discountInfo_es:
      "Jue/Vie/Sáb/Dom noche: Platos típicos (bajo reserva, plazas limitadas)",
    discountInfo_fr:
      "Jeu/Ven/Sam/Dim soir : Plats typiques (sur réservation, places limitées)",
    discountInfo_de:
      "Do/Fr/Sa/So Abend: Typische Gerichte (auf Reservierung, begrenzte Plätze)",
    // --- END ADDED Discount Info ---
    tags: [
      "Bar",
      "Pasticceria",
      "Caffè",
      "Colazione",
      "Aperitivo",
      "Cena",
      "Piatti Tipici",
      "Centro",
      "Via Micca",
    ], // Added relevant tags
    tags_en: [
      "Bar",
      "Pastry Shop",
      "Cafe",
      "Breakfast",
      "Aperitif",
      "Dinner",
      "Typical Dishes",
      "City Center",
      "Via Micca",
    ],
    tags_es: [
      "Bar",
      "Pastelería",
      "Café",
      "Desayuno",
      "Aperitivo",
      "Cena",
      "Platos Típicos",
      "Centro Ciudad",
      "Via Micca",
    ],
    tags_fr: [
      "Bar",
      "Pâtisserie",
      "Café",
      "Petit Déjeuner",
      "Apéritif",
      "Dîner",
      "Plats Typiques",
      "Centre Ville",
      "Via Micca",
    ],
    tags_de: [
      "Bar",
      "Konditorei",
      "Café",
      "Frühstück",
      "Aperitif",
      "Abendessen",
      "Typische Gerichte",
      "Stadtzentrum",
      "Via Micca",
    ],
    googleRating: 4.7,
    googleReviewCount: 253,
    images: ["/images/dolcemanna.png"],
  },
  {
    id: 701,
    name: "Biondi Gelato Naturale",
    name_en: "Biondi Natural Gelato",
    name_es: "Biondi Helado Natural",
    name_fr: "Biondi Glace Naturelle",
    name_de: "Biondi Natürliches Eis",
    type: "gelateria",
    coordinates: [45.566904, 8.05002], // Piazza Curiel 1G - VERIFY/ADJUST
    shortDescription: "Gelateria artigianale con ingredienti bio e km 0.",
    shortDescription_en:
      "Artisanal gelateria with organic and local ingredients.",
    shortDescription_es:
      "Heladería artesanal con ingredientes ecológicos y de km 0.",
    shortDescription_fr:
      "Glacier artisanal avec des ingrédients bio et locaux.",
    shortDescription_de:
      "Handwerkliche Eisdiele mit Bio- und regionalen Zutaten.",
    // --- ADJUSTED DETAILS (Removed "vedi immagine") ---
    details:
      "Gelateria artigianale premiata 'Gambero Rosso', situata in Piazza Curiel. Famosa per l'uso di materie prime naturali, biologiche e a km 0, senza coloranti o aromi chimici. Oltre ai gusti classici e unici, propone un menù speciale per l'Adunata. Attenzione alla sostenibilità con packaging biodegradabile ed energia verde certificata. Perfetta per una pausa golosa e genuina!",
    details_en:
      "Artisanal gelateria awarded 'Gambero Rosso', located in Piazza Curiel. Famous for using natural, organic, and local ingredients, without artificial colors or flavors. In addition to classic and unique flavors, offers a special menu for the Adunata. Focuses on sustainability with biodegradable packaging and certified green energy. Perfect for a delicious and genuine break!",
    details_es:
      "Heladería artesanal galardonada 'Gambero Rosso', ubicada en Piazza Curiel. Famosa por usar materias primas naturales, ecológicas y de km 0, sin colorantes ni sabores artificiales. Además de sabores clásicos y únicos, ofrece un menú especial para la Adunata. Se centra en la sostenibilidad con envases biodegradables y energía verde certificada. ¡Perfecta para una pausa deliciosa y genuina!",
    details_fr:
      "Glacier artisanal primé 'Gambero Rosso', situé sur la Piazza Curiel. Célèbre pour l'utilisation d'ingrédients naturels, biologiques et locaux, sans colorants ni arômes artificiels. En plus des saveurs classiques et uniques, propose un menu spécial pour l'Adunata. Met l'accent sur la durabilité avec des emballages biodégradables et de l'énergie verte certifiée. Parfait pour une pause gourmande et authentique !",
    details_de:
      "Handwerkliche, von 'Gambero Rosso' ausgezeichnete Eisdiele an der Piazza Curiel. Berühmt für die Verwendung natürlicher, biologischer und regionaler Zutaten ohne künstliche Farb- oder Aromastoffe. Bietet neben klassischen und einzigartigen Geschmacksrichtungen auch ein spezielles Menü für die Adunata. Konzentriert sich auf Nachhaltigkeit mit biologisch abbaubarer Verpackung und zertifizierter grüner Energie. Perfekt für eine köstliche und echte Pause!",
    // --- END ADJUSTED DETAILS ---
    address: "Piazza Eugenio Curiel, 1G, 13900 Biella BI",
    phone: "375 5688828",
    website: "https://www.instagram.com/biondi.gelato.naturale/",
    openingHours: `Lun: 13:00-20:00\nMar-Gio: 13:00-20:00\nVen-Sab: 13:00-22:00\nDom: 11:00-20:00`,
    openingHours_en: `Mon: 13:00-20:00\nTue-Thu: 13:00-20:00\nFri-Sat: 13:00-22:00\nSun: 11:00-20:00`,
    openingHours_es: `Lun: 13:00-20:00\nMar-Jue: 13:00-20:00\nVie-Sáb: 13:00-22:00\nDom: 11:00-20:00`,
    openingHours_fr: `Lun: 13h00-20h00\nMar-Jeu: 13h00-20h00\nVen-Sam: 13h00-22h00\nDim: 11h00-20h00`,
    openingHours_de: `Mo: 13:00-20:00\nDi-Do: 13:00-20:00\nFr-Sa: 13:00-22:00\nSo: 11:00-20:00`,
    partyInfo: "",
    partyHours: "",
    // --- ADJUSTED DISCOUNT INFO (Removed "vedi immagine") ---
    discountInfo: "Menù speciale Adunata disponibile",
    discountInfo_en: "Special Adunata menu available",
    discountInfo_es: "Menú especial Adunata disponible",
    discountInfo_fr: "Menu spécial Adunata disponible",
    discountInfo_de: "Spezielles Adunata-Menü verfügbar",
    // --- END ADJUSTED DISCOUNT INFO ---
    tags: [
      "Gelato",
      "Gelateria",
      "Artigianale",
      "Bio",
      "Km 0",
      "Centro",
      "Piazza Curiel",
      "Sostenibile",
    ],
    tags_en: [
      "Ice Cream",
      "Gelateria",
      "Artisanal",
      "Organic",
      "Local",
      "City Center",
      "Piazza Curiel",
      "Sustainable",
    ],
    tags_es: [
      "Helado",
      "Heladería",
      "Artesanal",
      "Ecológico",
      "Km 0",
      "Centro Ciudad",
      "Piazza Curiel",
      "Sostenible",
    ],
    tags_fr: [
      "Glace",
      "Glacier",
      "Artisanal",
      "Bio",
      "Local",
      "Centre Ville",
      "Piazza Curiel",
      "Durable",
    ],
    tags_de: [
      "Eis",
      "Eisdiele",
      "Handwerklich",
      "Bio",
      "Regional",
      "Stadtzentrum",
      "Piazza Curiel",
      "Nachhaltig",
    ],
    googleRating: 4.5,
    googleReviewCount: 278,
    // --- EMPTY IMAGES ARRAY ---
    images: ["/images/biondi.png"], // Removed menu image path
    // --- END EMPTY IMAGES ARRAY ---
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
  clothing: { color: "#8B5CF6", icon: FaShoppingBag }, // Violet
  bank: { color: "#0891B2", icon: FaLandmark }, // Added (Teal/Cyan)
  activity: { color: "#84CC16", icon: FaStar }, // Added (Lime Green)
  ztl: { color: "#84CC16", icon: StopIcon }, // Using lime green & StopIcon
  wc: { color: "#A16207", icon: FaRestroom }, // Added (Light Brown/Tan)
  pharmacy: { color: "#22C55E", icon: FaBriefcaseMedical },
  medical_post: { color: "#B42025", icon: FaClinicMedical },
  field_hospital: { color: "#2563EB", icon: FaHospitalSymbol },
  parking: { color: "#4682B4", icon: FaParking },
  gelateria: { color: "#F472B6", icon: FaIceCream },
  default: { color: "#6B7280", icon: QuestionMarkCircleIcon },
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
  {
    type: "wc",
    label: "WC Pubblici",
    icon: poiTypeStyles.wc.icon,
    color: poiTypeStyles.wc.color,
  },
  {
    type: "pharmacy",
    label: "poiCategory_pharmacy",
    icon: poiTypeStyles.pharmacy.icon,
    color: poiTypeStyles.pharmacy.color,
  },
  {
    type: "medical_post",
    label: "poiCategory_medical_post", // Use a NEW translation key
    icon: poiTypeStyles.medical_post.icon,
    color: poiTypeStyles.medical_post.color,
  },
  {
    type: "field_hospital",
    label: "poiCategory_field_hospital", // Use a NEW translation key
    icon: poiTypeStyles.field_hospital.icon,
    color: poiTypeStyles.field_hospital.color,
  },
  {
    type: "gelateria",
    label: "poiCategory_gelateria", // Use a NEW translation key
    icon: poiTypeStyles.gelateria.icon,
    color: poiTypeStyles.gelateria.color,
  },
  {
    type: "parking",
    label: "poiCategory_parking", // Use a NEW translation key
    icon: poiTypeStyles.parking.icon,
    color: poiTypeStyles.parking.color,
  },
  {
    type: "ztl",
    label: "ZTL Adunata",
    icon: poiTypeStyles.ztl.icon,
    color: poiTypeStyles.ztl.color,
  },
];

// --- Updated Function to get custom Leaflet Icon using L.DivIcon ---
export const generateIconWithType = (
  type: PoiType,
  isActive = false
): L.DivIcon => {
  const style = poiTypeStyles[type] || poiTypeStyles.default;
  const baseSize = 43;
  const scale = isActive ? 1.15 : 1.0; // Define scale factor
  const IconComponent = style.icon;

  // Render the React icon component to an HTML string
  const iconHtmlString = ReactDOMServer.renderToString(
    React.createElement(IconComponent, {
      size: baseSize * 0.6,
      color: "white",
    })
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
    iconSize: [baseSize, baseSize],
    iconAnchor: [baseSize / 2, baseSize],
    popupAnchor: [0, -baseSize + 5],
  });
};
