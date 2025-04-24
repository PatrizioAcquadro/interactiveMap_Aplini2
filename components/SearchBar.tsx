import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline'; // Add XCircleIcon
import { POI, PoiType } from '../data/pois';
import { useLanguage } from '../context/LanguageContext';

interface SearchBarProps {
  pois: POI[];
  onSearchResultSelect: (poi: POI) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ pois, onSearchResultSelect }) => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<POI[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Define category labels based on language
  const categoryLabels: { [key in PoiType]: string } = {
    camper: t('poiCategory_camper'), taxi: t('poiCategory_taxi'), restaurant: t('poiCategory_restaurant'), bar: t('poiCategory_bar'),
    hotel: t('poiCategory_hotel'), private_accommodation: t('poiCategory_private_accommodation'), clothing: t('poiCategory_clothing'),
  };

  // Debounced search function
  const findResults = useCallback((value: string) => {
      if (value.length > 1) {
          const lowerCaseValue = value.toLowerCase();
          const filteredResults = pois.filter(poi =>
              (language === 'en' && poi.name_en ? poi.name_en : poi.name).toLowerCase().includes(lowerCaseValue) ||
              (language === 'en' && poi.shortDescription_en ? poi.shortDescription_en : poi.shortDescription).toLowerCase().includes(lowerCaseValue) ||
              (poi.address && poi.address.toLowerCase().includes(lowerCaseValue)) ||
              (poi.tags && poi.tags.some(tag => tag.toLowerCase().includes(lowerCaseValue))) || // Search tags too
              (categoryLabels[poi.type] && categoryLabels[poi.type].toLowerCase().includes(lowerCaseValue)) // Search category label
          );
          setResults(filteredResults.slice(0, 6)); // Limit results
      } else {
          setResults([]);
      }
  }, [pois, language, t, categoryLabels]); // Add dependencies

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => findResults(value), 300);
  };

  // Cleanup timeout on unmount
  useEffect(() => () => { if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current) }, []);

  const handleSelectResult = (poi: POI) => {
      setSearchTerm(language === 'en' && poi.name_en ? poi.name_en : poi.name); // Show selected name in input
      setResults([]);
      setIsFocused(false);
      inputRef.current?.blur();
      onSearchResultSelect(poi);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setTimeout(() => setIsFocused(false), 150); // Delay allows click

  const clearSearch = () => {
      setSearchTerm('');
      setResults([]);
      inputRef.current?.focus(); // Keep focus after clearing
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-full max-w-md px-4">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"> {/* Adjusted padding */}
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={t('searchPlaceholder')}
          // Rounded, adjusted padding for icons
          className="block w-full pl-11 pr-10 py-2 border border-gray-300 rounded-full leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-md"
        />
        {/* Clear Button */}
        {searchTerm && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                    type="button"
                    onClick={clearSearch}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                    aria-label="Clear search"
                 >
                    <XCircleIcon className="h-5 w-5" />
                </button>
            </div>
        )}

        {/* Results Dropdown */}
        {isFocused && results.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {results.map((poi) => (
              <li
                key={poi.id}
                onMouseDown={(e) => { e.preventDefault(); handleSelectResult(poi); }} // Prevent blur, select item
                className="text-gray-900 cursor-pointer select-none relative py-2 px-3 hover:bg-blue-50 transition-colors duration-100 ease-in-out"
              >
                <div className="flex justify-between items-center gap-2">
                  <span className="block font-medium truncate flex-grow">
                    {language === 'en' && poi.name_en ? poi.name_en : poi.name}
                  </span>
                  {/* Category Label */}
                  <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded flex-shrink-0">
                     {categoryLabels[poi.type] || poi.type}
                  </span>
                </div>
                {poi.address && <span className="text-xs text-gray-500 block truncate mt-0.5">{poi.address}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;