import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Privacy Policy - Association of Indian Manufacturers",
  description:
    "Learn how AIM collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHeader
        title="Privacy Policy"
        subtitle="Your privacy is important to us"
        description="Learn how we collect, use, and protect your personal information."
      />

      {/* Privacy Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Privacy Policy
              </CardTitle>
              <p className="text-sm text-gray-600">
                Last updated on Sep 15, 2025
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="prose prose-lg max-w-none">
                <div className="space-y-8">
                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      1. Introduction
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      The Association of Indian Manufacturers (AIM) is committed
                      to protecting your privacy and personal information. This
                      Privacy Policy explains how we collect, use, disclose, and
                      safeguard your information when you visit our website or
                      use our services.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      2. Information We Collect
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Personal Information
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-2">
                          We may collect personal information that you
                          voluntarily provide to us when you:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                          <li>Register for membership</li>
                          <li>Apply for our services</li>
                          <li>Contact us through our website</li>
                          <li>Subscribe to our newsletter</li>
                          <li>Participate in our events</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-2">
                          This information may include your name, email address,
                          phone number, company name, address, and other
                          relevant details.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Automatically Collected Information
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          We may automatically collect certain information about
                          your device and usage patterns, including your IP
                          address, browser type, operating system, pages
                          visited, and time spent on our website.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      3. How We Use Your Information
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      We use the information we collect for various purposes,
                      including:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>Providing and maintaining our services</li>
                      <li>Processing membership applications and payments</li>
                      <li>
                        Communicating with you about our services and events
                      </li>
                      <li>Sending newsletters and promotional materials</li>
                      <li>Improving our website and services</li>
                      <li>Complying with legal obligations</li>
                      <li>Protecting against fraud and unauthorized access</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      4. Information Sharing and Disclosure
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      We do not sell, trade, or otherwise transfer your personal
                      information to third parties without your consent, except
                      in the following circumstances:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>
                        With service providers who assist us in operating our
                        website and conducting our business
                      </li>
                      <li>
                        When required by law or to protect our rights and safety
                      </li>
                      <li>
                        In connection with a business transfer or acquisition
                      </li>
                      <li>With your explicit consent</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      5. Data Security
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      We implement appropriate technical and organizational
                      security measures to protect your personal information
                      against unauthorized access, alteration, disclosure, or
                      destruction. However, no method of transmission over the
                      internet or electronic storage is 100% secure.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      6. Cookies and Tracking Technologies
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Our website may use cookies and similar tracking
                      technologies to enhance your browsing experience. You can
                      set your browser to refuse cookies, but this may limit
                      your ability to use certain features of our website.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      7. Your Rights
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Depending on your location, you may have certain rights
                      regarding your personal information, including:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>The right to access your personal information</li>
                      <li>The right to correct inaccurate information</li>
                      <li>The right to delete your personal information</li>
                      <li>
                        The right to restrict processing of your information
                      </li>
                      <li>The right to data portability</li>
                      <li>The right to object to processing</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      8. Data Retention
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      We retain your personal information only for as long as
                      necessary to fulfill the purposes outlined in this Privacy
                      Policy, unless a longer retention period is required or
                      permitted by law.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      9. Third-Party Links
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Our website may contain links to third-party websites. We
                      are not responsible for the privacy practices or content
                      of these external sites. We encourage you to review the
                      privacy policies of any third-party sites you visit.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      10. Children's Privacy
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Our services are not intended for children under 13 years
                      of age. We do not knowingly collect personal information
                      from children under 13. If you are a parent or guardian
                      and believe your child has provided us with personal
                      information, please contact us.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      11. Changes to This Privacy Policy
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      We may update this Privacy Policy from time to time. We
                      will notify you of any changes by posting the new Privacy
                      Policy on this page and updating the "Last updated" date.
                      We encourage you to review this Privacy Policy
                      periodically.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      12. Contact Us
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      If you have any questions about this Privacy Policy or our
                      privacy practices, please contact us:
                    </p>
                    <div className="mt-4 space-y-2">
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
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <a
                          href="mailto:office@aim.ind.in"
                          className="text-primary-600 hover:text-primary-700"
                        >
                          office@aim.ind.in
                        </a>
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
                          href="tel:+919415008282"
                          className="text-primary-600 hover:text-primary-700"
                        >
                          +91 7428382757
                        </a>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
