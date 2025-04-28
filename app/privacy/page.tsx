// app/privacy/page.tsx
"use client"; // Needed for useLanguage hook

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext"; // Go up two levels

export default function PrivacyPolicyPage() {
  const { language } = useLanguage(); // Get translation function

  // Simple title translation - you might want more keys for sections
  const pageTitle =
    language === "it" ? "Informativa sulla Privacy" : "Privacy Policy";
  const backToMapText = language === "it" ? "Torna alla Mappa" : "Back to Map";

  return (
    <main className="max-w-4xl mx-auto p-6 md:p-10 bg-white">
      <h1 className="text-3xl font-bold text-brand-dark-green mb-6">
        {pageTitle}
      </h1>

      <div className="prose prose-sm sm:prose-base max-w-none text-gray-700">
        {" "}
        {/* Basic text styling */}
        <p className="italic text-gray-500">
          Last Updated: October 26, 2023
        </p>{" "}
        {/* Replace with actual date */}
        <p>
          Welcome to the interactive map for the Adunata Nazionale degli Alpini
          - Biella 2025. This privacy policy explains how we handle information
          when you use this service.
          <strong>
            This is a placeholder policy and requires legal review.
          </strong>
        </p>
        <h2>Data Controller</h2>
        <p>
          [Insert Name/Organization Responsible for the Map/Data], located at
          [Insert Address or Contact Info]. Contact Email: [Insert Contact
          Email]
        </p>
        <h2>Types of Data Collected</h2>
        <p>
          This service primarily focuses on providing map information and points
          of interest. We may collect the following types of data:
        </p>
        <ul>
          <li>
            <strong>Usage Data:</strong> Information on how the service is
            accessed and used (e.g., pages visited, features used, device type,
            browser type, IP address for analytics and security). This is often
            collected automatically.
          </li>
          <li>
            <strong>Location Data (Optional):</strong> If you use the &quotFind
            My Location&quot feature, we request access to your device&aposs
            geographical location solely to display your position on the map.
            This data is processed in your browser and is not stored by us
            unless explicitly stated otherwise for a specific feature (which is
            not the case currently). You can deny or revoke location permission
            through your browser settings.
          </li>
          <li>
            <strong>Language Preference:</strong> If you switch languages, your
            preference might be stored locally in your browser&aposs
            localStorage to maintain your setting for future visits.
          </li>
          <li>
            <strong>Data You Provide:</strong> If contact forms or other
            interactive features are added in the future, we would collect the
            information you voluntarily submit through those forms.
          </li>
        </ul>
        <h2>Purpose of Processing</h2>
        <p>The data collected is used for the following purposes:</p>
        <ul>
          <li>To provide and maintain the map service.</li>
          <li>
            To enable interactive features like location finding and filtering.
          </li>
          <li>To improve the user experience and functionality of the map.</li>
          <li>
            To monitor usage for security and analytical purposes (e.g.,
            identifying popular areas, ensuring service stability).
          </li>
          <li>To remember user preferences like language.</li>
        </ul>
        <h2>Methods of Processing</h2>
        <p>
          Data processing is carried out using computers and/or IT enabled
          tools, following organizational procedures and modes strictly related
          to the purposes indicated. Access to the data may be available to
          internal personnel involved with the operation of this service
          (administration, development) or external parties (such as third-party
          technical service providers, hosting providers, IT companies,
          analytics services) appointed, if necessary, as Data Processors by the
          Owner.
        </p>
        <h2>User Rights</h2>
        <p>
          Depending on your jurisdiction, you may have rights regarding your
          personal data, such as the right to access, correct, delete, or
          restrict processing. To exercise these rights, please contact the Data
          Controller using the information provided above.
        </p>
        <h2>Cookies</h2>
        <p>
          This service may use cookies or similar tracking technologies.
          Essential cookies might be used for core functionality (like storing
          language preference in localStorage). Analytics cookies might be used
          to understand user interaction. A separate Cookie Policy should
          provide detailed information [Link to Cookie Policy if applicable].
          Currently, only localStorage is used for language preference.
        </p>
        <h2>Changes to this Privacy Policy</h2>
        <p>
          The Data Controller reserves the right to make changes to this privacy
          policy at any time by giving notice to its Users on this page. It is
          strongly recommended to check this page often, referring to the date
          of the last modification listed above.
        </p>
        <h2>Contact Information</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at [Insert Contact Email again].
        </p>
        <hr className="my-6" />
        <Link href="/" className="text-blue-600 hover:underline">
          ← {backToMapText}
        </Link>
      </div>
    </main>
  );
}
