import React from "react";
import PageHeader from "@/components/sections/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import LearnMoreButton from "@/components/ui/LearnMoreButton";
import JoinAIMButton from "@/components/ui/JoinAIMButton";
import { getMemberships, formatPrice } from "@/lib/memberships";

export default async function MembershipTypesPage() {
  const memberships = await getMemberships();

  // Create a map for easy lookup
  const membershipMap = new Map(memberships.map((m) => [m.type, m]));

  const associateMembership = membershipMap.get("associate");
  const alliedMembership = membershipMap.get("allied");
  const premierMembership = membershipMap.get("premier");

  // Fallback prices if not found in database
  const fallbackPrices = {
    associate: 5000,
    allied: 3000,
    premier: 15000,
  };
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Membership Types"
        subtitle="Choose Your Category"
        description="Learn about the different types of AIM membership and find the one that best suits your organization."
        ctaText="Apply Now"
        ctaHref="/membership/apply"
        height="medium"
      />

      {/* Ordinary Members */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mb-4">
                Category A
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Associate Members
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                For companies and firms engaged in manufacturing, processing,
                assembling, and other industrial activities. Includes full voting rights, 
                government advocacy access, priority event access, networking opportunities, 
                and industry reports.
              </p>
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                  <span className="text-lg font-semibold">
                    {formatPrice(
                      associateMembership?.price || fallbackPrices.associate
                    )}
                  </span>
                  <span className="text-sm ml-2">per year</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold text-gray-900">
                  Eligible Organizations:
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-3 mt-1">•</span>
                    <span>
                      Any company/firm engaged in manufacturing and processing,
                      assembling & other industrial activities and commodities
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-3 mt-1">•</span>
                    <span>
                      Companies producing products used by the common
                      man/industries in India or any other country
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-3 mt-1">•</span>
                    <span>
                      IT Sector companies are also considered under Ordinary
                      members
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold text-gray-900">
                  Required Registrations:
                </h3>
                <p className="text-gray-600 mb-4">
                  All manufacturing units must have any of the following 4 valid
                  registrations:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-3 mt-1">a)</span>
                    <span>Udyam registration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-3 mt-1">b)</span>
                    <span>GST Registration as manufacturing Industries</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-3 mt-1">c)</span>
                    <span>Either LMV-6 or HV2 Power Connection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-3 mt-1">d)</span>
                    <span>Registered with Director of Factories</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-3 mt-1">e)</span>
                    <span>
                      Having Consent /NOC From Pollution control board
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <LearnMoreButton
                  href="/membership/eligibility"
                  text="Check Eligibility"
                />
                <JoinAIMButton
                  href="/membership/apply"
                  text="Apply as Associate Member"
                />
              </div>
            </div>

            <div className="lg:pl-8">
              <Card className="bg-white shadow-lg">
                <CardHeader className="bg-primary-50 border-b">
                  <CardTitle className="text-2xl text-primary-900">
                    Associate Member Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg
                          className="w-4 h-4 text-primary-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>Full voting rights in association matters</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg
                          className="w-4 h-4 text-primary-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>Access to government advocacy programs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg
                          className="w-4 h-4 text-primary-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>
                        Priority access to industry events and seminars
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg
                          className="w-4 h-4 text-primary-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>
                        Networking opportunities with fellow manufacturers
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg
                          className="w-4 h-4 text-primary-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>Access to industry reports and research</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Associate Members */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                Category B
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Allied Members
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                For companies and firms engaged in activities other than
                manufacturing, including consultancy and professional services. 
                Includes networking events, business development opportunities, 
                industry insights, training programs, and forum representation.
              </p>
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                  <span className="text-lg font-semibold">
                    {formatPrice(
                      alliedMembership?.price || fallbackPrices.allied
                    )}
                  </span>
                  <span className="text-sm ml-2">per year</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold text-gray-900">
                  Eligible Organizations:
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">•</span>
                    <span>
                      Any company/firm/individual engaged in imparting services
                      like consultancy
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">•</span>
                    <span>Professional services providers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">•</span>
                    <span>
                      Companies engaged in activities other than those covered
                      under Ordinary members
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold text-gray-900">
                  Requirements:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">•</span>
                    <span>Valid business registration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">•</span>
                    <span>Professional credentials (where applicable)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">•</span>
                    <span>Good standing in the industry</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <LearnMoreButton
                  href="/membership/eligibility"
                  text="Check Eligibility"
                />
                <JoinAIMButton
                  href="/membership/apply"
                  text="Apply as Allied Member"
                />
              </div>
            </div>

            <div className="lg:order-1 lg:pr-8">
              <Card className="bg-white shadow-lg">
                <CardHeader className="bg-green-50 border-b">
                  <CardTitle className="text-2xl text-green-900">
                    Allied Member Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>Access to industry networking events</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>Business development opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>Industry insights and market intelligence</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>Access to training and development programs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>Representation in industry forums</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Members */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mb-4">
                Category C
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Premier Members
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Premium membership for large organizations and multinational
                companies with significant turnover. Includes all Associate benefits 
                plus priority government access, exclusive events, custom research, 
                and leadership opportunities.
              </p>
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                  <span className="text-lg font-semibold">
                    {formatPrice(
                      premierMembership?.price || fallbackPrices.premier
                    )}
                  </span>
                  <span className="text-sm ml-2">per year</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold text-gray-900">
                  Eligible Organizations:
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span>Organizations with a turnover of 250 CR & above</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span>Multinational companies (MNCs)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span>
                      Large-scale manufacturing and service organizations
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold text-gray-900">
                  Requirements:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span>Minimum turnover of 250 Crore Rupees</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span>Valid business registration and compliance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span>Good corporate governance record</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <LearnMoreButton
                  href="/membership/eligibility"
                  text="Check Eligibility"
                />
                <JoinAIMButton
                  href="/membership/apply"
                  text="Apply as Premier Member"
                />
              </div>
            </div>

            <div className="lg:pl-8">
              <Card className="bg-white shadow-lg">
                <CardHeader className="bg-purple-50 border-b">
                  <CardTitle className="text-2xl text-purple-900">
                    Premier Member Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg
                          className="w-4 h-4 text-purple-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>All benefits of Associate membership</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg
                          className="w-4 h-4 text-purple-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>Priority access to government officials</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg
                          className="w-4 h-4 text-purple-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>Exclusive corporate networking events</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg
                          className="w-4 h-4 text-purple-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>Custom research and advisory services</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg
                          className="w-4 h-4 text-purple-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>
                        Leadership opportunities in association committees
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Special Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Special Membership Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AIM also offers special membership categories for individuals and
              organizations that contribute significantly to the manufacturing
              sector.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader className="bg-orange-50">
                <CardTitle className="text-xl text-orange-900">
                  Individual Members
                </CardTitle>
                <CardDescription className="text-orange-700">
                  For individuals contributing to the sector
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  The Screening Committee can enroll individuals who have
                  contributed or are competent to contribute their services for
                  the benefit and performance of the society&apos;s objectives.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Applicable for financial year</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>
                      Membership automatically terminates on 31st March
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Subject to Screening Committee approval</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-indigo-200 hover:shadow-lg transition-shadow">
              <CardHeader className="bg-indigo-50">
                <CardTitle className="text-xl text-indigo-900">
                  Life Members & Patrons
                </CardTitle>
                <CardDescription className="text-indigo-700">
                  For long-term supporters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  The Screening Committee can also enroll life members as well
                  as patrons of the society for those who demonstrate
                  exceptional commitment to the manufacturing sector.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Lifetime membership benefits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Special recognition and privileges</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Subject to Screening Committee approval</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Choose Your Membership?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Find the perfect membership category for your organization and start
            your journey with AIM today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LearnMoreButton
              href="/membership/eligibility"
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100"
              text="Check Eligibility"
            />
            <JoinAIMButton
              href="/membership/apply"
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-transparent/10"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
