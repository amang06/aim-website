"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/sections/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { ApplyFormData, ValidationErrors } from "./types";
import LearnMoreButton from "@/components/ui/LearnMoreButton";
import ProgressBar from "./components/ProgressBar";
import Step1SelectType from "./components/Step1SelectType";
import Step2CompanyInfo from "./components/Step2CompanyInfo";
import Step3ContactInfo from "./components/Step3ContactInfo";
import Step5Review from "./components/Step4Review";
import { getMembershipByType } from "@/lib/memberships";

export default function ApplyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [membershipType, setMembershipType] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [membershipPrice, setMembershipPrice] = useState<number | undefined>();

  // Fetch membership price when membership type changes
  useEffect(() => {
    if (membershipType) {
      fetchMembershipPrice();
    } else {
      setMembershipPrice(undefined);
    }
  }, [membershipType]);

  const fetchMembershipPrice = async () => {
    try {
      const membership = await getMembershipByType(membershipType);
      if (membership) {
        setMembershipPrice(membership.price);
      } else {
        setMembershipPrice(undefined);
      }
    } catch (error) {
      console.error("Error fetching membership price:", error);
      setMembershipPrice(undefined);
    }
  };

  const [formData, setFormData] = useState<ApplyFormData>({
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

    // Documents section removed

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
        // Document validation removed
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!membershipType) {
      alert("Please select a membership type");
      return;
    }

    if (!membershipPrice) {
      alert("Unable to get membership price. Please try again.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Initiate payment
      const response = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          membershipType,
          memberData: {
            ...formData,
            contactFirstName: formData.contactFirstName,
            contactLastName: formData.contactLastName,
            contactEmail: formData.contactEmail,
            contactMobile: formData.contactMobile,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to initiate payment");
      }

      const data = await response.json();

      // Create and submit form to PayU
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
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to initiate payment. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <Step1SelectType
      membershipType={membershipType}
      setMembershipType={setMembershipType}
      nextStep={nextStep}
    />
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
          <ProgressBar currentStep={currentStep} />

          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && (
                <Step2CompanyInfo
                  formData={formData}
                  validationErrors={validationErrors}
                  handleInputChange={handleInputChange}
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              )}
              {currentStep === 3 && (
                <Step3ContactInfo
                  formData={formData}
                  validationErrors={validationErrors}
                  handleInputChange={handleInputChange}
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              )}
              {currentStep === 4 && (
                <Step5Review
                  membershipType={membershipType}
                  formData={formData}
                  isSubmitting={isSubmitting}
                  handleCheckboxChange={handleCheckboxChange}
                  handleSubmit={handleSubmit}
                  prevStep={prevStep}
                  membershipPrice={membershipPrice}
                />
              )}
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
