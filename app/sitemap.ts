// app/sitemap.ts

import { MetadataRoute } from "next";

/**
 * Generates the sitemap for the Adunata Map website.
 * Place this file in the root of your `/app` directory.
 * After adding or modifying this file, you MUST rebuild and redeploy your application
 * for the changes to take effect and for `/sitemap.xml` to be generated correctly.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // --- CONFIGURATION ---
  // Set your production base URL here
  const baseUrl = "https://www.adunet.it";
  // --- END CONFIGURATION ---

  // Define static pages present in your application structure
  // Add or remove routes here as your site evolves
  const staticRoutes = [
    "/", // Map page (app/page.tsx)
    "/home", // Home page (app/home/page.tsx)
    "/programs", // Programs page (app/programs/page.tsx)
    "/contacts", // Contacts page (app/contacts/page.tsx)
    "/privacy", // Privacy policy page (app/privacy/page.tsx)
  ];

  // Map static routes to the sitemap format
  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => {
    // Assign higher priority to the root/map page
    const priority = route === "/" ? 1.0 : 0.8;
    // Set a reasonable change frequency
    const changeFrequency =
      route === "/" ? ("weekly" as const) : ("monthly" as const);

    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(), // Use the current date as last modified
      changeFrequency: changeFrequency,
      priority: priority,
    };
  });

  // --- Placeholder for Dynamic Pages ---
  // If you later add dynamic pages (e.g., /events/[slug], /news/[id]),
  // you would fetch their data here and map them to sitemap entries similar to staticPages.
  // Example (needs actual data fetching logic):
  // const dynamicEvents = await fetchEventsFromCMS(); // Fetch your dynamic data
  // const eventPages = dynamicEvents.map(event => ({
  //   url: `${baseUrl}/events/${event.slug}`,
  //   lastModified: event.updatedAt, // Use actual modification date if available
  //   changeFrequency: 'weekly',
  //   priority: 0.7
  // }));
  // --- End Placeholder ---

  // Combine all sitemap entries
  return [
    ...staticPages,
    // ...eventPages, // Uncomment and adapt if you add dynamic pages
  ];
}
