// components/Header.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "../context/LanguageContext";

const navigation = [
  { nameKey: "nav_home", href: "/home" },
  { nameKey: "nav_map", href: "/" },
  { nameKey: "nav_programs", href: "/programs" },
  { nameKey: "nav_contacts", href: "/contacts" },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <header className="bg-brand-light-green shadow-sm sticky top-0 z-[1100]">
      {/* *** Adjusted nav layout for title visibility on all screens *** */}
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8 h-16"
        aria-label="Global"
      >
        {/* Logo Container */}
        {/* Use flex-shrink-0 to prevent logo from shrinking too much */}
        <div className="flex flex-shrink-0">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{t("sr_main_title")}</span>
            <Image
              className="h-8 md:h-10 w-auto" // Logo height
              src="/logo-biellainfesta.svg"
              alt={t("sr_logo_alt")}
              width={150} // Keep aspect ratio hint
              height={40}
              priority
            />
          </Link>
        </div>

        {/* Centered Title Container */}
        {/* *** REMOVED 'hidden lg:flex', added flex-grow for centering *** */}
        <div className="flex flex-grow justify-center items-center min-w-0 px-2 md:px-4">
          {" "}
          {/* min-w-0 prevents overflow issues */}
          <h1 className="text-base md:text-lg font-semibold text-brand-dark-green truncate">
            {" "}
            {/* Adjusted font size, kept truncate */}
            {t("header_title")}
          </h1>
        </div>

        {/* Mobile Menu Button Container */}
        {/* Use flex-shrink-0 to prevent button container from shrinking */}
        <div className="flex flex-shrink-0 justify-end">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-brand-dark-green hover:bg-white/30"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">{t("sr_open_menu")}</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dialog (Drawer) - No changes needed here */}
      <div
        className={`lg:hidden ${mobileMenuOpen ? "block" : "hidden"}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Background backdrop */}
        <div
          className="fixed inset-0 z-[1100] bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Mobile menu panel */}
        <div className="fixed inset-y-0 right-0 z-[1200] w-full overflow-y-auto bg-brand-light-green px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          {/* Header inside mobile menu */}
          <div className="flex items-center justify-between">
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
              className="-m-2.5 rounded-md p-2.5 text-brand-dark-green hover:bg-white/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">{t("sr_close_menu")}</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation links inside mobile menu */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.nameKey}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-colors duration-150 ease-in-out
                      ${
                        isActive
                          ? "bg-brand-dark-green text-brand-white"
                          : "text-brand-dark-green hover:bg-white/10"
                      }`}
                    >
                      {t(item.nameKey as any)}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
