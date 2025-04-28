// app/programs/page.tsx
"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

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

export default function ProgramsPage() {
  const { t } = useLanguage();
  const fadeIn = "animate-fade-in";
  const fadeSlideUp = "animate-fade-slide-up";

  return (
    <main
      className={`bg-gradient-to-b from-white via-brand-light-green/5 to-white text-brand-dark-green/90 pt-20 md:pt-24 min-h-[calc(100vh-4rem)] flex flex-col overflow-hidden`}
    >
      {" "}
      {/* Adjust min-h based on header */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-olive/10 rounded-full filter blur-2xl animate-pulse animation-delay-300 -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-brand-red/5 rounded-full filter blur-3xl animate-pulse animation-delay-500 -z-10"></div>

        <div
          className={`p-6 bg-white/50 backdrop-blur-sm rounded-lg shadow-lg ${fadeSlideUp}`}
        >
          <CalendarDaysIcon className="h-16 w-16 md:h-20 md:w-20 text-brand-dark-green mx-auto mb-6 opacity-80" />
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-green mb-4">
            {t("programs_title")}
          </h1>
          <p className="text-xl md:text-2xl text-brand-dark-green/80 max-w-xl mx-auto">
            {t("programs_coming_soon")}
          </p>
        </div>

        <AdPlaceholder className={`mt-16 ${fadeSlideUp} animation-delay-200`} />
      </div>
    </main>
  );
}
