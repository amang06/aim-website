import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/sections/HeroSection";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import LearnMoreButton from "@/components/ui/LearnMoreButton";
import JoinAIMButton from "@/components/ui/JoinAIMButton";

export const metadata: Metadata = {
  title:
    "Association of Indian Manufacturers (AIM) - Empowering MSMEs in India",
  description:
    "Association of Indian Manufacturers (AIM) is dedicated to empowering Micro, Small and Medium Enterprises (MSMEs) across India through advocacy, networking, and support services.",
  openGraph: {
    title: "Association of Indian Manufacturers (AIM)",
    description:
      "Empowering Micro, Small and Medium Enterprises (MSMEs) across India",
    url: "https://aim.ind.in",
  },
};

const heroSlides = [
  {
    title: "Empowering Indian Manufacturers",
    subtitle: "Building a stronger, more competitive manufacturing sector",
    description:
      "Association of Indian Manufacturers (AIM) is dedicated to supporting Micro, Small and Medium Enterprises (MSMEs) across India through comprehensive advocacy, networking, and development programs.",
    ctaText: "About AIM",
    ctaHref: "/about",
    backgroundImage: "/images/HERO/bg-1.avif",
    overlay: true,
  },
  {
    title: "Advocacy & Policy Influence",
    subtitle: "Shaping the future of Indian manufacturing",
    description:
      "Representing MSME interests at national and state levels, influencing policy decisions that drive industry growth and create opportunities for manufacturers across India.",
    ctaText: "Our Leadership",
    ctaHref: "/about#leadership",
    backgroundImage: "/images/HERO/bg-2.avif",
    overlay: true,
  },
  {
    title: "Networking & Collaboration",
    subtitle: "Connect with industry leaders and peers",
    description:
      "Join our extensive network of manufacturers, participate in exclusive events, and build meaningful partnerships that drive business growth and innovation.",
    ctaText: "Join AIM",
    ctaHref: "/membership/apply",
    backgroundImage: "/images/HERO/bg-3.avif",
    overlay: true,
  },
  {
    title: "Skill Development & Training",
    subtitle: "Enhancing manufacturing capabilities",
    description:
      "Access comprehensive training programs, workshops, and skill development initiatives designed to enhance your manufacturing capabilities and workforce productivity.",
    ctaText: "Learn More",
    ctaHref: "/resources",
    backgroundImage: "/images/HERO/bg-4.avif",
    overlay: true,
  },
];

const upcomingEvents = [
  {
    title: "AIM Annual Conference 2024",
    date: "January 25-26, 2024",
    time: "9:00 AM - 6:00 PM",
    location: "Lucknow, Uttar Pradesh",
    excerpt:
      "Join industry leaders, policymakers, and manufacturers for the biggest gathering of Indian manufacturers. Networking, knowledge sharing, and business opportunities.",
    image: "/images/HERO/bg-1.avif",
    href: "/events/annual-conference-2024",
    category: "Conference",
  },
  {
    title: "MSME Digital Transformation Workshop",
    date: "February 15, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Delhi, NCR",
    excerpt:
      "Learn about Industry 4.0 technologies, digital tools, and strategies to transform your manufacturing business for the digital age.",
    image: "/images/HERO/bg-2.avif",
    href: "/events/digital-transformation-workshop",
    category: "Workshop",
  },
  {
    title: "Manufacturing Excellence Awards 2024",
    date: "March 10, 2024",
    time: "6:00 PM - 10:00 PM",
    location: "Mumbai, Maharashtra",
    excerpt:
      "Celebrate excellence in manufacturing. Recognize outstanding achievements and innovations in the Indian manufacturing sector.",
    image: "/images/HERO/bg-3.avif",
    href: "/events/manufacturing-excellence-awards",
    category: "Awards",
  },
];

const latestNews = [
  {
    title: "AIM Annual Conference 2024 Registration Open",
    date: "December 15, 2024",
    excerpt:
      "Join us for the biggest gathering of Indian manufacturers. Early bird registration now open with special discounts for AIM members.",
    image: "/images/HERO/bg-1.avif",
    href: "/news/annual-conference-2024",
    category: "Events",
  },
  {
    title: "New Policy Framework for MSME Digital Transformation",
    date: "December 10, 2024",
    excerpt:
      "AIM releases comprehensive guidelines for MSME digital transformation and Industry 4.0 adoption. Download the policy document now.",
    image: "/images/HERO/bg-2.avif",
    href: "/news/msme-digital-transformation-policy",
    category: "Policy",
  },
  {
    title: "AIM Launches Skill Development Program in Karnataka",
    date: "December 5, 2024",
    excerpt:
      "New training initiative to enhance manufacturing skills and create employment opportunities. Over 500 workers to be trained.",
    image: "/images/HERO/bg-3.avif",
    href: "/news/karnataka-skill-development-program",
    category: "Training",
  },
];

const keyStats = [
  {
    number: "2,000+",
    label: "Member Companies",
    description: "Manufacturers across India",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    number: "25+",
    label: "Years of Excellence",
    description: "Serving Indian manufacturers",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    number: "120+",
    label: "Events Annually",
    description: "Networking & training programs",
    icon: (
      <svg
        className="w-8 h-8"
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
    ),
  },
  {
    number: "21+",
    label: "States Covered",
    description: "Pan-India presence",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection slides={heroSlides} autoPlay={true} interval={5000} />

      {/* Key Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AIM by the Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the impact and reach of the Association of Indian
              Manufacturers across India.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {keyStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                  <div className="text-primary-600">{stat.icon}</div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Upcoming Events
              </h2>
              <p className="text-xl text-gray-600">
                Join us for exclusive events, workshops, and networking
                opportunities.
              </p>
            </div>
            <Link href="/events">
              <Button variant="outline">View All Events</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
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
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-600 text-white mb-2">
                      {event.category}
                    </div>
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
                      {event.date} • {event.time}
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
                    href={event.href}
                    size="sm"
                    text="Register Now"
                    className="w-full justify-center"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Latest News & Updates
              </h2>
              <p className="text-xl text-gray-600">
                Stay informed about the latest developments in the manufacturing
                sector.
              </p>
            </div>
            <Link href="/news">
              <Button variant="outline">View All News</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((news, index) => (
              <Card
                key={index}
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
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white mb-2">
                      {news.category}
                    </div>
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
                    {news.date}
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {news.excerpt}
                  </p>

                  <LearnMoreButton
                    href={news.href}
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

      {/* Message from President Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Message from President
            </h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden relative">
                  <Image
                    src="/images/leadership/president.webp"
                    alt="AIM President"
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
              </div>

              <div className="flex-1 text-gray-700 leading-relaxed space-y-4">
                <p className="text-lg italic">
                  I am honored and privileged to serve as the President of the
                  Association of Indian Manufacturers (AIM). Together, we embark
                  on a journey to empower Indian manufacturers and drive global
                  excellence in the ever-evolving landscape of the manufacturing
                  industry.
                </p>

                <p className="italic">
                  At AIM, our mission is clear: to foster a vibrant
                  manufacturing ecosystem that thrives on innovation,
                  sustainability, and competitiveness. As President, my focus is
                  on advocating for policies that support our members, creating
                  a conducive environment for growth and success.
                </p>

                <p className="italic">
                  I invite each one of you to join AIM and be part of a united
                  front that amplifies our collective voice. Together, we can
                  shape policies, influence regulations, and bring about
                  positive change. Through our network and collaborations, we
                  will unlock new opportunities, forge strategic partnerships,
                  and expand our reach both domestically and internationally.
                </p>

                <div className="pt-4">
                  <p className="font-semibold text-primary-600">
                    Mr. Mahmohan Agarwal<br></br>
                    AIM President
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join AIM?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Become part of India&apos;s largest network of manufacturers and
            unlock opportunities for growth, networking, and advocacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <JoinAIMButton
              href="/membership/apply"
              size="lg"
              text="Apply for Membership"
              className="bg-green-500 text-white hover:bg-green-400"
            />
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:text-primary"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
