// components/SearchBar.tsx
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'; // 1. Importa useMemo
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { POI } from '../data/pois';
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

  // --- CORREZIONE: Usa useMemo per categoryLabels ---
  const categoryLabels = useMemo(() => {
    // Questa funzione interna verrà eseguita solo quando 't' cambia
    return {
      camper: t('poiCategory_camper'),
      taxi: t('poiCategory_taxi'),
      restaurant: t('poiCategory_restaurant'),
      bar: t('poiCategory_bar'),
      hotel: t('poiCategory_hotel'),
      private_accommodation: t('poiCategory_private_accommodation'),
      clothing: t('poiCategory_clothing'),
    };
  }, [t]); // 2. Aggiungi 't' come dipendenza di useMemo

  // Debounced search function
  const findResults = useCallback((value: string) => {
    // Ora usa l'oggetto 'categoryLabels' memoizzato
    if (value.length > 1) {
      const lowerCaseValue = value.toLowerCase();
      const filteredResults = pois.filter(poi =>
        (language === 'en' && poi.name_en ? poi.name_en : poi.name).toLowerCase().includes(lowerCaseValue) ||
        (language === 'en' && poi.shortDescription_en ? poi.shortDescription_en : poi.shortDescription).toLowerCase().includes(lowerCaseValue) ||
        (poi.address && poi.address.toLowerCase().includes(lowerCaseValue)) ||
        (poi.tags && poi.tags.some(tag => tag.toLowerCase().includes(lowerCaseValue))) ||
        (categoryLabels[poi.type] && categoryLabels[poi.type].toLowerCase().includes(lowerCaseValue)) // Usa categoryLabels
      );
      setResults(filteredResults.slice(0, 6));
    } else {
      setResults([]);
    }
  // 3. Mantieni categoryLabels come dipendenza qui, perché la logica di findResults dipende da esso.
  //    Rimuovi 't' da qui se era presente, perché è già gestito da useMemo.
  }, [pois, language, categoryLabels]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => findResults(value), 300);
  };

  // Cleanup timeout on unmount
  useEffect(() => () => { if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current) }, []);

  const handleSelectResult = (poi: POI) => {
    setSearchTerm(language === 'en' && poi.name_en ? poi.name_en : poi.name);
    setResults([]);
    setIsFocused(false);
    inputRef.current?.blur();
    onSearchResultSelect(poi);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setTimeout(() => setIsFocused(false), 150);

  const clearSearch = () => {
    setSearchTerm('');
    setResults([]);
    inputRef.current?.focus();
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-full max-w-md px-4">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
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
                onMouseDown={(e) => { e.preventDefault(); handleSelectResult(poi); }}
                className="text-gray-900 cursor-pointer select-none relative py-2 px-3 hover:bg-blue-50 transition-colors duration-100 ease-in-out"
              >
                <div className="flex justify-between items-center gap-2">
                  <span className="block font-medium truncate flex-grow">
                    {language === 'en' && poi.name_en ? poi.name_en : poi.name}
                  </span>
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