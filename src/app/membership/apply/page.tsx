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
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [formData, setFormData] = useState({
    // Company Details
    companyName: "",
    companyType: "",
    companyCategory: "",
    typeOfCompany: "",
    city: "",
    state: "",
    address: "",
    pincode: "",
    website: "",
    gstin: "",
    tanNo: "",
    panNo: "",
    yearOfEstablishment: "",
    legalEntity: "",
    globalHeadquarters: "",
    socialMediaHandle: "",

    // Contact Details
    contactDesignation: "",
    contactTitle: "",
    contactFirstName: "",
    contactLastName: "",
    contactMobile: "",
    contactEmail: "",

    // Company Head in India
    headDesignation: "",
    headTitle: "",
    headFirstName: "",
    headLastName: "",
    headMobile: "",
    headEmail: "",

    // Company Profile
    companyProfile: "",
    areasOfInterest: [] as string[],

    // Revenue & Employee Details
    totalEmployees: "",
    employeeYear: "",
    totalRevenue: "",
    revenueYear: "",

    // Business Details
    businessType: "",
    turnover: "",
    registrationNumber: "",
    gstNumber: "",
    udyamNumber: "",
    factoryRegistration: "",
    powerConnection: "",
    pollutionClearance: "",
    description: "",

    // Documents
    memorandumArticle: null as File | null,
    auditedBalanceSheet: null as File | null,

    // Terms & Conditions
    codeOfConduct: false,
    privacyPolicy: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Validate specific fields
      let error = "";
      if (name === "gstin" && value) {
        if (!validateGSTIN(value.toUpperCase())) {
          error = "Invalid GSTIN format";
        }
      } else if (name === "tanNo" && value) {
        if (!validateTAN(value.toUpperCase())) {
          error = "Invalid TAN format";
        }
      } else if (name === "registrationNumber" && value) {
        const upperValue = value.toUpperCase();
        if (!validateCIN(upperValue)) {
          error = "Invalid CIN format";
        }
      } else if (name === "panNo" && value) {
        if (!validatePAN(value.toUpperCase())) {
          error = "Invalid PAN format";
        }
      }

      setValidationErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  // Validation functions for standard formats
  const validateGSTIN = (gstin: string): boolean => {
    // GSTIN format: 2 digits + 10 digits PAN + 1 digit entity + 1 digit check sum
    const gstinRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstinRegex.test(gstin);
  };

  const validateTAN = (tan: string): boolean => {
    // TAN format: 4 alphabets + 5 digits + 1 alphabet
    const tanRegex = /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/;
    return tanRegex.test(tan);
  };

  const validateCIN = (cin: string): boolean => {
    // Correct regex for CIN validation
    const cinRegex =
      /^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/;
    return cinRegex.test(cin);
  };

  const validatePAN = (pan: string): boolean => {
    // PAN format: 5 alphabets + 4 digits + 1 alphabet
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    if (name === "areasOfInterest") {
      setFormData((prev) => ({
        ...prev,
        areasOfInterest: checked
          ? [...prev.areasOfInterest, value]
          : prev.areasOfInterest.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const errors: { [key: string]: string } = {};

    switch (step) {
      case 1:
        if (!membershipType) {
          errors.membershipType = "Please select a membership type";
        }
        break;

      case 2:
        if (!formData.companyName)
          errors.companyName = "Company name is required";
        if (!formData.companyType)
          errors.companyType = "Company type is required";
        if (!formData.companyCategory)
          errors.companyCategory = "Company category is required";
        if (!formData.typeOfCompany)
          errors.typeOfCompany = "Type of company is required";
        if (!formData.city) errors.city = "City is required";
        if (!formData.state) errors.state = "State is required";
        if (!formData.address) errors.address = "Address is required";
        if (!formData.pincode) errors.pincode = "Pincode is required";
        if (!formData.gstin) errors.gstin = "GSTIN is required";
        if (!formData.panNo) errors.panNo = "PAN number is required";
        if (!formData.yearOfEstablishment)
          errors.yearOfEstablishment = "Year of establishment is required";
        if (!formData.legalEntity)
          errors.legalEntity = "Legal entity is required";
        if (!formData.registrationNumber)
          errors.registrationNumber = "CIN number is required";
        if (!formData.companyProfile)
          errors.companyProfile = "Company profile is required";
        break;

      case 3:
        if (!formData.contactTitle)
          errors.contactTitle = "Contact title is required";
        if (!formData.contactFirstName)
          errors.contactFirstName = "Contact first name is required";
        if (!formData.contactLastName)
          errors.contactLastName = "Contact last name is required";
        if (!formData.contactDesignation)
          errors.contactDesignation = "Contact designation is required";
        if (!formData.contactEmail)
          errors.contactEmail = "Contact email is required";
        if (!formData.contactMobile)
          errors.contactMobile = "Contact mobile is required";
        if (!formData.headTitle) errors.headTitle = "Head title is required";
        if (!formData.headFirstName)
          errors.headFirstName = "Head first name is required";
        if (!formData.headLastName)
          errors.headLastName = "Head last name is required";
        if (!formData.headDesignation)
          errors.headDesignation = "Head designation is required";
        if (!formData.headEmail) errors.headEmail = "Head email is required";
        if (!formData.headMobile) errors.headMobile = "Head mobile is required";
        break;

      case 4:
        if (!formData.memorandumArticle)
          errors.memorandumArticle =
            "Memorandum & Article of Association is required";
        if (!formData.auditedBalanceSheet)
          errors.auditedBalanceSheet = "Audited Balance Sheet is required";
        break;
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return false;
    }

    setValidationErrors({});
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    const errors: { [key: string]: string } = {};

    // Validate GSTIN
    if (!formData.gstin) {
      errors.gstin = "GSTIN is required";
    } else if (!validateGSTIN(formData.gstin.toUpperCase())) {
      errors.gstin = "Invalid GSTIN format";
    }

    // Validate PAN
    if (!formData.panNo) {
      errors.panNo = "PAN Number is required";
    } else if (!validatePAN(formData.panNo.toUpperCase())) {
      errors.panNo = "Invalid PAN format";
    }

    // Validate TAN if provided
    if (formData.tanNo && !validateTAN(formData.tanNo.toUpperCase())) {
      errors.tanNo = "Invalid TAN format";
    }

    // Validate CIN if provided
    if (
      formData.registrationNumber &&
      !validateCIN(formData.registrationNumber.toUpperCase())
    ) {
      errors.registrationNumber =
        "Invalid CIN format";
    }

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      alert("Please correct the validation errors before submitting.");
      return;
    }

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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.companyName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
            required
          />
          {validationErrors.companyName && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.companyName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Type *
          </label>
          <select
            name="companyType"
            value={formData.companyType}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.companyType
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
            required
          >
            <option value="">Select Company Type</option>
            <option value="mnc">MNC</option>
            <option value="gcc">GCC/Captive</option>
            <option value="indian">Indian</option>
          </select>
          {validationErrors.companyType && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.companyType}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Category *
          </label>
          <select
            name="companyCategory"
            value={formData.companyCategory}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.companyCategory
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
            required
          >
            <option value="">Select Category</option>
            <option value="automotive">Automotive & Auto Components</option>
            <option value="electronics">
              Electronics & Electrical Equipment
            </option>
            <option value="textiles">Textiles & Apparel</option>
            <option value="pharmaceuticals">
              Pharmaceuticals & Healthcare
            </option>
            <option value="chemicals">Chemicals & Petrochemicals</option>
            <option value="steel">Steel & Metal Products</option>
            <option value="cement">Cement & Construction Materials</option>
            <option value="food">Food Processing & Beverages</option>
            <option value="machinery">Machinery & Industrial Equipment</option>
            <option value="aerospace">Aerospace & Defense</option>
            <option value="renewable">Renewable Energy Equipment</option>
            <option value="telecom">Telecommunications Equipment</option>
            <option value="it-software">IT & Software Development</option>
            <option value="consultancy">
              Consultancy & Professional Services
            </option>
            <option value="other-manufacturing">Other Manufacturing</option>
          </select>
          {validationErrors.companyCategory && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.companyCategory}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of Company *
          </label>
          <select
            name="typeOfCompany"
            value={formData.typeOfCompany}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.typeOfCompany
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
            required
          >
            <option value="">Select Type</option>
            <option value="original-equipment">
              Original Equipment Manufacturer (OEM)
            </option>
            <option value="contract-manufacturing">
              Contract Manufacturing
            </option>
            <option value="component-supplier">
              Component & Parts Supplier
            </option>
            <option value="raw-material">Raw Material Processing</option>
            <option value="assembly-line">Assembly & Production Line</option>
            <option value="precision-manufacturing">
              Precision Manufacturing
            </option>
            <option value="heavy-industry">Heavy Industry Manufacturing</option>
            <option value="light-industry">Light Industry Manufacturing</option>
            <option value="custom-manufacturing">Custom Manufacturing</option>
            <option value="batch-production">Batch Production</option>
            <option value="mass-production">Mass Production</option>
            <option value="professional-services">
              Professional Services (IT, Software, Consultancy)
            </option>
            <option value="other-manufacturing-type">
              Other Manufacturing Type
            </option>
          </select>
          {validationErrors.typeOfCompany && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.typeOfCompany}
            </p>
          )}
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.city
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
            required
          />
          {validationErrors.city && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.state
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
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
          {validationErrors.state && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.state}
            </p>
          )}
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.address
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
            required
          />
          {validationErrors.address && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.address}
            </p>
          )}
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.pincode
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
            required
          />
          {validationErrors.pincode && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.pincode}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GSTIN *
          </label>
          <input
            type="text"
            name="gstin"
            value={formData.gstin}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.gstin
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
            placeholder="22AAAAA0000A1Z5"
            required
          />
          {validationErrors.gstin && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.gstin}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            TAN Number
          </label>
          <input
            type="text"
            name="tanNo"
            value={formData.tanNo}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              validationErrors.tanNo
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
            placeholder="ABCD12345E"
          />
          {validationErrors.tanNo && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.tanNo}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PAN Number *
          </label>
          <input
            type="text"
            name="panNo"
            value={formData.panNo}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.panNo
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
            placeholder="ABCDE1234F"
            required
          />
          {validationErrors.panNo && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.panNo}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Registration Number (CIN) *
          </label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.registrationNumber
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
            placeholder="L12345AB1234567890"
            required
          />
          {validationErrors.registrationNumber && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.registrationNumber}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year of Establishment in India *
          </label>
          <select
            name="yearOfEstablishment"
            value={formData.yearOfEstablishment}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.yearOfEstablishment
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
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
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.yearOfEstablishment}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Legal Entity *
          </label>
          <select
            name="legalEntity"
            value={formData.legalEntity}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.legalEntity
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
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
          {validationErrors.legalEntity && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.legalEntity}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Social Media Handle
          </label>
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

      {/* Company Profile */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Company Profile
        </h4>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Description *
          </label>
          <textarea
            name="companyProfile"
            value={formData.companyProfile}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.companyProfile
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
            placeholder="Describe your company's business activities, products/services, and market presence..."
            required
          />
          {validationErrors.companyProfile && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.companyProfile}
            </p>
          )}
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
          Continue to Contact Info
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Contact Information
        </h3>
        <p className="text-gray-600 mb-6">
          Please provide contact details for your organization:
        </p>
      </div>

      {/* Contact Details Section */}
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

      {/* Company Head in India Section */}
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

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Required Documents
        </h3>
        <p className="text-gray-600 mb-6">
          Please upload the required documents for your membership application:
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Memorandum & Article of Association along with Certificate of
              Incorporation *
            </label>
            {formData.memorandumArticle ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✓ Uploaded
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                ⚠ Not Uploaded
              </span>
            )}
          </div>
          <input
            type="file"
            name="memorandumArticle"
            onChange={handleInputChange}
            accept=".pdf,.docx,.doc"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.memorandumArticle
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            One file only. 5 MB limit. Allowed types: pdf, docx, doc.
          </p>
          {validationErrors.memorandumArticle && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.memorandumArticle}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Audited Balance Sheet / For startup - Certificate of Projected
              Turnover *
            </label>
            {formData.auditedBalanceSheet ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✓ Uploaded
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                ⚠ Not Uploaded
              </span>
            )}
          </div>
          <input
            type="file"
            name="auditedBalanceSheet"
            onChange={handleInputChange}
            accept=".pdf,.docx,.doc"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.auditedBalanceSheet
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            One file only. 5 MB limit. Allowed types: pdf, docx, doc.
          </p>
          {validationErrors.auditedBalanceSheet && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.auditedBalanceSheet}
            </p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">
          Document Requirements:
        </h4>
        <ul className="text-blue-800 space-y-1 text-sm">
          <li>• All documents must be in PDF, DOCX, or DOC format</li>
          <li>• Maximum file size: 5 MB per document</li>
          <li>• Ensure documents are clear and legible</li>
          <li>• For startups, provide projected turnover certificate</li>
          <li>• For established companies, provide audited balance sheet</li>
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
          onClick={nextStep}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Continue to Review
        </button>
      </div>
    </div>
  );

  const renderStep5 = () => (
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
          {/* Membership Type */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 border-b pb-2">
              Membership Type
            </h4>
            <p className="text-gray-700 capitalize text-lg">
              {membershipType} Member
            </p>
          </div>

          {/* Company Information */}
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

          {/* Company Address */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 border-b pb-2">
              Company Address
            </h4>
            <p className="text-gray-900">
              {formData.address}, {formData.city}, {formData.state} -{" "}
              {formData.pincode}
            </p>
          </div>

          {/* Government Registration Numbers */}
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

          {/* Company Profile */}
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

          {/* Primary Contact Person */}
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

          {/* Company Head in India */}
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

          {/* Documents */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 border-b pb-2">
              Documents to be Submitted
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Memorandum & Article of Association:
                </span>
                {formData.memorandumArticle ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Uploaded
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    ⚠ Not Uploaded
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Audited Balance Sheet/Projected Turnover Certificate:
                </span>
                {formData.auditedBalanceSheet ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Uploaded
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    ⚠ Not Uploaded
                  </span>
                )}
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

      {/* Terms and Conditions */}
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
          disabled={!formData.codeOfConduct || !formData.privacyPolicy}
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <span className="ml-2 font-medium">Documents</span>
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
                <span className="ml-2 font-medium">Contact Info</span>
              </div>
              <div
                className={`flex-1 h-1 mx-4 ${
                  currentStep >= 5 ? "bg-primary-600" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`flex items-center ${
                  currentStep >= 5 ? "text-primary-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= 5
                      ? "bg-primary-600 border-primary-600 text-white"
                      : "border-gray-300"
                  }`}
                >
                  5
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
              {currentStep === 5 && renderStep5()}
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
