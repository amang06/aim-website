"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/sections/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { XCircle, Mail, Phone, RefreshCw } from "lucide-react";

interface MemberData {
  id: string;
  companyName: string;
  membershipType: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactMobile: string;
  feeAmount: number;
}

export default function PaymentFailurePage() {
  const searchParams = useSearchParams();
  const memberId = searchParams.get("memberId");
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (memberId) {
      fetchMemberData();
    }
  }, [memberId]);

  const fetchMemberData = async () => {
    try {
      const response = await fetch(`/api/member-info/${memberId}`);
      if (response.ok) {
        const data = await response.json();
        setMemberData(data);
      }
    } catch (error) {
      console.error("Error fetching member data:", error);
    } finally {
      setLoading(false);
    }
  };

  const retryPayment = async () => {
    if (!memberData) return;

    try {
      const response = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          membershipType: memberData.membershipType,
          memberData: {
            contactFirstName: memberData.contactFirstName,
            contactLastName: memberData.contactLastName,
            contactEmail: memberData.contactEmail,
            contactMobile: memberData.contactMobile,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to PayU payment page
        const form = document.createElement("form");
        form.method = "POST";
        form.action = data.payuUrl;

        Object.entries(data.paymentData).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value as string;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      }
    } catch (error) {
      console.error("Error retrying payment:", error);
      alert("Failed to retry payment. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!memberData) {
    return (
      <div className="min-h-screen">
        <PageHeader
          title="Payment Error"
          subtitle="Something went wrong"
          description="We couldn't find your payment information. Please contact support."
          height="small"
        />
        <section className="py-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8 text-center">
                <p className="text-gray-600">
                  If you have any questions, please contact our support team.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Payment Failed"
        subtitle="Don't worry, you can try again"
        description="Your payment was not completed. You can retry the payment or contact us for assistance."
        height="small"
      />

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl text-red-900">
                Payment Failed
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Payment Not Completed
                </h3>
                <p className="text-gray-600">
                  We couldn't process your payment for the{" "}
                  {memberData.membershipType} membership. This could be due to
                  various reasons like insufficient funds, network issues, or
                  bank restrictions.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Application Details
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Company Name:
                    </span>
                    <p className="text-gray-900">{memberData.companyName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Membership Type:
                    </span>
                    <p className="text-gray-900 capitalize">
                      {memberData.membershipType} Member
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Amount:
                    </span>
                    <p className="text-gray-900 font-semibold">
                      ₹{memberData.feeAmount?.toLocaleString()} + GST (18%)
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Application ID:
                    </span>
                    <p className="text-gray-900 font-mono">{memberData.id}</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-yellow-900 mb-4">
                  Common reasons for payment failure:
                </h4>
                <div className="space-y-2 text-yellow-800">
                  <div className="flex items-start">
                    <span className="text-yellow-600 mr-3 mt-1">•</span>
                    <span>Insufficient funds in your account</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-yellow-600 mr-3 mt-1">•</span>
                    <span>Bank server issues or maintenance</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-yellow-600 mr-3 mt-1">•</span>
                    <span>Network connectivity problems</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-yellow-600 mr-3 mt-1">•</span>
                    <span>Transaction declined by your bank</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-yellow-600 mr-3 mt-1">•</span>
                    <span>Invalid card details or expired card</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={retryPayment}
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Retry Payment
                </button>
                <a
                  href="/membership/apply"
                  className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Start New Application
                </a>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-4">Need help?</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-blue-800">
                      Email us at{" "}
                      <a
                        href="mailto:support@aim.ind.in"
                        className="font-semibold hover:underline"
                      >
                        support@aim.ind.in
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-blue-800">
                      Call us at{" "}
                      <a
                        href="tel:+911234567890"
                        className="font-semibold hover:underline"
                      >
                        +91 12345 67890
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
