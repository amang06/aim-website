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

export default function EligibilityPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Membership Eligibility"
        subtitle="Requirements & Criteria"
        description="Understand the eligibility criteria and requirements for different AIM membership categories."
        ctaText="Apply Now"
        ctaHref="/membership/apply"
        height="medium"
      />

      {/* General Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              General Eligibility Information
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The Association shall admit Ordinary/Associate/Corporate members
              from all or any of the following categories. However, the
              membership of the Association shall be subject to final approval
              by Screening Committee.
            </p>
          </div>

          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-primary-50 border-b">
              <CardTitle className="text-2xl text-primary-900">
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Screening Committee Approval
                  </h3>
                  <p className="text-gray-700">
                    All membership applications are subject to final approval by
                    the Screening Committee. The committee evaluates
                    applications based on eligibility criteria and
                    organizational fit.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Documentation Requirements
                  </h3>
                  <p className="text-gray-700">
                    Applicants must provide all required documentation and
                    certifications as specified for their membership category.
                    Incomplete applications may be rejected.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ordinary Members Eligibility */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mb-4">
                Category A
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ordinary Members Eligibility
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Eligible Organizations
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-3 mt-1">•</span>
                      <span>
                        Any company/firm engaged in manufacturing and
                        processing, assembling & other industrial activities and
                        commodities
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

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Required Registrations
                  </h3>
                  <p className="text-gray-600 mb-4">
                    All manufacturing units must have any of the following 4
                    valid registrations:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <span className="text-primary-600 font-semibold mr-3 mt-0.5">
                        a)
                      </span>
                      <div>
                        <span className="font-medium text-gray-900">
                          Udyam registration
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          MSME registration under Udyam portal
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <span className="text-primary-600 font-semibold mr-3 mt-0.5">
                        b)
                      </span>
                      <div>
                        <span className="font-medium text-gray-900">
                          GST Registration as manufacturing Industries
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          Valid GST registration for manufacturing activities
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <span className="text-primary-600 font-semibold mr-3 mt-0.5">
                        c)
                      </span>
                      <div>
                        <span className="font-medium text-gray-900">
                          Either LMV-6 or HV2 Power Connection
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          Industrial power connection documentation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <span className="text-primary-600 font-semibold mr-3 mt-0.5">
                        d)
                      </span>
                      <div>
                        <span className="font-medium text-gray-900">
                          Registered with Director of Factories
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          Factory registration certificate
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <span className="text-primary-600 font-semibold mr-3 mt-0.5">
                        e)
                      </span>
                      <div>
                        <span className="font-medium text-gray-900">
                          Having Consent /NOC From Pollution control board
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          Environmental clearance certificate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:pl-8">
              <Card className="bg-white shadow-lg sticky top-8">
                <CardHeader className="bg-primary-50 border-b">
                  <CardTitle className="text-2xl text-primary-900">
                    Ordinary Member Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        Company engaged in manufacturing/processing activities
                      </span>
                    </div>
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        Valid business registration
                      </span>
                    </div>
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        At least 4 of the required registrations
                      </span>
                    </div>
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        Udyam registration (if applicable)
                      </span>
                    </div>
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        GST registration for manufacturing
                      </span>
                    </div>
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        Industrial power connection
                      </span>
                    </div>
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        Factory registration
                      </span>
                    </div>
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        Pollution control board clearance
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t">
                    <JoinAIMButton
                      href="/membership/apply"
                      text="Apply as Ordinary Member"
                      className="bg-primary-600 text-white hover:bg-primary-700"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Associate Members Eligibility */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="lg:order-2">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                Category B
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Associate Members Eligibility
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Eligible Organizations
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3 mt-1">•</span>
                      <span>
                        Any company/firm/individual engaged in imparting
                        services like consultancy
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

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Requirements
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <span className="text-green-600 font-semibold mr-3 mt-0.5">
                        •
                      </span>
                      <div>
                        <span className="font-medium text-gray-900">
                          Valid business registration
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          Company registration, partnership deed, or
                          proprietorship certificate
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <span className="text-green-600 font-semibold mr-3 mt-0.5">
                        •
                      </span>
                      <div>
                        <span className="font-medium text-gray-900">
                          Professional credentials
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          Relevant professional certifications and licenses
                          (where applicable)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <span className="text-green-600 font-semibold mr-3 mt-0.5">
                        •
                      </span>
                      <div>
                        <span className="font-medium text-gray-900">
                          Good standing in the industry
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          No pending legal issues or regulatory violations
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <span className="text-green-600 font-semibold mr-3 mt-0.5">
                        •
                      </span>
                      <div>
                        <span className="font-medium text-gray-900">
                          Service-oriented business model
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          Primary business should be service provision, not
                          manufacturing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:order-1 lg:pr-8">
              <Card className="bg-white shadow-lg sticky top-8">
                <CardHeader className="bg-green-50 border-b">
                  <CardTitle className="text-2xl text-green-900">
                    Associate Member Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        Service-oriented business model
                      </span>
                    </div>
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        Valid business registration
                      </span>
                    </div>
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        Professional credentials (if applicable)
                      </span>
                    </div>
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        Good industry standing
                      </span>
                    </div>
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        No pending legal issues
                      </span>
                    </div>
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        Compliance with regulations
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t">
                    <JoinAIMButton
                      href="/membership/apply"
                      text="Apply as Associate Member"
                      className="bg-green-600 text-white hover:bg-green-700"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Members Eligibility */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mb-4">
                Category C
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Corporate Members Eligibility
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Eligible Organizations
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-3 mt-1">•</span>
                      <span>
                        Organizations with a turnover of 250 CR & above
                      </span>
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

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Requirements
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <span className="text-purple-600 font-semibold mr-3 mt-0.5">
                        •
                      </span>
                      <div>
                        <span className="font-medium text-gray-900">
                          Minimum turnover of 250 Crore Rupees
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          Audited financial statements showing annual turnover
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <span className="text-purple-600 font-semibold mr-3 mt-0.5">
                        •
                      </span>
                      <div>
                        <span className="font-medium text-gray-900">
                          Valid business registration and compliance
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          All statutory registrations and compliance
                          certificates
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <span className="text-purple-600 font-semibold mr-3 mt-0.5">
                        •
                      </span>
                      <div>
                        <span className="font-medium text-gray-900">
                          Good corporate governance record
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          Clean track record with no major regulatory violations
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <span className="text-purple-600 font-semibold mr-3 mt-0.5">
                        •
                      </span>
                      <div>
                        <span className="font-medium text-gray-900">
                          Established market presence
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          Significant market share and industry influence
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:pl-8">
              <Card className="bg-white shadow-lg sticky top-8">
                <CardHeader className="bg-purple-50 border-b">
                  <CardTitle className="text-2xl text-purple-900">
                    Corporate Member Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        Turnover of 250 CR+ annually
                      </span>
                    </div>
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        Valid business registration
                      </span>
                    </div>
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        All statutory compliances
                      </span>
                    </div>
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        Good corporate governance
                      </span>
                    </div>
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        Established market presence
                      </span>
                    </div>
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">
                        Audited financial statements
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t">
                    <JoinAIMButton
                      href="/membership/apply"
                      text="Apply as Corporate Member"
                      className="bg-purple-600 text-white hover:bg-purple-700"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Special Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Special Membership Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Special membership categories for individuals and organizations
              that contribute significantly to the manufacturing sector.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-white shadow-lg">
              <CardHeader className="bg-orange-50 border-b">
                <CardTitle className="text-2xl text-orange-900">
                  Individual Members
                </CardTitle>
                <CardDescription className="text-orange-700">
                  For individuals contributing to the sector
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    The Screening Committee can enroll individuals who have
                    contributed or are competent to contribute their services
                    for the benefit and performance of the society&apos;s objectives.
                  </p>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Requirements:
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>
                          Significant contribution to manufacturing sector
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>Professional expertise and experience</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>Screening Committee approval</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>Membership valid for financial year only</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader className="bg-indigo-50 border-b">
                <CardTitle className="text-2xl text-indigo-900">
                  Life Members & Patrons
                </CardTitle>
                <CardDescription className="text-indigo-700">
                  For long-term supporters
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    The Screening Committee can also enroll life members as well
                    as patrons of the society for those who demonstrate
                    exceptional commitment to the manufacturing sector.
                  </p>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Requirements:
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        <span>
                          Exceptional contribution to manufacturing sector
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        <span>Long-term commitment to AIM objectives</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        <span>Screening Committee approval</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        <span>Lifetime membership benefits</span>
                      </li>
                    </ul>
                  </div>
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
            Ready to Apply?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            If you meet the eligibility criteria, start your application process
            today and join AIM&apos;s growing network of manufacturers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LearnMoreButton
              href="/membership/type"
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100"
              text="Learn About Types"
            />
            <JoinAIMButton
              href="/membership/apply"
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
