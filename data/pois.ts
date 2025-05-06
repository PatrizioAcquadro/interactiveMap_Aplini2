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
    id: 502,
    name: "Senza Frontiere Minimarket prodotti Sudamericani",
    name_en: "Senza Frontiere Minimarket South American products",
    name_es: "Senza Frontiere Minimarket productos Sudamericanos",
    name_fr: "Senza Frontiere Minimarket produits Sud-Américains",
    name_de: "Senza Frontiere Minimarket Südamerikanische Produkte",
    type: "clothing", // Using "clothing" as a general shop type based on current setup
    coordinates: [45.565297, 8.050295], // Coordinates for Via Sebastiano Ferrero, 14, Biella
    googleRating: 4.8,
    googleReviewCount: 18,
    images: ["/images/senzaFrontiere.png"],
    address: "Via Sebastiano Ferrero, 14, 13900 Biella BI",
    phone: "366 996 9091",
    website: "https://www.facebook.com/senzafrontiereminimarket/?locale=it_IT",
    shortDescription: "Minimarket con prodotti tipici sudamericani.",
    shortDescription_en: "Minimarket with typical South American products.",
    shortDescription_es: "Minimarket con productos típicos sudamericanos.",
    shortDescription_fr: "Supérette avec produits typiques sud-américains.",
    shortDescription_de: "Minimarkt mit typischen südamerikanischen Produkten.",
    details:
      "Senza Frontiere è un minimarket specializzato in prodotti alimentari e bevande tipiche dell'America Latina. Situato in Via Sebastiano Ferrero, offre un'ampia scelta per chi cerca sapori autentici sudamericani. Orari estesi nel weekend.",
    details_en:
      "Senza Frontiere is a minimarket specializing in typical Latin American food and beverages. Located on Via Sebastiano Ferrero, it offers a wide selection for those seeking authentic South American flavors. Extended hours on weekends.",
    details_es:
      "Senza Frontiere es un minimarket especializado en alimentos y bebidas típicas de América Latina. Ubicado en Via Sebastiano Ferrero, ofrece una amplia selección para quienes buscan sabores auténticos sudamericanos. Horario extendido los fines de semana.",
    details_fr:
      "Senza Frontiere est une supérette spécialisée dans les aliments et boissons typiques d'Amérique Latine. Située Via Sebastiano Ferrero, elle offre un large choix pour ceux qui recherchent des saveurs sud-américaines authentiques. Horaires étendus le week-end.",
    details_de:
      "Senza Frontiere ist ein Minimarkt, der auf typische lateinamerikanische Lebensmittel und Getränke spezialisiert ist. Er befindet sich in der Via Sebastiano Ferrero und bietet eine große Auswahl für diejenigen, die authentische südamerikanische Aromen suchen. Erweiterte Öffnungszeiten am Wochenende.",
    openingHours: `Lun: 15:00-20:00\nMar-Mer-Gio: 09:00-20:00\nVen-Sab-Dom: 06:00-02:00`,
    openingHours_en: `Mon: 15:00-20:00\nTue-Wed-Thu: 09:00-20:00\nFri-Sat-Sun: 06:00-02:00`,
    openingHours_es: `Lun: 15:00-20:00\nMar-Mié-Jue: 09:00-20:00\nVie-Sáb-Dom: 06:00-02:00`,
    openingHours_fr: `Lun: 15h00-20h00\nMar-Mer-Jeu: 09h00-20h00\nVen-Sam-Dim: 06h00-02h00`,
    openingHours_de: `Mo: 15:00-20:00\nDi-Mi-Do: 09:00-20:00\nFr-Sa-So: 06:00-02:00`,
    discountInfo: "",
    discountInfo_en: "",
    discountInfo_es: "",
    discountInfo_fr: "",
    discountInfo_de: "",
    tags: [
      "Minimarket",
      "Alimentari",
      "Prodotti Sudamericani",
      "Etnico",
      "Via Ferrero",
    ],
    tags_en: [
      "Minimarket",
      "Groceries",
      "South American Products",
      "Ethnic",
      "Via Ferrero",
    ],
    tags_es: [
      "Minimarket",
      "Comestibles",
      "Productos Sudamericanos",
      "Étnico",
      "Via Ferrero",
    ],
    tags_fr: [
      "Supérette",
      "Épicerie",
      "Produits Sud-Américains",
      "Ethnique",
      "Via Ferrero",
    ],
    tags_de: [
      "Minimarkt",
      "Lebensmittel",
      "Südamerikanische Produkte",
      "Ethnisch",
      "Via Ferrero",
    ],
    partyInfo: "",
    partyInfo_en: "",
    partyInfo_es: "",
    partyInfo_fr: "",
    partyInfo_de: "",
    partyHours: "",
    partyHours_en: "",
    partyHours_es: "",
    partyHours_fr: "",
    partyHours_de: "",
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
      "Caffetteria e bar in centro. Aperitivo speciale. Orari estesi nel weekend.",
    shortDescription_en:
      "Café and bar in the center. Special aperitivo. Extended weekend hours.",
    shortDescription_es:
      "Cafetería y bar en el centro. Aperitivo especial. Horario extendido los fines de semana.",
    shortDescription_fr:
      "Café et bar au centre-ville. Apéritif spécial. Horaires étendus le week-end.",
    shortDescription_de:
      "Café und Bar im Zentrum. Spezieller Aperitivo. Erweiterte Öffnungszeiten am Wochenende.",
    details:
      "Coffee Corner Biella è un accogliente bar/caffetteria situato all'angolo tra Via Pietro Micca e Via Sebastiano Ferrero. Ideale per colazioni, pause caffè, pranzi veloci o per gustare il loro aperitivo speciale. Un punto di ritrovo centrale per una sosta durante l'Adunata, con orari prolungati nel fine settimana.",
    details_en:
      "Coffee Corner Biella is a cozy bar/café located at the corner of Via Pietro Micca and Via Sebastiano Ferrero. Ideal for breakfast, coffee breaks, quick lunches, or enjoying their special aperitivo. A central meeting point for a break during the Adunata, with extended hours on weekends.",
    details_es:
      "Coffee Corner Biella es una acogedora cafetería/bar ubicada en la esquina de Via Pietro Micca y Via Sebastiano Ferrero. Ideal para desayunos, pausas para el café, almuerzos rápidos o para disfrutar de su aperitivo especial. Un punto de encuentro céntrico para un descanso durante la Adunata, con horario extendido los fines de semana.",
    details_fr:
      "Coffee Corner Biella est un café-bar chaleureux situé à l'angle de la Via Pietro Micca et de la Via Sebastiano Ferrero. Idéal pour le petit-déjeuner, les pauses-café, les déjeuners rapides ou pour profiter de leur apéritif spécial. Un point de rencontre central pour une pause pendant l'Adunata, avec des horaires prolongés le week-end.",
    details_de:
      "Das Coffee Corner Biella ist ein gemütliches Café/Bar an der Ecke Via Pietro Micca und Via Sebastiano Ferrero. Ideal für Frühstück, Kaffeepausen, schnelle Mittagessen oder um ihren speziellen Aperitivo zu genießen. Ein zentraler Treffpunkt für eine Pause während der Adunata, mit verlängerten Öffnungszeiten am Wochenende.",
    address: "Via Pietro Micca, 29 (angolo Via S. Ferrero), 13900 Biella BI", // Provided Address
    phone: "339 8506071", // Provided Phone
    website: "https://www.facebook.com/cooffeecornerbiella/", // Provided Facebook link
    // Formatting Opening Hours
    openingHours: `Lun-Gio: 06:00-19:30\nVen-Sab-Dom: 06:00-22:00`,
    openingHours_en: `Mon-Thu: 06:00-19:30\nFri-Sat-Sun: 06:00-22:00`,
    openingHours_es: `Lun-Jue: 06:00-19:30\nVie-Sáb-Dom: 06:00-22:00`,
    openingHours_fr: `Lun-Jeu: 06h00-19h30\nVen-Sam-Dim: 06h00-22h00`,
    openingHours_de: `Mo-Do: 06:00-19:30\nFr-Sa-So: 06:00-22:00`,
    // --- UPDATED Discount Info ---
    discountInfo: "Aperitivo speciale disponibile.",
    discountInfo_en: "Special aperitivo available.",
    discountInfo_es: "Aperitivo especial disponible.",
    discountInfo_fr: "Apéritif spécial disponible.",
    discountInfo_de: "Spezieller Aperitivo erhältlich.",
    partyInfo: "",
    partyHours: "",
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
    id: 604, // New unique ID for bars
    name: "Guest Disco Bar Brusnengo",
    name_en: "Guest Disco Bar Brusnengo",
    name_es: "Guest Disco Bar Brusnengo",
    name_fr: "Guest Disco Bar Brusnengo",
    name_de: "Guest Disco Bar Brusnengo",
    type: "bar", // Use the bar type
    // Coordinates for Via Torino, 46, Brusnengo BI
    // *** VERIFY/ADJUST COORDINATES [45.6082, 8.2237] IF NEEDED ***
    coordinates: [45.584388, 8.268623], // Approximate for Brusnengo
    shortDescription:
      "Disco bar a Brusnengo con musica dal vivo e panini con salamella.",
    shortDescription_en:
      "Disco bar in Brusnengo with live music and salamella sandwiches.",
    shortDescription_es:
      "Disco bar en Brusnengo con música en vivo y bocadillos de salamella.",
    shortDescription_fr:
      "Disco-bar à Brusnengo avec musique live et sandwichs à la salamella.",
    shortDescription_de:
      "Disco-Bar in Brusnengo mit Live-Musik und Salamella-Sandwiches.",
    details:
      "Guest Disco Bar a Brusnengo è il posto ideale per serate animate. Offre tavoli all'aperto, ottimi cocktail e musica dal vivo. Specialità della casa: panini con salamella sempre disponibili! Consulta il loro Linktree per aggiornamenti e eventi.",
    details_en:
      "Guest Disco Bar in Brusnengo is the ideal spot for lively evenings. Features outdoor seating, great cocktails, and live music. House specialty: salamella sandwiches always available! Check their Linktree for updates and events.",
    details_es:
      "Guest Disco Bar en Brusnengo es el lugar ideal para veladas animadas. Cuenta con mesas al aire libre, excelentes cócteles y música en vivo. Especialidad de la casa: ¡bocadillos de salamella siempre disponibles! Consulta su Linktree para actualizaciones y eventos.",
    details_fr:
      "Guest Disco Bar à Brusnengo est l'endroit idéal pour des soirées animées. Dispose de places assises en extérieur, d'excellents cocktails et de musique live. Spécialité maison : sandwichs à la salamella toujours disponibles ! Consultez leur Linktree pour les mises à jour et les événements.",
    details_de:
      "Die Guest Disco Bar in Brusnengo (von Gallone Lara) ist der ideale Ort für lebhafte Abende. Bietet Sitzgelegenheiten im Freien, großartige Cocktails und Live-Musik. Hausspezialität: Salamella-Sandwiches immer verfügbar! Überprüfen Sie deren Linktree für Updates und Veranstaltungen.",
    address: "Via Torino, 46, 13862 Brusnengo BI", // Provided Address
    phone: "346 6347107", // Provided Phone
    website: "https://linktr.ee/guest.brusnengo", // Provided Linktree
    // Formatting Opening Hours
    openingHours: `Lun-Mar: 16:00-00:00\nMer: Chiuso\nGio: 08:00-01:00\nVen-Sab: 08:00-03:00\nDom: 08:00-00:00`,
    openingHours_en: `Mon-Tue: 16:00-00:00\nWed: Closed\nThu: 08:00-01:00\nFri-Sat: 08:00-03:00\nSun: 08:00-00:00`,
    openingHours_es: `Lun-Mar: 16:00-00:00\nMié: Cerrado\nJue: 08:00-01:00\nVie-Sáb: 08:00-03:00\nDom: 08:00-00:00`,
    openingHours_fr: `Lun-Mar: 16h00-00h00\nMer: Fermé\nJeu: 08h00-01h00\nVen-Sam: 08h00-03h00\nDim: 08h00-00h00`,
    openingHours_de: `Mo-Di: 16:00-00:00\nMi: Geschlossen\nDo: 08:00-01:00\nFr-Sa: 08:00-03:00\nSo: 08:00-00:00`,
    partyInfo: "Musica dal vivo", // From "Servizio"
    partyInfo_en: "Live music",
    partyInfo_es: "Música en vivo",
    partyInfo_fr: "Musique live",
    partyInfo_de: "Live-Musik",
    partyHours: "Variabile (Vedi Programma/Linktree)", // Best to refer to their updates
    partyHours_en: "Varies (See Program/Linktree)",
    partyHours_es: "Varía (Ver Programa/Linktree)",
    partyHours_fr: "Variable (Voir Programme/Linktree)",
    partyHours_de: "Variiert (Siehe Programm/Linktree)",
    discountInfo: "Panini con salamella sempre disponibili", // Special offer
    discountInfo_en: "Salamella sandwiches always available",
    discountInfo_es: "Bocadillos de salamella siempre disponibles",
    discountInfo_fr: "Sandwichs à la salamella toujours disponibles",
    discountInfo_de: "Salamella-Sandwiches immer verfügbar",
    tags: [
      "Bar",
      "Disco Bar",
      "Musica dal Vivo",
      "Cocktail",
      "Aperto Serata",
      "Brusnengo",
      "Salamella",
    ], // Relevant tags
    tags_en: [
      "Bar",
      "Disco Bar",
      "Live Music",
      "Cocktails",
      "Late Night",
      "Brusnengo",
      "Salamella",
    ],
    tags_es: [
      "Bar",
      "Disco Bar",
      "Música en Vivo",
      "Cócteles",
      "Abierto Noche",
      "Brusnengo",
      "Salamella",
    ],
    tags_fr: [
      "Bar",
      "Disco Bar",
      "Musique Live",
      "Cocktails",
      "Ouvert Tard",
      "Brusnengo",
      "Salamella",
    ],
    tags_de: [
      "Bar",
      "Disco-Bar",
      "Live-Musik",
      "Cocktails",
      "Spät Geöffnet",
      "Brusnengo",
      "Salamella",
    ],
    googleRating: 4.6, // Add if found, often Linktree doesn't show this
    googleReviewCount: 130,
    images: ["/images/guest.png"], // Add paths like ['/images/guest-brusnengo-1.jpg']
  },
  {
    id: 605, // CORRECTED ID
    name: "Walhalla - Interno 21",
    name_en: "Walhalla - Interno 21",
    name_es: "Walhalla - Interno 21",
    name_fr: "Walhalla - Interno 21",
    name_de: "Walhalla - Interno 21",
    type: "bar",
    // Coordinates for Giardino Fondo Edo Tempia, Via Guglielmo Marconi 21
    // (Approximate, please verify and adjust if needed. This points to the garden area accessible from Marconi 21)
    coordinates: [45.568134, 8.058118],
    googleRating: 4.5,
    googleReviewCount: 546,
    address:
      "Giardino Fondo Edo Tempia, Via Guglielmo Marconi, 21, 13900 Biella BI",
    phone: "351 745 8514",
    website: "https://www.instagram.com/walhalla_cocktail_bar_biella/?hl=it",
    shortDescription:
      "Cocktail bar e ristorante con DJ set. Cucina vegana disponibile.",
    shortDescription_en:
      "Cocktail bar and restaurant with DJ sets. Vegan cuisine available.",
    shortDescription_es:
      "Cocktail bar y restaurante con DJ sets. Cocina vegana disponible.",
    shortDescription_fr:
      "Bar à cocktails et restaurant avec DJ sets. Cuisine végétalienne disponible.",
    shortDescription_de:
      "Cocktailbar und Restaurant mit DJ-Sets. Vegane Küche erhältlich.",
    details:
      "Walhalla-Interno 21, situato nello splendido Giardino Fondo Edo Tempia, unisce l'arte dei cocktail di Walhalla alla proposta culinaria di Interno 21. Offre colazione, pranzo e cena (con opzioni vegane) in orario continuato nel weekend. Dispone di tavoli all'aperto e si anima con DJ set dal giovedì alla domenica.",
    details_en:
      "Walhalla-Interno 21, located in the beautiful Fondo Edo Tempia Garden, combines Walhalla's cocktail art with Interno 21's culinary offerings. It serves breakfast, lunch, and dinner (with vegan options) continuously on weekends. Features outdoor seating and comes alive with DJ sets from Thursday to Sunday.",
    details_es:
      "Walhalla-Interno 21, ubicado en el hermoso Jardín Fondo Edo Tempia, combina el arte de los cócteles de Walhalla con la oferta culinaria de Interno 21. Sirve desayuno, almuerzo y cena (con opciones veganas) en horario continuado los fines de semana. Cuenta con mesas al aire libre y se anima con DJ sets de jueves a domingo.",
    details_fr:
      "Walhalla-Interno 21, situé dans le magnifique Jardin Fondo Edo Tempia, combine l'art des cocktails de Walhalla avec l'offre culinaire d'Interno 21. Il sert le petit-déjeuner, le déjeuner et le dîner (avec options végétaliennes) en continu le week-end. Dispose de tables en extérieur et s'anime avec des DJ sets du jeudi au dimanche.",
    details_de:
      "Das Walhalla-Interno 21, im wunderschönen Fondo Edo Tempia Garten gelegen, verbindet Walhallas Cocktailkunst mit dem kulinarischen Angebot von Interno 21. Es serviert Frühstück, Mittag- und Abendessen (mit veganen Optionen) am Wochenende durchgehend. Verfügt über Sitzplätze im Freien und wird von Donnerstag bis Sonntag mit DJ-Sets belebt.",
    images: ["/images/walhalla.jpeg"], // Suggested image path
    openingHours: `Gio: 18:00-02:00\nVen-Sab-Dom: 08:00-03:00 (orario continuato)`,
    openingHours_en: `Thu: 18:00-02:00\nFri-Sat-Sun: 08:00-03:00 (continuous hours)`,
    openingHours_es: `Jue: 18:00-02:00\nVie-Sáb-Dom: 08:00-03:00 (horario continuado)`,
    openingHours_fr: `Jeu: 18h00-02h00\nVen-Sam-Dim: 08h00-03h00 (horaire continu)`,
    openingHours_de: `Do: 18:00-02:00\nFr-Sa-So: 08:00-03:00 (durchgehend geöffnet)`,
    discountInfo:
      "Serve piatti vegani. Cocktail, birra e vino a cura di Walhalla.", // Highlighting special features
    discountInfo_en:
      "Serves vegan dishes. Cocktails, beer, and wine by Walhalla.",
    discountInfo_es:
      "Sirve platos veganos. Cócteles, cerveza y vino por Walhalla.",
    discountInfo_fr:
      "Sert des plats végétaliens. Cocktails, bière et vin par Walhalla.",
    discountInfo_de:
      "Serviert vegane Gerichte. Cocktails, Bier und Wein von Walhalla.",
    tags: [
      "Bar",
      "Ristorante",
      "Cocktail",
      "DJ Set",
      "Musica",
      "Vegano",
      "Giardino",
      "Tavoli all'aperto",
    ],
    tags_en: [
      "Bar",
      "Restaurant",
      "Cocktails",
      "DJ Set",
      "Music",
      "Vegan",
      "Garden",
      "Outdoor Seating",
    ],
    tags_es: [
      "Bar",
      "Restaurante",
      "Cócteles",
      "DJ Set",
      "Música",
      "Vegano",
      "Jardín",
      "Terraza",
    ],
    tags_fr: [
      "Bar",
      "Restaurant",
      "Cocktails",
      "DJ Set",
      "Musique",
      "Végétalien",
      "Jardin",
      "Terrasse",
    ],
    tags_de: [
      "Bar",
      "Restaurant",
      "Cocktails",
      "DJ-Set",
      "Musik",
      "Vegan",
      "Garten",
      "Außensitzplätze",
    ],
    partyInfo: "Gio: DJ Maiz (Aperitivo).", // UPDATED
    partyInfo_en: "Thu: DJ Maiz (Aperitivo).", // UPDATED
    partyInfo_es: "Jue: DJ Maiz (Aperitivo).", // UPDATED
    partyInfo_fr: "Jeu: DJ Maiz (Apéritif).", // UPDATED
    partyInfo_de: "Do: DJ Maiz (Aperitivo).", // UPDATED
    partyHours: "Gio: 18:00-02:00.", // UPDATED
    partyHours_en: "Thu: 18:00-02:00.", // UPDATED
    partyHours_es: "Jue: 18:00-02:00.", // UPDATED
    partyHours_fr: "Jeu: 18h00-02h00.", // UPDATED
    partyHours_de: "Do: 18:00-02:00.", // UPDATED
  },
  {
    id: 606,
    name: "Loft Cafe",
    name_en: "Loft Cafe",
    name_es: "Loft Cafe",
    name_fr: "Loft Cafe",
    name_de: "Loft Cafe",
    type: "bar",
    coordinates: [45.564105, 8.057392], // Coordinates for Via Italia, 1, Biella BI
    googleRating: 4.3, // Found on Google
    googleReviewCount: 878, // Found on Google
    address: "Via Italia, 1, 13900 Biella BI",
    phone: "015 015 5309",
    website: "https://www.loftbiella.com/menu", // Ensured full URL
    shortDescription:
      "Bar e caffetteria in Via Italia. Aperto da colazione a tarda sera.",
    shortDescription_en:
      "Bar and café on Via Italia. Open from breakfast to late evening.",
    shortDescription_es:
      "Bar y cafetería en Via Italia. Abierto desde el desayuno hasta tarde en la noche.",
    shortDescription_fr:
      "Bar et café sur la Via Italia. Ouvert du petit-déjeuner jusque tard dans la soirée.",
    shortDescription_de:
      "Bar und Café in der Via Italia. Geöffnet vom Frühstück bis spät abends.",
    details:
      "Loft Cafe, situato nella centrale Via Italia, è un locale versatile aperto dalla mattina presto fino a mezzanotte. Ideale per colazioni, pranzi, aperitivi e serate. Menu disponibile su loftbiella.com. Un punto di ritrovo nel cuore di Biella.",
    details_en:
      "Loft Cafe, located on the central Via Italia, is a versatile venue open from early morning until midnight. Ideal for breakfast, lunch, aperitifs, and evenings. Menu available at loftbiella.com. A meeting point in the heart of Biella.",
    details_es:
      "Loft Cafe, ubicado en la céntrica Via Italia, es un local versátil abierto desde primera hora de la mañana hasta medianoche. Ideal para desayunos, almuerzos, aperitivos y veladas. Menú disponible en loftbiella.com. Un punto de encuentro en el corazón de Biella.",
    details_fr:
      "Loft Cafe, situé sur la Via Italia centrale, est un lieu polyvalent ouvert tôt le matin jusqu'à minuit. Idéal pour les petits déjeuners, déjeuners, apéritifs et soirées. Menu disponible sur loftbiella.com. Un point de rencontre au cœur de Biella.",
    details_de:
      "Das Loft Cafe in der zentralen Via Italia ist ein vielseitiger Treffpunkt, der von früh morgens bis Mitternacht geöffnet ist. Ideal für Frühstück, Mittagessen, Aperitifs und Abende. Speisekarte verfügbar unter loftbiella.com. Ein Treffpunkt im Herzen von Biella.",
    images: ["/images/loft.png"], // Suggested image path, please create this image
    openingHours: `Lun-Sab: 07:30-00:00\nDom: 08:00-00:00`,
    openingHours_en: `Mon-Sat: 07:30-00:00\nSun: 08:00-00:00`,
    openingHours_es: `Lun-Sáb: 07:30-00:00\nDom: 08:00-00:00`,
    openingHours_fr: `Lun-Sam: 07h30-00h00\nDim: 08h00-00h00`,
    openingHours_de: `Mo-Sa: 07:30-00:00\nSo: 08:00-00:00`,
    discountInfo: "",
    discountInfo_en: "",
    discountInfo_es: "",
    discountInfo_fr: "",
    discountInfo_de: "",
    tags: [
      "Bar",
      "Caffetteria",
      "Colazione",
      "Pranzo",
      "Aperitivo",
      "Serale",
      "Via Italia",
      "Centro",
    ],
    tags_en: [
      "Bar",
      "Café",
      "Breakfast",
      "Lunch",
      "Aperitif",
      "Evening",
      "Via Italia",
      "Center",
    ],
    tags_es: [
      "Bar",
      "Cafetería",
      "Desayuno",
      "Almuerzo",
      "Aperitivo",
      "Noche",
      "Via Italia",
      "Centro",
    ],
    tags_fr: [
      "Bar",
      "Café",
      "Petit Déjeuner",
      "Déjeuner",
      "Apéritif",
      "Soirée",
      "Via Italia",
      "Centre",
    ],
    tags_de: [
      "Bar",
      "Café",
      "Frühstück",
      "Mittagessen",
      "Aperitif",
      "Abend",
      "Via Italia",
      "Zentrum",
    ],
    partyInfo: "",
    partyInfo_en: "",
    partyInfo_es: "",
    partyInfo_fr: "",
    partyInfo_de: "",
    partyHours: "",
    partyHours_en: "",
    partyHours_es: "",
    partyHours_fr: "",
    partyHours_de: "",
  },
  {
    id: 208,
    name: "New Wood Pub", // Corrected name based on Facebook URL
    name_en: "New Wood Pub",
    name_es: "New Wood Pub",
    name_fr: "New Wood Pub",
    name_de: "New Wood Pub",
    type: "restaurant", // Still categorized as restaurant due to food offerings
    // Coordinates for Via Matteotti 129/G, Gaglianico
    // *** VERIFY/ADJUST COORDINATES [45.5535, 8.1060] IF NEEDED ***
    coordinates: [45.532078, 8.074942], // From previous "New Wood" attempt
    shortDescription:
      "Pub a Gaglianico: colazioni, ristorante, pizzeria, aperitivi, eventi.",
    shortDescription_en:
      "Pub in Gaglianico: breakfast, restaurant, pizzeria, aperitifs, events.",
    shortDescription_es:
      "Pub en Gaglianico: desayunos, restaurante, pizzería, aperitivos, eventos.",
    shortDescription_fr:
      "Pub à Gaglianico : petit-déjeuner, restaurant, pizzeria, apéritifs, événements.",
    shortDescription_de:
      "Pub in Gaglianico: Frühstück, Restaurant, Pizzeria, Aperitifs, Veranstaltungen.",
    details:
      "New Wood a Gaglianico è un locale multifunzionale che offre un'esperienza completa: dalle colazioni mattutine, al servizio ristorante e pizzeria per pranzo e cena, fino a trasformarsi in un vivace pub la sera. È noto per i suoi aperitivi e per ospitare regolarmente eventi e serate a tema, specialmente durante il weekend. Un punto di riferimento versatile a Gaglianico per cibo e intrattenimento.",
    details_en:
      "New Wood in Gaglianico is a multifunctional venue offering a complete experience: from morning breakfasts, to restaurant and pizzeria service for lunch and dinner, to transforming into a lively pub in the evening. It is known for its aperitifs and for regularly hosting events and themed nights, especially on weekends. A versatile landmark in Gaglianico for food and entertainment.",
    details_es:
      "New Wood en Gaglianico es un local multifuncional que ofrece una experiencia completa: desde desayunos por la mañana, servicio de restaurante y pizzería para almuerzos y cenas, hasta transformarse en un animado pub por la noche. Es conocido por sus aperitivos y por organizar regularmente eventos y noches temáticas, especialmente los fines de semana. Un punto de referencia versátil en Gaglianico para comida y entretenimiento.",
    details_fr:
      "New Wood à Gaglianico est un lieu multifonctionnel offrant une expérience complète : des petits déjeuners matinaux, au service de restauration et de pizzeria pour le déjeuner et le dîner, jusqu'à se transformer en un pub animé le soir. Il est réputé pour ses apéritifs et pour organiser régulièrement des événements et des soirées à thème, notamment le week-end. Un lieu de référence polyvalent à Gaglianico pour la restauration et le divertissement.",
    details_de:
      "Das New Wood in Gaglianico ist ein multifunktionaler Veranstaltungsort, der ein umfassendes Erlebnis bietet: vom morgendlichen Frühstück über Restaurant- und Pizzeriaservice zum Mittag- und Abendessen bis hin zur Verwandlung in einen lebhaften Pub am Abend. Es ist bekannt für seine Aperitifs und für die regelmäßige Ausrichtung von Veranstaltungen und Themenabenden, besonders an Wochenenden. Ein vielseitiger Anlaufpunkt in Gaglianico für Essen und Unterhaltung.",
    // --- END UPDATED GENERAL DETAILS ---

    address: "Via Matteotti 129/G, 13854 Gaglianico BI",
    phone: "393 3516073",
    website: "https://www.facebook.com/NewWoodPub/?locale=it_IT",
    openingHours: `Lun: Chiuso\nMar: 19:30-01:30\nMer: Chiuso\nGio: Chiuso\nVen-Dom: 09:00-04:00`,
    openingHours_en: `Mon: Closed\nTue: 19:30-01:30\nWed: Closed\nThu: Closed\nFri-Sun: 09:00-04:00`,
    openingHours_es: `Lun: Cerrado\nMar: 19:30-01:30\nMié: Cerrado\nJue: Cerrado\nVie-Dom: 09:00-04:00`,
    openingHours_fr: `Lun: Fermé\nMar: 19h30-01h30\nMer: Fermé\nJeu: Fermé\nVen-Dim: 09h00-04h00`,
    openingHours_de: `Mo: Geschlossen\nDi: 19:30-01:30\nMi: Geschlossen\nDo: Geschlossen\nFr-So: 09:00-04:00`,
    partyInfo: "Venerdì: Otra Latin Night con Luca Teck", // Only Friday event mentioned
    partyInfo_en: "Friday: Otra Latin Night with Luca Teck",
    partyInfo_es: "Viernes: Otra Latin Night con Luca Teck",
    partyInfo_fr: "Vendredi : Otra Latin Night avec Luca Teck",
    partyInfo_de: "Freitag: Otra Latin Night mit Luca Teck",
    partyHours: "Venerdì dalle 22:00",
    partyHours_en: "Friday from 22:00",
    partyHours_es: "Viernes desde las 22:00",
    partyHours_fr: "Vendredi à partir de 22h00",
    partyHours_de: "Freitag ab 22:00 Uhr",
    discountInfo: "", // No specific discount provided in this set of info
    tags: [
      "Ristorante",
      "Pizzeria",
      "Pub",
      "Eventi",
      "Colazione",
      "Aperitivo",
      "Gaglianico",
      "Musica Latina",
    ], // Tags based on info
    tags_en: [
      "Restaurant",
      "Pizzeria",
      "Pub",
      "Events",
      "Breakfast",
      "Aperitif",
      "Gaglianico",
      "Latin Music",
    ],
    tags_es: [
      "Restaurante",
      "Pizzería",
      "Pub",
      "Eventos",
      "Desayuno",
      "Aperitivo",
      "Gaglianico",
      "Música Latina",
    ],
    tags_fr: [
      "Restaurant",
      "Pizzeria",
      "Pub",
      "Événements",
      "Petit Déjeuner",
      "Apéritif",
      "Gaglianico",
      "Musique Latine",
    ],
    tags_de: [
      "Restaurant",
      "Pizzeria",
      "Pub",
      "Veranstaltungen",
      "Frühstück",
      "Aperitif",
      "Gaglianico",
      "Lateinamerikanische Musik",
    ],
    googleRating: 3.7, // Add if found
    googleReviewCount: 430,
    images: ["/images/newwood.jpeg"],
  },
  {
    id: 209,
    name: "Konstanten",
    name_en: "Konstanten",
    name_es: "Konstanten",
    name_fr: "Konstanten",
    name_de: "Konstanten",
    type: "restaurant",
    // Coordinates for SP230, 17, Benna BI - Please verify/adjust if needed
    coordinates: [45.501037, 8.132125],
    googleRating: 4.3,
    googleReviewCount: 77,
    address: "SP230, 17, 13871 Benna BI",
    phone: "015 419 2231",
    website: "https://www.facebook.com/Konstanten.benna/", // Updated Facebook page
    shortDescription:
      "Ristorante a Benna con tavoli all'aperto, menu bambini, cani ammessi. Menu speciale Alpini.",
    shortDescription_en:
      "Restaurant in Benna with outdoor seating, kids' menu, dogs allowed. Special Alpini menu.",
    shortDescription_es:
      "Restaurante en Benna con terraza, menú para niños, perros admitidos. Menú especial Alpini.",
    shortDescription_fr:
      "Restaurant à Benna avec terrasse, menu enfants, chiens admis. Menu spécial Alpini.",
    shortDescription_de:
      "Restaurant in Benna mit Außensitzplätzen, Kindermenü, Hunde erlaubt. Spezielles Alpini-Menü.",
    details:
      "Konstanten è un ristorante situato a Benna sulla SP230. Offre un ambiente accogliente con tavoli all'aperto, è pet-friendly e propone menu per bambini. Durante l'Adunata, sarà disponibile un menu speciale per gli Alpini. Aperto per colazione, pranzo e cena, con orari estesi nel weekend fino a tarda notte.",
    details_en:
      "Konstanten is a restaurant located in Benna on SP230. It offers a welcoming atmosphere with outdoor seating, is pet-friendly, and has a kids' menu. During the Adunata, a special menu for the Alpini will be available. Open for breakfast, lunch, and dinner, with extended hours on weekends until late at night.",
    details_es:
      "Konstanten es un restaurante ubicado en Benna en la SP230. Ofrece un ambiente acogedor con mesas al aire libre, es amigable con las mascotas y tiene menú para niños. Durante la Adunata, habrá un menú especial para los Alpini. Abierto para desayuno, almuerzo y cena, con horario extendido los fines de semana hasta altas horas de la noche.",
    details_fr:
      "Konstanten est un restaurant situé à Benna sur la SP230. Il offre une ambiance accueillante avec des tables en extérieur, accepte les animaux et propose un menu pour enfants. Pendant l'Adunata, un menu spécial pour les Alpini sera disponible. Ouvert pour le petit-déjeuner, le déjeuner et le dîner, avec des horaires prolongés le week-end jusque tard dans la nuit.",
    details_de:
      "Das Konstanten ist ein Restaurant in Benna an der SP230. Es bietet eine einladende Atmosphäre mit Sitzplätzen im Freien, ist haustierfreundlich und hat ein Kindermenü. Während der Adunata wird ein spezielles Menü für die Alpini angeboten. Geöffnet für Frühstück, Mittag- und Abendessen, mit verlängerten Öffnungszeiten am Wochenende bis spät in die Nacht.",
    images: ["/images/konstanten.png"], // Suggested image path, please create this image
    openingHours: `Lun, Mar, Mer: 07:00-15:00\nGio: 07:00-15:00, 18:00-22:00\nVen, Sab, Dom: 07:00-04:00`,
    openingHours_en: `Mon, Tue, Wed: 07:00-15:00\nThu: 07:00-15:00, 18:00-22:00\nFri, Sat, Sun: 07:00-04:00`,
    openingHours_es: `Lun, Mar, Mié: 07:00-15:00\nJue: 07:00-15:00, 18:00-22:00\nVie, Sáb, Dom: 07:00-04:00`,
    openingHours_fr: `Lun, Mar, Mer: 07h00-15h00\nJeu: 07h00-15h00, 18h00-22h00\nVen, Sam, Dim: 07h00-04h00`,
    openingHours_de: `Mo, Di, Mi: 07:00-15:00\nDo: 07:00-15:00, 18:00-22:00\nFr, Sa, So: 07:00-04:00`,
    discountInfo: "Menu speciale per gli Alpini disponibile.",
    discountInfo_en: "Special menu for Alpini available.",
    discountInfo_es: "Menú especial para Alpini disponible.",
    discountInfo_fr: "Menu spécial pour les Alpini disponible.",
    discountInfo_de: "Spezialmenü für Alpini verfügbar.",
    tags: [
      "Ristorante",
      "Benna",
      "Tavoli all'aperto",
      "Menu Bambini",
      "Cani Ammessi",
      "Musica dal Vivo",
      "Menu Alpini",
      "Colazione",
      "Pranzo",
      "Cena",
    ],
    tags_en: [
      "Restaurant",
      "Benna",
      "Outdoor Seating",
      "Kids Menu",
      "Dogs Allowed",
      "Live Music",
      "Alpini Menu",
      "Breakfast",
      "Lunch",
      "Dinner",
    ],
    tags_es: [
      "Restaurante",
      "Benna",
      "Terraza",
      "Menú Infantil",
      "Perros Admitidos",
      "Música en Vivo",
      "Menú Alpini",
      "Desayuno",
      "Almuerzo",
      "Cena",
    ],
    tags_fr: [
      "Restaurant",
      "Benna",
      "Terrasse",
      "Menu Enfants",
      "Chiens Admis",
      "Musique Live",
      "Menu Alpini",
      "Petit Déjeuner",
      "Déjeuner",
      "Dîner",
    ],
    tags_de: [
      "Restaurant",
      "Benna",
      "Außensitzplätze",
      "Kindermenü",
      "Hunde Erlaubt",
      "Live-Musik",
      "Alpini Menü",
      "Frühstück",
      "Mittagessen",
      "Abendessen",
    ],
    partyInfo: "Venerdì: Shock by Daniel Mas (Dance hits party).",
    partyInfo_en: "Friday: Shock by Daniel Mas (Dance hits party).",
    partyInfo_es: "Viernes: Shock by Daniel Mas (Dance hits party).",
    partyInfo_fr: "Vendredi : Shock by Daniel Mas (Dance hits party).",
    partyInfo_de: "Freitag: Shock by Daniel Mas (Dance-Hits-Party).",
    partyHours: "Venerdì: Orario serale.", // Generalizing as specific band times not provided
    partyHours_en: "Friday: Evening hours.",
    partyHours_es: "Viernes: Horario de noche.",
    partyHours_fr: "Vendredi : Soirée.",
    partyHours_de: "Freitag: Abendstunden.",
  },
  {
    id: 210,
    name: "Pizzeria Gigi",
    name_en: "Pizzeria Gigi",
    name_es: "Pizzeria Gigi",
    name_fr: "Pizzeria Gigi",
    name_de: "Pizzeria Gigi",
    type: "restaurant",
    coordinates: [45.468243, 8.069503], // Via Roma, 11, Cerrione
    googleRating: 4.7,
    googleReviewCount: 194,
    address: "Via Roma, 11, 13882 Cerrione BI",
    phone: "392 680 5084",
    website: "https://www.facebook.com/p/Pizzeria-Gigi-100063591580261/",
    shortDescription:
      "Pizzeria con forno a legna a Cerrione. Tavoli all'aperto, pizze deliziose a prezzi ottimi.",
    shortDescription_en:
      "Pizzeria with wood-fired oven in Cerrione. Outdoor seating, delicious pizzas at great prices.",
    shortDescription_es:
      "Pizzería con horno de leña en Cerrione. Terraza, pizzas deliciosas a precios excelentes.",
    shortDescription_fr:
      "Pizzeria avec four à bois à Cerrione. Terrasse, pizzas délicieuses à des prix avantageux.",
    shortDescription_de:
      "Pizzeria mit Holzofen in Cerrione. Außensitzplätze, köstliche Pizzen zu tollen Preisen.",
    details:
      "Pizzeria Gigi, situata a Cerrione, è rinomata per le sue pizze cotte nel forno a legna, offerte a un prezzo incredibilmente conveniente. Dispone di tavoli all'aperto per gustare la pizza nelle belle serate. Un'ottima scelta per una cena gustosa e informale.",
    details_en:
      "Pizzeria Gigi, located in Cerrione, is renowned for its pizzas cooked in a wood-fired oven, offered at an incredibly affordable price. It has outdoor seating to enjoy pizza on pleasant evenings. An excellent choice for a tasty and informal dinner.",
    details_es:
      "Pizzeria Gigi, ubicada en Cerrione, es famosa por sus pizzas cocinadas en horno de leña, ofrecidas a un precio increíblemente asequible. Cuenta con mesas al aire libre para disfrutar de la pizza en las noches agradables. Una excelente opción para una cena sabrosa e informal.",
    details_fr:
      "Pizzeria Gigi, située à Cerrione, est réputée pour ses pizzas cuites au four à bois, proposées à un prix incroyablement abordable. Elle dispose de tables en extérieur pour savourer une pizza lors des belles soirées. Un excellent choix pour un dîner savoureux et informel.",
    details_de:
      "Die Pizzeria Gigi in Cerrione ist bekannt für ihre im Holzofen gebackenen Pizzen zu einem unglaublich günstigen Preis. Sie verfügt über Sitzplätze im Freien, um Pizza an schönen Abenden zu genießen. Eine ausgezeichnete Wahl für ein leckeres und informelles Abendessen.",
    images: ["/images/pizzeriaGigi.png"],
    openingHours: `Mar: Chiuso\nMer-Gio-Ven: 18:30-22:00\nSab: 18:30-23:00\nDom: 18:30-22:30\nLun: Chiuso`,
    openingHours_en: `Tue: Closed\nWed-Thu-Fri: 18:30-22:00\nSat: 18:30-23:00\nSun: 18:30-22:30\nMon: Closed`,
    openingHours_es: `Mar: Cerrado\nMié-Jue-Vie: 18:30-22:00\nSáb: 18:30-23:00\nDom: 18:30-22:30\nLun: Cerrado`,
    openingHours_fr: `Mar: Fermé\nMer-Jeu-Ven: 18h30-22h00\nSam: 18h30-23h00\nDim: 18h30-22h30\nLun: Fermé`,
    openingHours_de: `Di: Geschlossen\nMi-Do-Fr: 18:30-22:00\nSa: 18:30-23:00\nSo: 18:30-22:30\nMo: Geschlossen`,
    discountInfo:
      "Pizze deliziose da forno a legna a prezzi incredibilmente bassi. Ottimo rapporto qualità-prezzo.",
    discountInfo_en:
      "Delicious wood-fired pizzas at incredibly low prices. Excellent value for money.",
    discountInfo_es:
      "Deliciosas pizzas en horno de leña a precios increíblemente bajos. Excelente relación calidad-precio.",
    discountInfo_fr:
      "Délicieuses pizzas au four à bois à des prix incroyablement bas. Excellent rapport qualité-prix.",
    discountInfo_de:
      "Köstliche Holzofenpizzen zu unglaublich niedrigen Preisen. Ausgezeichnetes Preis-Leistungs-Verhältnis.",
    tags: [
      "Ristorante",
      "Pizzeria",
      "Forno a Legna",
      "Cerrione",
      "Tavoli all'aperto",
      "Pizza Economica",
      "Buon Prezzo",
      "Cena",
    ],
    tags_en: [
      "Restaurant",
      "Pizzeria",
      "Wood-fired Oven",
      "Cerrione",
      "Outdoor Seating",
      "Affordable Pizza",
      "Good Value",
      "Dinner",
    ],
    tags_es: [
      "Restaurante",
      "Pizzería",
      "Horno de Leña",
      "Cerrione",
      "Terraza",
      "Pizza Económica",
      "Buen Precio",
      "Cena",
    ],
    tags_fr: [
      "Restaurant",
      "Pizzeria",
      "Four à Bois",
      "Cerrione",
      "Terrasse",
      "Pizza Abordable",
      "Bon Prix",
      "Dîner",
    ],
    tags_de: [
      "Restaurant",
      "Pizzeria",
      "Holzofen",
      "Cerrione",
      "Außensitzplätze",
      "Günstige Pizza",
      "Gutes Preis-Leistungs-Verhältnis",
      "Abendessen",
    ],
    partyInfo: "",
    partyInfo_en: "",
    partyInfo_es: "",
    partyInfo_fr: "",
    partyInfo_de: "",
    partyHours: "",
    partyHours_en: "",
    partyHours_es: "",
    partyHours_fr: "",
    partyHours_de: "",
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
