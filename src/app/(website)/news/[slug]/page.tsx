import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import PageHeader from "@/components/sections/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/Card";
import type { News, Media, Event } from "@/../payload-types";

// Rich text content structure
interface RichTextNode {
  type: string;
  children?: RichTextChild[];
  tag?: string;
  listType?: string;
}

interface RichTextChild {
  type: string;
  text?: string;
}

interface RichTextContent {
  root: {
    type: string;
    children: RichTextNode[];
  };
}

// News tag structure
interface NewsTag {
  tag: string;
  id: string;
}

// Downloadable file structure
interface DownloadableFile {
  title: string;
  file: number | Media;
  description?: string;
  id: string;
}

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
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Helper function to render rich text content
function renderRichText(
  content: RichTextContent | null | undefined
): React.JSX.Element {
  if (!content || !content.root || !content.root.children) {
    return <div></div>;
  }

  const renderNode = (node: RichTextNode, index: number): React.JSX.Element => {
    if (node.type === "paragraph") {
      return (
        <p key={index} className="mb-4">
          {node.children?.map((child: RichTextChild, childIndex: number) => {
            if (child.type === "text") {
              return <span key={childIndex}>{child.text}</span>;
            }
            return null;
          })}
        </p>
      );
    }
    if (node.type === "heading") {
      const HeadingTag = `h${node.tag}` as keyof React.JSX.IntrinsicElements;
      const className =
        node.tag === "h1"
          ? "text-3xl font-bold mb-6"
          : node.tag === "h2"
          ? "text-2xl font-bold mb-4 mt-8"
          : "text-xl font-semibold mb-3 mt-6";
      return (
        <HeadingTag key={index} className={className}>
          {node.children?.map((child: RichTextChild, childIndex: number) => {
            if (child.type === "text") {
              return <span key={childIndex}>{child.text}</span>;
            }
            return null;
          })}
        </HeadingTag>
      );
    }
    if (node.type === "list") {
      const ListTag = node.listType === "number" ? "ol" : "ul";
      return (
        <ListTag key={index} className="mb-4 ml-6 list-disc">
          {node.children?.map((child: RichTextNode, childIndex: number) => (
            <li key={childIndex} className="mb-2">
              {renderNode(child, childIndex)}
            </li>
          ))}
        </ListTag>
      );
    }
    return <div key={index}></div>;
  };

  return (
    <div className="prose prose-lg max-w-none">
      {content.root.children.map((node: RichTextNode, index: number) =>
        renderNode(node, index)
      )}
    </div>
  );
}

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "news",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    const news = result.docs[0];
    if (!news) {
      return {
        title: "News Not Found",
        description: "The requested news article could not be found.",
      };
    }

    return {
      title: `${news.title} | AIM News`,
      description: news.excerpt,
      openGraph: {
        title: news.title,
        description: news.excerpt,
        images: [getMediaUrl(news.featuredImage)],
      },
    };
  } catch (error) {
    return {
      title: "News Not Found",
      description: "The requested news article could not be found." + error,
    };
  }
}

export default async function NewsPage({ params }: NewsPageProps) {
  try {
    const { slug } = await params;
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "news",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    });

    const news = result.docs[0];
    if (!news) {
      notFound();
    }

    // Fetch related news
    const relatedNewsResult = await payload.find({
      collection: "news",
      where: {
        and: [
          { status: { equals: "published" } },
          { id: { not_equals: news.id } },
          { category: { equals: news.category } },
        ],
      },
      limit: 3,
      depth: 1,
    });

    return (
      <div className="min-h-screen">
        <PageHeader
          title={news.title}
          subtitle={`${formatDate(news.publishedDate)} • ${
            news.author || "AIM Editorial Team"
          }`}
          backgroundImage={getMediaUrl(news.featuredImage)}
        />

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <article className="mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {news.category.charAt(0).toUpperCase() +
                        news.category.slice(1)}
                    </span>
                    {news.isBreaking && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        Breaking News
                      </span>
                    )}
                    <span className="text-sm text-gray-500">
                      Priority:{" "}
                      {(news.priority || "medium").charAt(0).toUpperCase() +
                        (news.priority || "medium").slice(1)}
                    </span>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    {renderRichText(news.content)}
                  </div>

                  {/* Tags */}
                  {news.tags && news.tags.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {news.tags.map((tagObj: NewsTag, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tagObj.tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Downloadable Files */}
                  {news.downloadableFiles &&
                    news.downloadableFiles.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Downloads
                        </h3>
                        <div className="space-y-3">
                          {news.downloadableFiles.map(
                            (file: DownloadableFile, index: number) => (
                              <Card key={index} className="p-4">
                                <div className="flex items-center space-x-3">
                                  <svg
                                    className="w-6 h-6 text-primary-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                  </svg>
                                  <div className="flex-1">
                                    <h4 className="text-sm font-medium text-gray-900">
                                      {file.title}
                                    </h4>
                                    {file.description && (
                                      <p className="text-sm text-gray-600">
                                        {file.description}
                                      </p>
                                    )}
                                  </div>
                                  <a
                                    href={getMediaUrl(file.file)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-600 hover:text-primary-700"
                                  >
                                    <Button variant="outline" size="sm">
                                      Download
                                    </Button>
                                  </a>
                                </div>
                              </Card>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {/* External URL */}
                  {news.externalUrl && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Learn More
                      </h3>
                      <a
                        href={news.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700"
                      >
                        Visit External Link
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  )}
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Article Details
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Published
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(news.publishedDate)}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Author
                        </p>
                        <p className="text-sm text-gray-600">
                          {news.author || "AIM Editorial Team"}
                        </p>
                        {news.authorDesignation && (
                          <p className="text-xs text-gray-500">
                            {news.authorDesignation}
                          </p>
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Category
                        </p>
                        <p className="text-sm text-gray-600">
                          {news.category.charAt(0).toUpperCase() +
                            news.category.slice(1)}
                        </p>
                      </div>
                    </div>

                    {/* Related Events */}
                    {news.relatedEvents && news.relatedEvents.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          Related Events
                        </h4>
                        <div className="space-y-2">
                          {news.relatedEvents.map(
                            (event: Event, index: number) => (
                              <Link
                                key={index}
                                href={`/events/${event.slug}`}
                                className="block text-sm text-primary-600 hover:text-primary-700"
                              >
                                {event.title}
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Back to News */}
                <div className="mt-6">
                  <Link href="/news">
                    <Button variant="outline" className="w-full">
                      ← Back to News
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related News */}
        {relatedNewsResult.docs.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Related News
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedNewsResult.docs.map(
                  (relatedNews: News, index: number) => (
                    <Card
                      key={index}
                      className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={getMediaUrl(relatedNews.featuredImage)}
                          alt={relatedNews.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-lg font-bold text-white line-clamp-2">
                            {relatedNews.title}
                          </h3>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                            {relatedNews.category.charAt(0).toUpperCase() +
                              relatedNews.category.slice(1)}
                          </span>
                          {formatDate(relatedNews.publishedDate)}
                        </div>
                        <p className="text-gray-700 text-sm line-clamp-3 mb-3">
                          {relatedNews.excerpt}
                        </p>
                        <Link
                          href={`/news/${relatedNews.slug}`}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          Read More →
                        </Link>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching news:", error);
    notFound();
  }
}
