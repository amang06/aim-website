import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy - Association of Indian Manufacturers",
  description:
    "Learn about AIM's cancellation and refund policy for membership fees and services.",
};

export default function CancellationRefundsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHeader
        title="Cancellation & Refund Policy"
        subtitle="Our commitment to fair and transparent policies"
        description="Learn about our cancellation and refund policies for membership fees and services."
      />

      {/* Policy Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Cancellation & Refund Policy
              </CardTitle>
              <p className="text-sm text-gray-600">
                Last updated on Sep 15, 2025
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  ASSOCIATION OF INDIAN MANUFACTURERS believes in helping its
                  customers as far as possible, and has therefore a liberal
                  cancellation policy. Under this policy:
                </p>

                <div className="space-y-6 mt-8">
                  <div className="border-l-4 border-primary-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      General Cancellation Policy
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Cancellations will be considered only if the request is
                      made within Not Applicable of placing the order. However,
                      the cancellation request may not be entertained if the
                      orders have been communicated to the vendors/merchants and
                      they have initiated the process of shipping them.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Perishable Items
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      ASSOCIATION OF INDIAN MANUFACTURERS does not accept
                      cancellation requests for perishable items like flowers,
                      eatables etc. However, refund/replacement can be made if
                      the customer establishes that the quality of product
                      delivered is not good.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Damaged or Defective Items
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      In case of receipt of damaged or defective items please
                      report the same to our Customer Service team. The request
                      will, however, be entertained once the merchant has
                      checked and determined the same at his own end. This
                      should be reported within Not Applicable of receipt of the
                      products.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Product Quality Issues
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      In case you feel that the product received is not as shown
                      on the site or as per your expectations, you must bring it
                      to the notice of our customer service within Not
                      Applicable of receiving the product. The Customer Service
                      Team after looking into your complaint will take an
                      appropriate decision.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Warranty Items
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      In case of complaints regarding products that come with a
                      warranty from manufacturers, please refer the issue to
                      them.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Refund Processing
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      In case of any Refunds approved by the ASSOCIATION OF
                      INDIAN MANUFACTURERS, it'll take Not Applicable for the
                      refund to be processed to the end customer.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  If you have any questions about our cancellation and refund
                  policy, please don't hesitate to contact us:
                </p>
                <div className="space-y-2">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
