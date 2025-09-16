import { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@payload-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.aim.ind.in";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/membership`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/membership/eligibility`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/membership/type`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/membership/apply`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/states`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  try {
    // Fetch published events
    const payload = await getPayload({ config });

    const eventsResult = await payload.find({
      collection: "events",
      where: {
        status: {
          equals: "published",
        },
      },
      limit: 1000, // Adjust based on your needs
      depth: 0,
    });

    const eventPages: MetadataRoute.Sitemap = eventsResult.docs.map(
      (event) => ({
        url: `${baseUrl}/events/${event.slug}`,
        lastModified: new Date(event.updatedAt || event.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })
    );

    // Fetch published news
    const newsResult = await payload.find({
      collection: "news",
      where: {
        status: {
          equals: "published",
        },
      },
      limit: 1000, // Adjust based on your needs
      depth: 0,
    });

    const newsPages: MetadataRoute.Sitemap = newsResult.docs.map((news) => ({
      url: `${baseUrl}/news/${news.slug}`,
      lastModified: new Date(news.updatedAt || news.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [...staticPages, ...eventPages, ...newsPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return static pages only if there's an error fetching dynamic content
    return staticPages;
  }
}
