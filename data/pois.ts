import React from "react";
import L from "leaflet";
import { IconType } from "react-icons"; // Import IconType
import ReactDOMServer from "react-dom/server"; // Import for server-side rendering icons to string
import {
  FaCaravan, // Camper
  FaUtensils, // Restaurant
  FaGlassMartiniAlt, // Bar
  FaCampground, // Private Accommodation (Tent/Rooms)
  FaRestroom,
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
  | "restaurant"
  | "bar"
  | "private_accommodation"
  | "clothing"
  | "ztl"
  | "wc"
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
    id: 503, // New unique ID
    name: "La Boutique di Andrea",
    name_en: "Andrea's Boutique (Food Shop)",
    name_es: "La Boutique de Andrea (Tienda Gourmet)",
    name_fr: "La Boutique d'Andrea (Épicerie Fine)",
    name_de: "Andreas Boutique (Feinkostladen)",
    type: "clothing", // Using 'clothing' as a general shop type as per current setup
    coordinates: [45.507713, 8.121268],
    googleRating: 4.3,
    googleReviewCount: 12,
    address: "Via Zumaglini, 13, 13871 Verrone BI",
    phone: "3483775095",
    website: "https://laboutiqueandrea.it/",
    shortDescription:
      "La Boutique di Andrea a Verrone: eccellenza alimentare e sapori autentici. Il vostro scrigno di delizie locali!",
    shortDescription_en:
      "Andrea's Boutique in Verrone: food excellence and authentic flavors. Your treasure chest of local delights!",
    shortDescription_es:
      "La Boutique de Andrea en Verrone: excelencia alimentaria y sabores auténticos. ¡Tu cofre del tesoro de delicias locales!",
    shortDescription_fr:
      "La Boutique d'Andrea à Verrone : excellence alimentaire et saveurs authentiques. Votre coffre aux trésors de délices locaux !",
    shortDescription_de:
      "Andreas Boutique in Verrone: exzellente Lebensmittel und authentische Aromen. Ihre Schatzkammer lokaler Köstlichkeiten!",
    details:
      "La Boutique di Andrea a Verrone è il punto di riferimento per chi ricerca prodotti alimentari di altissima qualità e un servizio impeccabile. Con una passione per l'eccellenza e la tradizione, selezioniamo le migliori materie prime, privilegiando produttori locali. All'interno troverete carni pregiate, salumi artigianali che raccontano storie di sapore, formaggi tipici dal gusto inconfondibile, e piatti gastronomici pronti. Il nostro personale esperto vi accoglierà con un sorriso, pronto a guidarvi nella scelta di delizie per la vostra tavola o per un picnic speciale durante l'Adunata. Un vero tempio del gusto dove tradizione e innovazione si incontrano.",
    details_en:
      "Andrea's Boutique in Verrone is the reference point for those seeking top-quality food products and impeccable service. With a passion for excellence and tradition, we select the best raw materials, favoring local producers. Inside, you'll find premium meats, artisanal cured meats that tell stories of flavor, typical cheeses with an unmistakable taste, and ready-made gastronomic dishes. Our expert staff will welcome you with a smile, ready to guide you in choosing delights for your table or for a special picnic during the Adunata. A true temple of taste where tradition and innovation meet.",
    details_es:
      "La Boutique de Andrea en Verrone es el punto de referencia para quienes buscan productos alimenticios de la más alta calidad y un servicio impecable. Con pasión por la excelencia y la tradición, seleccionamos las mejores materias primas, privilegiando a los productores locales. En su interior encontrará carnes de primera calidad, embutidos artesanales que cuentan historias de sabor, quesos típicos con un gusto inconfundible y platos gastronómicos listos para llevar. Nuestro personal experto le recibirá con una sonrisa, listo para guiarle en la elección de delicias para su mesa o para un picnic especial durante la Adunata. Un verdadero templo del gusto donde tradición e innovación se encuentran.",
    details_fr:
      "La Boutique d'Andrea à Verrone est le point de référence pour ceux qui recherchent des produits alimentaires de première qualité et un service impeccable. Passionnés par l'excellence et la tradition, nous sélectionnons les meilleures matières premières, en privilégiant les producteurs locaux. À l'intérieur, vous trouverez des viandes de premier choix, des charcuteries artisanales qui racontent des histoires de saveurs, des fromages typiques au goût incomparable et des plats gastronomiques prêts à emporter. Notre personnel expert vous accueillera avec le sourire, prêt à vous guider dans le choix de délices pour votre table ou pour un pique-nique spécial pendant l'Adunata. Un véritable temple du goût où tradition et innovation se rencontrent.",
    details_de:
      "Andreas Boutique in Verrone ist der Bezugspunkt für alle, die hochwertige Lebensmittel und tadellosen Service suchen. Mit Leidenschaft für Exzellenz und Tradition wählen wir die besten Rohstoffe aus und bevorzugen lokale Produzenten. Im Inneren finden Sie erstklassiges Fleisch, handwerkliche Wurstwaren, die Geschmacksgeschichten erzählen, typische Käsesorten mit unverwechselbarem Geschmack und fertige gastronomische Gerichte. Unser fachkundiges Personal empfängt Sie mit einem Lächeln und berät Sie gerne bei der Auswahl von Köstlichkeiten für Ihren Tisch oder für ein besonderes Picknick während der Adunata. Ein wahrer Geschmackstempel, in dem Tradition und Innovation aufeinandertreffen.",
    images: ["/images/boutiqueAndrea.jpeg"], // Example image path
    openingHours: `giovedì: 07:00-12:30, 15:30-19:00\nvenerdì: 07:00-12:30, 15:30-19:00\nsabato: 07:00-13:00\ndomenica: Chiuso\nlunedì: 07:00-12:30\nmartedì: 07:00-12:30, 15:30-19:00\nmercoledì: 07:00-12:30, 15:30-19:00`,
    openingHours_en: `Thursday: 07:00-12:30, 15:30-19:00\nFriday: 07:00-12:30, 15:30-19:00\nSaturday: 07:00-13:00\nSunday: Closed\nMonday: 07:00-12:30\nTuesday: 07:00-12:30, 15:30-19:00\nWednesday: 07:00-12:30, 15:30-19:00`,
    openingHours_es: `Jueves: 07:00-12:30, 15:30-19:00\nViernes: 07:00-12:30, 15:30-19:00\nSábado: 07:00-13:00\nDomingo: Cerrado\nLunes: 07:00-12:30\nMartes: 07:00-12:30, 15:30-19:00\nMiércoles: 07:00-12:30, 15:30-19:00`,
    openingHours_fr: `Jeudi : 07h00-12h30, 15h30-19h00\nVendredi : 07h00-12h30, 15h30-19h00\nSamedi : 07h00-13h00\nDimanche : Fermé\nLundi : 07h00-12h30\nMardi : 07h00-12h30, 15h30-19h00\nMercredi : 07h00-12h30, 15h30-19h00`,
    openingHours_de: `Donnerstag: 07:00-12:30, 15:30-19:00\nFreitag: 07:00-12:30, 15:30-19:00\nSamstag: 07:00-13:00\nSonntag: Geschlossen\nMontag: 07:00-12:30\nDienstag: 07:00-12:30, 15:30-19:00\nMittwoch: 07:00-12:30, 15:30-19:00`,
    discountInfo: "Selezione di prodotti locali e artigianali di prima scelta.",
    discountInfo_en: "Selection of premium local and artisanal products.",
    discountInfo_es:
      "Selección de productos locales y artesanales de primera calidad.",
    discountInfo_fr:
      "Sélection de produits locaux et artisanaux de premier choix.",
    discountInfo_de:
      "Auswahl an erstklassigen lokalen und handwerklichen Produkten.",
    tags: [
      "Alimentari",
      "Gastronomia",
      "Macelleria",
      "Salumeria",
      "Formaggi",
      "Prodotti Tipici",
      "Verrone",
    ],
    tags_en: [
      "Groceries",
      "Delicatessen",
      "Butcher",
      "Charcuterie",
      "Cheese",
      "Typical Products",
      "Verrone",
    ],
    tags_es: [
      "Comestibles",
      "Delicatessen",
      "Carnicería",
      "Charcutería",
      "Quesos",
      "Productos Típicos",
      "Verrone",
    ],
    tags_fr: [
      "Épicerie",
      "Traiteur",
      "Boucherie",
      "Charcuterie",
      "Fromages",
      "Produits Typiques",
      "Verrone",
    ],
    tags_de: [
      "Lebensmittel",
      "Feinkost",
      "Metzgerei",
      "Wurstwaren",
      "Käse",
      "Typische Produkte",
      "Verrone",
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
    id: 504,
    name: "De Ruvo - Specialità Biellesi (Stand Adunata)",
    name_en: "De Ruvo - Biellese Specialties (Adunata Stand)",
    name_es: "De Ruvo - Especialidades de Biella (Stand Adunata)",
    name_fr: "De Ruvo - Spécialités de Biella (Stand Adunata)",
    name_de: "De Ruvo - Bielleser Spezialitäten (Adunata-Stand)",
    type: "restaurant",
    coordinates: [45.56886, 8.052659],
    googleRating: 4.6,
    googleReviewCount: 81,
    address: "Piazza I Maggio, 12/D, 13900 Biella BI (Stand Adunata)",
    phone: "01521701",
    website: "https://www.macelleriaderuvo.it/",
    shortDescription:
      "Stand De Ruvo all'Adunata: panini con salumi di produzione propria, polenta, formaggi, pizza e bevande.", // Added "con salumi di produzione propria"
    shortDescription_en:
      "De Ruvo stand at Adunata: sandwiches with their own cured meats, polenta, cheeses, pizza, and drinks.",
    shortDescription_es:
      "Puesto De Ruvo en la Adunata: bocadillos con embutidos de producción propia, polenta, quesos, pizza y bebidas.",
    shortDescription_fr:
      "Stand De Ruvo à l'Adunata : sandwichs avec charcuteries maison, polenta, fromages, pizza et boissons.",
    shortDescription_de:
      "De Ruvo-Stand bei der Adunata: Sandwiches mit hausgemachten Wurstwaren, Polenta, Käse, Pizza und Getränke.",
    details:
      "Lo storico marchio De Ruvo Macelleria propone le sue specialità biellesi all'Adunata. Troverete panini farciti come il 'Biellese' (paletta cotta e Sbirro), 'La Somarina', 'Bresaola' (della macelleria), 'Prosciutto cotto' Rovagnati e 'Coppa' (della macelleria). Offrono anche polenta concia, formaggi Botalla, salumi di produzione propria, focaccia, pizza e una selezione di bevande, inclusa birra Menabrea e liquori alpini. Un assaggio autentico del territorio.", // Specified "di nostra produzione macelleria"
    details_en:
      "The historic De Ruvo Macelleria brand offers its Biellese specialties at the Adunata. You'll find stuffed sandwiches like 'Biellese' (cooked ham shoulder and Sbirro), 'La Somarina', 'Bresaola' (from their own butcher shop), Rovagnati 'Cooked Ham', and 'Coppa' (from their own butcher shop). They also offer polenta concia, Botalla cheeses, house-cured meats, focaccia, pizza, and a selection of drinks, including Menabrea beer and alpine liqueurs. An authentic taste of the region.",
    details_es:
      "La histórica marca De Ruvo Macelleria ofrece sus especialidades de Biella en la Adunata. Encontrará bocadillos rellenos como el 'Biellese' (paleta cocida y Sbirro), 'La Somarina', 'Bresaola' (de su propia carnicería), 'Jamón Cocido' Rovagnati y 'Coppa' (de su propia carnicería). También ofrecen polenta concia, quesos Botalla, embutidos de producción propia, focaccia, pizza y una selección de bebidas, incluyendo cerveza Menabrea y licores alpinos. Un auténtico sabor de la región.",
    details_fr:
      "La marque historique De Ruvo Macelleria propose ses spécialités de Biella à l'Adunata. Vous trouverez des sandwichs garnis comme le 'Biellese' (épaule de porc cuite et Sbirro), 'La Somarina', la 'Bresaola' (de leur propre boucherie), le 'Jambon Cuit' Rovagnati et la 'Coppa' (de leur propre boucherie). Ils proposent également de la polenta concia, des fromages Botalla, des charcuteries maison, de la focaccia, des pizzas et une sélection de boissons, y compris de la bière Menabrea et des liqueurs alpines. Un goût authentique de la région.",
    details_de:
      "Die historische Marke De Ruvo Macelleria bietet ihre Bielleser Spezialitäten auf der Adunata an. Sie finden gefüllte Sandwiches wie 'Biellese' (gekochte Schweineschulter und Sbirro), 'La Somarina', 'Bresaola' (aus eigener Metzgerei), 'Kochschinken' Rovagnati und 'Coppa' (aus eigener Metzgerei). Sie bieten auch Polenta Concia, Botalla-Käse, hausgemachte Wurstwaren, Focaccia, Pizza und eine Auswahl an Getränken, darunter Menabrea-Bier und Alpenliköre. Ein authentischer Geschmack der Region.",
    images: ["/images/deRuvo.jpeg"],
    openingHours: `Lun, Mar, Gio: 07:30-12:30, 15:00-19:15\nMer: 07:30-12:30\nVen-Dom: Orari Adunata (Consultare)`,
    openingHours_en: `Mon, Tue, Thu: 07:30-12:30, 15:00-19:15\nWed: 07:30-12:30\nFri-Sun: Adunata Hours (Check)`,
    openingHours_es: `Lun, Mar, Jue: 07:30-12:30, 15:00-19:15\nMié: 07:30-12:30\nVie-Dom: Horario Adunata (Consultar)`,
    openingHours_fr: `Lun, Mar, Jeu: 07h30-12h30, 15h00-19h15\nMer: 07h30-12h30\nVen-Dim: Horaires Adunata (Consulter)`,
    openingHours_de: `Mo, Di, Do: 07:30-12:30, 15:00-19:15\nMi: 07:30-12:30\nFr-So: Adunata-Zeiten (Prüfen)`,
    discountInfo:
      "Panini con salumi di produzione propria, polenta concia, formaggi locali, pizza e Liquore Alpino.", // Emphasized own production
    discountInfo_en:
      "Sandwiches with their own cured meats, polenta concia, local cheeses, pizza, and Alpine Liqueur.",
    discountInfo_es:
      "Bocadillos con embutidos de producción propia, polenta concia, quesos locales, pizza y Licor Alpino.",
    discountInfo_fr:
      "Sandwichs avec charcuteries maison, polenta concia, fromages locaux, pizza et Liqueur Alpine.",
    discountInfo_de:
      "Sandwiches mit hausgemachten Wurstwaren, Polenta Concia, lokalem Käse, Pizza und Alpenlikör.",
    tags: [
      "Stand Gastronomico",
      "Specialità Biellesi",
      "Panini",
      "Salumi Produzione Propria",
      "De Ruvo",
      "Adunata",
      "Cucina Tipica",
    ], // Adjusted tag
    tags_en: [
      "Food Stand",
      "Biellese Specialties",
      "Sandwiches",
      "Own Cured Meats",
      "De Ruvo",
      "Adunata",
      "Typical Cuisine",
    ],
    tags_es: [
      "Puesto de Comida",
      "Especialidades de Biella",
      "Bocadillos",
      "Embutidos Propios",
      "De Ruvo",
      "Adunata",
      "Cocina Típica",
    ],
    tags_fr: [
      "Stand Gastronomique",
      "Spécialités de Biella",
      "Sandwichs",
      "Charcuteries Maison",
      "De Ruvo",
      "Adunata",
      "Cuisine Typique",
    ],
    tags_de: [
      "Imbissstand",
      "Bielleser Spezialitäten",
      "Sandwiches",
      "Eigene Wurstwaren",
      "De Ruvo",
      "Adunata",
      "Typische Küche",
    ],
    partyInfo: "",
    partyHours: "",
    partyInfo_en: "",
    partyHours_en: "",
    partyInfo_es: "",
    partyHours_es: "",
    partyInfo_fr: "",
    partyHours_fr: "",
    partyInfo_de: "",
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
    openingHours: `Lun-Gio: 07:30-00:00\nVen-Sab-Dom: 07:00-3:00`, // UPDATED
    openingHours_en: `Mon-Thu: 07:30-00:00\nFri-Sat-Sun: 07:00-3:00`, // UPDATED
    openingHours_es: `Lun-Jue: 07:30-00:00\nVie-Sáb-Dom: 07:00-3:00`, // UPDATED
    openingHours_fr: `Lun-Jeu: 07h30-00h00\nVen-Sam-Dim: 07h00-3h00`, // UPDATED
    openingHours_de: `Mo-Do: 07:30-00:00\nFr-Sa-So: 07:00-3:00`, // UPDATED
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
    id: 607, // New unique ID
    name: "Bar Revolution",
    name_en: "Revolution Bar",
    name_es: "Bar Revolution",
    name_fr: "Bar Revolution",
    name_de: "Bar Revolution",
    type: "bar",
    coordinates: [45.557312, 8.059502],
    googleRating: 4.6,
    googleReviewCount: 12,
    address: "Via Addis Abeba, 11b, 13900 Biella BI",
    phone: "3463165144",
    website:
      "https://www.facebook.com/p/Revolution-bar-100054420313497/?locale=it_IT",
    shortDescription:
      "Bar Revolution a Biella: energia pura! Panini tipici, fiumi di birra/vino e orario NO-STOP nel weekend Adunata. Imperdibile!",
    shortDescription_en:
      "Revolution Bar in Biella: pure energy! Typical sandwiches, rivers of beer/wine, and NON-STOP hours on Adunata weekend. Unmissable!",
    shortDescription_es:
      "Bar Revolution en Biella: ¡pura energía! Bocadillos típicos, ríos de cerveza/vino y horario ININTERRUMPIDO el fin de semana de la Adunata. ¡Imperdible!",
    shortDescription_fr:
      "Bar Revolution à Biella : pure énergie ! Sandwichs typiques, fleuves de bière/vin et horaires NON-STOP le week-end de l'Adunata. Immanquable !",
    shortDescription_de:
      "Bar Revolution in Biella: pure Energie! Typische Sandwiches, Bier-/Weinströme und NONSTOP-Öffnungszeiten am Adunata-Wochenende. Unverzichtbar!",
    details:
      "Bar Revolution, in Via Addis Abeba a Biella, è il punto di ritrovo perfetto per vivere l'Adunata con la giusta carica! APERTO 24 ORE SU 24 (Venerdì-Sabato-Domenica), offre un menù speciale con panini farciti con ingredienti tipici come lingua in salsa verde, porchetta BBQ e salumi locali, valorizzando prodotti come toma e maccagno biellesi. Preparatevi a 'fiumi' di birra e vino, oltre a spritz e cocktail classici. Un'atmosfera vivace, cibo gustoso al bar e cani ammessi. La sosta ideale per non perdere neanche un momento della festa!",
    details_en:
      "Revolution Bar, on Via Addis Abeba in Biella, is the perfect meeting point to experience the Adunata with the right energy! OPEN 24 HOURS (Friday-Saturday-Sunday), it offers a special menu with sandwiches stuffed with typical ingredients like tongue in green sauce, BBQ porchetta, and local cured meats, highlighting products like Biella's toma and maccagno cheeses. Get ready for 'rivers' of beer and wine, plus spritzes and classic cocktails. A lively atmosphere, tasty bar food, and dogs allowed. The ideal stop to not miss a moment of the celebration!",
    details_es:
      "Bar Revolution, en Via Addis Abeba en Biella, ¡es el punto de encuentro perfecto para vivir la Adunata con la energía adecuada! ABIERTO 24 HORAS (Viernes-Sábado-Domingo), ofrece un menú especial con bocadillos rellenos de ingredientes típicos como lengua en salsa verde, porchetta a la barbacoa y embutidos locales, destacando productos como los quesos toma y maccagno de Biella. Prepárense para 'ríos' de cerveza y vino, además de spritzes y cócteles clásicos. Un ambiente animado, comida sabrosa en el bar y perros admitidos. ¡La parada ideal para no perderse ni un momento de la fiesta!",
    details_fr:
      "Le Bar Revolution, Via Addis Abeba à Biella, est le point de rencontre idéal pour vivre l'Adunata avec la bonne énergie ! OUVERT 24H/24 (Vendredi-Samedi-Dimanche), il propose un menu spécial avec des sandwichs garnis d'ingrédients typiques comme la langue en sauce verte, la porchetta BBQ et les charcuteries locales, mettant en valeur des produits comme les fromages toma et maccagno de Biella. Préparez-vous à des 'fleuves' de bière et de vin, ainsi qu'à des spritz et des cocktails classiques. Une ambiance animée, de la nourriture savoureuse au bar et les chiens sont admis. L'arrêt idéal pour ne manquer aucun moment de la fête !",
    details_de:
      "Die Bar Revolution in der Via Addis Abeba in Biella ist der perfekte Treffpunkt, um die Adunata mit der richtigen Energie zu erleben! GEÖFFNET 24 STUNDEN (Freitag-Samstag-Sonntag), bietet sie ein spezielles Menü mit Sandwiches, gefüllt mit typischen Zutaten wie Zunge in grüner Sauce, BBQ-Porchetta und lokalen Wurstwaren, wobei Produkte wie Biellas Toma- und Maccagno-Käse hervorgehoben werden. Machen Sie sich bereit für 'Ströme' von Bier und Wein sowie Spritz und klassische Cocktails. Eine lebhafte Atmosphäre, leckeres Essen an der Bar und Hunde sind erlaubt. Der ideale Stopp, um keinen Moment der Feier zu verpassen!",
    images: ["/images/revolution.jpg"], // Example image path
    openingHours: `giovedì: 06:00-20:00\nvenerdì: Aperto 24 ore\nsabato: Aperto 24 ore\ndomenica: Aperto 24 ore\nlunedì: 06:00-20:00\nmartedì: 06:00-20:00\nmercoledì: 06:00-20:00`,
    openingHours_en: `Thursday: 06:00-20:00\nFriday: Open 24 hours\nSaturday: Open 24 hours\nSunday: Open 24 hours\nMonday: 06:00-20:00\nTuesday: 06:00-20:00\nWednesday: 06:00-20:00`,
    openingHours_es: `Jueves: 06:00-20:00\nViernes: Abierto 24 horas\nSábado: Abierto 24 horas\nDomingo: Abierto 24 horas\nLunes: 06:00-20:00\nMartes: 06:00-20:00\nMiércoles: 06:00-20:00`,
    openingHours_fr: `Jeudi : 06h00-20h00\nVendredi : Ouvert 24h/24\nSamedi : Ouvert 24h/24\nDimanche : Ouvert 24h/24\nLundi : 06h00-20h00\nMardi : 06h00-20h00\nMercredi : 06h00-20h00`,
    openingHours_de: `Donnerstag: 06:00-20:00\nFreitag: 24 Stunden geöffnet\nSamstag: 24 Stunden geöffnet\nSonntag: 24 Stunden geöffnet\nMontag: 06:00-20:00\nDienstag: 06:00-20:00\nMittwoch: 06:00-20:00`,
    discountInfo: "Panini speciali con prodotti tipici. Fiumi di birra e vino!",
    discountInfo_en:
      "Special sandwiches with typical products. Rivers of beer and wine!",
    discountInfo_es:
      "¡Bocadillos especiales con productos típicos. Ríos de cerveza y vino!",
    discountInfo_fr:
      "Sandwichs spéciaux avec produits typiques. Fleuves de bière et de vin !",
    discountInfo_de:
      "Spezielle Sandwiches mit typischen Produkten. Ströme von Bier und Wein!",
    tags: [
      "Bar",
      "Panini Tipici",
      "Birra",
      "Vino",
      "Aperto 24h (Weekend Adunata)",
      "Biella",
      "Cani Ammessi",
    ],
    tags_en: [
      "Bar",
      "Typical Sandwiches",
      "Beer",
      "Wine",
      "Open 24h (Adunata Weekend)",
      "Biella",
      "Dogs Allowed",
    ],
    tags_es: [
      "Bar",
      "Bocadillos Típicos",
      "Cerveza",
      "Vino",
      "Abierto 24h (Fin Semana Adunata)",
      "Biella",
      "Perros Admitidos",
    ],
    tags_fr: [
      "Bar",
      "Sandwichs Typiques",
      "Bière",
      "Vin",
      "Ouvert 24h (Weekend Adunata)",
      "Biella",
      "Chiens Admis",
    ],
    tags_de: [
      "Bar",
      "Typische Sandwiches",
      "Bier",
      "Wein",
      "24h Geöffnet (Adunata Wochenende)",
      "Biella",
      "Hunde Erlaubt",
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
    id: 608,
    name: "La Flaca Bar de Tapas",
    name_en: "La Flaca Tapas Bar",
    name_es: "La Flaca Bar de Tapas",
    name_fr: "La Flaca Bar à Tapas",
    name_de: "La Flaca Tapas-Bar",
    type: "bar",
    coordinates: [45.566988, 8.04583],
    googleRating: 5.0,
    googleReviewCount: 26,
    address:
      "Via Amedeo Avogadro di Quaregna, 14, 13900 Biella BI (Stazione Funicolare Biella Piazzo)",
    phone: "3517829357",
    website: "https://linktr.ee/laflacabardetapas",
    shortDescription:
      "La Flaca a Biella Piazzo: autentica Spagna! Panini km0 (Cascina Masca), patatas bravas, tapas, sangria e vini spagnoli.",
    shortDescription_en:
      "La Flaca in Biella Piazzo: authentic Spain! Km0 sandwiches (Cascina Masca), patatas bravas, tapas, sangria & Spanish wines.",
    shortDescription_es:
      "La Flaca en Biella Piazzo: ¡auténtica España! Bocadillos km0 (Cascina Masca), patatas bravas, tapas, sangría y vinos españoles.",
    shortDescription_fr:
      "La Flaca à Biella Piazzo : l'Espagne authentique ! Sandwichs km0 (Cascina Masca), patatas bravas, tapas, sangria et vins espagnols.",
    shortDescription_de:
      "La Flaca in Biella Piazzo: authentisches Spanien! Km0-Sandwiches (Cascina Masca), Patatas Bravas, Tapas, Sangria & spanische Weine.",
    details:
      "Vivi l'autentica atmosfera di un locale tipico spagnolo a La Flaca Bar de Tapas, vicino alla Funicolare per Biella Piazzo. Assapora panini unici con ingredienti a km zero della Cascina Masca, le classiche patatas bravas e una selezione di tapas tradizionali. Accompagna il tutto con cocktail creativi, rinfrescante sangria, birra o vari vini spagnoli. Un ambiente vivace e accogliente, perfetto per una sosta gustosa e internazionale durante l'Adunata.", // Changed "pregiati" to "vari", removed Slow Food reference
    details_en:
      "Experience the authentic atmosphere of a typical Spanish venue at La Flaca Tapas Bar, near the Funicular to Biella Piazzo. Savor unique sandwiches with km 0 ingredients from Cascina Masca, classic patatas bravas, and a selection of traditional tapas. Pair it all with creative cocktails, refreshing sangria, beer, or various Spanish wines. A lively and welcoming environment, perfect for a tasty and international stop during the Adunata.", // Changed "fine" to "various", removed Slow Food reference
    details_es:
      "Vive la auténtica atmósfera de un local típico español en La Flaca Bar de Tapas, cerca del Funicular a Biella Piazzo. Saborea bocadillos únicos con ingredientes km 0 de la Cascina Masca, las clásicas patatas bravas y una selección de tapas tradicionales. Acompáñalo todo con cócteles creativos, refrescante sangría, cerveza o varios vinos españoles. Un ambiente animado y acogedor, perfecto para una parada sabrosa e internacional durante la Adunata.", // Changed "selectos" to "varios", removed Slow Food reference
    details_fr:
      "Vivez l'atmosphère authentique d'un lieu typiquement espagnol à La Flaca Bar à Tapas, près du Funiculaire pour Biella Piazzo. Savourez des sandwichs uniques avec des ingrédients km 0 de la Cascina Masca, les classiques patatas bravas et une sélection de tapas traditionnelles. Accompagnez le tout de cocktails créatifs, de sangria rafraîchissante, de bière ou de divers vins espagnols. Un environnement animé et accueillant, parfait pour une halte savoureuse et internationale pendant l'Adunata.", // Changed "fins" to "divers", removed Slow Food reference
    details_de:
      "Erleben Sie die authentische Atmosphäre eines typisch spanischen Lokals in der La Flaca Tapas-Bar, in der Nähe der Standseilbahn nach Biella Piazzo. Genießen Sie einzigartige Sandwiches mit Km-0-Zutaten von der Cascina Masca, klassische Patatas Bravas und eine Auswahl an traditionellen Tapas. Begleiten Sie alles mit kreativen Cocktails, erfrischender Sangria, Bier oder verschiedenen spanischen Weinen. Eine lebhafte und einladende Umgebung, perfekt für einen schmackhaften und internationalen Stopp während der Adunata.", // Changed "erlesenen" to "verschiedenen", removed Slow Food reference
    images: ["/images/flaca.jpeg"],
    openingHours: `giovedì: 17:30-22:00\nvenerdì: 17:30-01:00\nsabato: 17:30-01:00\ndomenica: 17:30-22:00\nlunedì: Chiuso\nmartedì: Chiuso\nmercoledì: Chiuso`,
    openingHours_en: `Thursday: 17:30-22:00\nFriday: 17:30-01:00\nSaturday: 17:30-01:00\nSunday: 17:30-22:00\nMonday: Closed\nTuesday: Closed\nWednesday: Closed`,
    openingHours_es: `Jueves: 17:30-22:00\nViernes: 17:30-01:00\nSábado: 17:30-01:00\nDomingo: 17:30-22:00\nLunes: Cerrado\nMartes: Cerrado\nMiércoles: Cerrado`,
    openingHours_fr: `Jeudi : 17h30-22h00\nVendredi : 17h30-01h00\nSamedi : 17h30-01h00\nDimanche : 17h30-22h00\nLundi : Fermé\nMardi : Fermé\nMercredi : Fermé`,
    openingHours_de: `Donnerstag: 17:30-22:00\nFreitag: 17:30-01:00\nSamstag: 17:30-01:00\nSonntag: 17:30-22:00\nMontag: Geschlossen\nDienstag: Geschlossen\nMittwoch: Geschlossen`,
    discountInfo:
      "Panini km0 (Cascina Masca), patatas bravas, tapas, sangria e vini spagnoli!",
    discountInfo_en:
      "Km0 sandwiches (Cascina Masca), patatas bravas, tapas, sangria & Spanish wines!",
    discountInfo_es:
      "¡Bocadillos km0 (Cascina Masca), patatas bravas, tapas, sangría y vinos españoles!",
    discountInfo_fr:
      "Sandwichs km0 (Cascina Masca), patatas bravas, tapas, sangria et vins espagnols !",
    discountInfo_de:
      "Km0-Sandwiches (Cascina Masca), Patatas Bravas, Tapas, Sangria & spanische Weine!",
    tags: [
      "Bar",
      "Tapas",
      "Cucina Spagnola",
      "Panini Km0",
      "Patatas Bravas",
      "Sangria",
      "Vini Spagnoli",
      "Biella Piazzo",
    ],
    tags_en: [
      "Bar",
      "Tapas",
      "Spanish Cuisine",
      "Km0 Sandwiches",
      "Patatas Bravas",
      "Sangria",
      "Spanish Wines",
      "Biella Piazzo",
    ],
    tags_es: [
      "Bar",
      "Tapas",
      "Cocina Española",
      "Bocadillos Km0",
      "Patatas Bravas",
      "Sangría",
      "Vinos Españoles",
      "Biella Piazzo",
    ],
    tags_fr: [
      "Bar",
      "Tapas",
      "Cuisine Espagnole",
      "Sandwichs Km0",
      "Patatas Bravas",
      "Sangria",
      "Vins Espagnols",
      "Biella Piazzo",
    ],
    tags_de: [
      "Bar",
      "Tapas",
      "Spanische Küche",
      "Km0-Sandwiches",
      "Patatas Bravas",
      "Sangria",
      "Spanische Weine",
      "Biella Piazzo",
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
    id: 609, // New unique ID
    name: "Cremeria del Piazzo",
    name_en: "Cremeria del Piazzo (Piazzo Creamery)",
    name_es: "Cremeria del Piazzo (Lechería del Piazzo)",
    name_fr: "Cremeria del Piazzo (Crèmerie du Piazzo)",
    name_de: "Cremeria del Piazzo (Piazzo Molkerei)",
    type: "bar", // Strong café/gelateria/bar elements
    coordinates: [45.56617, 8.045296],
    googleRating: 3.9,
    googleReviewCount: 240,
    address: "Piazza della Cisterna, 7/A, 13900 Biella BI (Biella Piazzo)", // Added Piazzo context
    phone: "3899910334",
    website: "https://cremeriadelpiazzo.it/",
    shortDescription:
      "Cremeria del Piazzo: storia e dolcezza a Biella Piazzo. Gelato, caffè, cocktail e tanto altro.",
    shortDescription_en:
      "Cremeria del Piazzo: history and sweetness in Biella Piazzo. Gelato, coffee, cocktails, and much more.",
    shortDescription_es:
      "Cremeria del Piazzo: historia y dulzura en Biella Piazzo. Helados, café, cócteles y mucho más.",
    shortDescription_fr:
      "Cremeria del Piazzo : histoire et douceur à Biella Piazzo. Glaces, café, cocktails et bien plus.",
    shortDescription_de:
      "Cremeria del Piazzo: Geschichte und Süße in Biella Piazzo. Eis, Kaffee, Cocktails und vieles mehr.",
    details:
      "Situata nel cuore del quartiere medievale di Biella Piazzo, la Cremeria del Piazzo è un locale storico che offre un'ampia gamma di delizie. Dalla caffetteria mattutina con bakery e colazioni, al gelato artigianale, frappè, cioccolateria, tè e tisane. Perfetta per una pausa, un aperitivo con ottimi cocktail o uno spuntino con toast, focacce e crêpes (anche gluten-free). Dispone di tavoli all'aperto. Attenzione: non si accettano prenotazioni. Un luogo ricco di fascino per ogni momento della giornata durante l'Adunata.",
    details_en:
      "Located in the heart of the medieval Piazzo district of Biella, Cremeria del Piazzo is a historic venue offering a wide range of delights. From morning coffee with bakery items and breakfast, to artisanal gelato, milkshakes, chocolate, tea, and herbal infusions. Perfect for a break, an aperitif with excellent cocktails, or a snack with toast, focaccia, and crepes (also gluten-free). Features outdoor seating. Please note: no reservations are accepted. A charming place for any time of day during the Adunata.",
    details_es:
      "Ubicada en el corazón del barrio medieval de Biella Piazzo, la Cremeria del Piazzo es un local histórico que ofrece una amplia gama de delicias. Desde el café matutino con bollería y desayunos, hasta helados artesanales, batidos, chocolatería, té e infusiones. Perfecta para una pausa, un aperitivo con excelentes cócteles o un tentempié con tostadas, focaccias y crepes (también sin gluten). Dispone de mesas al aire libre. Atención: no se aceptan reservas. Un lugar lleno de encanto para cualquier momento del día durante la Adunata.",
    details_fr:
      "Située au cœur du quartier médiéval de Biella Piazzo, la Cremeria del Piazzo est un lieu historique offrant une large gamme de délices. Du café du matin avec viennoiseries et petits déjeuners, aux glaces artisanales, milkshakes, chocolats, thés et tisanes. Parfait pour une pause, un apéritif avec d'excellents cocktails, ou un en-cas avec toasts, focaccias et crêpes (également sans gluten). Dispose de tables en extérieur. Attention : les réservations ne sont pas acceptées. Un lieu plein de charme pour chaque moment de la journée pendant l'Adunata.",
    details_de:
      "Die Cremeria del Piazzo im Herzen des mittelalterlichen Viertels Piazzo von Biella ist ein historischer Ort, der eine große Auswahl an Köstlichkeiten bietet. Vom Morgenkaffee mit Backwaren und Frühstück über handwerkliches Eis, Milchshakes, Schokolade, Tee und Kräutertees. Perfekt für eine Pause, einen Aperitif mit ausgezeichneten Cocktails oder einen Snack mit Toast, Focaccia und Crêpes (auch glutenfrei). Verfügt über Sitzplätze im Freien. Bitte beachten Sie: Reservierungen werden nicht angenommen. Ein charmanter Ort für jede Tageszeit während der Adunata.",
    images: ["/images/cremeria.png"], // Example image path
    openingHours: `Lun-Gio: 07:30-20:00\nVen-Dom: 08:00-02:00`, // Assumes 08:00-02:00 is for Fri, Sat, Sun
    openingHours_en: `Mon-Thu: 07:30-20:00\nFri-Sun: 08:00-02:00`,
    openingHours_es: `Lun-Jue: 07:30-20:00\nVie-Dom: 08:00-02:00`,
    openingHours_fr: `Lun-Jeu: 07h30-20h00\nVen-Dim: 08h00-02h00`,
    openingHours_de: `Mo-Do: 07:30-20:00\nFr-So: 08:00-02:00`,
    discountInfo:
      "Gelato artigianale, caffetteria, cocktail. Crêpes senza glutineì",
    discountInfo_en:
      "Artisanal gelato, coffee shop, cocktails. Gluten-free crepes.",
    discountInfo_es:
      "Helado artesanal, cafetería, cócteles. Crepes sin gluten.",
    discountInfo_fr: "Glace artisanale, café, cocktails. Crêpes sans gluten.",
    discountInfo_de: "Handwerkliches Eis, Café, Cocktails. Glutenfreie Crêpes.",
    tags: [
      "Bar",
      "Gelateria",
      "Caffetteria",
      "Cocktail",
      "Biella Piazzo",
      "Senza Glutine",
      "Tavoli Aperto",
      "No Prenotazioni",
    ],
    tags_en: [
      "Bar",
      "Gelateria",
      "Coffee Shop",
      "Cocktails",
      "Biella Piazzo",
      "Gluten-Free",
      "Outdoor Seating",
      "No Reservations",
    ],
    tags_es: [
      "Bar",
      "Heladería",
      "Cafetería",
      "Cócteles",
      "Biella Piazzo",
      "Sin Gluten",
      "Terraza",
      "No Reservas",
    ],
    tags_fr: [
      "Bar",
      "Glacier",
      "Café",
      "Cocktails",
      "Biella Piazzo",
      "Sans Gluten",
      "Terrasse",
      "Pas de Réservations",
    ],
    tags_de: [
      "Bar",
      "Eisdiele",
      "Café",
      "Cocktails",
      "Biella Piazzo",
      "Glutenfrei",
      "Außenbereich",
      "Keine Reservierungen",
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
    id: 610, // New unique ID
    name: "Caffè Galleria To Mich",
    name_en: "To Mich Gallery Café",
    name_es: "Café Galería To Mich",
    name_fr: "Café Galerie To Mich",
    name_de: "Café Galerie To Mich",
    type: "bar", // Also has strong café and light meal aspects
    coordinates: [45.564799, 8.054944],
    googleRating: 4.1,
    googleReviewCount: 57,
    address: "Via Antonio Gramsci, 6, 13900 Biella BI (Galleria)", // Added "Galleria" context
    phone: "3519424924",
    website:
      "https://www.facebook.com/people/Caff%C3%A8-galleria-To-Mich/61565500285150/", // Cleaned FB link
    shortDescription:
      "Caffè Galleria To Mich: spazio, gusto e sorprese a Biella! Lasagne, babà alla grappa e orario no-stop nel weekend Adunata.",
    shortDescription_en:
      "To Mich Gallery Café: space, taste, and surprises in Biella! Lasagna, grappa babà, and non-stop hours on Adunata weekend.",
    shortDescription_es:
      "Café Galería To Mich: ¡espacio, sabor y sorpresas en Biella! Lasaña, babà a la grappa y horario ininterrumpido el fin de semana de la Adunata.",
    shortDescription_fr:
      "Café Galerie To Mich : espace, goût et surprises à Biella ! Lasagnes, baba au grappa et horaires non-stop le week-end de l'Adunata.",
    shortDescription_de:
      "Café Galerie To Mich: Platz, Geschmack und Überraschungen in Biella! Lasagne, Grappa-Babà und Nonstop-Öffnungszeiten am Adunata-Wochenende.",
    details:
      "Il Caffè Galleria To Mich, situato in una spaziosa galleria coperta in Via Gramsci, offre un ambiente versatile con 130 posti a sedere su due livelli. Con ORARI ESTESI per l'Adunata (Ven-Dom 07:30-03:00), è perfetto dalla colazione al dopocena. Gustate le loro rinomate lasagne o lasciatevi tentare dal babà napoletano alla grappa. Un luogo ideale per gruppi e per una pausa confortevole e gustosa in ogni momento, al riparo e nel cuore di Biella.",
    details_en:
      "To Mich Gallery Café, located in a spacious covered gallery on Via Gramsci, offers a versatile environment with 130 seats on two levels. With EXTENDED HOURS for the Adunata (Fri-Sun 07:30-03:00), it's perfect from breakfast to after-dinner. Enjoy their renowned lasagna or be tempted by the Neapolitan grappa babà. An ideal place for groups and for a comfortable, tasty break at any time, sheltered and in the heart of Biella.",
    details_es:
      "El Café Galería To Mich, ubicado en una espaciosa galería cubierta en Via Gramsci, ofrece un ambiente versátil con 130 asientos en dos niveles. Con HORARIO EXTENDIDO para la Adunata (Vie-Dom 07:30-03:00), es perfecto desde el desayuno hasta después de la cena. Disfrute de su famosa lasaña o déjese tentar por el babà napolitano a la grappa. Un lugar ideal para grupos y para una pausa cómoda y sabrosa en cualquier momento, resguardado y en el corazón de Biella.",
    details_fr:
      "Le Café Galerie To Mich, situé dans une galerie couverte spacieuse sur la Via Gramsci, offre un environnement polyvalent avec 130 places assises sur deux niveaux. Avec des HORAIRES PROLONGÉS pour l'Adunata (Ven-Dim 07h30-03h00), il est parfait du petit-déjeuner à l'après-dîner. Dégustez leurs lasagnes renommées ou laissez-vous tenter par le baba napolitain au grappa. Un lieu idéal pour les groupes et pour une pause confortable et savoureuse à tout moment, à l'abri et au cœur de Biella.",
    details_de:
      "Das Café Galerie To Mich in einer geräumigen überdachten Galerie in der Via Gramsci bietet eine vielseitige Umgebung mit 130 Sitzplätzen auf zwei Ebenen. Mit VERLÄNGERTEN ÖFFNUNGSZEITEN für die Adunata (Fr-So 07:30-03:00) ist es perfekt vom Frühstück bis nach dem Abendessen. Genießen Sie die berühmte Lasagne oder lassen Sie sich vom neapolitanischen Grappa-Babà verführen. Ein idealer Ort für Gruppen und für eine komfortable, schmackhafte Pause zu jeder Zeit, geschützt und im Herzen von Biella.",
    images: ["/images/mich.jpeg"], // Example image path
    openingHours: `giovedì: 07:30-20:00\nvenerdì: 07:30-03:00\nsabato: 07:30-03:00\ndomenica: 07:30-03:00\nlunedì: 07:30-20:00\nmartedì: 07:30-20:00\nmercoledì: 07:30-20:00`,
    openingHours_en: `Thursday: 07:30-20:00\nFriday: 07:30-03:00\nSaturday: 07:30-03:00\nSunday: 07:30-03:00\nMonday: 07:30-20:00\nTuesday: 07:30-20:00\nWednesday: 07:30-20:00`,
    openingHours_es: `Jueves: 07:30-20:00\nViernes: 07:30-03:00\nSábado: 07:30-03:00\nDomingo: 07:30-03:00\nLunes: 07:30-20:00\nMartes: 07:30-20:00\nMiércoles: 07:30-20:00`,
    openingHours_fr: `Jeudi : 07h30-20h00\nVendredi : 07h30-03h00\nSamedi : 07h30-03h00\nDimanche : 07h30-03h00\nLundi : 07h30-20h00\nMardi : 07h30-20h00\nMercredi : 07h30-20h00`,
    openingHours_de: `Donnerstag: 07:30-20:00\nFreitag: 07:30-03:00\nSamstag: 07:30-03:00\nSonntag: 07:30-03:00\nMontag: 07:30-20:00\nDienstag: 07:30-20:00\nMittwoch: 07:30-20:00`,
    discountInfo:
      "Ottime lasagne e babà napoletano alla grappa. Ampio spazio al coperto.",
    discountInfo_en:
      "Excellent lasagna and Neapolitan grappa babà. Ample covered space.",
    discountInfo_es:
      "Excelente lasaña y babà napolitano a la grappa. Amplio espacio cubierto.",
    discountInfo_fr:
      "Excellentes lasagnes et baba napolitain au grappa. Grand espace couvert.",
    discountInfo_de:
      "Ausgezeichnete Lasagne und neapolitanischer Grappa-Babà. Großer überdachter Bereich.",
    tags: [
      "Bar",
      "Caffetteria",
      "Ristorante",
      "Lasagne",
      "Babà",
      "Galleria Coperta",
      "Biella Centro",
      "Aperto Tardi (Weekend)",
    ],
    tags_en: [
      "Bar",
      "Café",
      "Restaurant",
      "Lasagna",
      "Babà",
      "Covered Gallery",
      "Biella Center",
      "Open Late (Weekend)",
    ],
    tags_es: [
      "Bar",
      "Cafetería",
      "Restaurante",
      "Lasaña",
      "Babà",
      "Galería Cubierta",
      "Biella Centro",
      "Abierto Tarde (Fin de Semana)",
    ],
    tags_fr: [
      "Bar",
      "Café",
      "Restaurant",
      "Lasagnes",
      "Baba",
      "Galerie Couverte",
      "Biella Centre",
      "Ouvert Tard (Week-end)",
    ],
    tags_de: [
      "Bar",
      "Café",
      "Restaurant",
      "Lasagne",
      "Babà",
      "Überdachte Galerie",
      "Biella Zentrum",
      "Spät Geöffnet (Wochenende)",
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
    id: 611, // New unique ID
    name: "Bar Centro",
    name_en: "Bar Centro (Ponderano)",
    name_es: "Bar Centro (Ponderano)",
    name_fr: "Bar Centro (Ponderano)",
    name_de: "Bar Centro (Ponderano)",
    type: "bar",
    coordinates: [45.538013, 8.05475],
    googleRating: 4.2,
    googleReviewCount: 115,
    address: "Piazza Giuseppe Garibaldi, 31, 13875 Ponderano BI",
    phone: "3242884569",
    website: "https://restaurantguru.it/Bar-Centro-Ponderano",
    shortDescription:
      "Bar Centro a Ponderano: il tuo pit-stop ideale! Colazioni, aperitivi e serate. Orari estesi.",
    shortDescription_en:
      "Bar Centro in Ponderano: your ideal pit-stop! Breakfast, aperitifs, and evenings. Extended hours.",
    shortDescription_es:
      "Bar Centro en Ponderano: ¡tu parada ideal! Desayunos, aperitivos y veladas. Horario extendido.",
    shortDescription_fr:
      "Bar Centro à Ponderano : votre halte idéale ! Petits déjeuners, apéritifs et soirées. Horaires étendus.",
    shortDescription_de:
      "Bar Centro in Ponderano: Ihr idealer Boxenstopp! Frühstück, Aperitifs und Abende. Erweiterte Öffnungszeiten.",
    details:
      "Bar Centro, nel cuore di Ponderano in Piazza Garibaldi, è il luogo perfetto per una pausa energizzante o un momento di relax. Che sia per una colazione veloce, un caffè rigenerante, un aperitivo con amici o per concludere la serata, troverete un ambiente accogliente. Aperto con orario continuato fino a mezzanotte per gran parte della settimana (domenica fino alle 00:00, ma apertura alle 07:00), è una comoda opzione per rifocillarsi durante l'Adunata.",
    details_en:
      "Bar Centro, in the heart of Ponderano in Piazza Garibaldi, is the perfect place for an energizing break or a moment of relaxation. Whether for a quick breakfast, a refreshing coffee, an aperitif with friends, or to end the evening, you'll find a welcoming atmosphere. Open continuously until midnight most of the week (Sunday until 00:00, but opens at 07:00), it's a convenient option to refuel during the Adunata.",
    details_es:
      "Bar Centro, en el corazón de Ponderano en la Piazza Garibaldi, es el lugar perfecto para una pausa energizante o un momento de relajación. Ya sea para un desayuno rápido, un café reparador, un aperitivo con amigos o para terminar la noche, encontrará un ambiente acogedor. Abierto en horario continuado hasta la medianoche la mayor parte de la semana (domingo hasta las 00:00, pero abre a las 07:00), es una opción conveniente para reponer fuerzas durante la Adunata.",
    details_fr:
      "Le Bar Centro, au cœur de Ponderano sur la Piazza Garibaldi, est l'endroit idéal pour une pause énergisante ou un moment de détente. Que ce soit pour un petit déjeuner rapide, un café revigorant, un apéritif entre amis ou pour terminer la soirée, vous trouverez une ambiance accueillante. Ouvert en continu jusqu'à minuit la plupart de la semaine (dimanche jusqu'à 00h00, mais ouverture à 07h00), c'est une option pratique pour se restaurer pendant l'Adunata.",
    details_de:
      "Die Bar Centro im Herzen von Ponderano an der Piazza Garibaldi ist der perfekte Ort für eine stärkende Pause oder einen Moment der Entspannung. Ob für ein schnelles Frühstück, einen erfrischenden Kaffee, einen Aperitif mit Freunden oder zum Ausklang des Abends – hier finden Sie eine einladende Atmosphäre. Die Bar ist die meiste Zeit der Woche durchgehend bis Mitternacht geöffnet (Sonntag bis 00:00 Uhr, öffnet aber um 07:00 Uhr) und eine praktische Option, um sich während der Adunata zu stärken.",
    images: ["/images/barCentro.jpeg"], // Suggested image path
    openingHours: `Lun-Sab: 06:00-00:00\nDom: 07:00-00:00`,
    openingHours_en: `Mon-Sat: 06:00-00:00\nSun: 07:00-00:00`,
    openingHours_es: `Lun-Sáb: 06:00-00:00\nDom: 07:00-00:00`,
    openingHours_fr: `Lun-Sam: 06h00-00h00\nDim: 07h00-00h00`,
    openingHours_de: `Mo-Sa: 06:00-00:00\nSo: 07:00-00:00`,
    discountInfo: "",
    discountInfo_en: "",
    discountInfo_es: "",
    discountInfo_fr: "",
    discountInfo_de: "",
    tags: [
      "Bar",
      "Caffetteria",
      "Aperitivo",
      "Ponderano",
      "Colazione",
      "Serale",
    ],
    tags_en: [
      "Bar",
      "Cafeteria",
      "Aperitif",
      "Ponderano",
      "Breakfast",
      "Evening",
    ],
    tags_es: [
      "Bar",
      "Cafetería",
      "Aperitivo",
      "Ponderano",
      "Desayuno",
      "Noche",
    ],
    tags_fr: [
      "Bar",
      "Cafétéria",
      "Apéritif",
      "Ponderano",
      "Petit Déjeuner",
      "Soirée",
    ],
    tags_de: [
      "Bar",
      "Cafeteria",
      "Aperitif",
      "Ponderano",
      "Frühstück",
      "Abend",
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
    id: 612,
    name: "Caffetteria del Ricetto",
    name_en: "Caffetteria del Ricetto (Ricetto Café)",
    name_es: "Caffetteria del Ricetto (Cafetería del Ricetto)",
    name_fr: "Caffetteria del Ricetto (Café du Ricetto)",
    name_de: "Caffetteria del Ricetto (Ricetto-Café)",
    type: "bar",
    coordinates: [45.546378, 8.112179],
    googleRating: 4.3,
    googleReviewCount: 141,
    address: "Piazza Castello, 12, 13878 Candelo BI",
    phone: "0152537794",
    website: "https://www.instagram.com/caffetteriadelricettodicandelo/",
    shortDescription:
      "Caffetteria nel Ricetto di Candelo: cocktail, musica live, tavoli all'aperto e specialità Adunata (vino 'I Pionieri').",
    shortDescription_en:
      "Café in Ricetto di Candelo: cocktails, live music, outdoor seating, and Adunata specialties ('I Pionieri' wine).",
    shortDescription_es:
      "Cafetería en el Ricetto de Candelo: cócteles, música en vivo, terraza y especialidades de la Adunata (vino 'I Pionieri').",
    shortDescription_fr:
      "Café au Ricetto de Candelo : cocktails, musique live, terrasse et spécialités de l'Adunata (vin 'I Pionieri').",
    shortDescription_de:
      "Café im Ricetto di Candelo: Cocktails, Live-Musik, Außensitzplätze und Adunata-Spezialitäten ('I Pionieri'-Wein).",
    details:
      "Situata nella storica Piazza Castello del Ricetto di Candelo, la Caffetteria del Ricetto offre un'atmosfera unica con tavoli all'aperto, ottimi cocktail e spesso musica dal vivo. Per l'Adunata, propone prodotti tipici, panini, focacce, birra, spritz e il vino ufficiale dell'Adunata 'I Pionieri'. Un luogo suggestivo per una pausa, un aperitivo o una serata in compagnia, con orari estesi nel weekend (Ven-Dom fino all'01:00).", // "spesso musica dal vivo"
    details_en:
      "Located in the historic Piazza Castello of Ricetto di Candelo, Caffetteria del Ricetto offers a unique atmosphere with outdoor seating, great cocktails, and often live music. For the Adunata, it features typical products, sandwiches, focaccias, beer, spritz, and the official Adunata wine 'I Pionieri'. A charming place for a break, an aperitif, or an evening with company, with extended hours on weekends (Fri-Sun until 01:00 AM).", // "often live music"
    details_es:
      "Ubicada en la histórica Piazza Castello del Ricetto de Candelo, la Caffetteria del Ricetto ofrece un ambiente único con mesas al aire libre, excelentes cócteles y a menudo música en vivo. Para la Adunata, ofrece productos típicos, bocadillos, focaccias, cerveza, spritz y el vino oficial de la Adunata 'I Pionieri'. Un lugar encantador para una pausa, un aperitivo o una velada en compañía, con horario extendido los fines de semana (Vie-Dom hasta la 01:00).", // "a menudo música en vivo"
    details_fr:
      "Situé sur la place historique Piazza Castello du Ricetto de Candelo, la Caffetteria del Ricetto offre une atmosphère unique avec terrasse, d'excellents cocktails et souvent de la musique live. Pour l'Adunata, elle propose des produits typiques, des sandwichs, des focaccias, de la bière, du spritz et le vin officiel de l'Adunata 'I Pionieri'. Un lieu charmant pour une pause, un apéritif ou une soirée en compagnie, avec des horaires prolongés le week-end (Ven-Dim jusqu'à 01h00).", // "souvent de la musique live"
    details_de:
      "Das Caffetteria del Ricetto am historischen Piazza Castello im Ricetto di Candelo bietet eine einzigartige Atmosphäre mit Sitzplätzen im Freien, großartigen Cocktails und oft Live-Musik. Für die Adunata werden typische Produkte, Sandwiches, Focaccias, Bier, Spritz und der offizielle Adunata-Wein 'I Pionieri' angeboten. Ein charmanter Ort für eine Pause, einen Aperitif oder einen Abend in Gesellschaft, mit verlängerten Öffnungszeiten am Wochenende (Fr-So bis 01:00 Uhr).", // "oft Live-Musik"
    images: ["/images/ricetto.jpeg"],
    openingHours: `Lun-Mar, Gio: 07:00-00:00\nMer: 07:00-14:30\nVen-Dom: 07:00-01:00`,
    openingHours_en: `Mon-Tue, Thu: 07:00-00:00\nWed: 07:00-14:30\nFri-Sun: 07:00-01:00`,
    openingHours_es: `Lun-Mar, Jue: 07:00-00:00\nMié: 07:00-14:30\nVie-Dom: 07:00-01:00`,
    openingHours_fr: `Lun-Mar, Jeu: 07h00-00h00\nMer: 07h00-14h30\nVen-Dim: 07h00-01h00`,
    openingHours_de: `Mo-Di, Do: 07:00-00:00\nMi: 07:00-14:30\nFr-So: 07:00-01:00`,
    discountInfo:
      "Prodotti tipici, panini, focacce e vino ufficiale Adunata 'I Pionieri'.",
    discountInfo_en:
      "Typical products, sandwiches, focaccias, and official Adunata wine 'I Pionieri'.",
    discountInfo_es:
      "Productos típicos, bocadillos, focaccias y vino oficial de la Adunata 'I Pionieri'.",
    discountInfo_fr:
      "Produits typiques, sandwichs, focaccias et vin officiel de l'Adunata 'I Pionieri'.",
    discountInfo_de:
      "Typische Produkte, Sandwiches, Focaccias und offizieller Adunata-Wein 'I Pionieri'.",
    tags: [
      "Bar",
      "Caffetteria",
      "Ricetto Candelo",
      "Musica dal Vivo",
      "Cocktail",
      "Vino Adunata",
      "Tavoli Aperto",
      "Panini",
      "Focacce",
    ],
    tags_en: [
      "Bar",
      "Cafeteria",
      "Ricetto Candelo",
      "Live Music",
      "Cocktails",
      "Adunata Wine",
      "Outdoor Seating",
      "Sandwiches",
      "Focaccias",
    ],
    tags_es: [
      "Bar",
      "Cafetería",
      "Ricetto Candelo",
      "Música en Vivo",
      "Cócteles",
      "Vino Adunata",
      "Terraza",
      "Bocadillos",
      "Focaccias",
    ],
    tags_fr: [
      "Bar",
      "Cafétéria",
      "Ricetto Candelo",
      "Musique Live",
      "Cocktails",
      "Vin Adunata",
      "Terrasse",
      "Sandwichs",
      "Focaccias",
    ],
    tags_de: [
      "Bar",
      "Cafeteria",
      "Ricetto Candelo",
      "Live-Musik",
      "Cocktails",
      "Adunata Wein",
      "Außenbereich",
      "Sandwiches",
      "Focaccias",
    ],
    partyInfo: "", // Removed
    partyInfo_en: "", // Removed
    partyInfo_es: "", // Removed
    partyInfo_fr: "", // Removed
    partyInfo_de: "", // Removed
    partyHours: "", // Removed
    partyHours_en: "", // Removed
    partyHours_es: "", // Removed
    partyHours_fr: "", // Removed
    partyHours_de: "", // Removed
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
    images: ["/images/konstanten.jpeg"], // Suggested image path, please create this image
    openingHours: `Lun, Mar, Mer: 07:00-15:00\nGio: 07:00-15:00, 18:00-22:00\nVen, Sab, Dom: 10:00-24:00`,
    openingHours_en: `Mon, Tue, Wed: 07:00-15:00\nThu: 07:00-15:00, 18:00-22:00\nFri, Sat, Sun: 10:00-24:00`,
    openingHours_es: `Lun, Mar, Mié: 07:00-15:00\nJue: 07:00-15:00, 18:00-22:00\nVie, Sáb, Dom: 10:00-24:00`,
    openingHours_fr: `Lun, Mar, Mer: 07h00-15h00\nJeu: 07h00-15h00, 18h00-22h00\nVen, Sam, Dim: 10h00-24h00`,
    openingHours_de: `Mo, Di, Mi: 07:00-15:00\nDo: 07:00-15:00, 18:00-22:00\nFr, Sa, So: 10:00-24:00`,
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
    images: ["/images/pizzeriaGigi.jpeg"],
    openingHours: `Mar: Chiuso\nMer-Gio: 18:30-22:00\nVen: 10:00-24:00\nSab: 10:00-24:00\nDom: 10:00-24:00\nLun: Chiuso`,
    openingHours_en: `Tue: Closed\nWed-Thu: 18:30-22:00\nFri: 10:00-24:00\nSat: 10:00-24:00\nSun: 10:00-24:00\nMon: Closed`,
    openingHours_es: `Mar: Cerrado\nMié-Jue: 18:30-22:00\nVie: 10:00-24:00\nSáb: 10:00-24:00\nDom: 10:00-24:00\nLun: Cerrado`,
    openingHours_fr: `Mar: Fermé\nMer-Jeu: 18h30-22h00\nVen: 10h00-24h00\nSam: 10h00-24h00\nDim: 10h00-24h00\nLun: Fermé`,
    openingHours_de: `Di: Geschlossen\nMi-Do: 18:30-22:00\nFr: 10:00-24:00\nSa: 10:00-24:00\nSo: 10:00-24:00\nMo: Geschlossen`,
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
  // ... (previous POI entries) ...
  {
    id: 211, // New unique ID
    name: "La Bottega di Katia",
    name_en: "Katia's Shop (La Bottega di Katia)",
    name_es: "La Bodega de Katia",
    name_fr: "L'Échoppe de Katia",
    name_de: "Katias Laden (La Bottega di Katia)",
    type: "restaurant",
    coordinates: [45.468478, 8.069409],
    googleRating: 4.9,
    googleReviewCount: 8,
    address: "Piazza Chiarletti, 13882 Cerrione BI",
    phone: "3492857495",
    website:
      "https://www.facebook.com/people/La-bottega-di-Katia/61576047234072/",
    shortDescription:
      "La Bottega di Katia: sapori autentici, accoglienza calorosa e orari no-stop per l'Adunata!",
    shortDescription_en:
      "Katia's Shop: authentic flavors, warm hospitality, and non-stop hours for the Adunata!",
    shortDescription_es:
      "La Bodega de Katia: ¡Sabores auténticos, cálida bienvenida y horario ininterrumpido para la Adunata!",
    shortDescription_fr:
      "L'Échoppe de Katia : Saveurs authentiques, accueil chaleureux et horaires non-stop pour l'Adunata !",
    shortDescription_de:
      "Katias Laden: Authentische Aromen, herzliche Gastfreundschaft und Nonstop-Öffnungszeiten für die Adunata!",
    details:
      "Scoprite La Bottega di Katia a Cerrione, un'autentica osteria dall'atmosfera vivace e accogliente. Perfetta per l'Adunata, con ORARI ESTESI (APERTO 24 ORE Venerdì, Sabato, Domenica!), vi delizierà con panini farciti, ricchi taglieri di prodotti locali, e la genuina 'pasta pasticciata'. Scegliete il conveniente menu a prezzo fisso o gustate un ottimo spritz. È la sosta ideale per rifocillarsi con gusto e allegria durante l'evento!",
    details_en:
      "Discover Katia's Shop in Cerrione, an authentic osteria with a lively and welcoming atmosphere. Perfect for the Adunata, with EXTENDED HOURS (OPEN 24 HOURS Friday, Saturday, Sunday!), it will delight you with stuffed sandwiches, rich platters of local products, and genuine 'pasta pasticciata'. Opt for the affordable fixed-price menu or enjoy a great spritz. It's the ideal stop to refuel with taste and joy during the event!",
    details_es:
      "Descubre La Bodega de Katia en Cerrione, una auténtica ostería con un ambiente animado y acogedor. Perfecta para la Adunata, con HORARIO EXTENDIDO (¡ABIERTO 24 HORAS Viernes, Sábado, Domingo!), te deleitará con bocadillos rellenos, ricas tablas de productos locales y la genuina 'pasta pasticciata'. Opta por el asequible menú de precio fijo o disfruta de un excelente spritz. ¡Es la parada ideal para reponer fuerzas con sabor y alegría durante el evento!",
    details_fr:
      "Découvrez L'Échoppe de Katia à Cerrione, une authentique osteria à l'atmosphère vivante et accueillante. Parfaite pour l'Adunata, avec des HORAIRES PROLONGÉS (OUVERT 24H/24 Vendredi, Samedi, Dimanche !), elle vous régalera de sandwichs garnis, de riches planches de produits locaux et de l'authentique 'pasta pasticciata'. Optez pour le menu à prix fixe abordable ou savourez un excellent spritz. C'est l'arrêt idéal pour se restaurer avec goût et joie pendant l'événement !",
    details_de:
      "Entdecken Sie Katias Laden in Cerrione, eine authentische Osteria mit lebendiger und einladender Atmosphäre. Perfekt für die Adunata, mit VERLÄNGERTEN ÖFFNUNGSZEITEN (Freitag, Samstag, Sonntag 24 STUNDEN GEÖFFNET!), wird es Sie mit gefüllten Sandwiches, reichhaltigen Platten mit lokalen Produkten und echter 'Pasta Pasticciata' begeistern. Wählen Sie das günstige Festpreismenü oder genießen Sie einen großartigen Spritz. Der ideale Stopp, um sich während der Veranstaltung geschmackvoll und fröhlich zu stärken!",
    images: ["/images/bottegaKatia.jpeg"],
    openingHours: `giovedì: 07:00-12:30, 16:30-19:30\nvenerdì: Aperto 24 ore\nsabato: Aperto 24 ore\ndomenica: Aperto 24 ore\nlunedì: 07:00-12:30, 16:30-19:30\nmartedì: 07:00-12:30, 16:30-19:30\nmercoledì: 07:00-12:30`,
    openingHours_en: `Thursday: 07:00-12:30, 16:30-19:30\nFriday: Open 24 hours\nSaturday: Open 24 hours\nSunday: Open 24 hours\nMonday: 07:00-12:30, 16:30-19:30\nTuesday: 07:00-12:30, 16:30-19:30\nWednesday: 07:00-12:30`,
    openingHours_es: `Jueves: 07:00-12:30, 16:30-19:30\nViernes: Abierto 24 horas\nSábado: Abierto 24 horas\nDomingo: Abierto 24 horas\nLunes: 07:00-12:30, 16:30-19:30\nMartes: 07:00-12:30, 16:30-19:30\nMiércoles: 07:00-12:30`,
    openingHours_fr: `Jeudi : 07h00-12h30, 16h30-19h30\nVendredi : Ouvert 24h/24\nSamedi : Ouvert 24h/24\nDimanche : Ouvert 24h/24\nLundi : 07h00-12h30, 16h30-19h30\nMardi : 07h00-12h30, 16h30-19h30\nMercredi : 07h00-12h30`,
    openingHours_de: `Donnerstag: 07:00-12:30, 16:30-19:30\nFreitag: 24 Stunden geöffnet\nSamstag: 24 Stunden geöffnet\nSonntag: 24 Stunden geöffnet\nMontag: 07:00-12:30, 16:30-19:30\nDienstag: 07:00-12:30, 16:30-19:30\nMittwoch: 07:00-12:30`,
    discountInfo: "Menu a prezzo fisso conveniente. Imperdibile!",
    discountInfo_en: "Affordable fixed-price menu. Unmissable!",
    discountInfo_es: "Menú de precio fijo asequible. ¡Imperdible!",
    discountInfo_fr: "Menu à prix fixe abordable. Immanquable !",
    discountInfo_de: "Günstiges Festpreismenü. Unbedingt probieren!",
    tags: [
      "Osteria",
      "Bar",
      "Cucina Tipica",
      "Panini",
      "Aperitivo",
      "Cerrione",
      "Aperto 24 Ore Adunata",
    ],
    tags_en: [
      "Osteria",
      "Bar",
      "Typical Cuisine",
      "Sandwiches",
      "Aperitif",
      "Cerrione",
      "Open 24h Adunata",
    ],
    tags_es: [
      "Ostería",
      "Bar",
      "Cocina Típica",
      "Bocadillos",
      "Aperitivo",
      "Cerrione",
      "Abierto 24h Adunata",
    ],
    tags_fr: [
      "Osteria",
      "Bar",
      "Cuisine Typique",
      "Sandwichs",
      "Apéritif",
      "Cerrione",
      "Ouvert 24h Adunata",
    ],
    tags_de: [
      "Osteria",
      "Bar",
      "Typische Küche",
      "Sandwiches",
      "Aperitif",
      "Cerrione",
      "24h Geöffnet Adunata",
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
    id: 212, // New unique ID
    name: "Pizza 23",
    name_en: "Pizza 23",
    name_es: "Pizza 23",
    name_fr: "Pizza 23",
    name_de: "Pizza 23",
    type: "restaurant",
    coordinates: [45.492434, 8.087857],
    googleRating: 4.3,
    googleReviewCount: 106,
    address: "Via Papa Giovanni XXIII, 22, 13882 Vergnasco BI",
    phone: "3293874844",
    website: "https://www.facebook.com/profile.php?id=61563746240250",
    shortDescription:
      "Pizza 23 a Vergnasco: il tuo pit-stop del gusto! Pizze, kebab, fritti e altro, con consegna a domicilio.", // Slightly toned down
    shortDescription_en:
      "Pizza 23 in Vergnasco: your flavor pit-stop! Pizza, kebab, fried treats, and more, with home delivery.",
    shortDescription_es:
      "Pizza 23 en Vergnasco: ¡tu parada de sabor! Pizza, kebab, fritos y más, con entrega a domicilio.",
    shortDescription_fr:
      "Pizza 23 à Vergnasco : votre pit-stop saveur ! Pizzas, kebabs, fritures et plus, avec livraison à domicile.",
    shortDescription_de:
      "Pizza 23 in Vergnasco: Ihr Geschmacks-Boxenstopp! Pizza, Kebab, Frittiertes und mehr, mit Lieferservice.",
    details:
      "Pizza 23 a Vergnasco rappresenta una scelta gastronomica versatile e apprezzata, ideale per i partecipanti all'Adunata. Il locale offre un'ampia gamma di specialità, incluse pizze, calzoni, panini, focacce, fritti e kebab, per soddisfare diverse preferenze. Un servizio distintivo è la consegna a domicilio, che garantisce la comodità di ricevere il pasto direttamente presso la propria sistemazione. Ottima soluzione per una cena rapida, saporita e conveniente durante l'evento.",
    details_en:
      "Pizza 23 in Vergnasco offers a versatile and well-regarded dining option, ideal for Adunata attendees. The establishment features a wide range of specialties, including pizzas, calzones, sandwiches, focaccias, fried items, and kebabs, catering to diverse preferences. A standout service is home delivery, ensuring the convenience of receiving your meal directly at your accommodation. An excellent solution for a quick, flavorful, and convenient dinner during the event.",
    details_es:
      "Pizza 23 en Vergnasco representa una opción gastronómica versátil y apreciada, ideal para los asistentes a la Adunata. El establecimiento ofrece una amplia gama de especialidades, incluyendo pizzas, calzones, bocadillos, focaccias, fritos y kebabs, para satisfacer diversas preferencias. Un servicio distintivo es la entrega a domicilio, que garantiza la comodidad de recibir su comida directamente en su alojamiento. Una excelente solución para una cena rápida, sabrosa y conveniente durante el evento.",
    details_fr:
      "Pizza 23 à Vergnasco constitue une option de restauration polyvalente et appréciée, idéale pour les participants à l'Adunata. L'établissement propose une large gamme de spécialités, y compris des pizzas, calzones, sandwichs, focaccias, fritures et kebabs, pour satisfaire diverses préférences. Un service distinctif est la livraison à domicile, assurant la commodité de recevoir votre repas directement à votre hébergement. Une excellente solution pour un dîner rapide, savoureux et pratique pendant l'événement.",
    details_de:
      "Pizza 23 in Vergnasco bietet eine vielseitige und geschätzte gastronomische Option, ideal für Adunata-Teilnehmer. Das Lokal verfügt über eine breite Palette an Spezialitäten, darunter Pizzen, Calzonen, Sandwiches, Focaccias, Frittiertes und Kebabs, um unterschiedlichen Vorlieben gerecht zu werden. Ein herausragender Service ist die Lieferung nach Hause, die den Komfort gewährleistet, Ihre Mahlzeit direkt in Ihrer Unterkunft zu erhalten. Eine ausgezeichnete Lösung für ein schnelles, geschmackvolles und bequemes Abendessen während der Veranstaltung.",
    images: ["/images/pizza23.jpeg"],
    openingHours: `giovedì: 17:30-20:45\nvenerdì: 17:30-20:45\nsabato: 17:30-20:45\ndomenica: 17:30-20:45\nlunedì: Chiuso\nmartedì: 17:30-20:45\nmercoledì: 17:30-20:45`,
    openingHours_en: `Thursday: 17:30-20:45\nFriday: 17:30-20:45\nSaturday: 17:30-20:45\nSunday: 17:30-20:45\nMonday: Closed\nTuesday: 17:30-20:45\nWednesday: 17:30-20:45`,
    openingHours_es: `Jueves: 17:30-20:45\nViernes: 17:30-20:45\nSábado: 17:30-20:45\nDomingo: 17:30-20:45\nLunes: Cerrado\nMartes: 17:30-20:45\nMiércoles: 17:30-20:45`,
    openingHours_fr: `Jeudi : 17h30-20h45\nVendredi : 17h30-20h45\nSamedi : 17h30-20h45\nDimanche : 17h30-20h45\nLundi : Fermé\nMardi : 17h30-20h45\nMercredi : 17h30-20h45`,
    openingHours_de: `Donnerstag: 17:30-20:45\nFreitag: 17:30-20:45\nSamstag: 17:30-20:45\nSonntag: 17:30-20:45\nMontag: Geschlossen\nDienstag: 17:30-20:45\nMittwoch: 17:30-20:45`,
    discountInfo: "Servizio di consegna a domicilio disponibile.",
    discountInfo_en: "Home delivery service available.",
    discountInfo_es: "Servicio de entrega a domicilio disponible.",
    discountInfo_fr: "Service de livraison à domicile disponible.",
    discountInfo_de: "Lieferservice nach Hause verfügbar.",
    tags: ["Pizzeria", "Kebab", "Consegna Domicilio", "Vergnasco", "Cena"], // More focused tags
    tags_en: ["Pizzeria", "Kebab", "Home Delivery", "Vergnasco", "Dinner"],
    tags_es: ["Pizzería", "Kebab", "Entrega Domicilio", "Vergnasco", "Cena"],
    tags_fr: ["Pizzeria", "Kebab", "Livraison Domicile", "Vergnasco", "Dîner"],
    tags_de: ["Pizzeria", "Kebab", "Lieferservice", "Vergnasco", "Abendessen"],
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
    id: 213, // New unique ID
    name: "Pizzeria Orchidea",
    name_en: "Pizzeria Orchidea",
    name_es: "Pizzeria Orchidea",
    name_fr: "Pizzeria Orchidea",
    name_de: "Pizzeria Orchidea",
    type: "restaurant",
    coordinates: [45.487682, 8.082564],
    googleRating: 4.6, // If you find this, we can add it
    googleReviewCount: 140, // If you find this, we can add it
    address: "Via Adua, 32, 13882 Vergnasco BI",
    phone: "0152583660",
    website:
      "https://restaurantguru.it/Orchidea-di-Zambito-Francesco-Vergnasco",
    shortDescription:
      "Pizzeria Orchidea a Vergnasco: eccellente pizza e fritto misto, con accogliente dehor. Una delizia per tutti!",
    shortDescription_en:
      "Pizzeria Orchidea in Vergnasco: excellent pizza and mixed fried seafood, with a welcoming outdoor area. A delight for everyone!",
    shortDescription_es:
      "Pizzeria Orchidea en Vergnasco: excelente pizza y fritura mixta, con una acogedora terraza. ¡Una delicia para todos!",
    shortDescription_fr:
      "Pizzeria Orchidea à Vergnasco : excellente pizza et friture mixte, avec une terrasse accueillante. Un délice pour tous !",
    shortDescription_de:
      "Pizzeria Orchidea in Vergnasco: ausgezeichnete Pizza und gemischte frittierte Meeresfrüchte, mit einladendem Außenbereich. Ein Genuss für alle!",
    details:
      "Pizzeria Orchidea, situata a Vergnasco, è rinomata per la sua ottima pizza e il delizioso fritto misto. Il locale offre un ambiente confortevole, arricchito da un piacevole dehor (tavoli all'aperto), ideale per gustare le specialità durante le belle giornate. Attenta alle famiglie, propone anche menu per bambini. Una scelta eccellente per un pasto gustoso e rilassante, perfetta per i partecipanti all'Adunata che cercano qualità e un'atmosfera conviviale.",
    details_en:
      "Pizzeria Orchidea, located in Vergnasco, is renowned for its excellent pizza and delicious mixed fried seafood. The venue offers a comfortable setting, enhanced by a pleasant outdoor seating area (dehor), ideal for enjoying specialties on fine days. Family-friendly, it also offers a children's menu. An excellent choice for a tasty and relaxing meal, perfect for Adunata attendees seeking quality and a convivial atmosphere.",
    details_es:
      "Pizzeria Orchidea, ubicada en Vergnasco, es reconocida por su excelente pizza y su deliciosa fritura mixta. El local ofrece un ambiente confortable, realzado por una agradable zona de mesas al aire libre (dehor), ideal para disfrutar de las especialidades en los días soleados. Pensado para las familias, también ofrece menú para niños. Una excelente opción para una comida sabrosa y relajante, perfecta para los asistentes a la Adunata que buscan calidad y un ambiente agradable.",
    details_fr:
      "La Pizzeria Orchidea, située à Vergnasco, est réputée pour son excellente pizza et sa délicieuse friture mixte. L'établissement offre un cadre confortable, agrémenté d'une agréable terrasse (dehor), idéale pour déguster les spécialités lors des beaux jours. Adaptée aux familles, elle propose également un menu pour enfants. Un excellent choix pour un repas savoureux et relaxant, parfait pour les participants à l'Adunata en quête de qualité et d'une ambiance conviviale.",
    details_de:
      "Die Pizzeria Orchidea in Vergnasco ist bekannt für ihre ausgezeichnete Pizza und die köstlichen gemischten frittierten Meeresfrüchte. Das Lokal bietet eine komfortable Umgebung, die durch einen angenehmen Außenbereich (Dehor) ergänzt wird, ideal, um Spezialitäten an schönen Tagen zu genießen. Familienfreundlich, bietet es auch ein Kindermenü. Eine ausgezeichnete Wahl für eine schmackhafte und entspannende Mahlzeit, perfekt für Adunata-Teilnehmer, die Qualität und eine gesellige Atmosphäre suchen.",
    images: ["/images/pizzeriaOrchidea.jpeg"], // Example image path
    openingHours: `giovedì: 11:00-13:30, 18:00-21:30\nvenerdì: 11:00-13:30, 18:00-22:00\nsabato: 11:00-13:30, 18:00-22:00\ndomenica: 11:00-13:30, 18:00-22:00\nlunedì: Chiuso\nmartedì: 11:00-13:30, 18:00-21:30\nmercoledì: 11:00-13:30, 18:00-21:30`,
    openingHours_en: `Thursday: 11:00-13:30, 18:00-21:30\nFriday: 11:00-13:30, 18:00-22:00\nSaturday: 11:00-13:30, 18:00-22:00\nSunday: 11:00-13:30, 18:00-22:00\nMonday: Closed\nTuesday: 11:00-13:30, 18:00-21:30\nWednesday: 11:00-13:30, 18:00-21:30`,
    openingHours_es: `Jueves: 11:00-13:30, 18:00-21:30\nViernes: 11:00-13:30, 18:00-22:00\nSábado: 11:00-13:30, 18:00-22:00\nDomingo: 11:00-13:30, 18:00-22:00\nLunes: Cerrado\nMartes: 11:00-13:30, 18:00-21:30\nMiércoles: 11:00-13:30, 18:00-21:30`,
    openingHours_fr: `Jeudi : 11h00-13h30, 18h00-21h30\nVendredi : 11h00-13h30, 18h00-22h00\nSamedi : 11h00-13h30, 18h00-22h00\nDimanche : 11h00-13h30, 18h00-22h00\nLundi : Fermé\nMardi : 11h00-13h30, 18h00-21h30\nMercredi : 11h00-13h30, 18h00-21h30`,
    openingHours_de: `Donnerstag: 11:00-13:30, 18:00-21:30\nFreitag: 11:00-13:30, 18:00-22:00\nSamstag: 11:00-13:30, 18:00-22:00\nSonntag: 11:00-13:30, 18:00-22:00\nMontag: Geschlossen\nDienstag: 11:00-13:30, 18:00-21:30\nMittwoch: 11:00-13:30, 18:00-21:30`,
    discountInfo: "Menu per bambini disponibile. Godetevi il dehor!",
    discountInfo_en: "Children's menu available. Enjoy the outdoor seating!",
    discountInfo_es: "Menú para niños disponible. ¡Disfruta de la terraza!",
    discountInfo_fr: "Menu enfant disponible. Profitez de la terrasse !",
    discountInfo_de: "Kindermenü verfügbar. Genießen Sie den Außenbereich!",
    tags: [
      "Pizzeria",
      "Ristorante",
      "Fritto Misto",
      "Dehor",
      "Menu Bambini",
      "Vergnasco",
      "Pizza",
    ],
    tags_en: [
      "Pizzeria",
      "Restaurant",
      "Mixed Fried Seafood",
      "Outdoor Seating",
      "Kids Menu",
      "Vergnasco",
      "Pizza",
    ],
    tags_es: [
      "Pizzería",
      "Restaurante",
      "Fritura Mixta",
      "Terraza",
      "Menú Infantil",
      "Vergnasco",
      "Pizza",
    ],
    tags_fr: [
      "Pizzeria",
      "Restaurant",
      "Friture Mixte",
      "Terrasse",
      "Menu Enfants",
      "Vergnasco",
      "Pizza",
    ],
    tags_de: [
      "Pizzeria",
      "Restaurant",
      "Frittierte Meeresfrüchte",
      "Außenbereich",
      "Kindermenü",
      "Vergnasco",
      "Pizza",
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
    id: 214, // New unique ID
    name: "Corallo Bar Ristorante",
    name_en: "Corallo Bar & Restaurant",
    name_es: "Corallo Bar Restaurante",
    name_fr: "Corallo Bar Restaurant",
    name_de: "Corallo Bar Restaurant",
    type: "restaurant",
    coordinates: [45.52453, 8.073045],
    // googleRating: ???, // If you find this, we can add it
    // googleReviewCount: ???, // If you find this, we can add it
    address:
      "Via Pralino, 1, 13876 Sandigliano (BI) (c/o Centro Sportivo Pralino)", // Added context of Sports Center
    phone: "3711878948 / 3333906600", // Combined numbers for clarity
    website: "https://www.instagram.com/corallo_bar/", // Corrected IG link (removed extra params)
    shortDescription:
      "Corallo a Sandigliano: gusto non-stop! Ristorante e bar con terrazzo, aperto 24h nel weekend Adunata. Menu speciali e polenta e spezzatino!",
    shortDescription_en:
      "Corallo in Sandigliano: non-stop flavor! Restaurant and bar with terrace, open 24h on Adunata weekend. Special menus and polenta with stew!",
    shortDescription_es:
      "Corallo en Sandigliano: ¡sabor sin parar! Restaurante y bar con terraza, abierto 24h el fin de semana de la Adunata. ¡Menús especiales y polenta con estofado!",
    shortDescription_fr:
      "Corallo à Sandigliano : saveur non-stop ! Restaurant et bar avec terrasse, ouvert 24h/24 le week-end de l'Adunata. Menus spéciaux et polenta au ragoût !",
    shortDescription_de:
      "Corallo in Sandigliano: Geschmack rund um die Uhr! Restaurant und Bar mit Terrasse, am Adunata-Wochenende 24 Stunden geöffnet. Spezialmenüs und Polenta mit Gulasch!",
    details:
      "Il Corallo, situato presso il Centro Sportivo Pralino a Sandigliano, è la destinazione ideale per ogni momento della giornata, specialmente durante l'Adunata. Con un ampio terrazzo e un bar con dehor, offre un'atmosfera vivace e accogliente. Aperto 24 ORE SU 24 (Venerdì-Sabato-Domenica), serve colazioni, aperitivi, merende, e menù giornalieri (Primo+Secondo+Acqua a €13,00). Non perdete il MENÙ SPECIALE ADUNATA ALPINI, con il tradizionale 'Polenta e Spezzatino' a soli €8,00. Perfetto per gruppi e per chi cerca un ristoro completo e conveniente a qualsiasi ora.",
    details_en:
      "Corallo, located at the Pralino Sports Center in Sandigliano, is the ideal destination for any time of day, especially during the Adunata. With a large terrace and a bar with outdoor seating, it offers a lively and welcoming atmosphere. Open 24 HOURS (Friday-Saturday-Sunday), it serves breakfast, aperitifs, snacks, and daily menus (Main Course+Second Course+Water at €13.00). Don't miss the SPECIAL ADUNATA ALPINI MENU, featuring the traditional 'Polenta and Stew' for only €8.00. Perfect for groups and those seeking a complete and affordable refreshment at any hour.",
    details_es:
      "Corallo, ubicado en el Centro Deportivo Pralino en Sandigliano, es el destino ideal para cualquier momento del día, especialmente durante la Adunata. Con una amplia terraza y un bar con mesas al aire libre, ofrece un ambiente animado y acogedor. Abierto 24 HORAS (Viernes-Sábado-Domingo), sirve desayunos, aperitivos, meriendas y menús diarios (Primer Plato+Segundo Plato+Agua a 13,00 €). No te pierdas el MENÚ ESPECIAL ADUNATA ALPINI, con la tradicional 'Polenta con Estofado' por solo 8,00 €. Perfecto para grupos y para aquellos que buscan un refrigerio completo y asequible a cualquier hora.",
    details_fr:
      "Le Corallo, situé au Centre Sportif Pralino à Sandigliano, est la destination idéale à tout moment de la journée, surtout pendant l'Adunata. Avec une grande terrasse et un bar avec terrasse extérieure, il offre une atmosphère animée et accueillante. Ouvert 24H/24 (Vendredi-Samedi-Dimanche), il sert petits déjeuners, apéritifs, goûters et menus du jour (Plat+Second Plat+Eau à 13,00 €). Ne manquez pas le MENU SPÉCIAL ADUNATA ALPINI, avec la traditionnelle 'Polenta et Ragoût' pour seulement 8,00 €. Parfait pour les groupes et ceux qui recherchent un rafraîchissement complet et abordable à toute heure.",
    details_de:
      "Das Corallo im Sportzentrum Pralino in Sandigliano ist das ideale Ziel für jede Tageszeit, besonders während der Adunata. Mit einer großen Terrasse und einer Bar mit Außenbereich bietet es eine lebhafte und einladende Atmosphäre. Geöffnet 24 STUNDEN (Freitag-Samstag-Sonntag), serviert es Frühstück, Aperitifs, Snacks und Tagesmenüs (Hauptgericht+Zweiter Gang+Wasser für 13,00 €). Verpassen Sie nicht das SPEZIELLE ADUNATA ALPINI MENÜ mit der traditionellen 'Polenta und Gulasch' für nur 8,00 €. Perfekt für Gruppen und diejenigen, die eine vollständige und preiswerte Erfrischung zu jeder Stunde suchen.",
    images: ["/images/corallo.jpeg"], // Example image path
    openingHours:
      "Ven-Sab-Dom: Aperto 24 ore su 24. Altri giorni: verificare per orari specifici.", // Simplified due to primary info
    openingHours_en:
      "Fri-Sat-Sun: Open 24 hours. Other days: check for specific hours.",
    openingHours_es:
      "Vie-Sáb-Dom: Abierto 24 horas. Otros días: consultar horarios específicos.",
    openingHours_fr:
      "Ven-Sam-Dim: Ouvert 24h/24. Autres jours : vérifier les horaires spécifiques.",
    openingHours_de:
      "Fr-Sa-So: 24 Stunden geöffnet. Andere Tage: spezifische Zeiten prüfen.",
    discountInfo:
      "Menu giornaliero €13. Menu Speciale Adunata: Polenta e Spezzatino €8.",
    discountInfo_en: "Daily menu €13. Special Adunata Menu: Polenta & Stew €8.",
    discountInfo_es:
      "Menú diario 13 €. Menú Especial Adunata: Polenta y Estofado 8 €.",
    discountInfo_fr:
      "Menu du jour 13 €. Menu Spécial Adunata : Polenta & Ragoût 8 €.",
    discountInfo_de:
      "Tagesmenü 13 €. Spezial Adunata Menü: Polenta & Gulasch 8 €.",
    tags: [
      "Ristorante",
      "Bar",
      "Aperto 24h (Weekend)",
      "Menu Fisso",
      "Polenta Spezzatino",
      "Adunata Menu",
      "Terrazzo",
      "Sandigliano",
    ],
    tags_en: [
      "Restaurant",
      "Bar",
      "Open 24h (Weekend)",
      "Set Menu",
      "Polenta Stew",
      "Adunata Menu",
      "Terrace",
      "Sandigliano",
    ],
    tags_es: [
      "Restaurante",
      "Bar",
      "Abierto 24h (Fin de Semana)",
      "Menú Fijo",
      "Polenta Estofado",
      "Menú Adunata",
      "Terraza",
      "Sandigliano",
    ],
    tags_fr: [
      "Restaurant",
      "Bar",
      "Ouvert 24h (Weekend)",
      "Menu Fixe",
      "Polenta Ragoût",
      "Menu Adunata",
      "Terrasse",
      "Sandigliano",
    ],
    tags_de: [
      "Restaurant",
      "Bar",
      "24h Geöffnet (Wochenende)",
      "Festmenü",
      "Polenta Gulasch",
      "Adunata Menü",
      "Terrasse",
      "Sandigliano",
    ],
    partyInfo: "", // The 24h opening and special menu are the main "events"
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
    id: 215, // New unique ID
    name: "La Tavernetta",
    name_en: "La Tavernetta",
    name_es: "La Tavernetta",
    name_fr: "La Tavernetta",
    name_de: "La Tavernetta",
    type: "restaurant",
    coordinates: [45.56782, 8.057301],
    googleRating: 4.1,
    googleReviewCount: 574,
    address: "Via della Repubblica, 45, 13900 Biella BI",
    phone: "01531469",
    website: "https://www.latavernettabiella.it/",
    shortDescription:
      "La Tavernetta a Biella: sapori autentici e convivialità. Pizza, primi, secondi di carne/pesce e Menù Alpino speciale!",
    shortDescription_en:
      "La Tavernetta in Biella: authentic flavors and conviviality. Pizza, pasta, meat/fish mains, and a special Alpino Menu!",
    shortDescription_es:
      "La Tavernetta en Biella: sabores auténticos y cordialidad. ¡Pizza, pasta, carnes/pescados y un Menú Alpino especial!",
    shortDescription_fr:
      "La Tavernetta à Biella : saveurs authentiques et convivialité. Pizza, pâtes, viandes/poissons et un Menu Alpin spécial !",
    shortDescription_de:
      "La Tavernetta in Biella: authentische Aromen und Geselligkeit. Pizza, Pasta, Fleisch-/Fischgerichte und ein spezielles Alpini-Menü!",
    details:
      "La Tavernetta, nel cuore di Biella, vi accoglie con la sua cucina semplice, conviviale e un'ampia scelta: pizza, primi piatti, secondi di carne e pesce. Per l'Adunata, ORARI PROLUNGATI (08:00-03:00 Ven-Dom) e speciali 'Menù dell'Alpino' a pranzo e cena. Imperdibili i due menù completi a prezzo fisso (€30): uno di pesce (Spaghetti allo scoglio, fritto misto) e uno di terra (Penne alla Norma, milanese). Dispone di tavoli all'aperto, accetta cani e offre menù per bambini. La scelta ideale per un pasto gustoso in compagnia durante l'evento.",
    details_en:
      "La Tavernetta, in the heart of Biella, welcomes you with its simple, convivial cuisine and a wide choice: pizza, pasta dishes, meat and fish main courses. For the Adunata, EXTENDED HOURS (08:00-03:00 Fri-Sun) and special 'Alpino Menus' for lunch and dinner. Don't miss the two complete fixed-price menus (€30): one fish-based (Seafood spaghetti, mixed fried fish) and one meat-based (Penne alla Norma, Milanese cutlet). Features outdoor seating, is dog-friendly, and offers a children's menu. The ideal choice for a tasty meal in good company during the event.",
    details_es:
      "La Tavernetta, en el corazón de Biella, le da la bienvenida con su cocina sencilla y cordial y una amplia oferta: pizza, platos de pasta, segundos platos de carne y pescado. Para la Adunata, HORARIO EXTENDIDO (08:00-03:00 Vie-Dom) y 'Menús del Alpino' especiales para almuerzo y cena. No se pierda los dos menús completos de precio fijo (30 €): uno de pescado (Espaguetis con marisco, fritura mixta de pescado) y uno de carne (Penne alla Norma, milanesa). Dispone de mesas al aire libre, admite perros y ofrece menú para niños. La opción ideal para una comida sabrosa en buena compañía durante el evento.",
    details_fr:
      "La Tavernetta, au cœur de Biella, vous accueille avec sa cuisine simple et conviviale et un large choix : pizzas, pâtes, plats de viande et de poisson. Pour l'Adunata, HORAIRES PROLONGÉS (08h00-03h00 Ven-Dim) et 'Menus de l'Alpin' spéciaux pour le déjeuner et le dîner. Ne manquez pas les deux menus complets à prix fixe (30 €) : un à base de poisson (Spaghetti aux fruits de mer, friture mixte de poisson) et un à base de viande (Penne alla Norma, escalope milanaise). Dispose de tables en extérieur, accepte les chiens et propose un menu pour enfants. Le choix idéal pour un repas savoureux en bonne compagnie pendant l'événement.",
    details_de:
      "La Tavernetta im Herzen von Biella empfängt Sie mit seiner einfachen, geselligen Küche und einer großen Auswahl: Pizza, Nudelgerichte, Fleisch- und Fischhauptgerichte. Für die Adunata gibt es VERLÄNGERTE ÖFFNUNGSZEITEN (08:00-03:00 Fr-So) und spezielle 'Alpini-Menüs' zum Mittag- und Abendessen. Verpassen Sie nicht die beiden kompletten Festpreismenüs (30 €): eines mit Fisch (Spaghetti mit Meeresfrüchten, gemischter frittierter Fisch) und eines mit Fleisch (Penne alla Norma, Mailänder Schnitzel). Verfügt über Sitzplätze im Freien, ist hundefreundlich und bietet ein Kindermenü. Die ideale Wahl für eine schmackhafte Mahlzeit in guter Gesellschaft während der Veranstaltung.",
    images: ["/images/tavernetta.jpeg"], // Example image path
    openingHours: `giovedì: 12:00-14:30, 18:30-23:30\nvenerdì: 08:00-03:00\nsabato: 08:00-03:00\ndomenica: 08:00-03:00\nlunedì: Chiuso\nmartedì: 12:00-14:30, 18:30-23:30\nmercoledì: 12:00-14:30, 18:30-23:30`,
    openingHours_en: `Thursday: 12:00-14:30, 18:30-23:30\nFriday: 08:00-03:00\nSaturday: 08:00-03:00\nSunday: 08:00-03:00\nMonday: Closed\nTuesday: 12:00-14:30, 18:30-23:30\nWednesday: 12:00-14:30, 18:30-23:30`,
    openingHours_es: `Jueves: 12:00-14:30, 18:30-23:30\nViernes: 08:00-03:00\nSábado: 08:00-03:00\nDomingo: 08:00-03:00\nLunes: Cerrado\nMartes: 12:00-14:30, 18:30-23:30\nMiércoles: 12:00-14:30, 18:30-23:30`,
    openingHours_fr: `Jeudi : 12h00-14h30, 18h30-23h30\nVendredi : 08h00-03h00\nSamedi : 08h00-03h00\nDimanche : 08h00-03h00\nLundi : Fermé\nMardi : 12h00-14h30, 18h30-23h30\nMercredi : 12h00-14h30, 18h30-23h30`,
    openingHours_de: `Donnerstag: 12:00-14:30, 18:30-23:30\nFreitag: 08:00-03:00\nSamstag: 08:00-03:00\nSonntag: 08:00-03:00\nMontag: Geschlossen\nDienstag: 12:00-14:30, 18:30-23:30\nMittwoch: 12:00-14:30, 18:30-23:30`,
    discountInfo:
      "Menù dell'Alpino e due Menù completi a prezzo fisso (€30) disponibili!",
    discountInfo_en:
      "Alpino's Menu and two complete fixed-price menus (€30) available!",
    discountInfo_es:
      "¡Menú del Alpino y dos menús completos de precio fijo (30 €) disponibles!",
    discountInfo_fr:
      "Menu de l'Alpin et deux menus complets à prix fixe (30 €) disponibles !",
    discountInfo_de:
      "Alpini-Menü und zwei komplette Festpreismenüs (30 €) verfügbar!",
    tags: [
      "Ristorante",
      "Pizzeria",
      "Cucina Italiana",
      "Menu Fisso",
      "Adunata Menu",
      "Biella Centro",
      "Tavoli Aperto",
      "Cani Ammessi",
    ],
    tags_en: [
      "Restaurant",
      "Pizzeria",
      "Italian Cuisine",
      "Set Menu",
      "Adunata Menu",
      "Biella Center",
      "Outdoor Seating",
      "Dogs Allowed",
    ],
    tags_es: [
      "Restaurante",
      "Pizzería",
      "Cocina Italiana",
      "Menú Fijo",
      "Menú Adunata",
      "Biella Centro",
      "Terraza",
      "Perros Admitidos",
    ],
    tags_fr: [
      "Restaurant",
      "Pizzeria",
      "Cuisine Italienne",
      "Menu Fixe",
      "Menu Adunata",
      "Biella Centre",
      "Terrasse",
      "Chiens Admis",
    ],
    tags_de: [
      "Restaurant",
      "Pizzeria",
      "Italienische Küche",
      "Festmenü",
      "Adunata Menü",
      "Biella Zentrum",
      "Außenbereich",
      "Hunde Erlaubt",
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
    id: 216, // New unique ID
    name: "Ristorante Pizzeria Positano",
    name_en: "Positano Restaurant Pizzeria",
    name_es: "Restaurante Pizzeria Positano",
    name_fr: "Restaurant Pizzeria Positano",
    name_de: "Restaurant Pizzeria Positano",
    type: "restaurant",
    coordinates: [45.555825, 8.062821],
    googleRating: 4.0,
    googleReviewCount: 521,
    address: "Via Torino, 77, 13900 Biella BI",
    phone: "015403975",
    website: "https://www.ristorantepositanobiella.it/",
    shortDescription:
      "Positano a Biella: autentica cucina napoletana, pizza da forno a legna e colazioni! Weekend con orario esteso per l'Adunata.",
    shortDescription_en:
      "Positano in Biella: authentic Neapolitan cuisine, wood-fired pizza, and breakfast! Extended weekend hours for the Adunata.",
    shortDescription_es:
      "Positano en Biella: auténtica cocina napolitana, pizza en horno de leña ¡y desayunos! Horario extendido los fines de semana para la Adunata.",
    shortDescription_fr:
      "Positano à Biella : authentique cuisine napolitaine, pizza au four à bois et petits déjeuners ! Horaires prolongés le week-end pour l'Adunata.",
    shortDescription_de:
      "Positano in Biella: authentische neapolitanische Küche, Holzofenpizza und Frühstück! Erweiterte Wochenend-Öffnungszeiten für die Adunata.",
    details:
      "Il Ristorante Pizzeria Positano a Biella vi trasporta nei sapori della tradizione napoletana. Offre colazioni (Ven-Dom 07-11), pranzo e cena con ORARI ESTESI nel weekend Adunata (fino 01:30). Gustate la vera pizza di Tramonti cotta in forno a legna, specialità di pesce fresco, piatti vegani e dolci fatti in casa. Due sale accoglienti, dehor, WiFi gratuito e aria condizionata. Ideale per gruppi, con menu per bambini e possibilità di asporto. Un'esperienza culinaria completa per ogni momento della vostra visita.",
    details_en:
      "Positano Restaurant Pizzeria in Biella transports you to the flavors of Neapolitan tradition. It offers breakfast (Fri-Sun 07-11), lunch, and dinner with EXTENDED HOURS on Adunata weekend (until 01:30). Savor authentic Tramonti pizza cooked in a wood-fired oven, fresh fish specialties, vegan dishes, and homemade desserts. Two welcoming rooms, outdoor seating, free WiFi, and air conditioning. Ideal for groups, with a children's menu and takeaway options. A complete culinary experience for every moment of your visit.",
    details_es:
      "El Restaurante Pizzeria Positano en Biella le transporta a los sabores de la tradición napolitana. Ofrece desayunos (Vie-Dom 07-11), almuerzos y cenas con HORARIO EXTENDIDO el fin de semana de la Adunata (hasta la 01:30). Saboree la auténtica pizza de Tramonti cocida en horno de leña, especialidades de pescado fresco, platos veganos y postres caseros. Dos acogedoras salas, terraza, WiFi gratuito y aire acondicionado. Ideal para grupos, con menú infantil y opción para llevar. Una experiencia culinaria completa para cada momento de su visita.",
    details_fr:
      "Le Restaurant Pizzeria Positano à Biella vous transporte dans les saveurs de la tradition napolitaine. Il propose petits déjeuners (Ven-Dim 07-11), déjeuners et dîners avec HORAIRES PROLONGÉS le week-end de l'Adunata (jusqu'à 01h30). Savourez l'authentique pizza de Tramonti cuite au four à bois, des spécialités de poisson frais, des plats végétaliens et des desserts maison. Deux salles accueillantes, terrasse, WiFi gratuit et climatisation. Idéal pour les groupes, avec menu enfant et plats à emporter. Une expérience culinaire complète pour chaque instant de votre visite.",
    details_de:
      "Das Restaurant Pizzeria Positano in Biella entführt Sie in die Aromen der neapolitanischen Tradition. Es bietet Frühstück (Fr-So 07-11), Mittag- und Abendessen mit VERLÄNGERTEN ÖFFNUNGSZEITEN am Adunata-Wochenende (bis 01:30 Uhr). Genießen Sie authentische Tramonti-Pizza aus dem Holzofen, frische Fischspezialitäten, vegane Gerichte und hausgemachte Desserts. Zwei einladende Säle, Außenbereich, kostenloses WLAN und Klimaanlage. Ideal für Gruppen, mit Kindermenü und Take-Away-Optionen. Ein umfassendes kulinarisches Erlebnis für jeden Moment Ihres Besuchs.",
    images: ["/images/positano.png"], // Example image path
    openingHours: `giovedì: 12:00-14:30, 18:30-23:30\nvenerdì: 07:00-11:00 (Colazioni), 11:00-16:00 (Pranzo), 18:00-01:30 (Cena)\nsabato: 07:00-11:00 (Colazioni), 11:00-16:00 (Pranzo), 18:00-01:30 (Cena)\ndomenica: 07:00-11:00 (Colazioni), 11:00-16:00 (Pranzo), 18:00-01:30 (Cena)\nlunedì: 12:00-14:30, 18:30-23:30\nmartedì: 12:00-14:30, 18:30-23:30\nmercoledì: Chiuso`,
    openingHours_en: `Thursday: 12:00-14:30, 18:30-23:30\nFriday: 07:00-11:00 (Breakfast), 11:00-16:00 (Lunch), 18:00-01:30 (Dinner)\nSaturday: 07:00-11:00 (Breakfast), 11:00-16:00 (Lunch), 18:00-01:30 (Dinner)\nSunday: 07:00-11:00 (Breakfast), 11:00-16:00 (Lunch), 18:00-01:30 (Dinner)\nMonday: 12:00-14:30, 18:30-23:30\nTuesday: 12:00-14:30, 18:30-23:30\nWednesday: Closed`,
    openingHours_es: `Jueves: 12:00-14:30, 18:30-23:30\nViernes: 07:00-11:00 (Desayunos), 11:00-16:00 (Almuerzo), 18:00-01:30 (Cena)\nSábado: 07:00-11:00 (Desayunos), 11:00-16:00 (Almuerzo), 18:00-01:30 (Cena)\nDomingo: 07:00-11:00 (Desayunos), 11:00-16:00 (Almuerzo), 18:00-01:30 (Cena)\nLunes: 12:00-14:30, 18:30-23:30\nMartes: 12:00-14:30, 18:30-23:30\nMiércoles: Cerrado`,
    openingHours_fr: `Jeudi : 12h00-14h30, 18h30-23h30\nVendredi : 07h00-11h00 (Petits déj.), 11h00-16h00 (Déj.), 18h00-01h30 (Dîner)\nSamedi : 07h00-11h00 (Petits déj.), 11h00-16h00 (Déj.), 18h00-01h30 (Dîner)\nDimanche : 07h00-11h00 (Petits déj.), 11h00-16h00 (Déj.), 18h00-01h30 (Dîner)\nLundi : 12h00-14h30, 18h30-23h30\nMardi : 12h00-14h30, 18h30-23h30\nMercredi : Fermé`,
    openingHours_de: `Donnerstag: 12:00-14:30, 18:30-23:30\nFreitag: 07:00-11:00 (Frühstück), 11:00-16:00 (Mittag), 18:00-01:30 (Abend)\nSamstag: 07:00-11:00 (Frühstück), 11:00-16:00 (Mittag), 18:00-01:30 (Abend)\nSonntag: 07:00-11:00 (Frühstück), 11:00-16:00 (Mittag), 18:00-01:30 (Abend)\nMontag: 12:00-14:30, 18:30-23:30\nDienstag: 12:00-14:30, 18:30-23:30\nMittwoch: Geschlossen`,
    discountInfo:
      "Piatti vegani, menu bambini e servizio d'asporto disponibili.", // Changed to reflect broader services
    discountInfo_en:
      "Vegan dishes, children's menu, and takeaway service available.",
    discountInfo_es:
      "Platos veganos, menú infantil y servicio para llevar disponibles.",
    discountInfo_fr:
      "Plats végétaliens, menu enfants et service à emporter disponibles.",
    discountInfo_de:
      "Vegane Gerichte, Kindermenü und Take-Away-Service verfügbar.",
    tags: [
      "Ristorante",
      "Pizzeria",
      "Cucina Napoletana",
      "Colazione",
      "Piatti Vegani",
      "Asporto",
      "Biella",
      "Forno a Legna",
    ],
    tags_en: [
      "Restaurant",
      "Pizzeria",
      "Neapolitan Cuisine",
      "Breakfast",
      "Vegan Dishes",
      "Takeaway",
      "Biella",
      "Wood-fired Oven",
    ],
    tags_es: [
      "Restaurante",
      "Pizzería",
      "Cocina Napolitana",
      "Desayuno",
      "Platos Veganos",
      "Para Llevar",
      "Biella",
      "Horno de Leña",
    ],
    tags_fr: [
      "Restaurant",
      "Pizzeria",
      "Cuisine Napolitaine",
      "Petit Déjeuner",
      "Plats Végétaliens",
      "À Emporter",
      "Biella",
      "Four à Bois",
    ],
    tags_de: [
      "Restaurant",
      "Pizzeria",
      "Neapolitanische Küche",
      "Frühstück",
      "Vegane Gerichte",
      "Take-Away",
      "Biella",
      "Holzofen",
    ],
    partyInfo: "", // Not a specific "party" venue unless the sports event dinners are highlighted by them for Adunata
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
    id: 217, // New unique ID
    name: "Garden Biella",
    name_en: "Garden Biella",
    name_es: "Garden Biella",
    name_fr: "Garden Biella",
    name_de: "Garden Biella",
    type: "restaurant", // Could also be 'bar' given the strong cocktail and after-dinner offering
    coordinates: [45.562993, 8.05601], // Approximate coordinates for Giardino Zumaglini, adjust if more precise needed
    googleRating: 4.0,
    googleReviewCount: 525,
    address: "Giardino Pubblico Zumaglini, 13900 Biella BI",
    phone: "3772896774",
    website: "https://www.facebook.com/gardenbiella/?locale=it_IT", // Assuming this is the direct link to their menu as specified
    shortDescription:
      "Garden Biella: oasi di gusto nel verde! Colazioni, pranzi, aperitivi, cene e cocktail. Specialità Alpine e orari no-stop nel weekend!",
    shortDescription_en:
      "Garden Biella: oasis of taste in the green! Breakfast, lunch, aperitifs, dinner, and cocktails. Alpine specialties and non-stop weekend hours!",
    shortDescription_es:
      "Garden Biella: ¡oasis de sabor en el verde! Desayunos, almuerzos, aperitivos, cenas y cócteles. ¡Especialidades alpinas y horario ininterrumpido los fines de semana!",
    shortDescription_fr:
      "Garden Biella : oasis de goût dans la verdure ! Petits déjeuners, déjeuners, apéritifs, dîners et cocktails. Spécialités alpines et horaires non-stop le week-end !",
    shortDescription_de:
      "Garden Biella: Geschmacksoase im Grünen! Frühstück, Mittagessen, Aperitifs, Abendessen und Cocktails. Alpenspezialitäten und Nonstop-Öffnungszeiten am Wochenende!",
    details:
      "Immerso nel Giardino Pubblico Zumaglini, Garden Biella è il luogo perfetto per una pausa di gusto a ogni ora. Con servizio self-service assistito, offre colazioni, pranzi, aperitivi con ottimi cocktail, cene e dopocena. ORARI ESTESI per l'Adunata (Ven-Dom 07:30-02:00). Il menù spazia da panini e focacce a piatti caldi come polenta concia, lasagne, spezzatino, e specialità come il 'Tagliere degli Alpini' e la 'Merenda degli Alpini'. Disponibili piatti vegetariani, birre alla spina e posti a sedere sia interni che esterni. Un'esperienza di relax e sapore nel cuore verde di Biella.",
    details_en:
      "Nestled in the Zumaglini Public Garden, Garden Biella is the perfect place for a tasteful break at any hour. With assisted self-service, it offers breakfast, lunch, aperitifs with excellent cocktails, dinner, and after-dinner drinks. EXTENDED HOURS for the Adunata (Fri-Sun 07:30-02:00). The menu ranges from sandwiches and focaccias to hot dishes like polenta concia, lasagna, stew, and specialties like the 'Alpini Platter' and 'Alpini Snack'. Vegetarian dishes, draft beers, and both indoor and outdoor seating are available. An experience of relaxation and flavor in the green heart of Biella.",
    details_es:
      "Ubicado en el Jardín Público Zumaglini, Garden Biella es el lugar perfecto para una pausa de sabor a cualquier hora. Con autoservicio asistido, ofrece desayunos, almuerzos, aperitivos con excelentes cócteles, cenas y copas después de cenar. HORARIO EXTENDIDO para la Adunata (Vie-Dom 07:30-02:00). El menú abarca desde bocadillos y focaccias hasta platos calientes como polenta concia, lasaña, estofado, y especialidades como la 'Tabla de los Alpinos' y la 'Merienda de los Alpinos'. Platos vegetarianos, cervezas de barril y asientos tanto interiores como exteriores disponibles. Una experiencia de relajación y sabor en el corazón verde de Biella.",
    details_fr:
      "Niché dans le Jardin Public Zumaglini, Garden Biella est l'endroit idéal pour une pause gourmande à toute heure. Avec un self-service assisté, il propose petits déjeuners, déjeuners, apéritifs avec d'excellents cocktails, dîners et après-dîners. HORAIRES PROLONGÉS pour l'Adunata (Ven-Dim 07h30-02h00). Le menu varie des sandwichs et focaccias aux plats chauds comme la polenta concia, les lasagnes, le ragoût, et des spécialités comme le 'Plateau des Alpins' et le 'Goûter des Alpins'. Plats végétariens, bières pression et places assises intérieures et extérieures disponibles. Une expérience de détente et de saveur au cœur verdoyant de Biella.",
    details_de:
      "Eingebettet in den öffentlichen Garten Zumaglini ist Garden Biella der perfekte Ort für eine geschmackvolle Pause zu jeder Stunde. Mit unterstütztem Selbstbedienungsservice bietet es Frühstück, Mittagessen, Aperitifs mit ausgezeichneten Cocktails, Abendessen und Drinks nach dem Essen. VERLÄNGERTE ÖFFNUNGSZEITEN für die Adunata (Fr-So 07:30-02:00). Die Speisekarte reicht von Sandwiches und Focaccias bis hin zu warmen Gerichten wie Polenta Concia, Lasagne, Eintopf und Spezialitäten wie der 'Alpini-Platte' und dem 'Alpini-Snack'. Vegetarische Gerichte, Fassbiere sowie Sitzplätze im Innen- und Außenbereich sind verfügbar. Ein Erlebnis der Entspannung und des Geschmacks im grünen Herzen von Biella.",
    images: ["/images/garden.png"], // Example image path
    openingHours: `giovedì: 08:00-00:00\nvenerdì: 07:30-02:00\nsabato: 07:30-02:00\ndomenica: 07:30-02:00\nlunedì: Chiuso\nmartedì: 08:00-00:00\nmercoledì: 08:00-00:00`,
    openingHours_en: `Thursday: 08:00-00:00\nFriday: 07:30-02:00\nSaturday: 07:30-02:00\nSunday: 07:30-02:00\nMonday: Closed\nTuesday: 08:00-00:00\nWednesday: 08:00-00:00`,
    openingHours_es: `Jueves: 08:00-00:00\nViernes: 07:30-02:00\nSábado: 07:30-02:00\nDomingo: 07:30-02:00\nLunes: Cerrado\nMartes: 08:00-00:00\nMiércoles: 08:00-00:00`,
    openingHours_fr: `Jeudi : 08h00-00h00\nVendredi : 07h30-02h00\nSamedi : 07h30-02h00\nDimanche : 07h30-02h00\nLundi : Fermé\nMardi : 08h00-00h00\nMercredi : 08h00-00h00`,
    openingHours_de: `Donnerstag: 08:00-00:00\nFreitag: 07:30-02:00\nSamstag: 07:30-02:00\nSonntag: 07:30-02:00\nMontag: Geschlossen\nDienstag: 08:00-00:00\nMittwoch: 08:00-00:00`,
    discountInfo:
      "Tagliere e Merenda degli Alpini disponibili. Piatti vegetariani.",
    discountInfo_en:
      "Alpini Platter and Alpini Snack available. Vegetarian dishes.",
    discountInfo_es:
      "Tabla de los Alpinos y Merienda de los Alpinos disponibles. Platos vegetarianos.",
    discountInfo_fr:
      "Plateau des Alpins et Goûter des Alpins disponibles. Plats végétariens.",
    discountInfo_de:
      "Alpini-Platte und Alpini-Snack erhältlich. Vegetarische Gerichte.",
    tags: [
      "Ristorante",
      "Bar",
      "Caffetteria",
      "Self-Service",
      "Giardino Zumaglini",
      "Cocktail",
      "Specialità Alpine",
      "Aperto Tardi",
      "Vegetariano",
    ],
    tags_en: [
      "Restaurant",
      "Bar",
      "Cafeteria",
      "Self-Service",
      "Zumaglini Garden",
      "Cocktails",
      "Alpine Specialties",
      "Open Late",
      "Vegetarian",
    ],
    tags_es: [
      "Restaurante",
      "Bar",
      "Cafetería",
      "Autoservicio",
      "Jardín Zumaglini",
      "Cócteles",
      "Especialidades Alpinas",
      "Abierto Tarde",
      "Vegetariano",
    ],
    tags_fr: [
      "Restaurant",
      "Bar",
      "Cafétéria",
      "Self-Service",
      "Jardin Zumaglini",
      "Cocktails",
      "Spécialités Alpines",
      "Ouvert Tard",
      "Végétarien",
    ],
    tags_de: [
      "Restaurant",
      "Bar",
      "Cafeteria",
      "Selbstbedienung",
      "Zumaglini Garten",
      "Cocktails",
      "Alpenspezialitäten",
      "Spät Geöffnet",
      "Vegetarisch",
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
    id: 218, // New unique ID
    name: "Pizzeria Ristorante Il Tramonto",
    name_en: "Il Tramonto Pizzeria & Restaurant",
    name_es: "Pizzeria Restaurante Il Tramonto",
    name_fr: "Pizzeria Restaurant Il Tramonto",
    name_de: "Pizzeria Restaurant Il Tramonto",
    type: "restaurant",
    coordinates: [45.565015, 8.090584],
    googleRating: 4.5,
    googleReviewCount: 1410, // Corrected count
    address: "Via Milano, 4, 13856 Vigliano Biellese BI",
    phone: "3450184316",
    website: "https://pizzeriailtramonto.it/", // Using the main website from info
    shortDescription:
      "Il Tramonto a Vigliano: eccellenza piemontese, pizza superba e 'Barbera dell'Adunata'! Orari estesi nel weekend.",
    shortDescription_en:
      "Il Tramonto in Vigliano: Piedmontese excellence, superb pizza, and 'Barbera dell'Adunata'! Extended weekend hours.",
    shortDescription_es:
      "Il Tramonto en Vigliano: excelencia piamontesa, pizza soberbia ¡y 'Barbera dell'Adunata'! Horario extendido los fines de semana.",
    shortDescription_fr:
      "Il Tramonto à Vigliano : excellence piémontaise, pizza superbe et 'Barbera de l'Adunata' ! Horaires prolongés le week-end.",
    shortDescription_de:
      "Il Tramonto in Vigliano: piemontesische Exzellenz, hervorragende Pizza und 'Barbera dell'Adunata'! Erweiterte Wochenend-Öffnungszeiten.",
    details:
      "Pizzeria Ristorante Il Tramonto a Vigliano Biellese vi aspetta per un'esperienza culinaria che celebra la tradizione italiana e piemontese. Oltre a una vasta selezione di pizze, il menù offre prelibati antipasti come il tris piemontese e crudo e burrata, primi piatti (ravioli, calamarata) e secondi di carne (brasato, salsiccetta) e pesce (fritto di calamari). ORARI ESTESI nel weekend Adunata (Ven-Dom 11:30-24:00). Non perdete i dolci fatti in casa e il 'Rosso Barbera dell’Adunata'. Con tavoli all'aperto, Wi-Fi e opzioni vegane, è il luogo ideale per un pasto memorabile.",
    details_en:
      "Pizzeria Ristorante Il Tramonto in Vigliano Biellese awaits you for a culinary experience celebrating Italian and Piedmontese tradition. In addition to a wide selection of pizzas, the menu offers delicious appetizers like the Piedmontese trio and prosciutto with burrata, pasta dishes (ravioli, calamarata), and meat (braised beef, sausage stew) and fish (fried calamari) main courses. EXTENDED HOURS on Adunata weekend (Fri-Sun 11:30-24:00). Don't miss the homemade desserts and the 'Rosso Barbera dell’Adunata'. With outdoor seating, Wi-Fi, and vegan options, it's the ideal place for a memorable meal.",
    details_es:
      "Pizzeria Restaurante Il Tramonto en Vigliano Biellese le espera para una experiencia culinaria que celebra la tradición italiana y piamontesa. Además de una amplia selección de pizzas, el menú ofrece deliciosos entrantes como el trío piamontés y prosciutto con burrata, platos de pasta (raviolis, calamarata) y segundos platos de carne (estofado de ternera, guiso de salchicha) y pescado (calamares fritos). HORARIO EXTENDIDO el fin de semana de la Adunata (Vie-Dom 11:30-24:00). No se pierda los postres caseros y el 'Rosso Barbera dell’Adunata'. Con mesas al aire libre, Wi-Fi y opciones veganas, es el lugar ideal para una comida memorable.",
    details_fr:
      "La Pizzeria Restaurant Il Tramonto à Vigliano Biellese vous attend pour une expérience culinaire célébrant la tradition italienne et piémontaise. En plus d'une large sélection de pizzas, le menu propose de délicieux hors-d'œuvre comme le trio piémontais et le prosciutto et burrata, des plats de pâtes (raviolis, calamarata) et des plats principaux de viande (bœuf braisé, ragoût de saucisse) et de poisson (calamars frits). HORAIRES PROLONGÉS le week-end de l'Adunata (Ven-Dim 11h30-24h00). Ne manquez pas les desserts maison et le 'Rosso Barbera dell’Adunata'. Avec des tables en extérieur, le Wi-Fi et des options végétaliennes, c'est l'endroit idéal pour un repas mémorable.",
    details_de:
      "Das Pizzeria Ristorante Il Tramonto in Vigliano Biellese erwartet Sie zu einem kulinarischen Erlebnis, das die italienische und piemontesische Tradition feiert. Neben einer großen Auswahl an Pizzen bietet die Speisekarte köstliche Vorspeisen wie das piemontesische Trio und Rohschinken mit Burrata, Nudelgerichte (Ravioli, Calamarata) sowie Fleisch- (Schmorbraten, Wurstgulasch) und Fischhauptgerichte (frittierte Calamari). VERLÄNGERTE ÖFFNUNGSZEITEN am Adunata-Wochenende (Fr-So 11:30-24:00). Verpassen Sie nicht die hausgemachten Desserts und den 'Rosso Barbera dell’Adunata'. Mit Sitzplätzen im Freien, WLAN und veganen Optionen ist es der ideale Ort für eine unvergessliche Mahlzeit.",
    images: ["/images/tramonto.png"], // Example image path
    openingHours: `giovedì: 12:00-14:00, 18:00-23:30\nvenerdì: 11:30-24:00\nsabato: 11:30-24:00\ndomenica: 11:30-24:00\nlunedì: 12:00-14:00, 18:00-23:30\nmartedì: 12:00-14:00, 18:00-23:30\nmercoledì: 12:00-14:00, 18:00-23:30`,
    openingHours_en: `Thursday: 12:00-14:00, 18:00-23:30\nFriday: 11:30-24:00\nSaturday: 11:30-24:00\nSunday: 11:30-24:00\nMonday: 12:00-14:00, 18:00-23:30\nTuesday: 12:00-14:00, 18:00-23:30\nWednesday: 12:00-14:00, 18:00-23:30`,
    openingHours_es: `Jueves: 12:00-14:00, 18:00-23:30\nViernes: 11:30-24:00\nSábado: 11:30-24:00\nDomingo: 11:30-24:00\nLunes: 12:00-14:00, 18:00-23:30\nMartes: 12:00-14:00, 18:00-23:30\nMiércoles: 12:00-14:00, 18:00-23:30`,
    openingHours_fr: `Jeudi : 12h00-14h00, 18h00-23h30\nVendredi : 11h30-24h00\nSamedi : 11h30-24h00\nDimanche : 11h30-24h00\nLundi : 12h00-14h00, 18h00-23h30\nMardi : 12h00-14h00, 18h00-23h30\nMercredi : 12h00-14h00, 18h00-23h30`,
    openingHours_de: `Donnerstag: 12:00-14:00, 18:00-23:30\nFreitag: 11:30-24:00\nSamstag: 11:30-24:00\nSonntag: 11:30-24:00\nMontag: 12:00-14:00, 18:00-23:30\nDienstag: 12:00-14:00, 18:00-23:30\nMittwoch: 12:00-14:00, 18:00-23:30`,
    discountInfo:
      "Provate il 'Rosso Barbera dell’Adunata'! Piatti vegani disponibili.",
    discountInfo_en:
      "Try the 'Rosso Barbera dell’Adunata'! Vegan dishes available.",
    discountInfo_es:
      "¡Pruebe el 'Rosso Barbera dell’Adunata'! Platos veganos disponibles.",
    discountInfo_fr:
      "Goûtez le 'Rosso Barbera dell’Adunata' ! Plats végétaliens disponibles.",
    discountInfo_de:
      "Probieren Sie den 'Rosso Barbera dell’Adunata'! Vegane Gerichte erhältlich.",
    tags: [
      "Ristorante",
      "Pizzeria",
      "Cucina Piemontese",
      "Cucina Italiana",
      "Piatti Vegani",
      "Vigliano Biellese",
      "Barbera Adunata",
      "Tavoli Aperto",
    ],
    tags_en: [
      "Restaurant",
      "Pizzeria",
      "Piedmontese Cuisine",
      "Italian Cuisine",
      "Vegan Dishes",
      "Vigliano Biellese",
      "Adunata Barbera",
      "Outdoor Seating",
    ],
    tags_es: [
      "Restaurante",
      "Pizzería",
      "Cocina Piamontesa",
      "Cocina Italiana",
      "Platos Veganos",
      "Vigliano Biellese",
      "Barbera Adunata",
      "Terraza",
    ],
    tags_fr: [
      "Restaurant",
      "Pizzeria",
      "Cuisine Piémontaise",
      "Cuisine Italienne",
      "Plats Végétaliens",
      "Vigliano Biellese",
      "Barbera Adunata",
      "Terrasse",
    ],
    tags_de: [
      "Restaurant",
      "Pizzeria",
      "Piemontesische Küche",
      "Italienische Küche",
      "Vegane Gerichte",
      "Vigliano Biellese",
      "Adunata Barbera",
      "Außenbereich",
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
    id: 219, // New unique ID
    name: "Osteria 1992",
    name_en: "Osteria 1992",
    name_es: "Osteria 1992",
    name_fr: "Osteria 1992",
    name_de: "Osteria 1992",
    type: "restaurant", // Also has strong bar elements
    coordinates: [45.564386, 8.058449],
    googleRating: 4.6,
    googleReviewCount: 41,
    address: "Viale Giacomo Matteotti, 8, 13900 Biella BI",
    phone: "0158131392",
    website: "https://www.instagram.com/osteria1992/?hl=it", // Primary website
    // Menu link can be mentioned in details if desired, or use a dedicated menu field if you add one
    shortDescription:
      "Osteria 1992: eleganza e sapori piemontesi nel cuore di Biella. Un'esperienza culinaria raffinata e accogliente.",
    shortDescription_en:
      "Osteria 1992: elegance and Piedmontese flavors in the heart of Biella. A refined and welcoming culinary experience.",
    shortDescription_es:
      "Osteria 1992: elegancia y sabores piamonteses en el corazón de Biella. Una experiencia culinaria refinada y acogedora.",
    shortDescription_fr:
      "Osteria 1992 : élégance et saveurs piémontaises au cœur de Biella. Une expérience culinaire raffinée et accueillante.",
    shortDescription_de:
      "Osteria 1992: Eleganz und piemontesische Aromen im Herzen von Biella. Ein raffiniertes und einladendes kulinarisches Erlebnis.",
    details:
      "Situata in Viale Matteotti, nel centro di Biella, Osteria 1992 offre un'esperienza culinaria elegante che celebra i piatti tipici piemontesi e italiani. Il menù vanta antipasti come taglieri selezionati e sformati, primi gustosi quali ravioli al sugo d'arrosto, e secondi tradizionali come lo spezzatino con polenta. Il locale dispone anche di un bar ben fornito, perfetto per una pausa caffè con brioche, un aperitivo con spritz o cocktail, o un dopocena. Un ambiente raffinato e accogliente, ideale per un pranzo o una cena di qualità durante la vostra visita a Biella per l'Adunata. Menu disponibile su Linktree (linktr.ee/osteria1992).",
    details_en:
      "Located on Viale Matteotti, in the center of Biella, Osteria 1992 offers an elegant culinary experience celebrating typical Piedmontese and Italian dishes. The menu boasts appetizers like selected platters and flans, tasty first courses such as ravioli with roast sauce, and traditional main courses like stew with polenta. The venue also features a well-stocked bar, perfect for a coffee break with pastries, an aperitif with spritz or cocktails, or an after-dinner drink. A refined and welcoming environment, ideal for a quality lunch or dinner during your visit to Biella for the Adunata. Menu available on Linktree (linktr.ee/osteria1992).",
    details_es:
      "Ubicada en Viale Matteotti, en el centro de Biella, Osteria 1992 ofrece una elegante experiencia culinaria que celebra los platos típicos piamonteses e italianos. El menú cuenta con entrantes como tablas selectas y flanes, sabrosos primeros platos como raviolis en salsa de asado, y segundos platos tradicionales como estofado con polenta. El local también dispone de un bar bien surtido, perfecto para una pausa para el café con bollería, un aperitivo con spritz o cócteles, o una copa después de cenar. Un ambiente refinado y acogedor, ideal para un almuerzo o cena de calidad durante su visita a Biella para la Adunata. Menú disponible en Linktree (linktr.ee/osteria1992).",
    details_fr:
      "Située sur Viale Matteotti, au centre de Biella, l'Osteria 1992 propose une expérience culinaire élégante célébrant les plats typiques piémontais et italiens. Le menu comprend des hors-d'œuvre tels que des planches sélectionnées et des flans, de savoureux plats de pâtes comme les raviolis à la sauce rôtie, et des plats principaux traditionnels comme le ragoût à la polenta. L'établissement dispose également d'un bar bien approvisionné, parfait pour une pause-café avec viennoiseries, un apéritif avec spritz ou cocktails, ou un digestif. Un environnement raffiné et accueillant, idéal pour un déjeuner ou un dîner de qualité lors de votre visite à Biella pour l'Adunata. Menu disponible sur Linktree (linktr.ee/osteria1992).",
    details_de:
      "Die Osteria 1992 in der Viale Matteotti im Zentrum von Biella bietet ein elegantes kulinarisches Erlebnis, das typische piemontesische und italienische Gerichte zelebriert. Die Speisekarte bietet Vorspeisen wie ausgewählte Platten und Flans, schmackhafte erste Gänge wie Ravioli mit Bratensauce und traditionelle Hauptgerichte wie Eintopf mit Polenta. Das Lokal verfügt auch über eine gut sortierte Bar, perfekt für eine Kaffeepause mit Gebäck, einen Aperitif mit Spritz oder Cocktails oder einen Drink nach dem Abendessen. Eine raffinierte und einladende Umgebung, ideal für ein hochwertiges Mittag- oder Abendessen während Ihres Besuchs in Biella für die Adunata. Speisekarte verfügbar auf Linktree (linktr.ee/osteria1992).",
    images: ["/images/osteria.jpeg"], // Example image path
    openingHours: `giovedì: 12:00-14:00, 19:00-22:00\nvenerdì: 12:00-14:00, 19:00-22:00\nsabato: 12:00-14:00, 19:00-22:00\ndomenica: Chiuso\nlunedì: 12:00-14:00, 19:00-22:00\nmartedì: 12:00-14:00, 19:00-22:00\nmercoledì: 12:00-14:00, 19:00-22:00`,
    openingHours_en: `Thursday: 12:00-14:00, 19:00-22:00\nFriday: 12:00-14:00, 19:00-22:00\nSaturday: 12:00-14:00, 19:00-22:00\nSunday: Closed\nMonday: 12:00-14:00, 19:00-22:00\nTuesday: 12:00-14:00, 19:00-22:00\nWednesday: 12:00-14:00, 19:00-22:00`,
    openingHours_es: `Jueves: 12:00-14:00, 19:00-22:00\nViernes: 12:00-14:00, 19:00-22:00\nSábado: 12:00-14:00, 19:00-22:00\nDomingo: Cerrado\nLunes: 12:00-14:00, 19:00-22:00\nMartes: 12:00-14:00, 19:00-22:00\nMiércoles: 12:00-14:00, 19:00-22:00`,
    openingHours_fr: `Jeudi : 12h00-14h00, 19h00-22h00\nVendredi : 12h00-14h00, 19h00-22h00\nSamedi : 12h00-14h00, 19h00-22h00\nDimanche : Fermé\nLundi : 12h00-14h00, 19h00-22h00\nMardi : 12h00-14h00, 19h00-22h00\nMercredi : 12h00-14h00, 19h00-22h00`,
    openingHours_de: `Donnerstag: 12:00-14:00, 19:00-22:00\nFreitag: 12:00-14:00, 19:00-22:00\nSamstag: 12:00-14:00, 19:00-22:00\nSonntag: Geschlossen\nMontag: 12:00-14:00, 19:00-22:00\nDienstag: 12:00-14:00, 19:00-22:00\nMittwoch: 12:00-14:00, 19:00-22:00`,
    discountInfo:
      "Cucina piemontese e italiana raffinata. Ampia scelta al bar.",
    discountInfo_en:
      "Refined Piedmontese and Italian cuisine. Wide selection at the bar.",
    discountInfo_es:
      "Cocina piamontesa e italiana refinada. Amplia selección en el bar.",
    discountInfo_fr:
      "Cuisine piémontaise et italienne raffinée. Large choix au bar.",
    discountInfo_de:
      "Raffinierte piemontesische und italienische Küche. Große Auswahl an der Bar.",
    tags: [
      "Ristorante",
      "Osteria",
      "Cucina Piemontese",
      "Cucina Italiana",
      "Elegante",
      "Biella Centro",
      "Bar",
      "Cocktail",
    ],
    tags_en: [
      "Restaurant",
      "Osteria",
      "Piedmontese Cuisine",
      "Italian Cuisine",
      "Elegant",
      "Biella Center",
      "Bar",
      "Cocktails",
    ],
    tags_es: [
      "Restaurante",
      "Ostería",
      "Cocina Piamontesa",
      "Cocina Italiana",
      "Elegante",
      "Biella Centro",
      "Bar",
      "Cócteles",
    ],
    tags_fr: [
      "Restaurant",
      "Osteria",
      "Cuisine Piémontaise",
      "Cuisine Italienne",
      "Élégant",
      "Biella Centre",
      "Bar",
      "Cocktails",
    ],
    tags_de: [
      "Restaurant",
      "Osteria",
      "Piemontesische Küche",
      "Italienische Küche",
      "Elegant",
      "Biella Zentrum",
      "Bar",
      "Cocktails",
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
    id: 220, // New unique ID
    name: "Ristorante Prosciutteria San Daniele",
    name_en: "San Daniele Prosciutteria Restaurant",
    name_es: "Restaurante Jamonería San Daniele",
    name_fr: "Restaurant Charcuterie San Daniele",
    name_de: "Restaurant Schinkenstube San Daniele",
    type: "restaurant",
    coordinates: [45.564746, 8.049684],
    googleRating: 4.2,
    googleReviewCount: 601,
    address: "Via Sebastiano Ferrero, 23, 13900 Biella BI",
    phone: "01522762",
    website: "https://www.prosciutteriasandaniele.it/",
    shortDescription:
      "Prosciutteria San Daniele a Biella: l'eccellenza dei salumi, carni alla griglia e vini. Un'esperienza di gusto indimenticabile!",
    shortDescription_en:
      "San Daniele Prosciutteria in Biella: the excellence of cured meats, grilled meats, and wines. An unforgettable taste experience!",
    shortDescription_es:
      "Jamonería San Daniele en Biella: la excelencia de los embutidos, carnes a la parrilla y vinos. ¡Una experiencia de sabor inolvidable!",
    shortDescription_fr:
      "Charcuterie San Daniele à Biella : l'excellence des charcuteries, viandes grillées et vins. Une expérience gustative inoubliable !",
    shortDescription_de:
      "Schinkenstube San Daniele in Biella: die Exzellenz von Wurstwaren, Grillfleisch und Weinen. Ein unvergessliches Geschmackserlebnis!",
    details:
      "Il Ristorante Prosciutteria San Daniele, nel cuore di Biella, è un tempio del gusto specializzato in taglieri di salumi e formaggi pregiati, carni alla griglia di altissima qualità e una cantina di vini selezionati. Aperto 7 GIORNI SU 7 per pranzo e cena, con ORARI ESTESI nel weekend Adunata (Ven-Dom 10:00-23:00). Il locale dispone di tavoli all'aperto, seggioloni per bambini e accoglie volentieri i cani. Perfetto per chi cerca un'esperienza culinaria autentica e raffinata, con un focus su materie prime eccellenti, in un ambiente accogliente durante l'evento.",
    details_en:
      "San Daniele Prosciutteria Restaurant, in the heart of Biella, is a temple of taste specializing in platters of fine cured meats and cheeses, top-quality grilled meats, and a cellar of selected wines. Open 7 DAYS A WEEK for lunch and dinner, with EXTENDED HOURS on Adunata weekend (Fri-Sun 10:00-23:00). The venue features outdoor seating, high chairs for children, and warmly welcomes dogs. Perfect for those seeking an authentic and refined culinary experience, with a focus on excellent raw materials, in a welcoming environment during the event.",
    details_es:
      "El Restaurante Jamonería San Daniele, en el corazón de Biella, es un templo del sabor especializado en tablas de embutidos y quesos selectos, carnes a la parrilla de altísima calidad y una bodega de vinos escogidos. Abierto los 7 DÍAS DE LA SEMANA para almuerzos y cenas, con HORARIO EXTENDIDO el fin de semana de la Adunata (Vie-Dom 10:00-23:00). El local dispone de mesas al aire libre, tronas para niños y admite perros con gusto. Perfecto para quienes buscan una experiencia culinaria auténtica y refinada, con un enfoque en materias primas excelentes, en un ambiente acogedor durante el evento.",
    details_fr:
      "Le Restaurant Charcuterie San Daniele, au cœur de Biella, est un temple du goût spécialisé dans les planches de charcuteries fines et de fromages, les viandes grillées de première qualité et une cave de vins sélectionnés. Ouvert 7 JOURS SUR 7 pour le déjeuner et le dîner, avec des HORAIRES PROLONGÉS le week-end de l'Adunata (Ven-Dim 10h00-23h00). L'établissement dispose de tables en extérieur, de chaises hautes pour enfants et accueille volontiers les chiens. Parfait pour ceux qui recherchent une expérience culinaire authentique et raffinée, axée sur d'excellentes matières premières, dans un cadre accueillant pendant l'événement.",
    details_de:
      "Das Restaurant Schinkenstube San Daniele im Herzen von Biella ist ein Geschmackstempel, spezialisiert auf Platten mit feinen Wurst- und Käsesorten, erstklassigem Grillfleisch und einem Keller mit ausgewählten Weinen. Geöffnet 7 TAGE DIE WOCHE zum Mittag- und Abendessen, mit VERLÄNGERTEN ÖFFNUNGSZEITEN am Adunata-Wochenende (Fr-So 10:00-23:00). Das Lokal verfügt über Sitzplätze im Freien, Hochstühle für Kinder und heißt Hunde herzlich willkommen. Perfekt für diejenigen, die ein authentisches und raffiniertes kulinarisches Erlebnis mit Fokus auf exzellente Rohstoffe in einer einladenden Umgebung während der Veranstaltung suchen.",
    images: ["/images/prosciutteria.jpeg"], // Example image path
    openingHours: `Lun-Gio: 12:00-14:30, 19:00-23:00\nVen-Dom: 10:00-24:00`,
    openingHours_en: `Mon-Thu: 12:00-14:30, 19:00-23:00\nFri-Sun: 10:00-24:00`,
    openingHours_es: `Lun-Jue: 12:00-14:30, 19:00-23:00\nVie-Dom: 10:00-24:00`,
    openingHours_fr: `Lun-Jeu: 12h00-14h30, 19h00-23h00\nVen-Dim: 10h00-24h00`,
    openingHours_de: `Mo-Do: 12:00-14:30, 19:00-23:00\nFr-So: 10:00-24:00`,
    discountInfo:
      "Specializzati in taglieri, grigliate e vini selezionati. Cani ammessi.",
    discountInfo_en:
      "Specializing in platters, grilled meats, and selected wines. Dogs allowed.",
    discountInfo_es:
      "Especializados en tablas, carnes a la parrilla y vinos selectos. Perros admitidos.",
    discountInfo_fr:
      "Spécialisé dans les planches, les grillades et les vins sélectionnés. Chiens admis.",
    discountInfo_de:
      "Spezialisiert auf Platten, Grillfleisch und ausgewählte Weine. Hunde erlaubt.",
    tags: [
      "Ristorante",
      "Prosciutteria",
      "Taglieri",
      "Carne Grigliata",
      "Vini",
      "Biella Centro",
      "Tavoli Aperto",
      "Cani Ammessi",
    ],
    tags_en: [
      "Restaurant",
      "Prosciutteria",
      "Platters",
      "Grilled Meat",
      "Wines",
      "Biella Center",
      "Outdoor Seating",
      "Dogs Allowed",
    ],
    tags_es: [
      "Restaurante",
      "Jamonería",
      "Tablas",
      "Carne a la Parrilla",
      "Vinos",
      "Biella Centro",
      "Terraza",
      "Perros Admitidos",
    ],
    tags_fr: [
      "Restaurant",
      "Charcuterie",
      "Planches",
      "Viande Grillée",
      "Vins",
      "Biella Centre",
      "Terrasse",
      "Chiens Admis",
    ],
    tags_de: [
      "Restaurant",
      "Schinkenstube",
      "Platten",
      "Grillfleisch",
      "Weine",
      "Biella Zentrum",
      "Außenbereich",
      "Hunde Erlaubt",
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
    id: 221, // New unique ID
    name: "Di Biase Pizzeria Gourmet e Bar",
    name_en: "Di Biase Gourmet Pizzeria & Bar",
    name_es: "Di Biase Pizzeria Gourmet y Bar",
    name_fr: "Di Biase Pizzeria Gourmet et Bar",
    name_de: "Di Biase Gourmet Pizzeria & Bar",
    type: "restaurant", // Primarily a pizzeria, but with bar facilities
    coordinates: [45.558603, 8.06307],
    googleRating: 4.6,
    googleReviewCount: 53,
    address: "Via Trento, 34, 13900 Biella BI",
    phone: "0152470131",
    website: "https://di-biase-pizzeria-gourmet.fly.dev/",
    shortDescription:
      "Di Biase a Biella: l'arte della pizza gourmet e l'eleganza di un bar. Un'esperienza di gusto superiore.",
    shortDescription_en:
      "Di Biase in Biella: the art of gourmet pizza and the elegance of a bar. A superior taste experience.",
    shortDescription_es:
      "Di Biase en Biella: el arte de la pizza gourmet y la elegancia de un bar. Una experiencia de sabor superior.",
    shortDescription_fr:
      "Di Biase à Biella : l'art de la pizza gourmet et l'élégance d'un bar. Une expérience gustative supérieure.",
    shortDescription_de:
      "Di Biase in Biella: die Kunst der Gourmet-Pizza und die Eleganz einer Bar. Ein überlegenes Geschmackserlebnis.",
    details:
      "Di Biase Pizzeria Gourmet e Bar, in Via Trento a Biella, offre un'interpretazione raffinata della pizza, elevandola a esperienza gourmet. Ogni pizza è frutto di ricerca e ingredienti selezionati, per un sapore unico e ricercato. Il locale combina l'eccellenza della pizzeria con l'atmosfera accogliente di un bar, perfetto per un pasto di qualità o un aperitivo. Una scelta ideale per chi desidera gustare una pizza speciale e creativa durante l'Adunata, in un ambiente curato.",
    details_en:
      "Di Biase Gourmet Pizzeria & Bar, on Via Trento in Biella, offers a refined interpretation of pizza, elevating it to a gourmet experience. Each pizza is the result of research and selected ingredients, for a unique and sophisticated taste. The venue combines pizzeria excellence with the welcoming atmosphere of a bar, perfect for a quality meal or an aperitif. An ideal choice for those wishing to enjoy a special and creative pizza during the Adunata, in a well-kept environment.",
    details_es:
      "Di Biase Pizzeria Gourmet y Bar, en Via Trento en Biella, ofrece una interpretación refinada de la pizza, elevándola a una experiencia gourmet. Cada pizza es fruto de la investigación y de ingredientes seleccionados, para un sabor único y sofisticado. El local combina la excelencia de la pizzería con el ambiente acogedor de un bar, perfecto para una comida de calidad o un aperitivo. Una opción ideal para quienes deseen disfrutar de una pizza especial y creativa durante la Adunata, en un entorno cuidado.",
    details_fr:
      "Di Biase Pizzeria Gourmet et Bar, Via Trento à Biella, propose une interprétation raffinée de la pizza, l'élevant au rang d'expérience gastronomique. Chaque pizza est le fruit de recherches et d'ingrédients sélectionnés, pour un goût unique et sophistiqué. L'établissement allie l'excellence de la pizzeria à l'atmosphère accueillante d'un bar, parfait pour un repas de qualité ou un apéritif. Un choix idéal pour ceux qui souhaitent déguster une pizza spéciale et créative pendant l'Adunata, dans un cadre soigné.",
    details_de:
      "Die Di Biase Gourmet Pizzeria & Bar in der Via Trento in Biella bietet eine raffinierte Interpretation der Pizza und erhebt sie zu einem Gourmet-Erlebnis. Jede Pizza ist das Ergebnis von Forschung und ausgewählten Zutaten für einen einzigartigen und anspruchsvollen Geschmack. Das Lokal verbindet die Exzellenz einer Pizzeria mit der einladenden Atmosphäre einer Bar, perfekt für eine hochwertige Mahlzeit oder einen Aperitif. Eine ideale Wahl für diejenigen, die während der Adunata eine besondere und kreative Pizza in einer gepflegten Umgebung genießen möchten.",
    images: ["/images/pizzaGourmet.png"], // Example image path
    openingHours: `giovedì: 10:00-14:30, 18:00-22:00\nvenerdì: 10:00-14:30, 18:00-22:00\nsabato: 18:00-23:00\ndomenica: 18:00-22:00\nlunedì: 10:00-14:30, 18:00-22:00\nmartedì: 10:00-14:30, 18:00-22:00\nmercoledì: Chiuso`,
    openingHours_en: `Thursday: 10:00-14:30, 18:00-22:00\nFriday: 10:00-14:30, 18:00-22:00\nSaturday: 18:00-23:00\nSunday: 18:00-22:00\nMonday: 10:00-14:30, 18:00-22:00\nTuesday: 10:00-14:30, 18:00-22:00\nWednesday: Closed`,
    openingHours_es: `Jueves: 10:00-14:30, 18:00-22:00\nViernes: 10:00-14:30, 18:00-22:00\nSábado: 18:00-23:00\nDomingo: 18:00-22:00\nLunes: 10:00-14:30, 18:00-22:00\nMartes: 10:00-14:30, 18:00-22:00\nMiércoles: Cerrado`,
    openingHours_fr: `Jeudi : 10h00-14h30, 18h00-22h00\nVendredi : 10h00-14h30, 18h00-22h00\nSamedi : 18h00-23h00\nDimanche : 18h00-22h00\nLundi : 10h00-14h30, 18h00-22h00\nMardi : 10h00-14h30, 18h00-22h00\nMercredi : Fermé`,
    openingHours_de: `Donnerstag: 10:00-14:30, 18:00-22:00\nFreitag: 10:00-14:30, 18:00-22:00\nSamstag: 18:00-23:00\nSonntag: 18:00-22:00\nMontag: 10:00-14:30, 18:00-22:00\nDienstag: 10:00-14:30, 18:00-22:00\nMittwoch: Geschlossen`,
    discountInfo: "Pizze gourmet con ingredienti selezionati e servizio bar.",
    discountInfo_en:
      "Gourmet pizzas with selected ingredients and bar service.",
    discountInfo_es:
      "Pizzas gourmet con ingredientes seleccionados y servicio de bar.",
    discountInfo_fr:
      "Pizzas gastronomiques avec ingrédients sélectionnés et service de bar.",
    discountInfo_de: "Gourmet-Pizzen mit ausgewählten Zutaten und Bar-Service.",
    tags: [
      "Pizzeria Gourmet",
      "Ristorante",
      "Bar",
      "Pizza Artigianale",
      "Biella Centro",
      "Cucina Raffinata",
    ],
    tags_en: [
      "Gourmet Pizzeria",
      "Restaurant",
      "Bar",
      "Artisanal Pizza",
      "Biella Center",
      "Refined Cuisine",
    ],
    tags_es: [
      "Pizzería Gourmet",
      "Restaurante",
      "Bar",
      "Pizza Artesanal",
      "Biella Centro",
      "Cocina Refinada",
    ],
    tags_fr: [
      "Pizzeria Gourmet",
      "Restaurant",
      "Bar",
      "Pizza Artisanale",
      "Biella Centre",
      "Cuisine Raffinée",
    ],
    tags_de: [
      "Gourmet-Pizzeria",
      "Restaurant",
      "Bar",
      "Handwerkliche Pizza",
      "Biella Zentrum",
      "Raffinierte Küche",
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
    id: 222, // New unique ID
    name: "Osteria Due Cuori",
    name_en: "Osteria Due Cuori (Two Hearts Inn)",
    name_es: "Osteria Due Cuori (Posada Dos Corazones)",
    name_fr: "Osteria Due Cuori (Auberge Deux Cœurs)",
    name_de: "Osteria Due Cuori (Gasthaus Zwei Herzen)",
    type: "restaurant",
    coordinates: [45.56622, 8.045301],
    googleRating: 4.4,
    googleReviewCount: 367,
    address: "Piazza della Cisterna, 11, 13900 Biella BI (Biella Piazzo)",
    phone: "01530145",
    website: "https://www.osteriaduecuori.it/",
    shortDescription:
      "Osteria Due Cuori a Biella Piazzo: passione, Slow Food e menu Alpini semplificato per l'Adunata! Gusto autentico.",
    shortDescription_en:
      "Osteria Due Cuori in Biella Piazzo: passion, Slow Food, and a simplified Alpini menu for the Adunata! Authentic taste.",
    shortDescription_es:
      "Osteria Due Cuori en Biella Piazzo: pasión, Slow Food ¡y menú Alpino simplificado para la Adunata! Sabor auténtico.",
    shortDescription_fr:
      "Osteria Due Cuori à Biella Piazzo : passion, Slow Food et menu Alpin simplifié pour l'Adunata ! Goût authentique.",
    shortDescription_de:
      "Osteria Due Cuori in Biella Piazzo: Leidenschaft, Slow Food und ein vereinfachtes Alpini-Menü für die Adunata! Authentischer Geschmack.",
    details:
      "L'Osteria Due Cuori, gioiello gastronomico a Biella Piazzo e segnalata da Slow Food, celebra la cucina del territorio con ingredienti locali e stagionali. Ogni piatto è 'espresso' per freschezza. Per l'Adunata, oltre al menù alla carta, propongono un MENU ALPINI SEMPLIFICATO, pensato per un servizio più agile e focalizzato sui sapori tradizionali. Offrono carni eccellenti, opzioni vegetariane/vegane/senza glutine e gli storici torcetti. Con tavoli all'aperto e accoglienza per bambini e cani, è ideale per un'esperienza culinaria autentica e di qualità durante l'evento.",
    details_en:
      "Osteria Due Cuori, a gastronomic gem in Biella Piazzo recognized by Slow Food, celebrates local cuisine with seasonal ingredients. Every dish is freshly prepared ('espresso'). For the Adunata, in addition to the à la carte menu, they offer a SIMPLIFIED ALPINI MENU, designed for quicker service and focused on traditional flavors. They feature excellent meats, vegetarian/vegan/gluten-free options, and historic torcetti biscuits. With outdoor seating and a welcome for children and dogs, it's ideal for an authentic, high-quality culinary experience during the event.",
    details_es:
      "Osteria Due Cuori, joya gastronómica en Biella Piazzo reconocida por Slow Food, celebra la cocina local con ingredientes de temporada. Cada plato es 'expreso'. Para la Adunata, además del menú a la carta, ofrecen un MENÚ ALPINO SIMPLIFICADO, pensado para un servicio más ágil y centrado en sabores tradicionales. Cuentan con excelentes carnes, opciones vegetarianas/veganas/sin gluten y los históricos torcetti. Con mesas al aire libre y bienvenida a niños y perros, es ideal para una experiencia culinaria auténtica y de calidad durante el evento.",
    details_fr:
      "L'Osteria Due Cuori, joyau gastronomique de Biella Piazzo reconnu par Slow Food, célèbre la cuisine du terroir avec des ingrédients de saison. Chaque plat est 'expresso'. Pour l'Adunata, en plus du menu à la carte, ils proposent un MENU ALPIN SIMPLIFIÉ, conçu pour un service plus rapide et axé sur les saveurs traditionnelles. Ils offrent d'excellentes viandes, des options végétariennes/végétaliennes/sans gluten et les biscuits historiques torcetti. Avec des tables en extérieur et un accueil pour les enfants et les chiens, c'est l'idéal pour une expérience culinaire authentique et de qualité pendant l'événement.",
    details_de:
      "Die Osteria Due Cuori, ein gastronomisches Juwel in Biella Piazzo, von Slow Food anerkannt, zelebriert die lokale Küche mit saisonalen Zutaten. Jedes Gericht wird frisch zubereitet ('espresso'). Für die Adunata bieten sie zusätzlich zum À-la-carte-Menü ein VEREINFACHTES ALPINI-MENÜ an, das auf schnelleren Service und traditionelle Aromen ausgerichtet ist. Sie bieten ausgezeichnetes Fleisch, vegetarische/vegane/glutenfreie Optionen und historische Torcetti-Kekse. Mit Sitzplätzen im Freien und einem Willkommen für Kinder und Hunde ist es ideal für ein authentisches, hochwertiges kulinarisches Erlebnis während der Veranstaltung.",
    images: ["/images/2cuori.jpeg"],
    openingHours: `giovedì: 19:30-21:30\nvenerdì: 12:30-14:30, 19:30-21:30\nsabato: 12:30-14:30, 19:30-21:30\ndomenica: 12:30-14:30, 19:30-21:00\nlunedì: Chiuso\nmartedì: 19:30-21:30\nmercoledì: 19:30-21:30`,
    openingHours_en: `Thursday: 19:30-21:30\nFriday: 12:30-14:30, 19:30-21:30\nSaturday: 12:30-14:30, 19:30-21:30\nSunday: 12:30-14:30, 19:30-21:00\nMonday: Closed\nTuesday: 19:30-21:30\nWednesday: 19:30-21:30`,
    openingHours_es: `Jueves: 19:30-21:30\nViernes: 12:30-14:30, 19:30-21:30\nSábado: 12:30-14:30, 19:30-21:30\nDomingo: 12:30-14:30, 19:30-21:00\nLunes: Cerrado\nMartes: 19:30-21:30\nMiércoles: 19:30-21:30`,
    openingHours_fr: `Jeudi : 19h30-21h30\nVendredi : 12h30-14h30, 19h30-21h30\nSamedi : 12h30-14h30, 19h30-21h30\nDimanche : 12h30-14h30, 19h30-21h00\nLundi : Fermé\nMardi : 19h30-21h30\nMercredi : 19h30-21h30`,
    openingHours_de: `Donnerstag: 19:30-21:30\nFreitag: 12:30-14:30, 19:30-21:30\nSamstag: 12:30-14:30, 19:30-21:30\nSonntag: 12:30-14:30, 19:30-21:00\nMontag: Geschlossen\nDienstag: 19:30-21:30\nMittwoch: 19:30-21:30`,
    discountInfo:
      "Menu Alpini semplificato per l'Adunata. Cucina Slow Food e opzioni per diete specifiche.", // Updated
    discountInfo_en:
      "Simplified Alpini menu for the Adunata. Slow Food cuisine and options for specific diets.", // Updated
    discountInfo_es:
      "Menú Alpino simplificado para la Adunata. Cocina Slow Food y opciones para dietas específicas.", // Updated
    discountInfo_fr:
      "Menu Alpin simplifié pour l'Adunata. Cuisine Slow Food et options pour régimes spécifiques.", // Updated
    discountInfo_de:
      "Vereinfachtes Alpini-Menü für die Adunata. Slow Food-Küche und Optionen für spezielle Diäten.", // Updated
    tags: [
      "Osteria",
      "Slow Food",
      "Cucina Piemontese",
      "Menu Alpini Semplificato",
      "Biella Piazzo",
      "Vegetariano",
      "Vegano",
      "Senza Glutine",
      "Torcetti",
    ], // Updated
    tags_en: [
      "Osteria",
      "Slow Food",
      "Piedmontese Cuisine",
      "Simplified Alpini Menu",
      "Biella Piazzo",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Torcetti Biscuits",
    ], // Updated
    tags_es: [
      "Ostería",
      "Slow Food",
      "Cocina Piamontesa",
      "Menú Alpino Simplificado",
      "Biella Piazzo",
      "Vegetariano",
      "Vegano",
      "Sin Gluten",
      "Galletas Torcetti",
    ], // Updated
    tags_fr: [
      "Osteria",
      "Slow Food",
      "Cuisine Piémontaise",
      "Menu Alpin Simplifié",
      "Biella Piazzo",
      "Végétarien",
      "Végétalien",
      "Sans Gluten",
      "Biscuits Torcetti",
    ], // Updated
    tags_de: [
      "Osteria",
      "Slow Food",
      "Piemontesische Küche",
      "Vereinfachtes Alpini-Menü",
      "Biella Piazzo",
      "Vegetarisch",
      "Vegan",
      "Glutenfrei",
      "Torcetti Gebäck",
    ], // Updated
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
    id: 223, // New unique ID (assuming 222 was the last restaurant)
    name: "Monviso Brazilian Steakhouse",
    name_en: "Monviso Brazilian Steakhouse",
    name_es: "Monviso Brazilian Steakhouse",
    name_fr: "Monviso Brazilian Steakhouse",
    name_de: "Monviso Brazilian Steakhouse",
    type: "restaurant",
    coordinates: [45.540301, 8.080105],
    googleRating: 5.0,
    googleReviewCount: 3, // Note: low review count despite high rating
    address: "Via Camillo Cavour, 49, 13894 Gaglianico BI",
    phone: "0153701315",
    website: "https://monvisosteakhouse.it/",
    shortDescription:
      "Steakhouse brasiliana a Gaglianico: rodízio completo, carni selezionate e vasta scelta di vini.",
    shortDescription_en:
      "Brazilian steakhouse in Gaglianico: full rodízio, selected meats, and a wide choice of wines.",
    shortDescription_es:
      "Steakhouse brasileña en Gaglianico: rodízio completo, carnes seleccionadas y amplia selección de vinos.",
    shortDescription_fr:
      "Steakhouse brésilien à Gaglianico : rodízio complet, viandes sélectionnées et large choix de vins.",
    shortDescription_de:
      "Brasilianisches Steakhouse in Gaglianico: komplettes Rodízio, ausgewählte Fleischsorten und große Weinauswahl.",
    details:
      "Monviso Brazilian Steakhouse a Gaglianico offre un'autentica esperienza culinaria brasiliana con il suo rodízio completo. Godetevi oltre 10 tagli di carne selezionata e pregiata, serviti al tavolo con un servizio impeccabile in un ambiente elegante e confortevole. La proposta è arricchita da un buffet di contorni e da una cantina con più di 30 etichette di vino. Ideale per una cena abbondante e di qualità durante l'Adunata.",
    details_en:
      "Monviso Brazilian Steakhouse in Gaglianico offers an authentic Brazilian culinary experience with its full rodízio. Enjoy over 10 cuts of selected and premium meat, served 테이블side with impeccable service in an elegant and comfortable environment. The offering is enriched by a buffet of side dishes and a wine cellar with over 30 wine labels. Ideal for a hearty and quality dinner during the Adunata.",
    details_es:
      "Monviso Brazilian Steakhouse en Gaglianico ofrece una auténtica experiencia culinaria brasileña con su rodízio completo. Disfrute de más de 10 cortes de carne seleccionada y de primera calidad, servidos en la mesa con un servicio impecable en un ambiente elegante y confortable. La oferta se enriquece con un buffet de guarniciones y una bodega con más de 30 etiquetas de vino. Ideal para una cena abundante y de calidad durante la Adunata.",
    details_fr:
      "Le Monviso Brazilian Steakhouse à Gaglianico offre une expérience culinaire brésilienne authentique avec son rodízio complet. Profitez de plus de 10 coupes de viande sélectionnée et de première qualité, servies à table avec un service impeccable dans un cadre élégant et confortable. L'offre est enrichie par un buffet de garnitures et une cave à vin comptant plus de 30 étiquettes. Idéal pour un dîner copieux et de qualité pendant l'Adunata.",
    details_de:
      "Das Monviso Brazilian Steakhouse in Gaglianico bietet ein authentisches brasilianisches kulinarisches Erlebnis mit seinem kompletten Rodízio. Genießen Sie über 10 verschiedene ausgewählte und hochwertige Fleischschnitte, die am Tisch mit tadellosem Service in einem eleganten und komfortablen Ambiente serviert werden. Das Angebot wird durch ein Beilagenbuffet und einen Weinkeller mit über 30 Weinetiketten bereichert. Ideal für ein herzhaftes und hochwertiges Abendessen während der Adunata.",
    images: ["/images/monviso.jpeg"], // Suggested image path
    openingHours: `Lun-Mar: 19:00-22:30\nMer-Gio, Ven: 12:00-14:30, 19:00-23:00\nSab-Dom: 12:00-15:00, 19:00-23:00`, // Grouped complex hours
    openingHours_en: `Mon-Tue: 19:00-22:30\nWed-Thu, Fri: 12:00-14:30, 19:00-23:00\nSat-Sun: 12:00-15:00, 19:00-23:00`,
    openingHours_es: `Lun-Mar: 19:00-22:30\nMié-Jue, Vie: 12:00-14:30, 19:00-23:00\nSáb-Dom: 12:00-15:00, 19:00-23:00`,
    openingHours_fr: `Lun-Mar: 19h00-22h30\nMer-Jeu, Ven: 12h00-14h30, 19h00-23h00\nSam-Dim: 12h00-15h00, 19h00-23h00`,
    openingHours_de: `Mo-Di: 19:00-22:30\nMi-Do, Fr: 12:00-14:30, 19:00-23:00\nSa-So: 12:00-15:00, 19:00-23:00`,
    discountInfo:
      "Rodízio completo con 10+ tagli di carne e 30+ etichette di vino.",
    discountInfo_en: "Full rodízio with 10+ meat cuts and 30+ wine labels.",
    discountInfo_es:
      "Rodízio completo con más de 10 cortes de carne y más de 30 etiquetas de vino.",
    discountInfo_fr:
      "Rodízio complet avec plus de 10 coupes de viande et plus de 30 étiquettes de vin.",
    discountInfo_de:
      "Komplettes Rodízio mit über 10 Fleischsorten und über 30 Weinetiketten.",
    tags: [
      "Ristorante",
      "Steakhouse",
      "Brasiliano",
      "Rodízio",
      "Carne",
      "Gaglianico",
      "Vini",
    ],
    tags_en: [
      "Restaurant",
      "Steakhouse",
      "Brazilian",
      "Rodízio",
      "Meat",
      "Gaglianico",
      "Wines",
    ],
    tags_es: [
      "Restaurante",
      "Steakhouse",
      "Brasileño",
      "Rodízio",
      "Carne",
      "Gaglianico",
      "Vinos",
    ],
    tags_fr: [
      "Restaurant",
      "Steakhouse",
      "Brésilien",
      "Rodízio",
      "Viande",
      "Gaglianico",
      "Vins",
    ],
    tags_de: [
      "Restaurant",
      "Steakhouse",
      "Brasilianisch",
      "Rodízio",
      "Fleisch",
      "Gaglianico",
      "Weine",
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
    id: 224,
    name: "Tortuga",
    name_en: "Tortuga Pub",
    name_es: "Tortuga Pub",
    name_fr: "Tortuga Pub",
    name_de: "Tortuga Pub",
    type: "restaurant",
    coordinates: [45.559461, 8.091863],
    googleRating: 4.2,
    googleReviewCount: 1105,
    address: "Via Quintino Sella, 16, 13856 Vigliano Biellese BI",
    phone: "015510969",
    website: "https://www.instagram.com/tortugapub_/",
    shortDescription:
      "Tortuga a Vigliano: pizzeria forno a legna, griglia, cocktail, musica live e birra speciale Alpini! Orari super estesi nel weekend.",
    shortDescription_en:
      "Tortuga in Vigliano: wood-fired pizzeria, grill, cocktails, live music, and special Alpini beer! Super extended weekend hours.",
    shortDescription_es:
      "Tortuga en Vigliano: pizzería con horno de leña, parrilla, cócteles, música en vivo ¡y cerveza especial Alpini! Horario súper extendido los fines de semana.",
    shortDescription_fr:
      "Tortuga à Vigliano : pizzeria au four à bois, grill, cocktails, musique live et bière spéciale Alpini ! Horaires super étendus le week-end.",
    shortDescription_de:
      "Tortuga in Vigliano: Holzofen-Pizzeria, Grill, Cocktails, Live-Musik und spezielles Alpini-Bier! Super verlängerte Wochenendöffnungszeiten.",
    details:
      "Il Tortuga a Vigliano Biellese è un locale vivace che offre pizza cotta in forno a legna, carne alla griglia e un'ampia scelta di bevande, inclusi ottimi cocktail, Spritz (a €5), Bionda Media (€5) e la Birra Forst edizione Alpini (€3,50). Dispone di tavoli all'aperto (dehor) e impianto di spillatura anche esterno. Propone regolarmente musica dal vivo. Un punto di ritrovo ideale per mangiare, bere e divertirsi durante l'Adunata, specialmente con gli orari prolungati nel weekend.",
    details_en:
      "Tortuga in Vigliano Biellese is a lively venue offering wood-fired pizza, grilled meat, and a wide selection of drinks, including great cocktails, Spritz (€5), Medium Blonde Beer (€5), and the special Forst Alpini edition beer (€3.50). It features outdoor seating (dehor) and an outdoor draft system. Regularly hosts live music. An ideal meeting point to eat, drink, and have fun during the Adunata, especially with extended weekend hours.",
    details_es:
      "El Tortuga en Vigliano Biellese es un local animado que ofrece pizza cocinada en horno de leña, carne a la parrilla y una amplia selección de bebidas, incluyendo excelentes cócteles, Spritz (5€), Cerveza Rubia Mediana (5€) y la cerveza especial Forst edición Alpini (3,50€). Cuenta con mesas al aire libre (dehor) y sistema de grifo exterior. Ofrece música en vivo regularmente. Un punto de encuentro ideal para comer, beber y divertirse durante la Adunata, especialmente con el horario extendido los fines de semana.",
    details_fr:
      "Le Tortuga à Vigliano Biellese est un lieu animé proposant des pizzas cuites au four à bois, des viandes grillées et une large sélection de boissons, y compris d'excellents cocktails, du Spritz (5€), de la Bière Blonde Moyenne (5€) et la bière spéciale Forst édition Alpini (3,50€). Il dispose de tables en extérieur (dehor) et d'un système de tirage extérieur. Propose régulièrement de la musique live. Un lieu de rencontre idéal pour manger, boire et s'amuser pendant l'Adunata, surtout avec les horaires prolongés le week-end.",
    details_de:
      "Das Tortuga in Vigliano Biellese ist ein lebhafter Ort, der Pizza aus dem Holzofen, gegrilltes Fleisch und eine große Auswahl an Getränken anbietet, darunter großartige Cocktails, Spritz (5€), Helles Bier Medium (5€) und das spezielle Forst Alpini Edition Bier (3,50€). Es verfügt über Sitzplätze im Freien (Dehor) und eine Zapfanlage im Außenbereich. Regelmäßig gibt es Live-Musik. Ein idealer Treffpunkt zum Essen, Trinken und Spaß haben während der Adunata, besonders mit den verlängerten Öffnungszeiten am Wochenende.",
    images: ["/images/tortuga.jpeg"],
    openingHours: `Mar-Gio: 19:00-01:00\nVen-Dom: 10:00-04:00\nLun: Chiuso`,
    openingHours_en: `Tue-Thu: 19:00-01:00\nFri-Sun: 10:00-04:00\nMon: Closed`,
    openingHours_es: `Mar-Jue: 19:00-01:00\nVie-Dom: 10:00-04:00\nLun: Cerrado`,
    openingHours_fr: `Mar-Jeu: 19h00-01h00\nVen-Dim: 10h00-04h00\nLun: Fermé`,
    openingHours_de: `Di-Do: 19:00-01:00\nFr-So: 10:00-04:00\nMo: Geschlossen`,
    discountInfo:
      "Pizzeria Forno a Legna, Griglia, Dehor. Bionda Media €5, Spritz €5, Birra Forst Ed. Alpini €3,50.",
    discountInfo_en:
      "Wood-Fired Pizzeria, Grill, Outdoor Seating. Medium Blonde Beer €5, Spritz €5, Forst Alpini Ed. Beer €3.50.",
    discountInfo_es:
      "Pizzería Horno de Leña, Parrilla, Terraza. Cerveza Rubia Mediana 5€, Spritz 5€, Cerveza Forst Ed. Alpini 3,50€.",
    discountInfo_fr:
      "Pizzeria Four à Bois, Grill, Terrasse. Bière Blonde Moyenne 5€, Spritz 5€, Bière Forst Éd. Alpini 3,50€.",
    discountInfo_de:
      "Holzofen-Pizzeria, Grill, Außenbereich. Helles Bier Medium 5€, Spritz 5€, Forst Alpini Ed. Bier 3,50€.",
    tags: [
      "Ristorante",
      "Pizzeria",
      "Pub",
      "Musica dal Vivo",
      "Carne Griglia",
      "Cocktail",
      "Birra Forst Alpini",
      "Vigliano Biellese",
      "Dehor",
      "Aperto Tardi",
    ],
    tags_en: [
      "Restaurant",
      "Pizzeria",
      "Pub",
      "Live Music",
      "Grilled Meat",
      "Cocktails",
      "Forst Alpini Beer",
      "Vigliano Biellese",
      "Outdoor Seating",
      "Open Late",
    ],
    tags_es: [
      "Restaurante",
      "Pizzería",
      "Pub",
      "Música en Vivo",
      "Carne Parrilla",
      "Cócteles",
      "Cerveza Forst Alpini",
      "Vigliano Biellese",
      "Terraza",
      "Abierto Tarde",
    ],
    tags_fr: [
      "Restaurant",
      "Pizzeria",
      "Pub",
      "Musique Live",
      "Viande Grillée",
      "Cocktails",
      "Bière Forst Alpini",
      "Vigliano Biellese",
      "Terrasse",
      "Ouvert Tard",
    ],
    tags_de: [
      "Restaurant",
      "Pizzeria",
      "Pub",
      "Live-Musik",
      "Gegrilltes Fleisch",
      "Cocktails",
      "Forst Alpini Bier",
      "Vigliano Biellese",
      "Außenbereich",
      "Spät Geöffnet",
    ],
    partyInfo: "", // Removed
    partyInfo_en: "", // Removed
    partyInfo_es: "", // Removed
    partyInfo_fr: "", // Removed
    partyInfo_de: "", // Removed
    partyHours: "", // Removed
    partyHours_en: "", // Removed
    partyHours_es: "", // Removed
    partyHours_fr: "", // Removed
    partyHours_de: "", // Removed
  },
  {
    id: 505, // New unique ID
    name: "Bevande Miscelate",
    name_en: "Bevande Miscelate (Mixed Drinks Shop)",
    name_es: "Bevande Miscelate (Tienda de Bebidas Mezcladas)",
    name_fr: "Bevande Miscelate (Boutique de Boissons Mixées)",
    name_de: "Bevande Miscelate (Geschäft für Mixgetränke)",
    type: "clothing", // Using 'clothing' as a general shop type
    coordinates: [45.564532, 8.054157],
    googleRating: 5.0,
    googleReviewCount: 12,
    address: "Via Antonio Gramsci, 11b, 13900 Biella BI",
    phone: "3297115295",
    website: "https://bevandemiscelate.it/",
    shortDescription:
      "Bevande Miscelate: l'arte del cocktail a casa tua! Kit pronti e prodotti locali selezionati. Perfetto per l'Adunata!", // Adjusted
    shortDescription_en:
      "Bevande Miscelate: the art of cocktails at home! Ready-made kits and selected local products. Perfect for the Adunata!", // Adjusted
    shortDescription_es:
      "Bevande Miscelate: ¡el arte de los cócteles en tu casa! Kits listos y productos locales seleccionados. ¡Perfecto para la Adunata!", // Adjusted
    shortDescription_fr:
      "Bevande Miscelate : l'art du cocktail chez vous ! Kits prêts à l'emploi et produits locaux sélectionnés. Parfait pour l'Adunata !", // Adjusted
    shortDescription_de:
      "Bevande Miscelate: die Kunst der Cocktails für zu Hause! Fertige Sets und ausgewählte lokale Produkte. Perfekt für die Adunata!", // Adjusted
    details:
      "Bevande Miscelate, in Via Gramsci a Biella, è la destinazione innovativa per gli amanti dei cocktail e dei prodotti di qualità. Nato come shop online, offre esclusive box da miscelare con ingredienti selezionati per creare cocktail perfetti a casa. Troverete anche una curata selezione di distillati e prodotti del territorio. ORARI ESTESI nel weekend Adunata (Ven-Sab 09:00-22:00, Dom 09:00-19:00). Ideale per un regalo originale, per arricchire i vostri momenti conviviali durante l'evento, o per gustare eccellenze locali.", // Adjusted
    details_en:
      "Bevande Miscelate, on Via Gramsci in Biella, is the innovative destination for cocktail lovers and quality product enthusiasts. Originating as an online shop, it offers exclusive mixing boxes with selected ingredients to create perfect cocktails at home. You'll also find a curated selection of spirits and local products. EXTENDED HOURS on Adunata weekend (Fri-Sat 09:00-22:00, Sun 09:00-19:00). Ideal for an original gift, to enrich your convivial moments during the event, or to taste local excellences.", // Adjusted
    details_es:
      "Bevande Miscelate, en Via Gramsci en Biella, es el destino innovador para los amantes de los cócteles y los productos de calidad. Nacida como tienda online, ofrece exclusivas cajas de mezcla con ingredientes seleccionados para crear cócteles perfectos en casa. También encontrará una cuidada selección de destilados y productos locales. HORARIO EXTENDIDO el fin de semana de la Adunata (Vie-Sáb 09:00-22:00, Dom 09:00-19:00). Ideal para un regalo original, para enriquecer sus momentos de convivencia durante el evento o para degustar excelencias locales.", // Adjusted
    details_fr:
      "Bevande Miscelate, Via Gramsci à Biella, est la destination innovante pour les amateurs de cocktails et de produits de qualité. Née comme boutique en ligne, elle propose des coffrets de mixologie exclusifs avec des ingrédients sélectionnés pour créer des cocktails parfaits à la maison. Vous trouverez également une sélection soignée de spiritueux et de produits locaux. HORAIRES PROLONGÉS le week-end de l'Adunata (Ven-Sam 09h00-22h00, Dim 09h00-19h00). Idéal pour un cadeau original, pour enrichir vos moments conviviaux pendant l'événement, ou pour déguster des excellences locales.", // Adjusted
    details_de:
      "Bevande Miscelate in der Via Gramsci in Biella ist das innovative Ziel für Cocktail-Liebhaber und Qualitätskenner. Ursprünglich als Online-Shop entstanden, bietet es exklusive Mix-Boxen mit ausgewählten Zutaten, um perfekte Cocktails zu Hause zu kreieren. Sie finden auch eine kuratierte Auswahl an Spirituosen und lokalen Produkten. VERLÄNGERTE ÖFFNUNGSZEITEN am Adunata-Wochenende (Fr-Sa 09:00-22:00, So 09:00-19:00). Ideal für ein originelles Geschenk, zur Bereicherung Ihrer geselligen Momente während der Veranstaltung oder zum Genießen lokaler Spezialitäten.", // Adjusted
    images: ["/images/bevandeMiscelate.jpeg"],
    openingHours: `giovedì: 10:00-12:00, 15:00-19:00\nvenerdì: 09:30-22:00\nsabato: 09:00-22:00\ndomenica: 09:00-19:00\nlunedì: Chiuso\nmartedì: 10:00-12:00, 15:00-19:00\nmercoledì: Chiuso`,
    openingHours_en: `Thursday: 10:00-12:00, 15:00-19:00\nFriday: 09:30-22:00\nSaturday: 09:00-22:00\nSunday: 09:00-19:00\nMonday: Closed\nTuesday: 10:00-12:00, 15:00-19:00\nWednesday: Closed`,
    openingHours_es: `Jueves: 10:00-12:00, 15:00-19:00\nViernes: 09:30-22:00\nSábado: 09:00-22:00\nDomingo: 09:00-19:00\nLunes: Cerrado\nMartes: 10:00-12:00, 15:00-19:00\nMiércoles: Cerrado`,
    openingHours_fr: `Jeudi : 10h00-12h00, 15h00-19h00\nVendredi : 09h30-22h00\nSamedi : 09h00-22h00\nDimanche : 09h00-19h00\nLundi : Fermé\nMardi : 10h00-12h00, 15h00-19h00\nMercredi : Fermé`,
    openingHours_de: `Donnerstag: 10:00-12:00, 15:00-19:00\nFreitag: 09:30-22:00\nSamstag: 09:00-22:00\nSonntag: 09:00-19:00\nMontag: Geschlossen\nDienstag: 10:00-12:00, 15:00-19:00\nMittwoch: Geschlossen`,
    discountInfo: "Kit cocktail pronti e prodotti locali selezionati.", // Adjusted
    discountInfo_en: "Ready-made cocktail kits and selected local products.", // Adjusted
    discountInfo_es: "Kits de cóctel listos y productos locales seleccionados.", // Adjusted
    discountInfo_fr:
      "Kits cocktails prêts à l'emploi et produits locaux sélectionnés.", // Adjusted
    discountInfo_de: "Fertige Cocktail-Sets und ausgewählte lokale Produkte.", // Adjusted
    tags: [
      "Cocktail Kit",
      "Distillati",
      "Prodotti Locali",
      "Shop Online",
      "Biella Centro",
      "Regali",
    ], // Adjusted
    tags_en: [
      "Cocktail Kits",
      "Spirits",
      "Local Products",
      "Online Shop",
      "Biella Center",
      "Gifts",
    ], // Adjusted
    tags_es: [
      "Kits de Cóctel",
      "Destilados",
      "Productos Locales",
      "Tienda Online",
      "Biella Centro",
      "Regalos",
    ], // Adjusted
    tags_fr: [
      "Kits Cocktail",
      "Spiritueux",
      "Produits Locaux",
      "Boutique en Ligne",
      "Biella Centre",
      "Cadeaux",
    ], // Adjusted
    tags_de: [
      "Cocktail-Sets",
      "Spirituosen",
      "Lokale Produkte",
      "Online-Shop",
      "Biella Zentrum",
      "Geschenke",
    ], // Adjusted
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
    id: 506,
    name: "Le Macellerie di Nonno Nino (Stand Adunata Biella)", // Added Biella for clarity
    name_en: "Nonno Nino's Butcher Shops (Adunata Biella Stand)",
    name_es: "Las Carnicerías de Nonno Nino (Stand Adunata Biella)",
    name_fr: "Les Boucheries de Nonno Nino (Stand Adunata Biella)",
    name_de: "Nonno Ninos Metzgereien (Adunata Biella-Stand)",
    type: "restaurant",
    coordinates: [45.559634, 8.052724],
    googleRating: 4.6,
    googleReviewCount: 75,
    address: "Via Galimberti, 3, 13900 Biella BI (Stand Adunata)",
    phone: "015666103",
    website: "https://www.carnibotalla1876srl.com/",
    shortDescription:
      "Stand Nonno Nino a Biella per l'Adunata: panini gourmet (Fassona, salamella), patatine, vino e birra. Servizio diurno e serale!",
    shortDescription_en:
      "Nonno Nino stand in Biella for Adunata: gourmet sandwiches (Fassona, salamella), fries, wine, and beer. Day and evening service!",
    shortDescription_es:
      "Puesto Nonno Nino en Biella para la Adunata: ¡bocadillos gourmet (Fassona, salamella), patatas fritas, vino y cerveza. ¡Servicio diurno y nocturno!",
    shortDescription_fr:
      "Stand Nonno Nino à Biella pour l'Adunata : sandwichs gourmets (Fassona, salamella), frites, vin et bière. Service de jour et de soir !",
    shortDescription_de:
      "Nonno Nino-Stand in Biella zur Adunata: Gourmet-Sandwiches (Fassona, Salamella), Pommes, Wein und Bier. Tages- und Abendservice!",
    details:
      "Per l'Adunata Alpini 2025, Le Macellerie di Nonno Nino in Via Galimberti 3 offrono un menù speciale. Gustate panini gourmet come tartare di Fassona, salamella IGP, hamburger di Fassona, lingua in salsa verde, o a scelta con prosciutto cotto e toma, salame, coppa, mortadella. Disponibili anche patatine fritte, acqua, vino e birra. Servizio diurno e serale da venerdì 9 a domenica 11 maggio.", // More concise
    details_en:
      "For the Adunata Alpini 2025, Le Macellerie di Nonno Nino on Via Galimberti 3 offers a special menu. Enjoy gourmet sandwiches like Fassona tartare, IGP salamella, Fassona hamburger, tongue in green sauce, or choose from cooked ham & toma, salami, coppa, mortadella. Also available are french fries, water, wine, and beer. Day and evening service from Friday, May 9th to Sunday, May 11th.", // More concise
    details_es:
      "Para la Adunata Alpini 2025, Le Macellerie di Nonno Nino en Via Galimberti 3 ofrece un menú especial. Disfrute de bocadillos gourmet como tartar de Fassona, salamella IGP, hamburguesa de Fassona, lengua en salsa verde, o a elegir entre jamón cocido y toma, salami, coppa, mortadela. También disponibles patatas fritas, agua, vino y cerveza. Servicio diurno y nocturno desde el viernes 9 hasta el domingo 11 de mayo.", // More concise
    details_fr:
      "Pour l'Adunata Alpini 2025, Le Macellerie di Nonno Nino, Via Galimberti 3, propose un menu spécial. Dégustez des sandwichs gourmets comme le tartare de Fassona, la salamella IGP, le hamburger de Fassona, la langue en sauce verte, ou choisissez parmi jambon cuit & toma, salami, coppa, mortadelle. Également disponibles : frites, eau, vin et bière. Service de jour et de soir du vendredi 9 au dimanche 11 mai.", // More concise
    details_de:
      "Für die Adunata Alpini 2025 bietet Le Macellerie di Nonno Nino in der Via Galimberti 3 ein spezielles Menü an. Genießen Sie Gourmet-Sandwiches wie Fassona-Tartar, IGP-Salamella, Fassona-Hamburger, Zunge in grüner Sauce oder wählen Sie zwischen Kochschinken & Toma, Salami, Coppa, Mortadella. Ebenfalls erhältlich sind Pommes Frites, Wasser, Wein und Bier. Tages- und Abendservice von Freitag, 9. Mai bis Sonntag, 11. Mai.", // More concise
    images: ["/images/macelleriaBotalla.jpg"],
    openingHours: "Ven 9 Mag - Dom 11 Mag: Servizio Diurno e Serale",
    openingHours_en: "Fri May 9 - Sun May 11: Day and Evening Service",
    openingHours_es: "Vie 9 May - Dom 11 May: Servicio Diurno y Nocturno",
    openingHours_fr: "Ven 9 Mai - Dim 11 Mai : Service de Jour et de Soir",
    openingHours_de: "Fr 9. Mai - So 11. Mai: Tages- und Abendservice",
    discountInfo:
      "Panini gourmet con carni selezionate (Fassona, salamella IGP), patatine, vino e birra per l'Adunata.",
    discountInfo_en:
      "Gourmet sandwiches with selected meats (Fassona, IGP salamella), fries, wine, and beer for the Adunata.",
    discountInfo_es:
      "Bocadillos gourmet con carnes seleccionadas (Fassona, salamella IGP), patatas fritas, vino y cerveza para la Adunata.",
    discountInfo_fr:
      "Sandwichs gourmets avec viandes sélectionnées (Fassona, salamella IGP), frites, vin et bière pour l'Adunata.",
    discountInfo_de:
      "Gourmet-Sandwiches mit ausgewähltem Fleisch (Fassona, IGP-Salamella), Pommes, Wein und Bier für die Adunata.",
    tags: [
      "Stand Gastronomico",
      "Macelleria Nonno Nino",
      "Panini Fassona",
      "Salamella IGP",
      "Adunata Alpini",
      "Biella Centro",
      "Street Food",
    ],
    tags_en: [
      "Food Stand",
      "Nonno Nino Butcher",
      "Fassona Sandwiches",
      "IGP Salamella",
      "Adunata Alpini",
      "Biella Center",
      "Street Food",
    ],
    tags_es: [
      "Puesto de Comida",
      "Carnicería Nonno Nino",
      "Bocadillos Fassona",
      "Salamella IGP",
      "Adunata Alpini",
      "Biella Centro",
      "Comida Callejera",
    ],
    tags_fr: [
      "Stand Alimentaire",
      "Boucherie Nonno Nino",
      "Sandwichs Fassona",
      "Salamella IGP",
      "Adunata Alpini",
      "Biella Centre",
      "Street Food",
    ],
    tags_de: [
      "Imbissstand",
      "Metzgerei Nonno Nino",
      "Fassona-Sandwiches",
      "IGP-Salamella",
      "Adunata Alpini",
      "Biella Zentrum",
      "Streetfood",
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
    id: 507,
    name: "Le Macellerie di Nonno Nino - Adunata Mongrando",
    name_en: "Nonno Nino's Butcher Shops - Adunata Mongrando",
    name_es: "Las Carnicerías de Nonno Nino - Adunata Mongrando",
    name_fr: "Les Boucheries de Nonno Nino - Adunata Mongrando",
    name_de: "Nonno Ninos Metzgereien - Adunata Mongrando",
    type: "restaurant",
    coordinates: [45.527756, 8.020219],
    googleRating: 4.7,
    googleReviewCount: 287,
    address: "Via Maghetto, 117, 13888 Mongrando BI (Evento Adunata)",
    phone: "015666103",
    website: "https://www.carnibotalla1876srl.com/",
    shortDescription:
      "Nonno Nino a Mongrando per l'Adunata: piatti tipici, grigliate, dolci e musica dal vivo (Ven/Sab con Eric & Cinzia)!",
    shortDescription_en:
      "Nonno Nino in Mongrando for Adunata: typical dishes, grilled meats, desserts, and live music (Fri/Sat with Eric & Cinzia)!",
    shortDescription_es:
      "Nonno Nino en Mongrando para la Adunata: ¡platos típicos, carnes a la parrilla, postres y música en vivo (Vie/Sáb con Eric & Cinzia)!",
    shortDescription_fr:
      "Nonno Nino à Mongrando pour l'Adunata : plats typiques, grillades, desserts et musique live (Ven/Sam avec Eric & Cinzia) !",
    shortDescription_de:
      "Nonno Nino in Mongrando zur Adunata: typische Gerichte, Grillfleisch, Desserts und Live-Musik (Fr/Sa mit Eric & Cinzia)!",
    details:
      "Qui vi aspettano gustosi taglieri di salumi nostrani e formaggi delle valli, la prelibata tartare di Fassona con bagna cauda, e la classica polenta accompagnata da salsiccia o spezzatino. Per gli amanti della griglia, imperdibili la tagliata di Fassona e il costato di suino, serviti con patatine. Concludete in dolcezza con i dolci artigianali tipici Mongrandesi. E non è tutto: il venerdì e sabato, l'atmosfera si accende con la musica, il ballo e il canto di Eric & Cinzia!",
    details_en:
      "Awaiting you here are tasty platters of local cured meats and valley cheeses, exquisite Fassona tartare with bagna cauda, and classic polenta served with sausage or stew. For grill lovers, the Fassona tagliata and pork ribs with fries are unmissable. Finish sweetly with typical Mongrandesi artisanal desserts. And that's not all: on Friday and Saturday, the atmosphere lights up with music, dancing, and singing from Eric & Cinzia!",
    details_es:
      "Aquí les esperan sabrosas tablas de embutidos locales y quesos del valle, el exquisito tartar de Fassona con bagna cauda, y la clásica polenta acompañada de salchicha o estofado. Para los amantes de la parrilla, imperdibles la tagliata de Fassona y las costillas de cerdo con patatas fritas. Terminen dulcemente con los postres artesanales típicos Mongrandesi. Y eso no es todo: ¡viernes y sábado, el ambiente se enciende con la música, el baile y el canto de Eric & Cinzia!",
    details_fr:
      "Vous attendent ici de savoureuses planches de charcuteries locales et de fromages de nos vallées, l'exquis tartare de Fassona avec bagna cauda, et la polenta classique servie avec saucisse ou ragoût. Pour les amateurs de grillades, la tagliata de Fassona et les côtes de porc avec frites sont incontournables. Terminez en douceur avec les desserts artisanaux typiques Mongrandesi. Et ce n'est pas tout : le vendredi et le samedi, l'ambiance s'illumine avec la musique, la danse et le chant d'Eric & Cinzia ! ",
    details_de:
      "Hier erwarten euch schmackhafte Platten mit lokalen Wurstwaren und Käsesorten aus den Tälern, exquisites Fassona-Tartar mit Bagna Cauda und klassische Polenta mit Wurst oder Eintopf. Für Grillliebhaber sind das Fassona-Tagliata und die Schweinerippchen mit Pommes ein Muss. Lasst es süß ausklingen mit typischen handgemachten Mongrandesi-Desserts. Und das ist noch nicht alles: Am Freitag und Samstag wird die Atmosphäre mit Musik, Tanz und Gesang von Eric & Cinzia belebt! ",
    images: ["/images/macelleriaBotalla.jpg"],
    openingHours: "Gio 8 Mag - Dom 11 Mag (Dettagli su menù)",
    openingHours_en: "Thu May 8 - Sun May 11 (Details on menu)",
    openingHours_es: "Jue 8 May - Dom 11 May (Detalles en menú)",
    openingHours_fr: "Jeu 8 Mai - Dim 11 Mai (Détails sur menu)",
    openingHours_de: "Do 8. Mai - So 11. Mai (Details auf Menü)",
    discountInfo:
      "Menu speciale Adunata con piatti tipici, grigliate e dolci Mongrandesi.",
    discountInfo_en:
      "Special Adunata menu with typical dishes, grilled meats, and Mongrandesi desserts.",
    discountInfo_es:
      "Menú especial Adunata con platos típicos, carnes a la parrilla y postres Mongrandesi.",
    discountInfo_fr:
      "Menu spécial Adunata avec plats typiques, grillades et desserts Mongrandesi.",
    discountInfo_de:
      "Spezielles Adunata-Menü mit typischen Gerichten, Grillfleisch und Mongrandesi-Desserts.",
    tags: [
      "Ristorante",
      "Macelleria Nonno Nino",
      "Cucina Tipica",
      "Grigliata",
      "Adunata Alpini",
      "Mongrando",
      "Musica dal Vivo",
    ],
    tags_en: [
      "Restaurant",
      "Nonno Nino Butcher",
      "Typical Cuisine",
      "Grilled Meat",
      "Adunata Alpini",
      "Mongrando",
      "Live Music",
    ],
    tags_es: [
      "Restaurante",
      "Carnicería Nonno Nino",
      "Cocina Típica",
      "Parrillada",
      "Adunata Alpini",
      "Mongrando",
      "Música en Vivo",
    ],
    tags_fr: [
      "Restaurant",
      "Boucherie Nonno Nino",
      "Cuisine Typique",
      "Grillades",
      "Adunata Alpini",
      "Mongrando",
      "Musique Live",
    ],
    tags_de: [
      "Restaurant",
      "Metzgerei Nonno Nino",
      "Typische Küche",
      "Grillfleisch",
      "Adunata Alpini",
      "Mongrando",
      "Live-Musik",
    ],
    partyInfo: "Musica, Ballo e Canto con Eric & Cinzia",
    partyInfo_en: "Music, Dancing, and Singing with Eric & Cinzia",
    partyInfo_es: "Música, Baile y Canto con Eric & Cinzia",
    partyInfo_fr: "Musique, Danse et Chant avec Eric & Cinzia",
    partyInfo_de: "Musik, Tanz und Gesang mit Eric & Cinzia",
    partyHours: "Venerdì e Sabato (sera)",
    partyHours_en: "Friday and Saturday (evening)",
    partyHours_es: "Viernes y Sábado (noche)",
    partyHours_fr: "Vendredi et Samedi (soir)",
    partyHours_de: "Freitag und Samstag (Abend)",
  },
  {
    id: 508, // New unique ID (assuming 507 was the last shop ID)
    name: "Conad Gaglianico",
    name_en: "Conad Gaglianico (Supermarket)",
    name_es: "Conad Gaglianico (Supermercado)",
    name_fr: "Conad Gaglianico (Supermarché)",
    name_de: "Conad Gaglianico (Supermarkt)",
    type: "clothing", // Using 'clothing' as a general shop type
    coordinates: [45.539663, 8.070896],
    googleRating: 4.0,
    googleReviewCount: 309,
    address: "Via Fiorita, SNC, 13894 Gaglianico BI",
    phone: "0152545041",
    website:
      "https://www.conad.it/ricerca-negozi/conad-via-fiorita-snc-13894-gaglianico--008162",
    shortDescription:
      "Supermercato Conad a Gaglianico: spesa completa, prodotti freschi e offerte.",
    shortDescription_en:
      "Conad supermarket in Gaglianico: complete grocery shopping, fresh products, and offers.",
    shortDescription_es:
      "Supermercado Conad en Gaglianico: compra completa, productos frescos y ofertas.",
    shortDescription_fr:
      "Supermarché Conad à Gaglianico : courses complètes, produits frais et offres.",
    shortDescription_de:
      "Conad Supermarkt in Gaglianico: kompletter Einkauf, frische Produkte und Angebote.",
    details:
      "Il supermercato Conad di Gaglianico in Via Fiorita offre un'ampia scelta di prodotti per la spesa quotidiana e per le necessità durante l'Adunata. Troverete generi alimentari, prodotti freschi (frutta, verdura, panetteria, macelleria), articoli per la casa e per la cura della persona. Comodo per rifornimenti e per trovare tutto il necessario in un unico posto. Verifica gli orari, specialmente la domenica con chiusura anticipata.",
    details_en:
      "The Conad supermarket in Gaglianico on Via Fiorita offers a wide selection of products for daily shopping and for needs during the Adunata. You will find groceries, fresh products (fruit, vegetables, bakery, butchery), household items, and personal care products. Convenient for supplies and for finding everything you need in one place. Check the opening hours, especially on Sunday with early closing.",
    details_es:
      "El supermercado Conad de Gaglianico en Via Fiorita ofrece una amplia selección de productos para la compra diaria y para las necesidades durante la Adunata. Encontrará comestibles, productos frescos (fruta, verdura, panadería, carnicería), artículos para el hogar y para el cuidado personal. Conveniente para abastecerse y para encontrar todo lo necesario en un solo lugar. Consulte los horarios, especialmente el domingo con cierre anticipado.",
    details_fr:
      "Le supermarché Conad de Gaglianico, Via Fiorita, propose une large sélection de produits pour les courses quotidiennes et pour les besoins pendant l'Adunata. Vous y trouverez des produits d'épicerie, des produits frais (fruits, légumes, boulangerie, boucherie), des articles ménagers et des produits de soins personnels. Pratique pour faire le plein et trouver tout ce dont vous avez besoin en un seul endroit. Vérifiez les horaires d'ouverture, notamment le dimanche avec fermeture anticipée.",
    details_de:
      "Der Conad-Supermarkt in Gaglianico in der Via Fiorita bietet eine große Auswahl an Produkten für den täglichen Einkauf und für den Bedarf während der Adunata. Hier finden Sie Lebensmittel, frische Produkte (Obst, Gemüse, Backwaren, Metzgerei), Haushaltsartikel und Körperpflegeprodukte. Praktisch für Besorgungen und um alles Notwendige an einem Ort zu finden. Überprüfen Sie die Öffnungszeiten, besonders am Sonntag mit früherer Schließung.",
    images: ["/images/conad.jpeg"], // Suggested image path
    openingHours: `Lun-Sab: 08:00-19:45\nDom: 08:30-12:30`,
    openingHours_en: `Mon-Sat: 08:00-19:45\nSun: 08:30-12:30`,
    openingHours_es: `Lun-Sáb: 08:00-19:45\nDom: 08:30-12:30`,
    openingHours_fr: `Lun-Sam: 08h00-19h45\nDim: 08h30-12h30`,
    openingHours_de: `Mo-Sa: 08:00-19:45\nSo: 08:30-12:30`,
    discountInfo: "", // Typically supermarkets don't have a single static discount info for this context
    discountInfo_en: "",
    discountInfo_es: "",
    discountInfo_fr: "",
    discountInfo_de: "",
    tags: [
      "Supermercato",
      "Alimentari",
      "Spesa",
      "Gaglianico",
      "Prodotti Freschi",
      "Conad",
    ],
    tags_en: [
      "Supermarket",
      "Groceries",
      "Shopping",
      "Gaglianico",
      "Fresh Produce",
      "Conad",
    ],
    tags_es: [
      "Supermercado",
      "Comestibles",
      "Compras",
      "Gaglianico",
      "Productos Frescos",
      "Conad",
    ],
    tags_fr: [
      "Supermarché",
      "Épicerie",
      "Courses",
      "Gaglianico",
      "Produits Frais",
      "Conad",
    ],
    tags_de: [
      "Supermarkt",
      "Lebensmittel",
      "Einkaufen",
      "Gaglianico",
      "Frische Produkte",
      "Conad",
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
  {
    id: 702, // New unique ID (assuming 701 was the last gelateria)
    name: "Mag Gelato",
    name_en: "Mag Gelato",
    name_es: "Mag Gelato",
    name_fr: "Mag Gelato",
    name_de: "Mag Gelato",
    type: "gelateria",
    coordinates: [45.563114, 8.058924],
    googleRating: 4.4,
    googleReviewCount: 1151,
    address: "Via Bertodano, 7, 13900 Biella BI",
    phone: "0153700747",
    website: "https://www.instagram.com/mag_gelatobiella/?hl=it",
    shortDescription:
      "Mag Gelato a Biella: gelato artigianale, caffetteria e aperitivi. Orari estesi!",
    shortDescription_en:
      "Mag Gelato in Biella: artisanal gelato, coffee shop, and aperitifs. Extended hours!",
    shortDescription_es:
      "Mag Gelato en Biella: ¡helado artesanal, cafetería y aperitivos. ¡Horario extendido!",
    shortDescription_fr:
      "Mag Gelato à Biella : glace artisanale, café et apéritifs. Horaires étendus !",
    shortDescription_de:
      "Mag Gelato in Biella: handwerkliches Eis, Café und Aperitifs. Erweiterte Öffnungszeiten!",
    details:
      "Mag Gelato, situata in Via Bertodano a Biella, è una rinomata gelateria artigianale che offre anche servizio di caffetteria e aperitivi. Un luogo ideale per una pausa dolce con gelato di alta qualità, una colazione, un caffè o per un momento conviviale con un aperitivo. Con orari prolungati fino a mezzanotte durante il weekend (fino alle 23:00 negli altri giorni), è una tappa perfetta per rinfrescarsi e rilassarsi durante l'Adunata.",
    details_en:
      "Mag Gelato, located on Via Bertodano in Biella, is a renowned artisanal gelateria that also offers coffee shop services and aperitifs. An ideal place for a sweet break with high-quality gelato, breakfast, coffee, or for a convivial moment with an aperitif. With extended hours until midnight on weekends (until 23:00 on other days), it's a perfect stop to refresh and relax during the Adunata.",
    details_es:
      "Mag Gelato, ubicada en Via Bertodano en Biella, es una reconocida heladería artesanal que también ofrece servicios de cafetería y aperitivos. Un lugar ideal para una pausa dulce con helado de alta calidad, un desayuno, un café o para un momento de convivencia con un aperitivo. Con horario extendido hasta la medianoche los fines de semana (hasta las 23:00 los demás días), es una parada perfecta para refrescarse y relajarse durante la Adunata.",
    details_fr:
      "Mag Gelato, situé Via Bertodano à Biella, est un glacier artisanal renommé qui propose également des services de café et d'apéritifs. Un lieu idéal pour une pause sucrée avec une glace de haute qualité, un petit-déjeuner, un café ou pour un moment convivial avec un apéritif. Avec des horaires prolongés jusqu'à minuit le week-end (jusqu'à 23h00 les autres jours), c'est un arrêt parfait pour se rafraîchir et se détendre pendant l'Adunata.",
    details_de:
      "Mag Gelato in der Via Bertodano in Biella ist eine renommierte handwerkliche Eisdiele, die auch Café-Service und Aperitifs anbietet. Ein idealer Ort für eine süße Pause mit hochwertigem Eis, ein Frühstück, einen Kaffee oder für einen geselligen Moment bei einem Aperitif. Mit verlängerten Öffnungszeiten bis Mitternacht am Wochenende (an anderen Tagen bis 23:00 Uhr) ist es ein perfekter Zwischenstopp, um sich während der Adunata zu erfrischen und zu entspannen.",
    images: ["/images/mag.jpeg"], // Suggested image path
    openingHours: `Lun-Gio: 07:00-23:00\nVen-Dom: 07:00-00:00`, // Note: Friday starts at 07:00, Sat/Sun at 08:00 as per original, but grouped for conciseness due to same closing. If granular start is crucial, it can be split.
    openingHours_en: `Mon-Thu: 07:00-23:00\nFri-Sun: 07:00-00:00`,
    openingHours_es: `Lun-Jue: 07:00-23:00\nVie-Dom: 07:00-00:00`,
    openingHours_fr: `Lun-Jeu: 07h00-23h00\nVen-Dim: 07h00-00h00`,
    openingHours_de: `Mo-Do: 07:00-23:00\nFr-So: 07:00-00:00`,
    discountInfo:
      "Gelato artigianale di alta qualità, caffetteria e aperitivi.",
    discountInfo_en:
      "High-quality artisanal gelato, coffee shop, and aperitifs.",
    discountInfo_es:
      "Helado artesanal de alta calidad, cafetería y aperitivos.",
    discountInfo_fr: "Glace artisanale de haute qualité, café et apéritifs.",
    discountInfo_de: "Hochwertiges handwerkliches Eis, Café und Aperitifs.",
    tags: [
      "Gelateria",
      "Artigianale",
      "Caffetteria",
      "Aperitivo",
      "Biella Centro",
      "Gelato",
    ],
    tags_en: [
      "Gelateria",
      "Artisanal",
      "Coffee Shop",
      "Aperitif",
      "Biella Center",
      "Ice Cream",
    ],
    tags_es: [
      "Heladería",
      "Artesanal",
      "Cafetería",
      "Aperitivo",
      "Biella Centro",
      "Helado",
    ],
    tags_fr: [
      "Glacier",
      "Artisanal",
      "Café",
      "Apéritif",
      "Biella Centre",
      "Glace",
    ],
    tags_de: [
      "Eisdiele",
      "Handwerklich",
      "Café",
      "Aperitif",
      "Biella Zentrum",
      "Eis",
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
  // ... Add many more points
];

// --- NEW: Define Colors and Icons per Type ---
interface PoiTypeStyle {
  color: string; // Hex color string
  icon: IconType | React.ForwardRefExoticComponent<any>; // React Icon Component or Heroicon component
}

export const poiTypeStyles: Record<PoiType | "default", PoiTypeStyle> = {
  camper: { color: "#3B82F6", icon: FaCaravan }, // Blue
  restaurant: { color: "#F97316", icon: FaUtensils }, // Orange
  bar: { color: "#A855F7", icon: FaGlassMartiniAlt }, // Purple
  private_accommodation: { color: "#EC4899", icon: FaCampground }, // Pink
  clothing: { color: "#8B5CF6", icon: FaShoppingBag }, // Violet
  ztl: { color: "#84CC16", icon: StopIcon }, // Using lime green & StopIcon
  wc: { color: "#A16207", icon: FaRestroom }, // Added (Light Brown/Tan)
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
    type: "wc",
    label: "WC Pubblici",
    icon: poiTypeStyles.wc.icon,
    color: poiTypeStyles.wc.color,
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
