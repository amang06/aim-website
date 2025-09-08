import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "States & Chapters - Association of Indian Manufacturers",
  description:
    "Explore AIM&apos;s network of state chapters across India. Find your local chapter and connect with manufacturers in your region.",
};

const statesData = [
  {
    id: "delhi",
    name: "Delhi",
    capital: "New Delhi",
    chapters: [
      {
        name: "New Delhi",
        address: "Connaught Place, New Delhi",
        phone: "+91 11 2345 6789",
      },
      {
        name: "South Delhi",
        address: "Greater Kailash, New Delhi",
        phone: "+91 11 2345 6790",
      },
      {
        name: "North Delhi",
        address: "Pitampura, New Delhi",
        phone: "+91 11 2345 6791",
      },
    ],
    memberCount: 2500,
    established: "1995",
  },
  {
    id: "haryana",
    name: "Haryana",
    capital: "Chandigarh",
    chapters: [
      {
        name: "Gurgaon",
        address: "Cyber City, Gurgaon",
        phone: "+91 124 567 8901",
      },
      {
        name: "Faridabad",
        address: "Industrial Area, Faridabad",
        phone: "+91 129 567 8902",
      },
      {
        name: "Panipat",
        address: "Industrial Estate, Panipat",
        phone: "+91 180 567 8903",
      },
      {
        name: "Sonipat",
        address: "Industrial Area, Sonipat",
        phone: "+91 130 567 8904",
      },
    ],
    memberCount: 3200,
    established: "1996",
  },
  {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    capital: "Lucknow",
    chapters: [
      { name: "Noida", address: "Sector 62, Noida", phone: "+91 120 567 8905" },
      {
        name: "Bareilly",
        address: "Industrial Area, Bareilly",
        phone: "+91 581 567 8906",
      },
      {
        name: "Kanpur",
        address: "Industrial Estate, Kanpur",
        phone: "+91 512 567 8907",
      },
      {
        name: "Lucknow",
        address: "68/3-4, Mill Road, Aishbagh, Lucknow-226004 U.P. (India)",
        phone: "+91 7428382757",
      },
      {
        name: "Varanasi",
        address: "Industrial Area, Varanasi",
        phone: "+91 542 567 8909",
      },
    ],
    memberCount: 4500,
    established: "1997",
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    capital: "Mumbai",
    chapters: [
      {
        name: "Mumbai",
        address: "Bandra Kurla Complex, Mumbai",
        phone: "+91 22 567 8910",
      },
      { name: "Pune", address: "Hinjewadi, Pune", phone: "+91 20 567 8911" },
      {
        name: "Nagpur",
        address: "Industrial Area, Nagpur",
        phone: "+91 712 567 8912",
      },
      {
        name: "Nashik",
        address: "Industrial Estate, Nashik",
        phone: "+91 253 567 8913",
      },
      {
        name: "Aurangabad",
        address: "Industrial Area, Aurangabad",
        phone: "+91 240 567 8914",
      },
    ],
    memberCount: 5200,
    established: "1994",
  },
  {
    id: "karnataka",
    name: "Karnataka",
    capital: "Bangalore",
    chapters: [
      {
        name: "Bangalore",
        address: "Electronic City, Bangalore",
        phone: "+91 80 567 8915",
      },
      {
        name: "Mysore",
        address: "Industrial Area, Mysore",
        phone: "+91 821 567 8916",
      },
      {
        name: "Mangalore",
        address: "Industrial Estate, Mangalore",
        phone: "+91 824 567 8917",
      },
      {
        name: "Hubli",
        address: "Industrial Area, Hubli",
        phone: "+91 836 567 8918",
      },
    ],
    memberCount: 3800,
    established: "1998",
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    capital: "Chennai",
    chapters: [
      {
        name: "Chennai",
        address: "Tidel Park, Chennai",
        phone: "+91 44 567 8919",
      },
      {
        name: "Coimbatore",
        address: "Industrial Area, Coimbatore",
        phone: "+91 422 567 8920",
      },
      {
        name: "Madurai",
        address: "Industrial Estate, Madurai",
        phone: "+91 452 567 8921",
      },
      {
        name: "Salem",
        address: "Industrial Area, Salem",
        phone: "+91 427 567 8922",
      },
    ],
    memberCount: 4100,
    established: "1999",
  },
  {
    id: "gujarat",
    name: "Gujarat",
    capital: "Gandhinagar",
    chapters: [
      {
        name: "Ahmedabad",
        address: "Satellite, Ahmedabad",
        phone: "+91 79 567 8923",
      },
      {
        name: "Surat",
        address: "Industrial Area, Surat",
        phone: "+91 261 567 8924",
      },
      {
        name: "Vadodara",
        address: "Industrial Estate, Vadodara",
        phone: "+91 265 567 8925",
      },
      {
        name: "Rajkot",
        address: "Industrial Area, Rajkot",
        phone: "+91 281 567 8926",
      },
    ],
    memberCount: 3600,
    established: "2000",
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    capital: "Jaipur",
    chapters: [
      {
        name: "Jaipur",
        address: "Malviya Nagar, Jaipur",
        phone: "+91 141 567 8927",
      },
      {
        name: "Jodhpur",
        address: "Industrial Area, Jodhpur",
        phone: "+91 291 567 8928",
      },
      {
        name: "Udaipur",
        address: "Industrial Estate, Udaipur",
        phone: "+91 294 567 8929",
      },
      {
        name: "Kota",
        address: "Industrial Area, Kota",
        phone: "+91 744 567 8930",
      },
    ],
    memberCount: 2800,
    established: "2001",
  },
  {
    id: "west-bengal",
    name: "West Bengal",
    capital: "Kolkata",
    chapters: [
      {
        name: "Kolkata",
        address: "Salt Lake City, Kolkata",
        phone: "+91 33 567 8931",
      },
      {
        name: "Howrah",
        address: "Industrial Area, Howrah",
        phone: "+91 33 567 8932",
      },
      {
        name: "Durgapur",
        address: "Industrial Estate, Durgapur",
        phone: "+91 343 567 8933",
      },
      {
        name: "Asansol",
        address: "Industrial Area, Asansol",
        phone: "+91 341 567 8934",
      },
    ],
    memberCount: 2900,
    established: "2002",
  },
  {
    id: "telangana",
    name: "Telangana",
    capital: "Hyderabad",
    chapters: [
      {
        name: "Hyderabad",
        address: "HITEC City, Hyderabad",
        phone: "+91 40 567 8935",
      },
      {
        name: "Warangal",
        address: "Industrial Area, Warangal",
        phone: "+91 870 567 8936",
      },
      {
        name: "Karimnagar",
        address: "Industrial Estate, Karimnagar",
        phone: "+91 878 567 8937",
      },
    ],
    memberCount: 2200,
    established: "2014",
  },
];

export default function StatesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHeader
        title="States & Chapters"
        subtitle="Our network across India"
        description="Connect with AIM chapters in your state and access localized support, networking opportunities, and industry resources."
      />

      {/* Quick Navigation */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Quick Navigation
            </h2>
            <p className="text-gray-600">
              Jump to your state or browse all chapters
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {statesData.map((state) => (
              <a
                key={state.id}
                href={`#${state.id}`}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center border border-gray-200 hover:border-primary-300"
              >
                <div className="font-semibold text-gray-900">{state.name}</div>
                <div className="text-sm text-gray-600">
                  {state.chapters.length} chapters
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* States List */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our State Chapters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find your local AIM chapter and connect with manufacturers in your
              region. Each chapter provides localized support, networking
              events, and industry resources.
            </p>
          </div>

          <div className="space-y-16">
            {statesData.map((state) => (
              <div key={state.id} id={state.id} className="scroll-mt-20">
                <div className="border-b border-gray-200 pb-8 mb-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {state.name}
                      </h3>
                      <p className="text-gray-600">Capital: {state.capital}</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <div className="text-2xl font-bold text-primary-600">
                        {state.memberCount.toLocaleString()}+
                      </div>
                      <div className="text-sm text-gray-600">Members</div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span>{state.chapters.length} Chapters</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>Est. {state.established}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {state.chapters.map((chapter, index) => (
                    <Card
                      key={index}
                      className="h-full transition-all duration-200 hover:shadow-lg"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {chapter.name}
                        </CardTitle>
                        <CardDescription>AIM Chapter</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <svg
                              className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
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
                            <p className="text-sm text-gray-700">
                              {chapter.address}
                            </p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <svg
                              className="w-5 h-5 text-gray-400 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            <a
                              href={`tel:${chapter.phone}`}
                              className="text-sm text-primary-600 hover:text-primary-700"
                            >
                              {chapter.phone}
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Can&apos;t Find Your Chapter?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            If there&apos;s no AIM chapter in your area, we can help you
            establish one. Contact us to learn about the process and benefits of
            starting a local chapter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="/membership"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-primary-600 transition-colors"
            >
              Join AIM
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
