// app/home/page.tsx
"use client";

import React from "react";
import Image from "next/image"; // For potential images
import { useLanguage } from "../../context/LanguageContext";
import { SparklesIcon } from "@heroicons/react/24/outline"; // Example icon

// Simple placeholder component for Ads
const AdPlaceholder: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const { t } = useLanguage();
  return (
    <div
      className={`h-24 md:h-32 bg-gray-200/50 flex items-center justify-center rounded-lg border border-gray-300/30 ${className}`}
    >
      <span className="text-gray-500 text-sm opacity-75">
        {t("ad_placeholder")}
      </span>
    </div>
  );
};

export default function HomePage() {
  const { t } = useLanguage();

  // Animation utility classes (can be defined globally or here)
  const fadeIn = "animate-fade-in"; // Assumes fade-in animation in config/globals
  const fadeSlideUp = "animate-fade-slide-up"; // Assumes fade-slide-up animation

  return (
    // Use subtle background gradient
    <main
      className={`bg-gradient-to-b from-white via-brand-light-green/10 to-white text-brand-dark-green/90 pt-20 md:pt-24 overflow-x-hidden`}
    >
      {/* Hero Section */}
      <div className="relative text-center py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Conceptual background graphic - e.g., blurred mountains or abstract shapes */}
        <div className="absolute inset-0 opacity-10 bg-[url('/images/background_pattern.svg')] bg-repeat"></div>
        <div className="relative">
          <h1
            className={`text-4xl md:text-6xl font-bold text-brand-dark-green mb-3 ${fadeIn} animation-delay-100`}
          >
            {t("home_title")}
          </h1>
          <p
            className={`text-lg md:text-xl text-brand-dark-green/80 max-w-3xl mx-auto ${fadeIn} animation-delay-300`}
          >
            {t("home_intro")}
          </p>
        </div>
      </div>

      {/* Alternating Feature Sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16 md:space-y-24">
        {/* Section 1: The Origin */}
        <div
          className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${fadeSlideUp} animation-delay-200`}
        >
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <h2 className="text-3xl font-semibold text-brand-dark-green mb-4 flex items-center">
              <SparklesIcon className="h-6 w-6 mr-2 text-brand-olive" /> L'Idea
            </h2>
            <p>{t("home_p1")}</p>
            <p>{t("home_p2")}</p>
          </div>
          <div className="relative h-64 md:h-80 rounded-lg shadow-lg overflow-hidden bg-gray-200">
            {/* Replace with relevant image: e.g., stylized Biella photo, early Instagram screenshot concept */}
            <Image
              src="/images/placeholder_idea.jpg"
              layout="fill"
              objectFit="cover"
              alt="Biella Event Idea"
              className="opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>
        </div>

        {/* Ad Placeholder 1 */}
        <AdPlaceholder className={`${fadeSlideUp} animation-delay-300`} />

        {/* Section 2: Growth & Adunata Mission */}
        <div
          className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${fadeSlideUp} animation-delay-400`}
        >
          <div className="relative h-64 md:h-80 rounded-lg shadow-lg overflow-hidden bg-gray-200 md:order-last">
            {/* Replace with relevant image: e.g., Alpini symbol, map graphic concept */}
            <Image
              src="/images/placeholder_adunata.jpg"
              layout="fill"
              objectFit="cover"
              alt="Adunata Map Concept"
              className="opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed md:order-first">
            <h2 className="text-3xl font-semibold text-brand-dark-green mb-4">
              La Missione per l'Adunata
            </h2>
            <p>{t("home_p3")}</p>
            <blockquote className="border-l-4 border-brand-olive pl-4 italic text-gray-600 my-6 py-2">
              {t("home_p4")}
            </blockquote>
            <p>{t("home_p5")}</p>
          </div>
        </div>

        {/* Ad Placeholder 2 */}
        <AdPlaceholder className={`${fadeSlideUp} animation-delay-500`} />
      </div>
    </main>
  );
}

// Helper CSS for animation delays (if not using Tailwind plugin)
// Add this to globals.css or use a utility library
/*
.animation-delay-100 { animation-delay: 0.1s; }
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-300 { animation-delay: 0.3s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-500 { animation-delay: 0.5s; }
*/
