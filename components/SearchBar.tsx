// components/SearchBar.tsx
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { POI, PoiType } from "../data/pois"; // Ensure PoiType is imported if used implicitly by categoryLabels key type
import { useLanguage } from "../context/LanguageContext";

interface SearchBarProps {
  pois: POI[];
  onSearchResultSelect: (poi: POI) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  pois,
  onSearchResultSelect,
}) => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<POI[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize category labels based on the current language via 't'
  const categoryLabels = useMemo(() => {
    // Define the structure explicitly if needed, otherwise inferred keys are fine
    const labels: Partial<Record<PoiType, string>> = {
      // Use Partial as not all PoiTypes might have explicit labels here
      camper: t("poiCategory_camper"),
      taxi: t("poiCategory_taxi"),
      restaurant: t("poiCategory_restaurant"),
      bar: t("poiCategory_bar"),
      hotel: t("poiCategory_hotel"),
      private_accommodation: t("poiCategory_private_accommodation"),
      clothing: t("poiCategory_clothing"),
    };
    return labels;
  }, [t]); // Dependency: re-calculate if translation function 't' changes (language changes)

  // Debounced search function
  const findResults = useCallback(
    (value: string) => {
      if (value.length > 1) {
        const lowerCaseValue = value.toLowerCase().trim();
        if (!lowerCaseValue) {
          // Prevent search on only whitespace
          setResults([]);
          return;
        }

        const filteredResults = pois.filter((poi) => {
          const name = (
            language === "en" && poi.name_en ? poi.name_en : poi.name
          )?.toLowerCase();
          const description = (
            language === "en" && poi.shortDescription_en
              ? poi.shortDescription_en
              : poi.shortDescription
          )?.toLowerCase();
          const address = poi.address?.toLowerCase();
          const tags = poi.tags?.map((tag) => tag.toLowerCase());
          const category = categoryLabels[poi.type]?.toLowerCase(); // Get translated category label

          return (
            name?.includes(lowerCaseValue) ||
            description?.includes(lowerCaseValue) ||
            address?.includes(lowerCaseValue) ||
            (tags && tags.some((tag) => tag.includes(lowerCaseValue))) ||
            (category && category.includes(lowerCaseValue))
          );
        });
        setResults(filteredResults.slice(0, 6)); // Limit results
      } else {
        setResults([]);
      }
    },
    [pois, language, categoryLabels]
  ); // Dependencies: re-create if pois, language, or labels change

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    // Clear previous timeout
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    // Set new timeout
    debounceTimeoutRef.current = setTimeout(() => findResults(value), 300);
  };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    };
  }, []);

  // Handle selecting a result from the dropdown
  const handleSelectResult = (poi: POI) => {
    setSearchTerm(language === "en" && poi.name_en ? poi.name_en : poi.name); // Update input field
    setResults([]); // Hide results dropdown
    setIsFocused(false); // Lose focus state
    inputRef.current?.blur(); // Explicitly blur input
    onSearchResultSelect(poi); // Trigger callback passed from parent (MapComponent)
  };

  // Handle input focus/blur for showing/hiding results
  const handleFocus = () => setIsFocused(true);
  // Delay blur handling to allow click on results list
  const handleBlur = () => setTimeout(() => setIsFocused(false), 150);

  // Clear search input and results
  const clearSearch = () => {
    setSearchTerm("");
    setResults([]);
    inputRef.current?.focus(); // Re-focus after clearing
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current); // Clear pending search
  };

  return (
    // *** CHANGE: Changed 'fixed' to 'absolute' ***
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-full max-w-md px-4">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={t("searchPlaceholder")}
          className="block w-full pl-11 pr-10 py-2 border border-gray-300 rounded-full leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-md transition-shadow duration-150 ease-in-out"
        />

        {/* Clear Button (visible when searchTerm is not empty) */}
        {searchTerm && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={clearSearch}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-700 transition-colors duration-150"
              aria-label={t("clearFilters")} // Assuming 'clearFilters' is suitable, or add a new translation key like "clearSearch"
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Results Dropdown (visible when focused and results exist) */}
        {isFocused && results.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {results.map((poi) => (
              <li
                key={poi.id}
                // Use onMouseDown to trigger before onBlur hides the list
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectResult(poi);
                }}
                className="text-gray-900 cursor-pointer select-none relative py-2 px-3 hover:bg-blue-50 transition-colors duration-100 ease-in-out"
              >
                <div className="flex justify-between items-center gap-2">
                  <span className="block font-medium truncate flex-grow">
                    {language === "en" && poi.name_en ? poi.name_en : poi.name}
                  </span>
                  {/* Display translated category label */}
                  <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded flex-shrink-0">
                    {categoryLabels[poi.type] || poi.type}{" "}
                    {/* Fallback to raw type if label missing */}
                  </span>
                </div>
                {/* Optionally show address */}
                {poi.address && (
                  <span className="text-xs text-gray-500 block truncate mt-0.5">
                    {poi.address}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;