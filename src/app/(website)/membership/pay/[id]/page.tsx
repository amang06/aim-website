"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/sections/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function SubmitPaymentPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const membershipId = params?.id;
  const [amount, setAmount] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!membershipId) {
      alert("Missing membership ID");
      return;
    }
    if (!amount || !referenceId) {
      alert("Please provide amount and reference ID");
      return;
    }

    const uploadToMedia = async (file: File, alt: string) => {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("alt", alt);
      const res = await fetch("/api/media", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Failed to upload proof");
      const json = await res.json();
      return json?.doc?.id ?? json?.id;
    };

    try {
      setIsSubmitting(true);
      let paymentProofId: string | null = null;
      if (paymentProof) {
        paymentProofId = await uploadToMedia(paymentProof, "Payment Proof");
      }

      const payload: Record<string, unknown> = {
        member: membershipId,
        amount: Number(amount),
        referenceId,
        notes,
        paymentProof: paymentProofId,
      };

      const res = await fetch("/api/payment-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to submit payment");
      }

      alert(
        "Payment submitted! We will verify and activate your membership shortly."
      );
      router.push("/membership");
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong while submitting payment.";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Submit Membership Payment"
        subtitle="Payment Verification"
        description="Upload your payment details so our team can verify and activate your membership."
        height="small"
      />

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Membership ID
                  </label>
                  <input
                    type="text"
                    value={String(membershipId || "")}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (INR) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Reference ID *
                    </label>
                    <input
                      type="text"
                      value={referenceId}
                      onChange={(e) => setReferenceId(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Payment Proof (optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) =>
                      setPaymentProof(e.target.files?.[0] || null)
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Payment"}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
