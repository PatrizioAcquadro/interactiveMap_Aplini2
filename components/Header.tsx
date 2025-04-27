// components/Header.tsx
"use client";

import React, { useState, Fragment } from "react"; // Import Fragment
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react"; // Import Dialog and Transition
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon, // Example Icon
  MapIcon, // Example Icon
  CalendarDaysIcon, // Example Icon
  IdentificationIcon, // Example Icon
  LinkIcon, // Utility Link Icon
  LockClosedIcon, // Privacy Icon
  InformationCircleIcon, // Credits Icon
} from "@heroicons/react/24/outline";
import { useLanguage } from "../context/LanguageContext";
import { FaInstagram } from "react-icons/fa"; // Import from react-icons

// Define navigation items with icons
const navigation = [
  { nameKey: "nav_home", href: "/home", icon: HomeIcon },
  { nameKey: "nav_map", href: "/", icon: MapIcon },
  { nameKey: "nav_programs", href: "/programs", icon: CalendarDaysIcon },
  { nameKey: "nav_contacts", href: "/contacts", icon: IdentificationIcon },
];

// Define utility links
const utilityLinks = [
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
  }, // Added Instagram
  {
    nameKey: "link_privacy",
    href: "/privacy",
    icon: LockClosedIcon,
  }, // Internal link
  {
    nameKey: "link_credits",
    href: "https://www.linkedin.com/in/patrizio-acquadro/",
    icon: InformationCircleIcon,
  },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t, language, setLanguage } = useLanguage(); // Get language and setter

  const toggleLang = () => setLanguage(language === "it" ? "en" : "it");

  const fullTitle = t("header_title"); // Assuming this key exists

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
                        {t(item.nameKey as any)}
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
                        {t(item.nameKey as any)}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Language Switcher */}
                <div className="border-t border-brand-dark-green/10 px-4 py-6">
                  <span className="text-sm font-medium text-brand-dark-green/80 mr-2">
                    {t("language_switch_label")}
                  </span>
                  <button
                    onClick={() => {
                      toggleLang(); /* Optionally close menu: setMobileMenuOpen(false) */
                    }}
                    className="text-sm font-semibold p-1 px-2 bg-white/10 rounded text-brand-dark-green hover:bg-white/20 transition-colors duration-150"
                  >
                    {language === "it" ? "Passa a EN" : "Switch to IT"}
                  </button>
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
