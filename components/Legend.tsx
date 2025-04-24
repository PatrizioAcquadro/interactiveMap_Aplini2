// components/Legend.tsx
import React, { useMemo } from 'react';
import { legendItems, PoiType, POI } from '../data/pois';
import { CheckIcon, MapIcon as MapOutlineIcon, XMarkIcon } from '@heroicons/react/24/outline'; // Use outline icons appropriately
import { useLanguage } from '../context/LanguageContext'; // Assuming context setup

// --- CORRECTED Props Interface ---
interface LegendProps {
  activeFilters: Set<PoiType>;
  onFilterChange: (type: PoiType, isActive: boolean) => void;
  isLegendOpen: boolean;          // Expect 'isLegendOpen'
  onToggleVisibility: () => void; // Expect 'onToggleVisibility'
  allPois: POI[];                 // Expect 'allPois'
}

const Legend: React.FC<LegendProps> = ({
  activeFilters,
  onFilterChange,
  isLegendOpen,          // Destructure 'isLegendOpen'
  onToggleVisibility,  // Destructure 'onToggleVisibility'
  allPois,                 // Destructure 'allPois'
}) => {
  const { t, language, setLanguage } = useLanguage();

  // Calculate POI counts
  const poiCounts = useMemo(() => {
    const counts: { [key in PoiType]?: number } = {};
    legendItems.forEach(item => counts[item.type] = 0);
    allPois.forEach(poi => {
        if (counts[poi.type] !== undefined) {
            counts[poi.type]!++;
        }
    });
    return counts;
  }, [allPois]);

  // Language toggle function (example)
  const toggleLang = () => setLanguage(language === 'it' ? 'en' : 'it');

  // --- CORRECTED Conditional Rendering ---
  // If the legend is NOT open, render only the toggle button
  if (!isLegendOpen) {
    return (
      <button
        onClick={onToggleVisibility} // Call the function passed from parent
        className="fixed bottom-4 left-4 z-[1000] p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 ease-in-out"
        aria-label={t('showLegend')}
      >
        {/* Use the Map Outline icon for the toggle button */}
        <MapOutlineIcon className="h-6 w-6 text-gray-700" />
      </button>
    );
  }

  // --- If the legend IS open, render the full panel ---
  return (
    <div
      className="fixed bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-xl max-w-xs w-full transition-all duration-300 ease-in-out"
    >
      {/* Close Button (X) inside the open panel */}
      <button
         onClick={onToggleVisibility} // Call the same toggle function
         className="absolute -top-3 -right-3 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 ease-in-out z-10"
         aria-label={t('hideLegend')}
       >
         {/* Use XMarkIcon */}
         <XMarkIcon className="h-5 w-5 text-gray-600" />
      </button>

       {/* Language Toggle Button (Example) */}
       <button onClick={toggleLang} className="absolute top-2 right-2 text-xs p-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-150">
          {language === 'it' ? 'EN' : 'IT'}
       </button>

      {/* Legend Title */}
      <h3 className="text-base font-semibold mb-3 text-gray-800 border-b pb-2 pr-6">
         {t('legendTitle')}
      </h3>

      {/* Scrollable List of Filters */}
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {legendItems.map((item) => {
           const isActive = activeFilters.has(item.type);
           const count = poiCounts[item.type] || 0;

           // Get language-specific label (basic example)
           let labelText = item.label;
           if (language === 'en') {
               // Simple replacements - improve with key-based translation if needed
               labelText = labelText.replace('Area Camper', 'Camper Area')
                                  .replace('Punto Taxi', 'Taxi Point')
                                  .replace('Accoglienza (Stanze/Tende)','Accomodation (Rooms/Tents)')
                                  .replace('Punto Abbigliamento/Gadget','Clothing/Gadget Point');
           }


           return (
             <div
               key={item.type}
               // Apply opacity transition based on isActive state
               className={`flex items-center justify-between transition-opacity duration-200 ease-in-out ${
                 !isActive ? 'opacity-50 hover:opacity-75' : 'opacity-100' // Dim if not active
               }`}
             >
               {/* Icon, Label, and Count */}
               <div className="flex items-center space-x-2 flex-grow mr-2 cursor-default">
                 <img src={item.iconUrl} alt="" className="h-5 w-5 flex-shrink-0" />
                 <span className="text-sm text-gray-700 flex-grow">
                    {labelText} {/* Display the correct label */}
                    <span className="text-xs text-gray-500"> ({count})</span>
                 </span>
               </div>

               {/* Filter Toggle Checkbox Button */}
               <button
                 onClick={() => onFilterChange(item.type, !isActive)} // Toggle filter state
                 className={`p-1 rounded-full transition-colors duration-150 ease-in-out flex-shrink-0 ${
                   isActive
                     ? 'bg-blue-500 hover:bg-blue-600 text-white'
                     : 'bg-gray-200 hover:bg-gray-300 text-gray-500'
                 }`}
               >
                   {/* Check Icon with opacity transition */}
                   <CheckIcon className={`h-4 w-4 transition-opacity duration-150 ease-in-out ${
                       isActive ? 'opacity-100' : 'opacity-0' // Only visible when active
                   }`} />
               </button>
             </div>
           );
        })}
      </div>
    </div>
  );
};

export default Legend;