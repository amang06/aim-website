import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Terms and Conditions - Association of Indian Manufacturers",
  description:
    "Read the terms and conditions for using AIM's website and services.",
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHeader
        title="Terms and Conditions"
        subtitle="Please read these terms carefully"
        description="These terms and conditions govern your use of our website and services."
      />

      {/* Terms Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Terms and Conditions
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
                      1. Acceptance of Terms
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      By accessing and using the Association of Indian
                      Manufacturers (AIM) website and services, you accept and
                      agree to be bound by the terms and provision of this
                      agreement. If you do not agree to abide by the above,
                      please do not use this service.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      2. Use License
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Permission is granted to temporarily download one copy of
                      the materials on AIM's website for personal,
                      non-commercial transitory viewing only. This is the grant
                      of a license, not a transfer of title, and under this
                      license you may not:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>modify or copy the materials</li>
                      <li>
                        use the materials for any commercial purpose or for any
                        public display (commercial or non-commercial)
                      </li>
                      <li>
                        attempt to decompile or reverse engineer any software
                        contained on AIM's website
                      </li>
                      <li>
                        remove any copyright or other proprietary notations from
                        the materials
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      3. Membership Terms
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      AIM membership is subject to the following terms:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>
                        Membership fees are non-refundable except as specified
                        in our cancellation policy
                      </li>
                      <li>
                        Members must provide accurate and complete information
                        during registration
                      </li>
                      <li>
                        Members are responsible for maintaining the
                        confidentiality of their account
                      </li>
                      <li>
                        AIM reserves the right to suspend or terminate
                        membership for violations of these terms
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      4. Privacy Policy
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Your privacy is important to us. Please review our Privacy
                      Policy, which also governs your use of the website, to
                      understand our practices.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      5. Intellectual Property Rights
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Other than the content you own, under these Terms, AIM
                      and/or its licensors own all the intellectual property
                      rights and materials contained in this website. You are
                      granted limited license only for purposes of viewing the
                      material contained on this website.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      6. Restrictions
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      You are specifically restricted from all of the following:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>
                        publishing any website material in any other media
                      </li>
                      <li>
                        selling, sublicensing and/or otherwise commercializing
                        any website material
                      </li>
                      <li>
                        publicly performing and/or showing any website material
                      </li>
                      <li>
                        using this website in any way that is or may be damaging
                        to this website
                      </li>
                      <li>
                        using this website contrary to applicable laws and
                        regulations
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      7. Disclaimer
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      The information on this website is provided on an 'as is'
                      basis. To the fullest extent permitted by law, this
                      Association excludes all representations, warranties,
                      conditions and terms relating to our website and the use
                      of this website.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      8. Limitation of Liability
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      In no event shall AIM, nor its directors, employees,
                      partners, agents, suppliers, or affiliates, be liable for
                      any indirect, incidental, special, consequential, or
                      punitive damages, including without limitation, loss of
                      profits, data, use, goodwill, or other intangible losses,
                      resulting from your use of the website.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      9. Governing Law
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      These Terms shall be interpreted and governed by the laws
                      of India. Any disputes relating to these terms will be
                      subject to the exclusive jurisdiction of the courts of
                      India.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      10. Changes to Terms
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      AIM reserves the right, at its sole discretion, to modify
                      or replace these Terms at any time. If a revision is
                      material, we will try to provide at least 30 days notice
                      prior to any new terms taking effect.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      11. Contact Information
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      If you have any questions about these Terms and
                      Conditions, please contact us at office@aim.ind.in or call
                      us at +91 7428382757.
                    </p>
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
