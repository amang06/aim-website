"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/sections/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { CheckCircle, Mail, Phone } from "lucide-react";

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

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const memberId = searchParams.get("memberId");
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (memberId) {
      fetchMemberData();
    }
  }, [memberId]);

  // Auto-download invoice after member data is loaded
  useEffect(() => {
    if (memberData && memberData.id) {
      // Trigger automatic download after a short delay
      const timer = setTimeout(() => {
        downloadInvoice();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [memberData]);

  const fetchMemberData = async () => {
    try {
      const response = await fetch(`/api/members/${memberId}`);
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

  const downloadInvoice = async () => {
    if (!memberId) return;

    try {
      const response = await fetch(`/api/invoice/${memberId}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `AIM_Invoice_${memberId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error("Failed to download invoice");
      }
    } catch (error) {
      console.error("Error downloading invoice:", error);
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
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-900">
                Payment Successful
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Thank you, {memberData.contactFirstName}!
                </h3>
                <p className="text-gray-600">
                  Your {memberData.membershipType} membership application has
                  been successfully submitted and payment has been received.
                </p>
              </div>

              <div className="mb-4 text-center">
                <button
                  onClick={downloadInvoice}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  📄 Download Invoice
                </button>
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
                      Amount Paid:
                    </span>
                    <p className="text-gray-900 font-semibold">
                      ₹{memberData.feeAmount?.toLocaleString()}
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

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-blue-900 mb-4">
                  What happens next?
                </h4>
                <div className="space-y-3 text-blue-800">
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">1.</span>
                    <span>
                      Our team will review your application within 2-4 business
                      days
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">2.</span>
                    <span>
                      You will receive a confirmation email with your membership
                      details
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">3.</span>
                    <span>
                      Your membership will be activated and you'll receive
                      access to all member benefits
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-green-900 mb-4">
                  Need help?
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-green-800">
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
                    <Phone className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-green-800">
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

              <div className="text-center space-y-4">
                <a
                  href="/membership"
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Return to Membership
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
