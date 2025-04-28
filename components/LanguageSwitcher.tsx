// components/LanguageSwitcher.tsx
"use client";

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import {
  useLanguage,
  Language,
  TranslationKey,
} from "../context/LanguageContext"; // Import Language type

interface LanguageSwitcherProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// *** ADD nativeName property ***
const availableLanguages: {
  code: Language;
  nameKey: TranslationKey;
  nativeName: string;
}[] = [
  { code: "en", nameKey: "lang_en", nativeName: "EN" },
  { code: "it", nameKey: "lang_it", nativeName: "IT" },
  // Add more languages here if needed
];

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { t, language, setLanguage } = useLanguage();

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false); // Close menu after selection
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setIsOpen}>
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

        {/* Panel Container (Slide from Left) */}
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
            <Dialog.Panel className="relative flex w-full max-w-[280px] flex-col overflow-hidden bg-brand-light-green shadow-xl">
              {" "}
              {/* Slightly adjusted max-width */}
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-brand-dark-green/10">
                <Dialog.Title className="text-base font-semibold text-brand-dark-green">
                  {t("lang_switcher_title")}
                </Dialog.Title>
                <button
                  type="button"
                  className="-m-2 p-2 text-brand-dark-green/80 hover:text-brand-dark-green hover:bg-white/20 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="sr-only">{t("sr_close_menu")}</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {/* Language List */}
              {/* *** Optional: Add scrollbar classes *** */}
              <div className="flex-grow overflow-y-auto px-4 py-4 space-y-2 scrollbar-thin scrollbar-thumb-brand-olive/50 scrollbar-track-transparent">
                {availableLanguages.map((lang) => {
                  const isCurrent = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`w-full flex items-center justify-between p-3 rounded-md text-left transition-colors duration-150 ease-in-out ${
                        isCurrent
                          ? "bg-brand-dark-green text-brand-white cursor-default ring-1 ring-inset ring-white/20" // Added subtle ring for active
                          : "text-brand-dark-green hover:bg-white/20"
                      }`}
                      disabled={isCurrent}
                    >
                      {/* *** UPDATE: Display both translated and native names *** */}
                      <span className="text-sm font-medium">
                        {t(lang.nameKey)}
                        <span className="text-xs opacity-80">
                          {" "}
                          / {lang.nativeName}
                        </span>{" "}
                        {/* Show native name */}
                      </span>
                      {isCurrent && (
                        <CheckIcon className="h-5 w-5 text-brand-white flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
              {/* Optional Footer Area */}
              {/* <div className="border-t border-brand-dark-green/10 px-4 py-2">
                   <p className="text-xs text-center text-brand-dark-green/60">...</p>
              </div> */}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LanguageSwitcher;
