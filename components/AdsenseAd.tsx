"use client"; // AdSense interaction happens client-side

import React, { useEffect } from "react";

interface AdsenseAdProps {
  adSlot: string; // Pass the specific ad slot ID
  adFormat?: string;
  style?: React.CSSProperties;
  className?: string;
}

const AdsenseAd: React.FC<AdsenseAdProps> = ({
  adSlot,
  adFormat = "auto",
  style = { display: "block" }, // Default style from AdSense
  className = "",
}) => {
  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
      console.log(`AdSense pushed for slot: ${adSlot}`);
    } catch (err) {
      console.error("AdSense push error:", err);
    }
  }, [adSlot]); // Re-run if adSlot changes (though unlikely)

  // Ensure adsbygoogle.js is loaded before rendering the ad unit
  // The script in layout.tsx should handle this generally
  // but adding a safety check or using next/script here too is possible

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-8600182876678262" // Your publisher ID
        data-ad-slot={adSlot} // The specific ad unit ID
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      ></ins>
      {/* The inline script push is handled by useEffect now */}
      {/* <Script id={`adsense-push-${adSlot}`} strategy="lazyOnload">
         {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script> */}
    </div>
  );
};

export default AdsenseAd;
