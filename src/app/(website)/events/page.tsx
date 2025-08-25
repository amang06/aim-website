import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPayload } from "payload";
import config from "@payload-config";
import PageHeader from "@/components/sections/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import LearnMoreButton from "@/components/ui/LearnMoreButton";
import type { Event, Media } from "@/../payload-types";

// Event card type for rendering
interface EventCard {
  id: number;
  title: string;
  slug: string;
  date: string;
  time: string;
  location: string;
  excerpt: string;
  image: string;
  category: string;
  status: string;
  isUpcoming: boolean;
}

export const metadata: Metadata = {
  title: "Events | Association of Indian Manufacturers (AIM)",
  description:
    "Join us for exclusive events, workshops, and networking opportunities. Discover upcoming manufacturing events across India.",
  openGraph: {
    title: "Events | AIM",
    description:
      "Join us for exclusive events, workshops, and networking opportunities.",
    url: "https://aim.ind.in/events",
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

// Helper function to get event status color
function getStatusColor(status: string): string {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800";
    case "completed":
      return "bg-gray-100 text-gray-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-yellow-100 text-yellow-800";
  }
}

// Helper function to check if event is upcoming
function isUpcoming(eventDate: string): boolean {
  return new Date(eventDate) > new Date();
}

async function getEvents() {
  try {
    const payload = await getPayload({ config });

    // Fetch all published events
    const eventsResult = await payload.find({
      collection: "events",
      where: {
        status: { equals: "published" },
      },
      sort: "-eventDate",
      limit: 50,
      depth: 1,
    });

    return eventsResult.docs.map(
      (event: Event): EventCard => ({
        id: event.id,
        title: event.title,
        slug: event.slug,
        date: event.eventDate,
        time: event.eventTime,
        location: event.location,
        excerpt: event.excerpt,
        image: getMediaUrl(event.featuredImage),
        category: event.category,
        status: event.status,
        isUpcoming: isUpcoming(event.eventDate),
      })
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  // Separate upcoming and past events
  const upcomingEvents = events.filter((event) => event.isUpcoming);
  const pastEvents = events.filter((event) => !event.isUpcoming);

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Events"
        subtitle="Join us for exclusive events, workshops, and networking opportunities"
        backgroundImage="/images/hero/bg-1.avif"
      />

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Upcoming Events
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Don&apos;t miss out on these exciting upcoming events and
                opportunities to connect with industry leaders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <Card
                  key={event.id}
                  className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4 right-4 flex justify-between">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-600 text-white">
                        {event.category.charAt(0).toUpperCase() +
                          event.category.slice(1)}
                      </div>
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          event.status
                        )}`}
                      >
                        {event.status.charAt(0).toUpperCase() +
                          event.status.slice(1)}
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white line-clamp-2">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
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
                        {formatDate(event.date)} • {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
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
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {event.location}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {event.excerpt}
                    </p>

                    <LearnMoreButton
                      href={`/events/${event.slug}`}
                      size="sm"
                      text="Learn More"
                      className="w-full justify-center"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Events Section */}
      {pastEvents.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <Card
                  key={event.id}
                  className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 opacity-90"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4 right-4 flex justify-between">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-600 text-white">
                        {event.category.charAt(0).toUpperCase() +
                          event.category.slice(1)}
                      </div>
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Completed
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white line-clamp-2">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
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
                        {formatDate(event.date)} • {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
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
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {event.location}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {event.excerpt}
                    </p>

                    <LearnMoreButton
                      href={`/events/${event.slug}`}
                      size="sm"
                      text="View Details"
                      className="w-full justify-center"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Events Message */}
      {events.length === 0 && (
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Events Available
              </h2>
              <p className="text-gray-600 mb-8">
                We&apos;re currently working on exciting new events. Please
                check back soon or contact us for more information.
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
