import L from 'leaflet';

// Define POI Types
export type PoiType =
  | 'camper'
  | 'taxi'
  | 'restaurant'
  | 'bar'
  | 'hotel'
  | 'private_accommodation'
  | 'clothing';

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
    name: 'Area Camper Stadio',
    type: 'camper',
    coordinates: [45.570, 8.050],
    shortDescription: 'Area attrezzata per camper vicino allo stadio.',
    details: 'Ampia area camper attrezzata con servizi base (acqua, scarico). Prenotazione consigliata durante l\'evento. Vicina ai punti navetta.',
    address: 'Via Stadio, Biella',
    tags: ['Camper', 'Servizi Base', 'Stadio'],
    name_en: 'Stadium Camper Area',
    shortDescription_en: 'Equipped camper area near the stadium.',
    details_en: 'Large equipped camper area with basic services (water, drainage). Booking recommended during the event. Close to shuttle points.',
  },
  {
    id: 2,
    name: 'Ristorante Alpino',
    type: 'restaurant',
    coordinates: [45.565, 8.055],
    shortDescription: 'Cucina tipica piemontese.',
    details: 'Offre menù speciali per l\'Adunata. Specialità polenta concia e bagna cauda. Ampia sala, consigliata prenotazione.',
    address: 'Via Italia 50, Biella',
    phone: '015 123456',
    website: 'https://ristorantealpino.example.com',
    openingHours: 'Mar-Dom: 12:00-14:30, 19:00-22:30; Lun: Chiuso',
    tags: ['Piemontese', 'Tradizionale', 'Polenta', 'Prenotazione'],
    name_en: 'Alpino Restaurant',
    shortDescription_en: 'Typical Piedmontese cuisine.',
    details_en: 'Offers special menus for the Adunata. Specialties include polenta concia and bagna cauda. Large dining room, booking recommended.',
    openingHours_en: 'Tue-Sun: 12:00-14:30, 19:00-22:30; Mon: Closed',
  },
  // ... (Add other existing POIs, adding new fields and EN text where possible)
  {
    id: 20, // Example ID for Glamour
    name: 'Glamour Biella',
    type: 'bar', // Could also be restaurant depending on focus
    coordinates: [45.5645, 8.0570], // Please adjust coordinates
    shortDescription: 'Cocktail bar e ristorante moderno.',
    details: 'Locale trendy nel centro di Biella, perfetto per aperitivi, cene e serate. Ampia selezione di cocktail e vini. Cucina ricercata con opzioni vegetariane.',
    address: 'Via Umberto I, 20, Biella', // Example address
    phone: '015 987654',
    website: 'https://glamourbiella.example.com',
    // --- New Fields Added ---
    images: [
        '/images/glamour/img1.jpg', // MAKE SURE THESE EXIST IN public/images/glamour/
        '/images/glamour/img2.jpg',
        '/images/glamour/img3.jpg',
    ],
    openingHours: 'Mar-Gio: 18:00-01:00\nVen-Sab: 18:00-02:30\nDom: 18:00-00:00\nLun: Chiuso', // Use \n for new lines
    discountInfo: 'Sconto 10% per tesserati ANA (esclusi eventi speciali e Sabato sera).',
    tags: ['Cocktail', 'Aperitivo', 'Cena', 'Moderno', 'Musica', 'Vegetariano'],
    // --- EN Fields Added ---
    name_en: 'Glamour Biella',
    shortDescription_en: 'Modern cocktail bar and restaurant.',
    details_en: 'Trendy venue in the center of Biella, perfect for aperitifs, dinners, and evenings out. Wide selection of cocktails and wines. Refined cuisine with vegetarian options.',
    openingHours_en: 'Tue-Thu: 18:00-01:00\nFri-Sat: 18:00-02:30\nSun: 18:00-00:00\nMon: Closed',
    discountInfo_en: '10% discount for ANA members (excluding special events and Saturday nights).',
  },
   // ... Add many more points
];

// --- Updated Legend Items ---
export const legendItems: { type: PoiType; label: string; iconUrl: string }[] = [
  { type: 'camper', label: 'Area Camper', iconUrl: '/icons/camper.svg' },
  { type: 'taxi', label: 'Punto Taxi', iconUrl: '/icons/taxi.svg' },
  { type: 'restaurant', label: 'Ristorante', iconUrl: '/icons/restaurant.svg' },
  { type: 'bar', label: 'Bar', iconUrl: '/icons/bar.svg' },
  { type: 'hotel', label: 'Hotel', iconUrl: '/icons/hotel.svg' },
  { type: 'private_accommodation', label: 'Accoglienza (Stanze/Tende)', iconUrl: '/icons/tent.svg' },
  { type: 'clothing', label: 'Punto Abbigliamento/Gadget', iconUrl: '/icons/clothing.svg' },
];


// --- Function to get custom Leaflet Icon ---
export const getPoiIcon = (type: PoiType, iconUrl?: string): L.Icon => {
  let url = iconUrl;
  const size: L.PointExpression = [35, 35]; // Base size
  const anchor: L.PointExpression = [17, 35]; // Point of the icon which will correspond to marker's location

  if (!url) {
    switch (type) {
      case 'camper': url = '/icons/camper.svg'; break;
      case 'taxi': url = '/icons/taxi.svg'; break;
      case 'restaurant': url = '/icons/restaurant.svg'; break;
      case 'bar': url = '/icons/bar.svg'; break;
      case 'hotel': url = '/icons/hotel.svg'; break;
      case 'private_accommodation': url = '/icons/tent.svg'; break;
      case 'clothing': url = '/icons/clothing.svg'; break;
      default: url = '/icons/default-marker.svg'; // Ensure you have a default marker SVG
    }
  }

  return L.icon({
    iconUrl: url,
    iconSize: size,
    iconAnchor: anchor,
    popupAnchor: [0, -35] // Point from which the popup should open relative to the iconAnchor
    // className: 'custom-poi-marker' // Optional: Add class for CSS targeting
  });
};