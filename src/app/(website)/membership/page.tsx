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

export default function MembershipPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Join AIM Membership"
        subtitle="Empowering Indian Manufacturers Together"
        description="Become part of India's premier manufacturing association and unlock opportunities for growth, networking, and advocacy."
        ctaText="Apply Now"
        ctaHref="/membership/apply"
        height="large"
      />

      {/* Membership Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Join AIM?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of manufacturers across India who trust AIM to
              represent their interests and drive industry growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-xl">Networking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Connect with industry leaders, potential partners, and
                  government officials through our extensive network.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary-600"
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
                </div>
                <CardTitle className="text-xl">Advocacy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Your voice matters. We represent manufacturers&apos; interests
                  at the highest levels of government and policy-making.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-xl">Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Access resources, training, and opportunities that help your
                  business scale and succeed in the competitive market.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Membership Types Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Membership Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the membership category that best fits your
              organization&apos;s profile and requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="border-primary-200 hover:shadow-lg transition-shadow">
              <CardHeader className="bg-primary-50">
                <CardTitle className="text-2xl text-primary-900">
                  Associate Members
                </CardTitle>
                <CardDescription className="text-primary-700">
                  For manufacturing and processing companies
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Manufacturing & processing companies
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    IT Sector companies
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Industrial activities & commodities
                  </li>
                </ul>
                <div className="mt-6">
                  <LearnMoreButton href="/membership/type" text="Learn More" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-2xl text-green-900">
                  Allied Members
                </CardTitle>
                <CardDescription className="text-green-700">
                  For service providers and consultants
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Consultancy services
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Professional services
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Non-manufacturing activities
                  </li>
                </ul>
                <div className="mt-6">
                  <LearnMoreButton href="/membership/type" text="Learn More" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader className="bg-purple-50">
                <CardTitle className="text-2xl text-purple-900">
                  Premier Members
                </CardTitle>
                <CardDescription className="text-purple-700">
                  For large organizations and MNCs
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    250 CR+ turnover organizations
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    Multinational companies
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    Premium membership benefits
                  </li>
                </ul>
                <div className="mt-6">
                  <LearnMoreButton href="/membership/type" text="Learn More" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join AIM?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Start your journey with AIM today and become part of India&apos;s
            most influential manufacturing association.
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
              className="bg-transparent hover:bg-transparent/20 border-white"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
