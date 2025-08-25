import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import PageHeader from "@/components/sections/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/Card";
import type { Media } from "@/../payload-types";

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

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "events",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    const event = result.docs[0];
    if (!event) {
      return {
        title: "Event Not Found",
        description: "The requested event could not be found.",
      };
    }

    return {
      title: `${event.title} | AIM Events`,
      description: event.excerpt,
      openGraph: {
        title: event.title,
        description: event.excerpt,
        images: [getMediaUrl(event.featuredImage)],
      },
    };
  } catch (error) {
    return {
      title: "Event Not Found",
      description: "The requested event could not be found." + error,
    };
  }
}

export default async function EventPage({ params }: EventPageProps) {
  try {
    const { slug } = await params;
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "events",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    });

    const event = result.docs[0];
    if (!event) {
      notFound();
    }

    return (
      <div className="min-h-screen">
        <PageHeader
          title={event.title}
          subtitle={`${formatDate(event.eventDate)} • ${event.location}`}
          backgroundImage={getMediaUrl(event.featuredImage)}
        />

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                      {event.category.charAt(0).toUpperCase() +
                        event.category.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Status:{" "}
                      {event.status.charAt(0).toUpperCase() +
                        event.status.slice(1)}
                    </span>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    {renderRichText(event.description)}
                  </div>
                </div>

                {/* Agenda Section */}
                {event.agenda && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Event Agenda
                    </h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                      {renderRichText(event.agenda)}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Event Details
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <svg
                          className="w-5 h-5 text-primary-600 mt-0.5"
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
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Date & Time
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatDate(event.eventDate)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {event.eventTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <svg
                          className="w-5 h-5 text-primary-600 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Location
                          </p>
                          <p className="text-sm text-gray-600">
                            {event.location}
                          </p>
                          {event.venue && (
                            <p className="text-sm text-gray-600">
                              {event.venue}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Back to Events */}
                <div className="mt-6">
                  <Link href="/events">
                    <Button variant="outline" className="w-full">
                      ← Back to Events
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Error fetching event:", error);
    notFound();
  }
}
