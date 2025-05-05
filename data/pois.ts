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
  FaRestroom,
  FaBriefcaseMedical,
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
  | "pharmacy";

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
    id: 200,
    name: "Ristorante Alpino",
    name_es: "Restaurante Alpino",
    name_fr: "Restaurant Alpino",
    name_de: "Alpino Restaurant",
    type: "restaurant",
    coordinates: [45.565, 8.055],
    shortDescription: "Cucina tipica piemontese.",
    shortDescription_es: "Cocina típica piamontesa.",
    shortDescription_fr: "Cuisine piémontaise typique.",
    shortDescription_de: "Typische piemontesische Küche.",
    details:
      "Offre menù speciali per l'Adunata. Specialità polenta concia e bagna cauda. Ampia sala, consigliata prenotazione.",
    details_es:
      "Ofrece menús especiales para la Adunata. Especialidades polenta concia y bagna cauda. Sala amplia, se recomienda reservar.",
    details_fr:
      "Propose des menus spéciaux pour l’Adunata. Spécialités polenta concia et bagna cauda. Grande salle, réservation recommandée.",
    details_de:
      "Bietet spezielle Menüs für die Adunata. Spezialitäten: Polenta Concia und Bagna Cauda. Großer Saal, Reservierung empfohlen.",
    address: "Via Italia 50, Biella",
    phone: "015 123456",
    website: "https://ristorantealpino.example.com",
    openingHours: "Mar-Dom: 12:00-14:30, 19:00-22:30; Lun: Chiuso",
    openingHours_es: "Mar-Dom: 12:00-14:30, 19:00-22:30; Lun: Cerrado",
    openingHours_fr: "Mar-Dim : 12h00-14h30, 19h00-22h30 ; Lun : Fermé",
    openingHours_de: "Di-So: 12:00-14:30, 19:00-22:30; Mo: Geschlossen",
    tags: ["Piemontese", "Tradizionale", "Polenta", "Prenotazione"],
    tags_en: ["Piedmontese", "Traditional", "Polenta", "Reservation"],
    tags_es: ["Piamontés", "Tradicional", "Polenta", "Reserva"],
    tags_fr: ["Piémontais", "Traditionnel", "Polenta", "Réservation"],
    tags_de: ["Piemontesisch", "Traditionell", "Polenta", "Reservierung"],
    name_en: "Alpino Restaurant",
    shortDescription_en: "Typical Piedmontese cuisine.",
    details_en:
      "Offers special menus for the Adunata. Specialties include polenta concia and bagna cauda. Large dining room, booking recommended.",
    openingHours_en: "Tue-Sun: 12:00-14:30, 19:00-22:30; Mon: Closed",
  },
  {
    id: 20,
    name: "Glamour Biella",
    name_es: "Glamour Biella",
    name_fr: "Glamour Biella",
    name_de: "Glamour Biella",
    type: "bar",
    coordinates: [45.5645, 8.057],
    shortDescription: "Cocktail bar e ristorante moderno.",
    shortDescription_es: "Bar de cócteles y restaurante moderno.",
    shortDescription_fr: "Bar à cocktails et restaurant moderne.",
    shortDescription_de: "Moderner Cocktailbar und Restaurant.",
    details:
      "Locale trendy nel centro di Biella, perfetto per aperitivi, cene e serate. Ampia selezione di cocktail e vini. Cucina ricercata con opzioni vegetariane.",
    details_es:
      "Local de moda en el centro de Biella, perfecto para aperitivos, cenas y noches. Amplia selección de cócteles y vinos. Cocina refinada con opciones vegetarianas.",
    details_fr:
      "Lieu tendance au centre de Biella, parfait pour apéritifs, dîners et soirées. Large choix de cocktails et vins. Cuisine raffinée avec options végétariennes.",
    details_de:
      "Trendiger Ort im Zentrum von Biella, perfekt für Aperitifs, Abendessen und Abende. Große Auswahl an Cocktails und Weinen. Feine Küche mit vegetarischen Optionen.",
    address: "Via Umberto I, 20, Biella",
    phone: "015 987654",
    website: "https://glamourbiella.example.com",
    openingHours:
      "Mar-Gio: 18:00-01:00\nVen-Sab: 18:00-02:30\nDom: 18:00-00:00\nLun: Chiuso",
    openingHours_es:
      "Mar-Jue: 18:00-01:00\nVie-Sáb: 18:00-02:30\nDom: 18:00-00:00\nLun: Cerrado",
    openingHours_fr:
      "Mar-Jeu : 18h00-01h00\nVen-Sam : 18h00-02h30\nDim : 18h00-00h00\nLun : Fermé",
    openingHours_de:
      "Di-Do: 18:00-01:00\nFr-Sa: 18:00-02:30\nSo: 18:00-00:00\nMo: Geschlossen",
    discountInfo:
      "Sconto 10% per tesserati ANA (esclusi eventi speciali e Sabato sera).",
    discountInfo_es:
      "10% de descuento para socios ANA (excluye eventos especiales y sábados por la noche).",
    discountInfo_fr:
      "10 % de réduction pour les adhérents ANA (événements spéciaux et samedis soir exclus).",
    discountInfo_de:
      "10 % Rabatt für ANA-Mitglieder (außer Sonderveranstaltungen und Samstagabenden).",
    partyInfo: "DJ Set Elettronica/House",
    partyInfo_es: "Sesión de DJ electrónica/house",
    partyInfo_fr: "DJ Set Électronique/House",
    partyInfo_de: "DJ-Set Electronic/House",
    partyHours: "Ven/Sab: 22:30 - 02:30",
    partyHours_es: "Vie/Sáb: 22:30 - 02:30",
    partyHours_fr: "Ven/Sam : 22h30 - 02h30",
    partyHours_de: "Fr/Sa: 22:30 - 02:30",
    tags: ["Cocktail", "Aperitivo", "Cena", "Moderno", "Musica", "Vegetariano"],
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
    images: ["/images/glamour1.jpg"],
  },
  {
    id: 30,
    name: "Banca Sella Biella Centro",
    name_es: "Banco Sella Centro de Biella",
    name_fr: "Banque Sella Centre de Biella",
    name_de: "Banca Sella Biella Zentrum",
    type: "bank",
    coordinates: [45.566, 8.053],
    shortDescription: "Sportello Bancomat e filiale.",
    shortDescription_es: "Cajero automático y sucursal.",
    shortDescription_fr: "Distributeur automatique et agence.",
    shortDescription_de: "Geldautomat und Filiale.",
    details:
      "Filiale Banca Sella con sportello ATM accessibile H24. Consulenza su appuntamento.",
    details_es:
      "Sucursal de Banca Sella con cajero 24/7 accesible. Consultas con cita previa.",
    details_fr:
      "Agence Banca Sella avec distributeur accessible 24h/24. Conseils sur rendez-vous.",
    details_de:
      "Banca Sella-Filiale mit rund um die Uhr zugänglichem Geldautomaten. Beratung nach Termin.",
    address: "Via Pietro Micca, 10, Biella",
    phone: "015 35011",
    website: "https://www.sella.it",
    openingHours: "Lun-Ven: 08:30-13:30, 14:45-16:15\nATM: H24",
    openingHours_es: "Lun-Vie: 08:30-13:30, 14:45-16:15\nCajero: 24/7",
    openingHours_fr:
      "Lun-Ven : 08h30-13h30, 14h45-16h15\nDistributeur : 24h/24",
    openingHours_de: "Mo-Fr: 08:30-13:30, 14:45-16:15\nGeldautomat: 24/7",
    tags: ["Banca", "Bancomat", "ATM", "Servizi Finanziari"],
    name_en: "Banca Sella Biella Center",
    shortDescription_en: "ATM and branch.",
    details_en:
      "Banca Sella branch with 24/7 accessible ATM. Consultation by appointment.",
    openingHours_en: "Mon-Fri: 08:30-13:30, 14:45-16:15\nATM: 24/7",
  },
  {
    id: 31,
    name: "Parco Avventura Veglio",
    name_es: "Parque de Aventura Veglio",
    name_fr: "Parc Aventure Veglio",
    name_de: "Abenteuerpark Veglio",
    type: "activity",
    coordinates: [45.628, 8.123],
    shortDescription: "Percorsi avventura sugli alberi.",
    shortDescription_es: "Circuitos de aventura en los árboles.",
    shortDescription_fr: "Parcours d’aventure dans les arbres.",
    shortDescription_de: "Abenteuerparcours in den Bäumen.",
    details:
      "Parco divertimenti con percorsi acrobatici adatti a varie età e livelli di difficoltà. Area picnic disponibile.",
    details_es:
      "Parque de diversiones con circuitos acrobáticos para varias edades y niveles. Área de picnic disponible.",
    details_fr:
      "Parc de loisirs avec parcours acrobatiques adaptés à tous âges et niveaux. Aire de pique-nique disponible.",
    details_de:
      "Freizeitpark mit akrobatischen Parcours für verschiedene Altersgruppen und Schwierigkeitsgrade. Picknickbereich verfügbar.",
    address: "Località Veglio, Biella",
    website: "https://parcoavventuraveglio.example.com",
    openingHours: "Sab-Dom: 10:00-18:00 (Stagionale, verificare sito)",
    openingHours_es: "Sáb-Dom: 10:00-18:00 (Temporada, consulte el sitio web)",
    openingHours_fr: "Sam-Dim : 10h00-18h00 (Saison, vérifier le site)",
    openingHours_de: "Sa-So: 10:00-18:00 (Saisonal, Webseite prüfen)",
    tags: ["Avventura", "Famiglie", "Natura", "Sport", "Divertimento"],
    name_en: "Veglio Adventure Park",
    shortDescription_en: "Adventure courses in the trees.",
    details_en:
      "Amusement park with acrobatic courses suitable for various ages and difficulty levels. Picnic area available.",
    openingHours_en: "Sat-Sun: 10:00-18:00 (Seasonal, check website)",
  },
  {
    id: 32,
    name: "WC Pubblico Via Roccavilla",
    name_es: "WC público Via Roccavilla",
    name_fr: "WC public Via Roccavilla",
    name_de: "Öffentliche Toilette Via Roccavilla",
    type: "wc",
    coordinates: [45.568488, 8.049653],
    shortDescription: "Servizi igienici pubblici.",
    shortDescription_es: "Servicios sanitarios públicos.",
    shortDescription_fr: "Toilettes publiques.",
    shortDescription_de: "Öffentliche Toilettenanlagen.",
    details:
      "Bagni pubblici accessibili durante le ore diurne. Manutenzione regolare.",
    details_es:
      "Baños públicos accesibles durante el día. Mantenimiento regular.",
    details_fr:
      "Toilettes publiques accessibles pendant la journée. Entretien régulier.",
    details_de:
      "Öffentliche Toiletten tagsüber zugänglich. Regelmäßige Wartung.",
    address: "Via Alessandro Roccavilla, Biella",
    tags: ["WC", "Bagno", "Servizi Igienici", "Pubblico"],
    name_en: "Public WC Via Roccavilla",
    shortDescription_en: "Public restroom facilities.",
    details_en:
      "Public toilets accessible during daylight hours. Regularly maintained.",
  },
  {
    id: 300,
    name: "Farmacia Balestrini",
    name_es: "Farmacia Balestrini",
    name_fr: "Pharmacie Balestrini",
    name_de: "Apotheke Balestrini",
    type: "pharmacy",
    coordinates: [45.56615, 8.05432],
    shortDescription: "Farmacia centrale in Piazza V. Veneto.",
    shortDescription_es: "Farmacia central en Piazza V. Veneto.",
    shortDescription_fr: "Pharmacie centrale sur la Piazza V. Veneto.",
    shortDescription_de: "Zentrale Apotheke auf der Piazza V. Veneto.",
    details:
      "Farmacia storica situata nel centro di Biella, offre un'ampia gamma di farmaci, prodotti omeopatici, veterinari e cosmetici.",
    details_es:
      "Farmacia histórica ubicada en el centro de Biella, ofrece una amplia gama de medicamentos, productos homeopáticos, veterinarios y cosméticos.",
    details_fr:
      "Pharmacie historique située au centre de Biella, offrant un large éventail de médicaments, produits homéopathiques, vétérinaires et cosmétiques.",
    details_de:
      "Historische Apotheke im Zentrum von Biella, bietet eine breite Palette an Arzneimitteln, homöopathischen Produkten, Veterinärbedarf und Kosmetika.",
    address: "Piazza Vittorio Veneto 1, 13900 Biella BI",
    phone: "015 23747",
    website: "https://www.farmaciabalestrini.it/",
    tags: [
      "Farmacia",
      "Salute",
      "Centro",
      "Cosmetica",
      "Omeopatia",
      "Veterinaria",
    ],
    tags_en: [
      "Pharmacy",
      "Health",
      "City Center",
      "Cosmetics",
      "Homeopathy",
      "Veterinary",
    ], // English
    tags_es: [
      "Farmacia",
      "Salud",
      "Centro",
      "Cosmética",
      "Homeopatía",
      "Veterinaria",
    ], // Spanish
    tags_fr: [
      "Pharmacie",
      "Santé",
      "Centre Ville",
      "Cosmétiques",
      "Homéopathie",
      "Vétérinaire",
    ], // French
    tags_de: [
      "Apotheke",
      "Gesundheit",
      "Stadtzentrum",
      "Kosmetik",
      "Homöopathie",
      "Veterinär",
    ], // German
    name_en: "Balestrini Pharmacy",
    shortDescription_en: "Central pharmacy in Piazza V. Veneto.",
    details_en:
      "Historic pharmacy located in the center of Biella, offering a wide range of medicines, homeopathic products, veterinary supplies, and cosmetics.",
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
  ztl: { color: "#84CC16", icon: StopIcon }, // Using lime green & StopIcon
  wc: { color: "#A16207", icon: FaRestroom }, // Added (Light Brown/Tan)
  pharmacy: { color: "#22C55E", icon: FaBriefcaseMedical },
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
