import React from 'react';
import Image from 'next/image'; // Use Next.js Image for optimization
import { POI } from '../data/pois';
import { XMarkIcon, MapPinIcon, PhoneIcon, LinkIcon, ClockIcon, TagIcon, SparklesIcon } from '@heroicons/react/24/outline'; // Use outline icons for detail view
import { useLanguage } from '../context/LanguageContext';

interface PoiDetailModalProps {
  poi: POI | null;
  onClose: () => void;
}

const PoiDetailModal: React.FC<PoiDetailModalProps> = ({ poi, onClose }) => {
  const { t, language } = useLanguage();

  if (!poi) return null;

  // Helper to display text based on current language
  const getText = (itText: string | undefined, enText: string | undefined): string | undefined => {
    return language === 'en' && enText ? enText : itText;
  };

  return (
    // Backdrop - Added transitions
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-[1200] p-4 backdrop-blur-sm transition-opacity duration-300 ease-in-out" // Slightly darker backdrop
      onClick={onClose} // Close on backdrop click
    >
      {/* Modal Panel - Minimalist design */}
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg relative max-h-[90vh] flex flex-col animate-fade-scale-in" // Use animation from config/globals
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Image Header (Optional) */}
        {poi.images && poi.images.length > 0 && (
          <div className="relative h-48 w-full flex-shrink-0 rounded-t-xl overflow-hidden">
            <Image
              src={poi.images[0]} // Show first image as header
              alt={`${getText(poi.name, poi.name_en)} - Immagine principale`}
              layout="fill" // Fill the container
              objectFit="cover" // Cover the area
              priority={true} // Load header image quickly
            />
             {/* Close Button (Top Right on Image) */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white bg-black/40 p-1.5 rounded-full hover:bg-black/60 transition-colors duration-150 ease-in-out z-10"
              aria-label={t('closeButton')}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}

         {/* Close Button (Top Right if NO Image) */}
         {(!poi.images || poi.images.length === 0) && (
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors duration-150 ease-in-out z-10"
              aria-label={t('closeButton')}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
         )}


        {/* Scrollable Content Area */}
        <div className="p-5 md:p-6 overflow-y-auto flex-grow">

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900">
               {getText(poi.name, poi.name_en)}
            </h2>

            {/* Short Description / Main Details */}
            <p className="text-base text-gray-700 mb-4">
                 {getText(poi.details, poi.details_en) || getText(poi.shortDescription, poi.shortDescription_en)}
            </p>

            {/* Information Grid */}
            <div className="space-y-3 text-sm mb-4">
                 {poi.address && (
                    <div className="flex items-start">
                        <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{poi.address}</span>
                    </div>
                 )}
                 {poi.phone && (
                    <div className="flex items-center">
                        <PhoneIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                        <a href={`tel:${poi.phone}`} className="text-blue-600 hover:underline transition-colors duration-150 ease-in-out">{poi.phone}</a>
                    </div>
                 )}
                 {poi.website && (
                    <div className="flex items-center">
                        <LinkIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                        <a href={poi.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline transition-colors duration-150 ease-in-out truncate">{poi.website}</a>
                    </div>
                 )}
                 {/* Opening Hours */}
                 {poi.openingHours && (
                     <div className="flex items-start">
                         <ClockIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                         <div>
                             <span className="font-medium text-gray-700">{t('openingHoursLabel')}:</span>
                             {/* Use whitespace-pre-line to respect \n from data */}
                             <p className="text-gray-600 whitespace-pre-line">{getText(poi.openingHours, poi.openingHours_en)}</p>
                         </div>
                     </div>
                 )}
                 {/* Discount Info */}
                 {poi.discountInfo && (
                      <div className="flex items-start text-green-700">
                           <SparklesIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                           <span className="font-medium">{getText(poi.discountInfo, poi.discountInfo_en)}</span>
                      </div>
                 )}
            </div>

            {/* Tags */}
             {poi.tags && poi.tags.length > 0 && (
                 <div className="mb-4 flex flex-wrap gap-2 items-center">
                     <TagIcon className="h-5 w-5 text-gray-400 mr-1"/>
                     {poi.tags.map((tag, index) => (
                         <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">
                             {tag}
                         </span>
                     ))}
                 </div>
             )}

            {/* Image Gallery (Smaller Thumbnails) */}
            {poi.images && poi.images.length > 1 && ( // Show only if more than 1 image (first is header)
                <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">Galleria</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                        {poi.images.map((imgUrl, index) => (
                            <a key={index} href={imgUrl} target="_blank" rel="noopener noreferrer" title={`Vedi immagine ${index + 1}`}>
                                <Image
                                    src={imgUrl}
                                    alt={`${getText(poi.name, poi.name_en)} - Immagine ${index + 1}`}
                                    width={100}
                                    height={100}
                                    className="rounded-md object-cover aspect-square border border-gray-200 hover:opacity-80 transition-opacity"
                                    loading="lazy"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            )}

        </div> {/* End Scrollable Content Area */}

        {/* Footer Action (Optional) */}
        {/*
        <div className="p-4 bg-gray-50 rounded-b-xl border-t flex justify-end">
            <button
                onClick={onClose}
                className="bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-medium"
            >
                {t('closeButton')}
            </button>
        </div>
        */}
      </div>
    </div>
  );
};

export default PoiDetailModal;