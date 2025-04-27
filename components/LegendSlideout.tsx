// components/LegendSlideout.tsx
"use client";

import React, { useMemo, Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  CheckIcon,
  AdjustmentsHorizontalIcon, // New icon for the trigger button
  LanguageIcon, // Icon for language switcher
} from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid"; // Solid icon for reset button
import { legendItems, PoiType, POI } from "../data/pois";
import { useLanguage } from "../context/LanguageContext";

interface LegendSlideoutProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeFilters: Set<PoiType>;
  onFilterChange: (type: PoiType, isActive: boolean) => void;
  allPois: POI[];
  resetFilters: () => void; // Function to reset filters
  showResetButton: boolean; // Condition to show the button
}

const LegendSlideout: React.FC<LegendSlideoutProps> = ({
  isOpen,
  setIsOpen,
  activeFilters,
  onFilterChange,
  allPois,
  resetFilters,
  showResetButton,
}) => {
  const { t, language, setLanguage } = useLanguage();

  // Calculate POI counts (memoized)
  const poiCounts = useMemo(() => {
    const counts: { [key in PoiType]?: number } = {};
    legendItems.forEach((item) => (counts[item.type] = 0));
    allPois.forEach((poi) => {
      if (counts[poi.type] !== undefined) counts[poi.type]!++;
    });
    return counts;
  }, [allPois]);

  const toggleLang = () => setLanguage(language === "it" ? "en" : "it");

  return (
    <>
      {/* --- Trigger Button --- */}
      {/* Persistently visible button to open the legend if closed */}
      {!isOpen && ( // Only show if the panel is closed
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 left-4 z-20 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 ease-in-out hover:scale-105"
          aria-label={t("showLegend")}
          title={t("showLegend")}
        >
          <AdjustmentsHorizontalIcon className="h-6 w-6 text-brand-dark-green" />
        </button>
      )}

      {/* --- Slide-Out Panel --- */}
      <Transition.Root show={isOpen} as={Fragment}>
        {/* Using z-40 same as header menu, potentially adjust if overlap needed */}
        <Dialog
          as="div"
          className="relative z-40"
          onClose={() => setIsOpen(false)}
        >
          {/* Backdrop Transition */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* Subtle backdrop, click closes panel */}
            <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px]" />
          </Transition.Child>

          {/* Panel Container */}
          <div className="fixed inset-0 flex justify-start">
            {/* Panel Transition (Slide from Left) */}
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-hidden bg-brand-light-green shadow-xl">
                {/* --- Panel Header --- */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-brand-dark-green/10">
                  <Dialog.Title className="text-lg font-semibold text-brand-dark-green">
                    {t("legendTitle")}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="-m-2 p-2 text-brand-dark-green/80 hover:text-brand-dark-green hover:bg-white/20 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">{t("hideLegend")}</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* --- Scrollable Filter List --- */}
                <div className="flex-grow overflow-y-auto px-4 py-4 space-y-3">
                  {legendItems.map((item) => {
                    const isActive = activeFilters.has(item.type);
                    const count = poiCounts[item.type] || 0;
                    // Use translated category labels if available
                    const labelText =
                      t(`poiCategory_${item.type}` as any) || item.label;

                    return (
                      <div
                        key={item.type}
                        // Use group for hover effects within the item
                        className={`group flex items-center justify-between p-2 rounded-md transition-all duration-200 ease-in-out cursor-pointer ${
                          isActive
                            ? "bg-white/40"
                            : "opacity-60 hover:opacity-100 hover:bg-white/20"
                        }`}
                        onClick={() => onFilterChange(item.type, !isActive)} // Allow clicking whole item
                      >
                        {/* Icon, Label, Count */}
                        <div className="flex items-center space-x-3 flex-grow mr-2">
                          <Image
                            src={item.iconUrl}
                            alt="" // Decorative, label provides context
                            width={24}
                            height={24}
                            className={`flex-shrink-0 transition-transform duration-150 ease-in-out ${
                              isActive ? "scale-110" : "group-hover:scale-105"
                            }`}
                          />
                          <span className="text-sm font-medium text-brand-dark-green flex-grow">
                            {labelText}
                            <span className="ml-1 text-xs text-brand-dark-green/70">
                              ({count})
                            </span>
                          </span>
                        </div>

                        {/* Custom Checkbox Toggle */}
                        <div
                          className={`flex-shrink-0 h-6 w-6 rounded-md border border-brand-dark-green/30 flex items-center justify-center transition-all duration-150 ease-in-out ${
                            isActive
                              ? "bg-brand-dark-green border-brand-dark-green"
                              : "bg-white/30 group-hover:border-brand-dark-green/50"
                          }`}
                        >
                          <CheckIcon
                            className={`h-4 w-4 text-brand-light-green transition-opacity duration-150 ease-in-out ${
                              isActive ? "opacity-100" : "opacity-0"
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* --- Panel Footer (Fixed) --- */}
                <div className="border-t border-brand-dark-green/10 px-4 py-3 space-y-3 bg-brand-light-green/80 backdrop-blur-sm">
                  {/* Reset Button */}
                  <Transition
                    show={showResetButton}
                    as={Fragment}
                    enter="transition-opacity duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <button
                      onClick={() => {
                        resetFilters(); /* Maybe close panel? setIsOpen(false); */
                      }}
                      className="w-full flex items-center justify-center px-3 py-2 bg-brand-red/10 text-brand-red text-sm font-semibold rounded-md shadow-sm hover:bg-brand-red/20 transition-colors duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={t("clearFilters")}
                      disabled={!showResetButton} // Disable if not shown (redundant but safe)
                    >
                      <TrashIcon className="h-4 w-4 mr-1.5" />
                      {t("clearFilters")}
                    </button>
                  </Transition>

                  {/* Language Switcher */}
                  <div className="flex justify-center items-center">
                    <LanguageIcon className="h-5 w-5 mr-1.5 text-brand-dark-green/70" />
                    <span className="text-sm font-medium text-brand-dark-green/80 mr-2">
                      {t("language_switch_label")}
                    </span>
                    <button
                      onClick={toggleLang}
                      className="text-sm font-semibold p-1 px-2 bg-white/20 rounded text-brand-dark-green hover:bg-white/30 transition-colors duration-150"
                    >
                      {language === "it" ? "EN" : "IT"}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default LegendSlideout;
