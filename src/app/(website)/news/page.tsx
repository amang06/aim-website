import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPayload } from "payload";
import config from "@payload-config";
import PageHeader from "@/components/sections/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import LearnMoreButton from "@/components/ui/LearnMoreButton";
import type { News, Media } from "@/../payload-types";

// News tag structure
interface NewsTag {
  tag: string;
  id?: string;
}

// News card type for rendering
interface NewsCard {
  id: number;
  title: string;
  slug: string;
  publishedDate: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  isBreaking: boolean;
  priority: string;
  tags: NewsTag[];
}

export const metadata: Metadata = {
  title: "News & Updates | Association of Indian Manufacturers (AIM)",
  description:
    "Stay informed about the latest developments in the manufacturing sector. Read our latest news, policy updates, and industry insights.",
  openGraph: {
    title: "News & Updates | AIM",
    description:
      "Stay informed about the latest developments in the manufacturing sector.",
    url: "https://aim.ind.in/news",
  },
};

// Helper function to get media URL
function getMediaUrl(
  media: number | Media | string | null | undefined
): string {
  if (!media) return "/images/hero/bg-1.avif";
  if (typeof media === "string") return media;
  if (typeof media === "number") return "/images/hero/bg-1.avif";
  return media.url || "/images/hero/bg-1.avif";
}

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Helper function to get category color
function getCategoryColor(category: string): string {
  switch (category) {
    case "events":
      return "bg-blue-100 text-blue-800";
    case "policy":
      return "bg-purple-100 text-purple-800";
    case "training":
      return "bg-green-100 text-green-800";
    case "awards":
      return "bg-yellow-100 text-yellow-800";
    case "industry-news":
      return "bg-gray-100 text-gray-800";
    case "government-updates":
      return "bg-red-100 text-red-800";
    case "partnership":
      return "bg-indigo-100 text-indigo-800";
    case "press-release":
      return "bg-pink-100 text-pink-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Helper function to get priority badge
function getPriorityBadge(priority: string, isBreaking: boolean) {
  if (isBreaking) {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 animate-pulse">
        Breaking News
      </span>
    );
  }

  if (priority === "high") {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
        High Priority
      </span>
    );
  }

  return null;
}

async function getNews() {
  try {
    const payload = await getPayload({ config });

    // Fetch all published news
    const newsResult = await payload.find({
      collection: "news",
      where: {
        status: { equals: "published" },
      },
      sort: "-publishedDate",
      limit: 50,
      depth: 1,
    });

    return newsResult.docs.map(
      (news: News): NewsCard => ({
        id: news.id,
        title: news.title,
        slug: news.slug,
        publishedDate: news.publishedDate,
        excerpt: news.excerpt,
        image: getMediaUrl(news.featuredImage),
        category: news.category,
        author: news.author || "AIM Editorial Team",
        isBreaking: news.isBreaking || false,
        priority: news.priority || "medium",
        tags: news.tags || [],
      })
    );
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export default async function NewsPage() {
  const allNews = await getNews();

  // Separate breaking news and regular news
  const breakingNews = allNews.filter((news) => news.isBreaking);
  const regularNews = allNews.filter((news) => !news.isBreaking);

  // Get featured/high priority news
  const featuredNews = regularNews
    .filter((news) => news.priority === "high")
    .slice(0, 3);
  const otherNews = regularNews.filter((news) => news.priority !== "high");

  return (
    <div className="min-h-screen">
      <PageHeader
        title="News & Updates"
        subtitle="Stay informed about the latest developments in the manufacturing sector"
        backgroundImage="/images/hero/bg-2.avif"
      />

      {/* Breaking News Section */}
      {breakingNews.length > 0 && (
        <section className="py-8 bg-red-50 border-l-4 border-red-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-red-600 mr-2 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <h2 className="text-xl font-bold text-red-800">Breaking News</h2>
            </div>
            <div className="space-y-4">
              {breakingNews.map((news) => (
                <div
                  key={news.id}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-lg overflow-hidden">
                        <Image
                          src={news.image}
                          alt={news.title}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 animate-pulse">
                          Breaking
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                            news.category
                          )}`}
                        >
                          {news.category.charAt(0).toUpperCase() +
                            news.category.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(news.publishedDate)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        <Link
                          href={`/news/${news.slug}`}
                          className="hover:text-primary-600"
                        >
                          {news.title}
                        </Link>
                      </h3>
                      <p className="text-gray-700 text-sm line-clamp-2 mb-3">
                        {news.excerpt}
                      </p>
                      <LearnMoreButton
                        href={`/news/${news.slug}`}
                        size="sm"
                        text="Read More"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured News Section */}
      {featuredNews.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured News
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Important updates and announcements from the manufacturing
                industry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredNews.map((news) => (
                <Card
                  key={news.id}
                  className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4 right-4 flex justify-between">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                          news.category
                        )}`}
                      >
                        {news.category.charAt(0).toUpperCase() +
                          news.category.slice(1)}
                      </span>
                      {getPriorityBadge(news.priority, news.isBreaking)}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white line-clamp-2">
                        {news.title}
                      </h3>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formatDate(news.publishedDate)} • {news.author}
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {news.excerpt}
                    </p>

                    <LearnMoreButton
                      href={`/news/${news.slug}`}
                      size="sm"
                      text="Read More"
                      className="w-full justify-center"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All News Section */}
      {otherNews.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherNews.map((news) => (
                <Card
                  key={news.id}
                  className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4 right-4 flex justify-between">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                          news.category
                        )}`}
                      >
                        {news.category.charAt(0).toUpperCase() +
                          news.category.slice(1)}
                      </span>
                      {getPriorityBadge(news.priority, news.isBreaking)}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white line-clamp-2">
                        {news.title}
                      </h3>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formatDate(news.publishedDate)} • {news.author}
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {news.excerpt}
                    </p>

                    {/* Tags */}
                    {news.tags && news.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {news.tags
                          .slice(0, 3)
                          .map((tagObj: NewsTag, tagIndex: number) => (
                            <span
                              key={tagIndex}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                            >
                              {tagObj.tag}
                            </span>
                          ))}
                        {news.tags.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{news.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    <LearnMoreButton
                      href={`/news/${news.slug}`}
                      size="sm"
                      text="Read More"
                      className="w-full justify-center"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No News Message */}
      {allNews.length === 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <svg
                className="w-20 h-20 text-gray-300 mx-auto mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No News Available
              </h2>
              <p className="text-gray-600 mb-8">
                We&apos;re currently working on bringing you the latest news and
                updates. Please check back soon.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
