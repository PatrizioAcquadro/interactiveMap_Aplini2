// components/LegendSlideout.tsx
"use client";

import React, { useMemo, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  CheckIcon,
  CheckCircleIcon as CheckCircleSolid, // For Select All
  XCircleIcon as XCircleSolid, // For Deselect All
} from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { legendItems, PoiType, POI } from "../data/pois";
import { useLanguage, TranslationKey } from "../context/LanguageContext"; // Adjust path if needed

// Define props required by the component, including new ones
interface LegendSlideoutProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeFilters: Set<PoiType>;
  onFilterChange: (type: PoiType, isActive: boolean) => void;
  allPois: POI[];
  resetFilters: () => void;
  showResetButton: boolean;
  onSelectAll: () => void; // New prop
  onDeselectAll: () => void; // New prop
  setHoveredLegendType: (type: PoiType | null) => void; // New prop
}

const LegendSlideout: React.FC<LegendSlideoutProps> = ({
  isOpen,
  setIsOpen,
  activeFilters,
  onFilterChange,
  allPois,
  resetFilters,
  showResetButton,
  onSelectAll, // Destructure new prop
  onDeselectAll, // Destructure new prop
  setHoveredLegendType, // Destructure new prop
}) => {
  const { t } = useLanguage();

  // Calculate POI counts
  const poiCounts = useMemo(() => {
    const counts: { [key in PoiType]?: number } = {};
    legendItems.forEach((item) => {
      // Don't initialize count for ZTL if it's not a POI type in poiData
      if (item.type !== "ztl") counts[item.type] = 0;
    });
    allPois.forEach((poi) => {
      if (counts[poi.type] !== undefined) counts[poi.type]!++;
    });
    return counts;
  }, [allPois]);

  return (
    <>
      {/* Trigger Button is now rendered conditionally in MapComponent */}

      {/* --- Slide-Out Panel --- */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px]" />
          </Transition.Child>

          {/* Panel Container */}
          <div className="fixed inset-0 flex justify-start">
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
                {/* Panel Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-brand-dark-green/10">
                  <Dialog.Title className="text-lg font-semibold text-brand-dark-green">
                    {t("legendTitle")}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="-m-2 p-2 text-brand-dark-green/80 hover:text-brand-dark-green hover:bg-white/20 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                    aria-label={t("hideLegend")}
                    title={t("hideLegend")}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Guidance Text */}
                <div className="px-4 pt-3 pb-2">
                  <p className="text-sm text-brand-dark-green/80">
                    {t("legend_guidance_text")}
                  </p>
                </div>

                {/* Select/Deselect All Buttons */}
                <div className="px-4 pb-2 flex items-center justify-between border-b border-brand-dark-green/5 pb-2 mb-2">
                  <button
                    onClick={onSelectAll}
                    className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    disabled={activeFilters.size === legendItems.length}
                  >
                    <CheckCircleSolid className="h-4 w-4 mr-1" />{" "}
                    {t("selectAll")}
                  </button>
                  <button
                    onClick={onDeselectAll}
                    className="flex items-center text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    disabled={activeFilters.size === 0}
                  >
                    <XCircleSolid className="h-4 w-4 mr-1" /> {t("deselectAll")}
                  </button>
                </div>

                {/* Scrollable Filter List */}
                {/* Optional: Add scrollbar styling plugin class */}
                <div className="flex-grow overflow-y-auto px-4 pb-2 space-y-2 scrollbar-thin scrollbar-thumb-brand-olive/50 scrollbar-track-transparent">
                  {legendItems.map((item) => {
                    const isActive = activeFilters.has(item.type);
                    const count = poiCounts[item.type] || 0;
                    const translationKey =
                      `poiCategory_${item.type}` as TranslationKey;
                    const labelText = t(translationKey);
                    const IconComponent = item.icon;
                    // *** Special Rendering for ZTL Item ***
                    if (item.type === "ztl") {
                      return (
                        <div
                          key={item.type}
                          className={`group block p-2 rounded-lg transition-all duration-200 ease-in-out ${
                            isActive
                              ? "bg-white/50 shadow-sm ring-1 ring-inset ring-brand-dark-green/10"
                              : "opacity-70 hover:opacity-100 hover:bg-white/20"
                          }`}
                          // No hover effect needed for ZTL details
                          // onMouseEnter={() => setHoveredLegendType(item.type)}
                          // onMouseLeave={() => setHoveredLegendType(null)}
                        >
                          <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => onFilterChange(item.type, !isActive)} // Toggle on click
                          >
                            {/* Icon, Label */}
                            <div className="flex items-center space-x-2.5 flex-grow mr-2">
                              {/* Simple Colored Rectangle for ZTL Icon */}
                              <div
                                className={`flex-shrink-0 h-7 w-7 rounded-md shadow-sm border border-black/10`}
                                style={{
                                  backgroundColor: item.color,
                                  opacity: isActive ? 1 : 0.6,
                                }} // Use color, dim if inactive
                              ></div>
                              <span className="text-sm font-medium text-brand-dark-green flex-grow">
                                {labelText}
                              </span>
                            </div>
                            {/* Checkbox */}
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
                          {/* Details shown below if active */}
                          {isActive && (
                            <div className="mt-2 pl-[38px] text-xs space-y-1">
                              {" "}
                              {/* Indent details */}
                              <p className="text-brand-dark-green/90">
                                {t("ztl_description")}
                              </p>
                              <p className="text-brand-dark-green/70">
                                {t("ztl_times")}
                              </p>
                              <p className="font-semibold text-brand-red/80">
                                {t("ztl_note")}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    }
                    return (
                      <div
                        key={item.type}
                        className={`group flex items-center justify-between p-2 rounded-lg transition-all duration-200 ease-in-out cursor-pointer ${
                          isActive
                            ? "bg-white/50 shadow-sm ring-1 ring-inset ring-brand-dark-green/10"
                            : "opacity-70 hover:opacity-100 hover:bg-white/20"
                        }`}
                        onClick={() => onFilterChange(item.type, !isActive)}
                        onMouseEnter={() => setHoveredLegendType(item.type)} // Set hover state
                        onMouseLeave={() => setHoveredLegendType(null)} // Clear hover state
                      >
                        {/* Icon, Label, Count Group */}
                        <div className="flex items-center space-x-2.5 flex-grow mr-2">
                          <div
                            className={`relative flex-shrink-0 h-7 w-7 rounded-lg flex items-center justify-center shadow-sm transition-transform duration-150 ease-in-out ${
                              isActive ? "scale-105" : "group-hover:scale-100"
                            }`}
                            style={{ backgroundColor: item.color }}
                          >
                            <IconComponent
                              className="h-4 w-4 text-white"
                              aria-hidden="true"
                            />
                            {isActive && (
                              <span className="absolute -inset-0.5 rounded-lg ring-1 ring-white/60"></span>
                            )}
                          </div>
                          <span className="text-sm font-medium text-brand-dark-green flex-grow">
                            {labelText && labelText !== translationKey
                              ? labelText
                              : item.label}
                            <span className="ml-1 text-xs font-normal text-brand-dark-green/60">
                              ({count})
                            </span>
                          </span>
                        </div>
                        {/* Custom Checkbox Visual */}
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

                {/* Panel Footer (Fixed) */}
                <div className="border-t border-brand-dark-green/10 px-4 py-3 bg-brand-light-green/80 backdrop-blur-sm min-h-[62px] flex items-center justify-center">
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
                      onClick={resetFilters}
                      className="w-full flex items-center justify-center px-4 py-2.5 bg-red-100/80 border border-red-200/50 text-brand-red text-sm font-semibold rounded-lg shadow-sm hover:bg-red-200/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 focus:ring-offset-brand-light-green transition-all duration-150 ease-in-out"
                    >
                      <TrashIcon className="h-4 w-4 mr-2" aria-hidden="true" />{" "}
                      {t("clearFilters")}
                    </button>
                  </Transition>
                  {!showResetButton && <div className="h-[46px]" />}
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
