"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ApplyFormData } from "../types";

interface Step5ReviewProps {
  membershipType: string;
  formData: ApplyFormData;
  isSubmitting: boolean;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void> | void;
  prevStep: () => void;
  membershipPrice?: number;
}

export default function Step5Review({
  membershipType,
  formData,
  isSubmitting,
  handleCheckboxChange,
  handleSubmit,
  prevStep,
  membershipPrice,
}: Step5ReviewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Review Your Application
        </h3>
        <p className="text-gray-600 mb-6">
          Please review your application details before submitting:
        </p>
      </div>

      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-lg">Application Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 border-b pb-2">
              Membership Type
            </h4>
            <p className="text-gray-700 capitalize text-lg">
              {membershipType} Member
            </p>
            {membershipPrice && (
              <p className="text-green-600 font-semibold text-lg mt-2">
                Membership Fee: ₹{membershipPrice.toLocaleString()} + GST (18%)
              </p>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 border-b pb-2">
              Company Information
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Company Name:
                </span>
                <p className="text-gray-900">{formData.companyName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Company Type:
                </span>
                <p className="text-gray-900">{formData.companyType}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Company Category:
                </span>
                <p className="text-gray-900">{formData.companyCategory}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Type of Company:
                </span>
                <p className="text-gray-900">{formData.typeOfCompany}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Year of Establishment:
                </span>
                <p className="text-gray-900">{formData.yearOfEstablishment}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Legal Entity:
                </span>
                <p className="text-gray-900">{formData.legalEntity}</p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-600">
                  Website:
                </span>
                <p className="text-gray-900">
                  {formData.website || "Not provided"}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Social Media Handle:
                </span>
                <p className="text-gray-900">
                  {formData.socialMediaHandle || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 border-b pb-2">
              Company Address
            </h4>
            <p className="text-gray-900">
              {formData.address}, {formData.city}, {formData.state} -{" "}
              {formData.pincode}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 border-b pb-2">
              Government Registration Numbers
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-600">
                  GSTIN:
                </span>
                <p className="text-gray-900 font-mono">{formData.gstin}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  PAN Number:
                </span>
                <p className="text-gray-900 font-mono">{formData.panNo}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  TAN Number:
                </span>
                <p className="text-gray-900 font-mono">
                  {formData.tanNo || "Not provided"}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  CIN Number:
                </span>
                <p className="text-gray-900 font-mono">
                  {formData.registrationNumber || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 border-b pb-2">
              Company Profile
            </h4>
            <div>
              <span className="text-sm font-medium text-gray-600">
                Business Description:
              </span>
              <p className="text-gray-900 mt-1">
                {formData.companyProfile || "Not provided"}
              </p>
            </div>
            {formData.areasOfInterest &&
              formData.areasOfInterest.length > 0 && (
                <div className="mt-3">
                  <span className="text-sm font-medium text-gray-600">
                    Areas of Interest:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {formData.areasOfInterest.map((area, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 border-b pb-2">
              Primary Contact Person
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Name:</span>
                <p className="text-gray-900">
                  {formData.contactTitle} {formData.contactFirstName}{" "}
                  {formData.contactLastName}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Designation:
                </span>
                <p className="text-gray-900">{formData.contactDesignation}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Email:
                </span>
                <p className="text-gray-900">{formData.contactEmail}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Mobile:
                </span>
                <p className="text-gray-900">{formData.contactMobile}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 border-b pb-2">
              Company Head in India
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Name:</span>
                <p className="text-gray-900">
                  {formData.headTitle} {formData.headFirstName}{" "}
                  {formData.headLastName}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Designation:
                </span>
                <p className="text-gray-900">{formData.headDesignation}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Email:
                </span>
                <p className="text-gray-900">{formData.headEmail}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Mobile:
                </span>
                <p className="text-gray-900">{formData.headMobile}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Important Notes:</h4>
        <ul className="text-blue-800 space-y-1 text-sm">
          <li>
            • Your application will be reviewed by the Screening Committee
          </li>
          <li>
            • You may be contacted for additional information or documents
          </li>
          <li>• Processing time is typically 2-4 weeks</li>
          <li>• You will receive confirmation via email once approved</li>
        </ul>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="codeOfConduct"
            checked={formData.codeOfConduct}
            onChange={handleCheckboxChange}
            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            required
          />
          <div>
            <label className="text-sm text-gray-700">
              I have read the Code of Conduct as applicable to members of AIM
              and I agree to abide by them in its complete letter and spirit. *
            </label>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="privacyPolicy"
            checked={formData.privacyPolicy}
            onChange={handleCheckboxChange}
            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            required
          />
          <div>
            <label className="text-sm text-gray-700">
              By submitting the contact information, I am agreeing to receive
              communication from AIM. Privacy Policy can be accessed by Privacy
              Policy. *
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          disabled={
            !formData.codeOfConduct || !formData.privacyPolicy || isSubmitting
          }
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
}
