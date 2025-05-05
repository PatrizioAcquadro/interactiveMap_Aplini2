"use client";

import React, { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dialog, Transition, Menu } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  MapIcon,
  CalendarDaysIcon,
  IdentificationIcon,
  LinkIcon,
  LockClosedIcon,
  InformationCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
// --- Import TranslationKey ---
import {
  useLanguage,
  Language,
  TranslationKey,
} from "../context/LanguageContext";
import { FaInstagram } from "react-icons/fa";

// --- Define Interface for Navigation Items ---
interface NavItem {
  nameKey: TranslationKey; // Use the imported type
  href: string;
  // Define a suitable type for Heroicons and React Icons
  icon:
    | React.ForwardRefExoticComponent<
        Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
          title?: string;
          titleId?: string;
        } & React.RefAttributes<SVGSVGElement>
      >
    | React.FC<React.SVGProps<SVGSVGElement>>;
}

// Define navigation items with icons, applying the interface
const navigation: NavItem[] = [
  { nameKey: "nav_home", href: "/home", icon: HomeIcon },
  { nameKey: "nav_map", href: "/", icon: MapIcon },
  { nameKey: "nav_programs", href: "/programs", icon: CalendarDaysIcon },
  { nameKey: "nav_contacts", href: "/contacts", icon: IdentificationIcon },
];

// --- Define Interface for Utility Links ---
interface UtilityLinkItem {
  nameKey: TranslationKey; // Use the imported type
  href: string;
  // Adjust icon type as above
  icon:
    | React.ForwardRefExoticComponent<
        Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
          title?: string;
          titleId?: string;
        } & React.RefAttributes<SVGSVGElement>
      >
    | React.FC<React.SVGProps<SVGSVGElement>>;
}

// Define utility links, applying the interface
const utilityLinks: UtilityLinkItem[] = [
  {
    nameKey: "link_official_adunata",
    href: "https://www.adunatalpini.it/",
    icon: LinkIcon,
  },
  {
    nameKey: "link_biella_tourism",
    href: "https://www.atl.biella.it/",
    icon: LinkIcon,
  },
  {
    nameKey: "link_instagram_bif",
    href: "https://www.instagram.com/biellainfesta/",
    icon: FaInstagram,
  },
  { nameKey: "link_privacy", href: "/privacy", icon: LockClosedIcon },
  {
    nameKey: "link_credits",
    href: "https://www.linkedin.com/in/patrizio-acquadro/",
    icon: InformationCircleIcon,
  },
];

// --- DEFINE availableLanguages HERE (Ensure this matches LanguageSwitcher.tsx if you keep both) ---
const availableLanguages: {
  code: Language;
  nameKey: TranslationKey;
  nativeName: string; // Keep native short names
}[] = [
  { code: "en", nameKey: "lang_en", nativeName: "EN" },
  { code: "it", nameKey: "lang_it", nativeName: "IT" },
  { code: "es", nameKey: "lang_es", nativeName: "ES" },
  { code: "fr", nameKey: "lang_fr", nativeName: "FR" },
  { code: "de", nameKey: "lang_de", nativeName: "DE" },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  // --- Ensure TranslationKey is imported for useLanguage hook context if needed ---
  const { t, language, setLanguage } = useLanguage();

  // Find the details of the currently selected language
  const currentLanguageDetails =
    availableLanguages.find((lang) => lang.code === language) ||
    availableLanguages[0]; // Fallback just in case

  const handleLanguageSelect = (langCode: Language) => {
    // Wrap the state update in setTimeout to break potential update cycles
    setTimeout(() => {
      setLanguage(langCode);
    }, 0); // Timeout of 0ms defers execution until the next event loop tick

    // Close the main menu immediately (or keep it open if preferred)
    //setMobileMenuOpen(false);
  };

  const fullTitle = t("header_title");

  return (
    <>
      {" "}
      {/* Use Fragment */}
      {/* --- Header Bar --- */}
      <header className="bg-brand-light-green shadow-sm sticky top-0 z-30">
        {" "}
        {/* Lower z-index than modal */}
        {/* *** ADDED Subtle Bottom Border *** */}
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8 h-16 border-b border-brand-dark-green/10"
          aria-label="Global"
        >
          {/* Logo */}
          <div className="flex flex-1 justify-start items-center">
            {/* *** ADDED Hover Effect *** */}
            <Link
              href="/"
              className="-m-1.5 p-1.5 transition-transform duration-150 ease-in-out hover:scale-105"
            >
              <span className="sr-only">{t("sr_main_title")}</span>
              <Image
                className="h-12 md:h-14 w-auto"
                src="/logo-biellainfesta.svg"
                alt={t("sr_logo_alt")}
                width={150}
                height={40}
                priority
              />
            </Link>
          </div>

          {/* Title */}
          <div className="min-w-0 px-2 md:px-4 text-center">
            {" "}
            {/* Added text-center */}
            <div>
              {" "}
              {/* Container for the two lines */}
              <h1 className="text-lg md:text-xl font-semibold text-brand-dark-green leading-tight">
                {" "}
                {/* Adjusted leading */}
                {/* Option 1: Using one translation key (simpler setup) */}
                {/* Adunata Nazionale Alpini */}{" "}
                {/* Extract this part if using separate keys */}
                {/* Check if fullTitle contains a known separator like '|' or '\n' or split based on expected words */}
                {fullTitle.split("-")[0].trim()}{" "}
                {/* Example split if title is "Adunata... - Biella..." */}
              </h1>
              <p className="text-sm md:text-lg font-medium text-brand-dark-green/80 leading-tight">
                {" "}
                {/* Adjusted leading */}
                {/* Option 1: Using one translation key */}
                {/* Biella - 2025 */} {/* Extract this part */}
                {fullTitle.includes("-")
                  ? fullTitle.split("-").slice(1).join("-").trim()
                  : "Biella - 2025"}{" "}
                {/* Example split */}
                {/* Option 2: Using separate keys */}
                {/* {subTitle} */}
              </p>
            </div>
          </div>

          {/* Burger Button */}
          <div className="flex flex-1 justify-end items-center">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-brand-dark-green hover:bg-white/30 transition-colors duration-150"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">{t("sr_open_menu")}</span>
              <Bars3Icon className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>
        </nav>
        {/* --- Italian Flag Stripe --- */}
        {/* This div sits below the nav, spanning the full width of the header */}
        <div className="flex h-0.5 w-full">
          {" "}
          {/* Container: 2px height, full width, flex row */}
          {/* Green part: Takes 1/3 width, fills height, sets bg color */}
          <div className="flex-1 h-full bg-[#009246]"></div>{" "}
          {/* White part: Takes 1/3 width, fills height, sets bg color */}
          <div className="flex-1 h-full bg-white"></div>
          {/* Red part: Takes 1/3 width, fills height, sets bg color */}
          <div className="flex-1 h-full bg-[#CE2B37]"></div>{" "}
        </div>
        {/* --- End Flag Stripe --- */}
      </header>
      {/* --- Slide-Out Menu --- */}
      {/* *** REPLACED div with Headless UI Transition and Dialog for better accessibility & animation *** */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setMobileMenuOpen}>
          {" "}
          {/* Higher z-index */}
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
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>
          {/* Panel Transition */}
          <div className="fixed inset-0 flex justify-end">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-brand-light-green pb-12 shadow-xl">
                {/* Close Button Area */}
                <div className="flex px-4 pb-2 pt-5 justify-between items-center">
                  {/* Logo inside mobile menu */}
                  <Link
                    href="/"
                    className="-m-1.5 p-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">{t("sr_main_title")}</span>
                    <Image
                      className="h-8 w-auto"
                      src="/logo-biellainfesta.svg"
                      alt={t("sr_logo_alt")}
                      width={120}
                      height={32}
                    />
                  </Link>
                  <button
                    type="button"
                    className="-m-2 rounded-md p-2 inline-flex items-center justify-center text-brand-dark-green hover:bg-white/20"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">{t("sr_close_menu")}</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Main Navigation */}
                <div className="mt-2 space-y-1 border-t border-brand-dark-green/10 px-4 py-6">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.nameKey}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`group -mx-3 flex items-center rounded-md p-2 text-base font-semibold leading-7 transition-colors duration-150 ease-in-out
                        ${
                          isActive
                            ? "bg-brand-dark-green text-brand-white"
                            : "text-brand-dark-green hover:bg-white/10"
                        }`}
                      >
                        <item.icon // Render the icon component
                          className={`h-6 w-6 mr-3 flex-shrink-0 ${
                            isActive
                              ? "text-brand-white"
                              : "text-brand-dark-green/80 group-hover:text-brand-dark-green"
                          }`}
                          aria-hidden="true"
                        />
                        {t(item.nameKey)}
                      </Link>
                    );
                  })}
                </div>

                {/* Utility Links Section */}
                <div className="border-t border-brand-dark-green/10 px-4 py-6">
                  <h3 className="text-xs font-semibold uppercase text-brand-dark-green/70 mb-3">
                    {t("utility_links_title")}
                  </h3>
                  <div className="space-y-1">
                    {utilityLinks.map((item) => (
                      <a // Use <a> for external links or Link for internal
                        key={item.nameKey}
                        href={item.href} // Use actual URLs here
                        target={
                          item.href === "/privacy" || item.href === "/credits"
                            ? "_self"
                            : "_blank"
                        } // Open external links in new tab
                        rel="noopener noreferrer"
                        onClick={() => setMobileMenuOpen(false)}
                        className="group -mx-3 flex items-center rounded-md p-2 text-sm font-medium leading-6 text-brand-dark-green hover:bg-white/10 transition-colors duration-150 ease-in-out"
                      >
                        <item.icon
                          className="h-5 w-5 mr-3 flex-shrink-0 text-brand-dark-green/70 group-hover:text-brand-dark-green"
                          aria-hidden="true"
                        />
                        {t(item.nameKey)}
                      </a>
                    ))}
                  </div>
                </div>

                {/* --- Language Dropdown Section (REVISED) --- */}
                <div className="border-t border-brand-dark-green/10 px-4 py-4">
                  {" "}
                  {/* Adjusted padding slightly */}
                  {/* Use Headless UI Menu for the dropdown */}
                  <Menu
                    as="div"
                    className="relative inline-block text-left w-full"
                  >
                    <div>
                      <Menu.Button className="inline-flex w-full justify-between items-center rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-brand-dark-green hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-colors duration-150">
                        <span>
                          {/* Display current language name and native code */}
                          {t(currentLanguageDetails.nameKey)}
                          <span className="text-xs opacity-70">
                            {" "}
                            / {currentLanguageDetails.nativeName}
                          </span>
                        </span>
                        <ChevronDownIcon
                          className="ml-2 -mr-1 h-5 w-5 text-brand-dark-green/70"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    {/* Dropdown Panel Transition */}
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute left-0 mt-2 w-full origin-top-right divide-y divide-gray-100/10 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                        {" "}
                        {/* Added z-index */}
                        <div className="px-1 py-1 ">
                          {availableLanguages.map((lang) => (
                            <Menu.Item key={lang.code}>
                              {(
                                { active } // 'active' indicates hover/focus state via keyboard/mouse
                              ) => (
                                <button
                                  onClick={() =>
                                    handleLanguageSelect(lang.code)
                                  }
                                  disabled={language === lang.code} // Disable current language
                                  className={`${
                                    active
                                      ? "bg-brand-dark-green text-white"
                                      : "text-gray-900" // Hover style
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm ${
                                    language === lang.code
                                      ? "font-semibold cursor-default opacity-70"
                                      : "" // Style for current/disabled item
                                  }`}
                                >
                                  {t(lang.nameKey)}
                                  <span className="ml-1 text-xs opacity-70">
                                    {" "}
                                    / {lang.nativeName}
                                  </span>
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>

                {/* Footer Text inside Menu */}
                <div className="border-t border-brand-dark-green/10 px-4 py-4 text-center text-xs text-brand-dark-green/60">
                  © {t("current_year")} Adunata Alpini Biella 2025. All rights
                  reserved.
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Header;
