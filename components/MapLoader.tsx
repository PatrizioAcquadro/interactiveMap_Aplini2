import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext'; // Import language hook

const MapLoader: React.FC = () => {
  const { t } = useLanguage(); // Get translation function

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-50 text-gray-600">
      {/* Logo with pulse animation */}
      <div className="animate-pulse">
        {/* Ensure you have this logo file */}
        <Image
          src="/logo-biellainfesta.svg" // Adjust path if needed
          alt="BiellaInFesta Logo"
          width={150}
          height={80}
          priority // Load logo quickly
        />
      </div>
      <p className="mt-4 text-lg font-medium">{t('loadingMap')}</p>
      <p className="text-sm">{t('loadingMapSub')}</p>
    </div>
  );
};

export default MapLoader;