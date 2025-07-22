"use client";
import React, { useState } from "react";
import PageHeader from "@/components/sections/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import LearnMoreButton from "@/components/ui/LearnMoreButton";

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [membershipType, setMembershipType] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    businessType: "",
    turnover: "",
    registrationNumber: "",
    gstNumber: "",
    udyamNumber: "",
    factoryRegistration: "",
    powerConnection: "",
    pollutionClearance: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", { membershipType, formData });
    // Here you would typically send the data to your backend
    alert(
      "Application submitted successfully! We will review your application and contact you soon."
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Select Membership Type
        </h3>
        <p className="text-gray-600 mb-6">
          Choose the membership category that best fits your organization:
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card
          className={`cursor-pointer transition-all ${
            membershipType === "ordinary"
              ? "ring-2 ring-primary-500 bg-primary-50"
              : "hover:shadow-lg"
          }`}
          onClick={() => setMembershipType("ordinary")}
        >
          <CardHeader className="bg-primary-50">
            <CardTitle className="text-lg text-primary-900">
              Ordinary Member
            </CardTitle>
            <CardDescription className="text-primary-700">
              For manufacturing companies
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Manufacturing & processing companies</li>
              <li>• IT Sector companies</li>
              <li>• Industrial activities & commodities</li>
            </ul>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${
            membershipType === "associate"
              ? "ring-2 ring-green-500 bg-green-50"
              : "hover:shadow-lg"
          }`}
          onClick={() => setMembershipType("associate")}
        >
          <CardHeader className="bg-green-50">
            <CardTitle className="text-lg text-green-900">
              Associate Member
            </CardTitle>
            <CardDescription className="text-green-700">
              For service providers
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Consultancy services</li>
              <li>• Professional services</li>
              <li>• Non-manufacturing activities</li>
            </ul>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${
            membershipType === "corporate"
              ? "ring-2 ring-purple-500 bg-purple-50"
              : "hover:shadow-lg"
          }`}
          onClick={() => setMembershipType("corporate")}
        >
          <CardHeader className="bg-purple-50">
            <CardTitle className="text-lg text-purple-900">
              Corporate Member
            </CardTitle>
            <CardDescription className="text-purple-700">
              For large organizations
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 250 CR+ turnover</li>
              <li>• Multinational companies</li>
              <li>• Premium benefits</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {membershipType && (
        <div className="mt-6">
          <button
            onClick={nextStep}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Continue to Company Information
          </button>
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Company Information
        </h3>
        <p className="text-gray-600 mb-6">
                        Please provide your company&apos;s basic information:
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Person *
          </label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Address *
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PIN Code *
          </label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Type *
          </label>
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          >
            <option value="">Select Business Type</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="processing">Processing</option>
            <option value="assembling">Assembling</option>
            <option value="it">IT Services</option>
            <option value="consultancy">Consultancy</option>
            <option value="professional">Professional Services</option>
            <option value="other">Other</option>
          </select>
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
          onClick={nextStep}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Continue to Business Details
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Business Details
        </h3>
        <p className="text-gray-600 mb-6">
          Please provide your business details and registrations:
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Turnover (in Crores)
          </label>
          <input
            type="text"
            name="turnover"
            value={formData.turnover}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="e.g., 50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Registration Number
          </label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {membershipType === "ordinary" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GST Number
              </label>
              <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Udyam Registration Number
              </label>
              <input
                type="text"
                name="udyamNumber"
                value={formData.udyamNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Factory Registration Number
              </label>
              <input
                type="text"
                name="factoryRegistration"
                value={formData.factoryRegistration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Power Connection Type
              </label>
              <select
                name="powerConnection"
                value={formData.powerConnection}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select Power Connection</option>
                <option value="lmv6">LMV-6</option>
                <option value="hv2">HV2</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pollution Control Board Clearance
              </label>
              <input
                type="text"
                name="pollutionClearance"
                value={formData.pollutionClearance}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="NOC/Consent Number"
              />
            </div>
          </>
        )}
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Please describe your business activities, products/services, and why you want to join AIM..."
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Review Application
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
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
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Membership Type
              </h4>
              <p className="text-gray-700 capitalize">
                {membershipType} Member
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Company Name</h4>
              <p className="text-gray-700">{formData.companyName}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Contact Person
              </h4>
              <p className="text-gray-700">{formData.contactPerson}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
              <p className="text-gray-700">{formData.email}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Phone</h4>
              <p className="text-gray-700">{formData.phone}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Business Type
              </h4>
              <p className="text-gray-700 capitalize">
                {formData.businessType}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
            <p className="text-gray-700">
              {formData.address}, {formData.city}, {formData.state} -{" "}
              {formData.pincode}
            </p>
          </div>

          {formData.description && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Business Description
              </h4>
              <p className="text-gray-700">{formData.description}</p>
            </div>
          )}
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
        >
          Submit Application
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Apply for Membership"
        subtitle="Join AIM Today"
        description="Complete the application form to become a member of the Association of Indian Manufacturers."
        height="medium"
      />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`flex items-center ${
                  currentStep >= 1 ? "text-primary-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= 1
                      ? "bg-primary-600 border-primary-600 text-white"
                      : "border-gray-300"
                  }`}
                >
                  1
                </div>
                <span className="ml-2 font-medium">Select Type</span>
              </div>
              <div
                className={`flex-1 h-1 mx-4 ${
                  currentStep >= 2 ? "bg-primary-600" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`flex items-center ${
                  currentStep >= 2 ? "text-primary-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= 2
                      ? "bg-primary-600 border-primary-600 text-white"
                      : "border-gray-300"
                  }`}
                >
                  2
                </div>
                <span className="ml-2 font-medium">Company Info</span>
              </div>
              <div
                className={`flex-1 h-1 mx-4 ${
                  currentStep >= 3 ? "bg-primary-600" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`flex items-center ${
                  currentStep >= 3 ? "text-primary-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= 3
                      ? "bg-primary-600 border-primary-600 text-white"
                      : "border-gray-300"
                  }`}
                >
                  3
                </div>
                <span className="ml-2 font-medium">Business Details</span>
              </div>
              <div
                className={`flex-1 h-1 mx-4 ${
                  currentStep >= 4 ? "bg-primary-600" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`flex items-center ${
                  currentStep >= 4 ? "text-primary-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= 4
                      ? "bg-primary-600 border-primary-600 text-white"
                      : "border-gray-300"
                  }`}
                >
                  4
                </div>
                <span className="ml-2 font-medium">Review</span>
              </div>
            </div>
          </div>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Need help with your application?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LearnMoreButton
                href="/membership/eligibility"
                text="Check Eligibility"
                variant="outline"
              />
              <LearnMoreButton
                href="/contact"
                text="Contact Us"
                variant="outline"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
