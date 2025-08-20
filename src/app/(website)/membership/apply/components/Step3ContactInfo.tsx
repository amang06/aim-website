"use client";

import React from "react";
import { ValidationErrors, ApplyFormData } from "../types";

interface Step3ContactInfoProps {
  formData: ApplyFormData;
  validationErrors: ValidationErrors;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step3ContactInfo({
  formData,
  validationErrors,
  handleInputChange,
  nextStep,
  prevStep,
}: Step3ContactInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Contact Information
        </h3>
        <p className="text-gray-600 mb-6">
          Please provide contact details for your organization:
        </p>
      </div>

      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Primary Contact Person
        </h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person Title *
            </label>
            <select
              name="contactTitle"
              value={formData.contactTitle}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                validationErrors.contactTitle
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              }`}
              required
            >
              <option value="">Select Title</option>
              <option value="mr">Mr.</option>
              <option value="ms">Ms.</option>
              <option value="mrs">Mrs.</option>
              <option value="dr">Dr.</option>
              <option value="prof">Prof.</option>
            </select>
            {validationErrors.contactTitle && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.contactTitle}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person First Name *
            </label>
            <input
              type="text"
              name="contactFirstName"
              value={formData.contactFirstName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                validationErrors.contactFirstName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              }`}
              required
            />
            {validationErrors.contactFirstName && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.contactFirstName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person Last Name *
            </label>
            <input
              type="text"
              name="contactLastName"
              value={formData.contactLastName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                validationErrors.contactLastName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              }`}
              required
            />
            {validationErrors.contactLastName && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.contactLastName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person Designation *
            </label>
            <input
              type="text"
              name="contactDesignation"
              value={formData.contactDesignation}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                validationErrors.contactDesignation
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              }`}
              required
            />
            {validationErrors.contactDesignation && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.contactDesignation}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email Address *
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                validationErrors.contactEmail
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              }`}
              required
            />
            {validationErrors.contactEmail && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.contactEmail}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Mobile Number *
            </label>
            <input
              type="tel"
              name="contactMobile"
              value={formData.contactMobile}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                validationErrors.contactMobile
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              }`}
              required
            />
            {validationErrors.contactMobile && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.contactMobile}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Company Head in India
        </h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Head Title *
            </label>
            <select
              name="headTitle"
              value={formData.headTitle}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                validationErrors.headTitle
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              }`}
              required
            >
              <option value="">Select Title</option>
              <option value="mr">Mr.</option>
              <option value="ms">Ms.</option>
              <option value="mrs">Mrs.</option>
              <option value="dr">Dr.</option>
              <option value="prof">Prof.</option>
              <option value="col">Col.</option>
              <option value="maj">Maj.</option>
              <option value="general">General</option>
              <option value="brig">Brig.</option>
            </select>
            {validationErrors.headTitle && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.headTitle}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Head First Name *
            </label>
            <input
              type="text"
              name="headFirstName"
              value={formData.headFirstName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                validationErrors.headFirstName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              }`}
              required
            />
            {validationErrors.headFirstName && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.headFirstName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Head Last Name *
            </label>
            <input
              type="text"
              name="headLastName"
              value={formData.headLastName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                validationErrors.headLastName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              }`}
              required
            />
            {validationErrors.headLastName && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.headLastName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Head Designation *
            </label>
            <input
              type="text"
              name="headDesignation"
              value={formData.headDesignation}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                validationErrors.headDesignation
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              }`}
              required
            />
            {validationErrors.headDesignation && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.headDesignation}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Head Email Address *
            </label>
            <input
              type="email"
              name="headEmail"
              value={formData.headEmail}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                validationErrors.headEmail
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              }`}
              required
            />
            {validationErrors.headEmail && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.headEmail}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Head Mobile Number *
            </label>
            <input
              type="tel"
              name="headMobile"
              value={formData.headMobile}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                validationErrors.headMobile
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              }`}
              required
            />
            {validationErrors.headMobile && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.headMobile}
              </p>
            )}
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
          onClick={nextStep}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Continue to Documents
        </button>
      </div>
    </div>
  );
}
