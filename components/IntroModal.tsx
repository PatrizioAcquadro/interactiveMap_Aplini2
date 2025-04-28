// components/IntroModal.tsx
"use client";

import React, { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  ChevronRightIcon,
  CheckIcon,
  MapPinIcon,
  InformationCircleIcon,
  CurrencyDollarIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  AdjustmentsHorizontalIcon,
  GlobeAltIcon,
  CursorArrowRaysIcon, // For Navigate
  ClipboardDocumentListIcon, // For Point Details
  WrenchScrewdriverIcon, // For Optional Tools
} from "@heroicons/react/24/outline";
// Import POI icons needed for examples
import { FaGlassMartiniAlt, FaCaravan, FaStar } from "react-icons/fa"; // Example POI icons
import { useLanguage } from "../context/LanguageContext"; // Adjust path if needed
// Import POI styles to get colors/icons for examples
import { poiTypeStyles, PoiType } from "../data/pois"; // Adjust path if needed

interface IntroModalProps {
  isOpen: boolean;
  onClose: () => void; // Function to close the modal (passed from parent)
}

// Helper for simple staggered delays
const getDelayClass = (index: number): string => {
  const delays = ["delay-100", "delay-200", "delay-300"]; // Tailwind delays
  return delays[index % delays.length] || "delay-300";
};

const IntroModal: React.FC<IntroModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [screen, setScreen] = useState<1 | 2 | 3>(1);
  // State to trigger content animations *after* modal transition finishes
  const [contentVisible, setContentVisible] = useState(false);

  // Effect to manage content visibility and reset screen state
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setScreen(1); // Reset to screen 1 when modal opens
      timer = setTimeout(() => {
        setContentVisible(true);
      }, 150); // Trigger after modal starts entering
    } else {
      setContentVisible(false); // Reset visibility when modal closes
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Function to handle screen transitions with fade out/in
  const goToScreen = (targetScreen: 1 | 2 | 3) => {
    if (screen === targetScreen) return;
    setContentVisible(false); // Start fade out
    setTimeout(() => {
      setScreen(targetScreen);
      setContentVisible(true); // Start fade in
    }, 150); // Match leave duration
  };

  // --- Reusable Screen Content Components ---

  const Screen1Content = () => (
    <div
      className={`flex flex-col items-center justify-between h-full space-y-4 py-4 transition-opacity duration-300 ease-out ${
        contentVisible && screen === 1 ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Top Section */}
      <div className="flex flex-col items-center space-y-1">
        <div
          className={`relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden shadow-lg border-4 border-white bg-gray-300 transition-all duration-300 ease-out ${
            contentVisible && screen === 1
              ? "scale-100 opacity-100"
              : "scale-90 opacity-0"
          }`}
        >
          <Image
            src="/images/alpini_hero.png"
            alt={t("loader_title")}
            layout="fill"
            objectFit="cover"
            priority
            className="object-center"
          />
        </div>
        <h1
          className={`text-2xl md:text-3xl font-bold leading-tight text-brand-dark-green text-center transition-opacity duration-300 delay-100 ${
            contentVisible && screen === 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          {t("loader_title")}
        </h1>
        <p
          className={`text-base font-medium text-brand-dark-green/80 transition-opacity duration-300 delay-150 ${
            contentVisible && screen === 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          {t("loader_subtitle")}
        </p>
      </div>
      {/* Middle Section */}
      <div
        className={`flex-grow flex items-center transition-opacity duration-300 delay-200 ${
          contentVisible && screen === 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => goToScreen(2)}
          className="group inline-flex items-center justify-center px-6 py-2.5 bg-white text-brand-dark-green text-sm font-medium rounded-lg shadow-md hover:bg-gray-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark-green focus:ring-offset-brand-light-green transition-all duration-150 ease-in-out"
        >
          {t("intro_next_button")}
          <ChevronRightIcon className="h-5 w-5 ml-1.5 transition-transform duration-150 group-hover:translate-x-0.5" />
        </button>
      </div>
      {/* Bottom Section */}
      <div
        className={`flex flex-col items-center space-y-1 mt-auto pt-4 transition-opacity duration-300 delay-300 ${
          contentVisible && screen === 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-xs font-medium">{t("loader_created_by")}</span>
        <Image
          src="/logo-biellainfesta.svg"
          alt="BiellaInFesta Logo"
          width={80}
          height={24}
          className="h-auto"
        />
      </div>
    </div>
  );

  const Screen2Content = () => (
    <div
      className={`flex flex-col items-center justify-center space-y-6 md:space-y-8 text-center px-4 transition-opacity duration-300 ease-out ${
        contentVisible && screen === 2 ? "opacity-100" : "opacity-0"
      }`}
    >
      <h2
        className={`text-2xl md:text-3xl font-semibold mb-4 transition-all duration-300 ease-out ${
          contentVisible && screen === 2
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"
        }`}
      >
        {t("loader_screen2_title")}
      </h2>
      <div className="space-y-5 text-left max-w-md mx-auto w-full">
        {[
          // Define features data
          {
            icon: MapPinIcon,
            titleKey: "loader_screen2_point1_title",
            descKey: "loader_screen2_point1_desc",
          },
          {
            icon: InformationCircleIcon,
            titleKey: "loader_screen2_point2_title",
            descKey: "loader_screen2_point2_desc",
          },
          {
            icon: null,
            titleKey: "loader_screen2_point3_title",
            descKey: "loader_screen2_point3_desc",
          },
        ].map((feature, index) => (
          <div
            key={feature.titleKey}
            className={`flex items-start space-x-3 transition-all duration-300 ease-out ${
              contentVisible && screen === 2
                ? `opacity-100 translate-y-0 ${getDelayClass(index)}`
                : "opacity-0 translate-y-3"
            }`}
          >
            {/* Icon logic */}
            {feature.icon ? (
              <feature.icon className="h-8 w-8 text-brand-dark-green flex-shrink-0 mt-1" />
            ) : (
              <div className="flex flex-col space-y-1 items-center flex-shrink-0 mt-1">
                {/* No Cost Icon */}
                <div className="relative">
                  <CurrencyDollarIcon className="h-7 w-7 text-brand-dark-green" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg
                      className="h-8 w-8 text-red-500/80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                </div>
                {/* No Download Icon */}
                <div className="relative">
                  <ArrowDownTrayIcon className="h-7 w-7 text-brand-dark-green" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg
                      className="h-8 w-8 text-red-500/80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            )}
            {/* Text content */}
            <div className={feature.icon === null ? "ml-1" : ""}>
              <h3 className="font-semibold text-base md:text-lg">
                {t(feature.titleKey as any)}
              </h3>
              <p className="text-sm text-brand-dark-green/80">
                {t(feature.descKey as any)}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Next Button (goes to screen 3) */}
      <button
        onClick={() => goToScreen(3)}
        className={`group mt-8 inline-flex items-center justify-center px-6 py-2.5 bg-white text-brand-dark-green text-sm font-medium rounded-lg shadow-md hover:bg-gray-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark-green focus:ring-offset-brand-light-green transition-all duration-300 ease-out ${
          contentVisible && screen === 2
            ? `opacity-100 scale-100 ${getDelayClass(3)}`
            : "opacity-0 scale-95"
        }`}
      >
        {t("intro_next_button")}
        <ChevronRightIcon className="h-5 w-5 ml-1.5 transition-transform duration-150 group-hover:translate-x-0.5" />
      </button>
    </div>
  );

  const Screen3Content = () => (
    <div
      className={`flex flex-col items-center justify-center space-y-6 md:space-y-8 text-center px-4 transition-opacity duration-300 ease-out ${
        contentVisible && screen === 3 ? "opacity-100" : "opacity-0"
      }`}
    >
      <h2
        className={`text-2xl md:text-3xl font-semibold mb-4 transition-all duration-300 ease-out ${
          contentVisible && screen === 3
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"
        }`}
      >
        {t("loader_screen3_title")}
      </h2>
      {/* Instructions Container */}
      <div className="flex flex-col space-y-6 text-left max-w-md mx-auto w-full">
        {/* Instruction 1: Navigate (Icon beside text - No change needed) */}
        <div
          className={`flex items-start space-x-3 transition-all duration-300 ease-out ${
            contentVisible && screen === 3
              ? `opacity-100 translate-y-0 ${getDelayClass(0)}`
              : "opacity-0 translate-y-4"
          }`}
        >
          <CursorArrowRaysIcon className="h-8 w-8 text-brand-dark-green flex-shrink-0 mt-1" />
          <div className="ml-1 flex-grow">
            <h3 className="font-semibold text-base md:text-lg">
              {t("loader_screen3_point1_title")}
            </h3>
            <p className="text-sm text-brand-dark-green/80">
              {t("loader_screen3_point1_desc")}
            </p>
          </div>
        </div>

        {/* Instruction 2: View Details (Icons centered below text) */}
        <div
          className={`flex flex-col items-center space-y-3 transition-all duration-300 ease-out ${
            contentVisible && screen === 3
              ? `opacity-100 translate-y-0 ${getDelayClass(1)}`
              : "opacity-0 translate-y-4"
          }`}
        >
          {/* Text Part (Icon beside text) */}
          <div className="flex items-start space-x-3 w-full">
            {/* *** CHANGE: Use ClipboardDocumentListIcon *** */}
            <ClipboardDocumentListIcon className="h-8 w-8 text-brand-dark-green flex-shrink-0 mt-1" />
            <div className="ml-1 flex-grow">
              <h3 className="font-semibold text-base md:text-lg">
                {t("loader_screen3_point2_title")}
              </h3>
              <p className="text-sm text-brand-dark-green/80">
                {t("loader_screen3_point2_desc")}
              </p>
            </div>
          </div>
          {/* Example POI Icons Part (Centered below text) */}
          {/* *** FIX: Remove pl-6, ensure full width for centering *** */}
          <div className="w-full flex justify-center items-center space-x-3 pt-1">
            {(["bar", "camper", "activity"] as PoiType[]).map((type) => {
              const style = poiTypeStyles[type] || poiTypeStyles.default;
              const IconComp = style.icon;
              return (
                <div
                  key={type}
                  className="h-8 w-8 rounded-full flex items-center justify-center shadow-md border border-white/50"
                  style={{ backgroundColor: style.color }}
                >
                  <IconComp className="h-4 w-4 text-white" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Instruction 3: Optional Tools (Icons centered below text) */}
        <div
          className={`flex flex-col items-center space-y-3 transition-all duration-300 ease-out ${
            contentVisible && screen === 3
              ? `opacity-100 translate-y-0 ${getDelayClass(2)}`
              : "opacity-0 translate-y-4"
          }`}
        >
          {/* Text Part (Icon beside text) */}
          <div className="flex items-start space-x-3 w-full">
            <WrenchScrewdriverIcon className="h-7 w-7 text-brand-dark-green flex-shrink-0 mt-1" />
            <div className="ml-1 flex-grow">
              <h3 className="font-semibold text-base md:text-lg">
                {t("loader_screen3_point3_title")}
              </h3>
              <p className="text-sm text-brand-dark-green/80">
                {t("loader_screen3_point3_desc")}
              </p>
            </div>
          </div>
          {/* Tool Icons Part (Centered below text) */}
          {/* *** FIX: Remove pl-6, ensure full width for centering *** */}
          <div className="w-full flex justify-center items-center space-x-3 pt-1">
            {[MapPinIcon, GlobeAltIcon, AdjustmentsHorizontalIcon].map(
              (Icon, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full flex items-center justify-center bg-white shadow-md border border-gray-200"
                >
                  <Icon className="h-5 w-5 text-brand-dark-green" />
                </div>
              )
            )}
          </div>
        </div>
      </div>
      {/* Close Button */}
      <button
        onClick={onClose}
        className={`mt-8 inline-flex items-center justify-center px-6 py-2.5 bg-brand-dark-green text-white text-sm font-medium rounded-lg shadow-md ...`}
      >
        <CheckIcon className="h-5 w-5 mr-2" /> {t("intro_close_button")}
      </button>
    </div>
  );

  // --- Main Modal Structure ---
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[1150]" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            {/* Panel Enter/Leave */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-b from-brand-light-green to-[#e8eae3] p-6 md:p-8 text-left align-middle shadow-xl transition-all relative">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 z-10 p-1.5 text-brand-dark-green/60 hover:text-brand-dark-green hover:bg-black/10 rounded-full transition-colors"
                  aria-label={t("sr_close_menu")}
                >
                  {" "}
                  <XMarkIcon className="h-5 w-5" />{" "}
                </button>

                {/* Screen Container */}
                {/* Increased min-height */}
                <div className="relative min-h-[550px] flex items-center justify-center">
                  {/* Render Screen Content Conditionally */}
                  {screen === 1 && <Screen1Content />}
                  {screen === 2 && <Screen2Content />}
                  {screen === 3 && <Screen3Content />}
                </div>

                {/* Dot indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {[1, 2, 3].map((s) => (
                    <button
                      key={s}
                      onClick={() => goToScreen(s as 1 | 2 | 3)}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        screen === s
                          ? "bg-brand-dark-green"
                          : "bg-brand-dark-green/30 hover:bg-brand-dark-green/50"
                      }`}
                      aria-label={`Go to screen ${s}`}
                    ></button>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default IntroModal;
