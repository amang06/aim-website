"use client";

import React from "react";
import { ValidationErrors, ApplyFormData } from "../types";

interface Step2CompanyInfoProps {
  formData: ApplyFormData;
  validationErrors: ValidationErrors;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step2CompanyInfo({
  formData,
  validationErrors,
  handleInputChange,
  nextStep,
  prevStep,
}: Step2CompanyInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Company Information</h3>
        <p className="text-gray-600 mb-6">Please provide your company&apos;s basic information:</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.companyName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary-500"
            }`}
            required
          />
          {validationErrors.companyName && <p className="text-red-500 text-sm mt-1">{validationErrors.companyName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Type *</label>
          <select
            name="companyType"
            value={formData.companyType}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.companyType ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary-500"
            }`}
            required
          >
            <option value="">Select Company Type</option>
            <option value="mnc">MNC</option>
            <option value="gcc">GCC/Captive</option>
            <option value="indian">Indian</option>
          </select>
          {validationErrors.companyType && <p className="text-red-500 text-sm mt-1">{validationErrors.companyType}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Category *</label>
          <select
            name="companyCategory"
            value={formData.companyCategory}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.companyCategory ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary-500"
            }`}
            required
          >
            <option value="">Select Category</option>
            <option value="automotive">Automotive & Auto Components</option>
            <option value="electronics">Electronics & Electrical Equipment</option>
            <option value="textiles">Textiles & Apparel</option>
            <option value="pharmaceuticals">Pharmaceuticals & Healthcare</option>
            <option value="chemicals">Chemicals & Petrochemicals</option>
            <option value="steel">Steel & Metal Products</option>
            <option value="cement">Cement & Construction Materials</option>
            <option value="food">Food Processing & Beverages</option>
            <option value="machinery">Machinery & Industrial Equipment</option>
            <option value="aerospace">Aerospace & Defense</option>
            <option value="renewable">Renewable Energy Equipment</option>
            <option value="telecom">Telecommunications Equipment</option>
            <option value="it-software">IT & Software Development</option>
            <option value="consultancy">Consultancy & Professional Services</option>
            <option value="other-manufacturing">Other Manufacturing</option>
          </select>
          {validationErrors.companyCategory && <p className="text-red-500 text-sm mt-1">{validationErrors.companyCategory}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type of Company *</label>
          <select
            name="typeOfCompany"
            value={formData.typeOfCompany}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.typeOfCompany ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary-500"
            }`}
            required
          >
            <option value="">Select Type</option>
            <option value="original-equipment">Original Equipment Manufacturer (OEM)</option>
            <option value="contract-manufacturing">Contract Manufacturing</option>
            <option value="component-supplier">Component & Parts Supplier</option>
            <option value="raw-material">Raw Material Processing</option>
            <option value="assembly-line">Assembly & Production Line</option>
            <option value="precision-manufacturing">Precision Manufacturing</option>
            <option value="heavy-industry">Heavy Industry Manufacturing</option>
            <option value="light-industry">Light Industry Manufacturing</option>
            <option value="custom-manufacturing">Custom Manufacturing</option>
            <option value="batch-production">Batch Production</option>
            <option value="mass-production">Mass Production</option>
            <option value="professional-services">Professional Services (IT, Software, Consultancy)</option>
            <option value="other-manufacturing-type">Other Manufacturing Type</option>
          </select>
          {validationErrors.typeOfCompany && <p className="text-red-500 text-sm mt-1">{validationErrors.typeOfCompany}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.city ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary-500"
            }`}
            required
          />
          {validationErrors.city && <p className="text-red-500 text-sm mt-1">{validationErrors.city}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.state ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary-500"
            }`}
            required
          >
            <option value="">Select State</option>
            <option value="andhra-pradesh">Andhra Pradesh</option>
            <option value="arunachal-pradesh">Arunachal Pradesh</option>
            <option value="assam">Assam</option>
            <option value="bihar">Bihar</option>
            <option value="chhattisgarh">Chhattisgarh</option>
            <option value="delhi">Delhi</option>
            <option value="goa">Goa</option>
            <option value="gujarat">Gujarat</option>
            <option value="haryana">Haryana</option>
            <option value="himachal-pradesh">Himachal Pradesh</option>
            <option value="jharkhand">Jharkhand</option>
            <option value="karnataka">Karnataka</option>
            <option value="kerala">Kerala</option>
            <option value="madhya-pradesh">Madhya Pradesh</option>
            <option value="maharashtra">Maharashtra</option>
            <option value="manipur">Manipur</option>
            <option value="meghalaya">Meghalaya</option>
            <option value="mizoram">Mizoram</option>
            <option value="nagaland">Nagaland</option>
            <option value="odisha">Odisha</option>
            <option value="punjab">Punjab</option>
            <option value="rajasthan">Rajasthan</option>
            <option value="sikkim">Sikkim</option>
            <option value="tamil-nadu">Tamil Nadu</option>
            <option value="telangana">Telangana</option>
            <option value="tripura">Tripura</option>
            <option value="uttar-pradesh">Uttar Pradesh</option>
            <option value="uttarakhand">Uttarakhand</option>
            <option value="west-bengal">West Bengal</option>
          </select>
          {validationErrors.state && <p className="text-red-500 text-sm mt-1">{validationErrors.state}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Address *</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.address ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary-500"
            }`}
            required
          />
          {validationErrors.address && <p className="text-red-500 text-sm mt-1">{validationErrors.address}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.pincode ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary-500"
            }`}
            required
          />
          {validationErrors.pincode && <p className="text-red-500 text-sm mt-1">{validationErrors.pincode}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">GSTIN *</label>
          <input
            type="text"
            name="gstin"
            value={formData.gstin}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.gstin ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary-500"
            }`}
            placeholder="22AAAAA0000A1Z5"
            required
          />
          {validationErrors.gstin && <p className="text-red-500 text-sm mt-1">{validationErrors.gstin}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">TAN Number</label>
          <input
            type="text"
            name="tanNo"
            value={formData.tanNo}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              validationErrors.tanNo ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary-500"
            }`}
            placeholder="ABCD12345E"
          />
          {validationErrors.tanNo && <p className="text-red-500 text-sm mt-1">{validationErrors.tanNo}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number *</label>
          <input
            type="text"
            name="panNo"
            value={formData.panNo}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.panNo ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary-500"
            }`}
            placeholder="ABCDE1234F"
            required
          />
          {validationErrors.panNo && <p className="text-red-500 text-sm mt-1">{validationErrors.panNo}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Registration Number (CIN) *</label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.registrationNumber ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary-500"
            }`}
            placeholder="L12345AB1234567890"
            required
          />
          {validationErrors.registrationNumber && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.registrationNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Year of Establishment in India *</label>
          <select
            name="yearOfEstablishment"
            value={formData.yearOfEstablishment}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.yearOfEstablishment ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary-500"
            }`}
            required
          >
            <option value="">Select Year</option>
            {Array.from({ length: 75 }, (_, i) => 1950 + i).map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
          {validationErrors.yearOfEstablishment && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.yearOfEstablishment}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Legal Entity *</label>
          <select
            name="legalEntity"
            value={formData.legalEntity}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.legalEntity ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary-500"
            }`}
            required
          >
            <option value="">Select Legal Entity</option>
            <option value="private-limited">Private Limited</option>
            <option value="public-limited">Public Limited</option>
            <option value="proprietorship">Proprietorship</option>
            <option value="partnership">Partnership Firm</option>
            <option value="llp">LLP</option>
            <option value="society">Society</option>
            <option value="liaison-office">Liaison Office</option>
            <option value="trust">Trust</option>
            <option value="government">Government Organization</option>
          </select>
          {validationErrors.legalEntity && <p className="text-red-500 text-sm mt-1">{validationErrors.legalEntity}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Handle</label>
          <input
            type="text"
            name="socialMediaHandle"
            value={formData.socialMediaHandle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="@companyhandle"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Company Profile</h4>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Description *</label>
          <textarea
            name="companyProfile"
            value={formData.companyProfile}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.companyProfile ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary-500"
            }`}
            placeholder="Describe your company's business activities, products/services, and market presence..."
            required
          />
          {validationErrors.companyProfile && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.companyProfile}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={prevStep} className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors">
          Previous
        </button>
        <button onClick={nextStep} className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
          Continue to Contact Info
        </button>
      </div>
    </div>
  );
}


