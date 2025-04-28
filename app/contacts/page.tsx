// app/contacts/page.tsx
"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { FaInstagram } from "react-icons/fa";

// Shared Ad Placeholder
const AdPlaceholder: React.FC<{ className?: string }> = ({ className = '' }) => {
    const { t } = useLanguage();
    // *** FIX: Add return statement ***
    return (
        <div className={`my-8 h-24 md:h-32 bg-gray-200/70 flex items-center justify-center rounded-md border border-gray-300/50 ${className}`}>
            <span className="text-gray-500 text-sm opacity-75">{t('ad_placeholder')}</span>
        </div>
    );
};

export default function ContactsPage() {
  const { t } = useLanguage();
  const instagramUrl = "https://www.instagram.com/biellainfesta/";
  const emailAddress = "biellainfesta.info@gmail.com";
  const fadeSlideUp = "animate-fade-slide-up"; // Ensure animation defined

  return (
    <main
      className={`bg-gradient-to-b from-white via-brand-light-green/5 to-white text-brand-dark-green/90 pt-20 md:pt-24 overflow-x-hidden`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className={`text-center ${fadeSlideUp} animation-delay-100`}>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-green mb-3">
            {t("contacts_title")}
          </h1>
          <p className="text-lg md:text-xl text-brand-dark-green/80 mb-12 max-w-2xl mx-auto">
            {t("contacts_intro")}
          </p>
        </div>

        <AdPlaceholder className={`${fadeSlideUp} animation-delay-200`} />

        <div
          className={`mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 ${fadeSlideUp} animation-delay-300`}
        >
          {/* Instagram Card - Enhanced Styling */}
          <div className="group relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-8 rounded-xl shadow-lg border border-gray-200/30 flex flex-col items-center text-center transform transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-1">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-t-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <FaInstagram className="h-14 w-14 text-pink-600 mb-5 transform transition-transform duration-300 group-hover:scale-110" />
            <h2 className="text-2xl font-semibold text-brand-dark-green mb-2">
              {t("contacts_insta_title")}
            </h2>
            <p className="text-sm text-gray-600 mb-6 flex-grow">
              {t("contacts_insta_desc")}
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:scale-105 transform transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              {t("visit_instagram")}
            </a>
          </div>

          {/* Email Card - Enhanced Styling */}
          <div className="group relative bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 p-8 rounded-xl shadow-lg border border-gray-200/30 flex flex-col items-center text-center transform transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-1">
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 rounded-t-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <EnvelopeIcon className="h-14 w-14 text-blue-600 mb-5 transform transition-transform duration-300 group-hover:scale-110" />
            <h2 className="text-2xl font-semibold text-brand-dark-green mb-2">
              {t("contacts_email_title")}
            </h2>
            <p className="text-sm text-gray-600 mb-6 flex-grow">
              {t("contacts_email_desc")}
            </p>
            <a
              href={`mailto:${emailAddress}`}
              className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t("send_email")}
            </a>
          </div>
        </div>

        <AdPlaceholder className={`mt-16 ${fadeSlideUp} animation-delay-400`} />
      </div>
    </main>
  );
}
