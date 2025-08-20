"use client";

export type ValidationErrors = { [key: string]: string };

export interface ApplyFormData {
  // Company Details
  companyName: string;
  companyType: string;
  companyCategory: string;
  typeOfCompany: string;
  city: string;
  state: string;
  address: string;
  pincode: string;
  website: string;
  gstin: string;
  tanNo: string;
  panNo: string;
  yearOfEstablishment: string;
  legalEntity: string;
  globalHeadquarters: string;
  socialMediaHandle: string;

  // Contact Details
  contactDesignation: string;
  contactTitle: string;
  contactFirstName: string;
  contactLastName: string;
  contactMobile: string;
  contactEmail: string;

  // Company Head in India
  headDesignation: string;
  headTitle: string;
  headFirstName: string;
  headLastName: string;
  headMobile: string;
  headEmail: string;

  // Company Profile
  companyProfile: string;
  areasOfInterest: string[];

  // Revenue & Employee Details
  totalEmployees: string;
  employeeYear: string;
  totalRevenue: string;
  revenueYear: string;

  // Business Details
  businessType: string;
  turnover: string;
  registrationNumber: string;
  gstNumber: string;
  udyamNumber: string;
  factoryRegistration: string;
  powerConnection: string;
  pollutionClearance: string;
  description: string;

  // Documents
  memorandumArticle: File | null;
  auditedBalanceSheet: File | null;

  // Terms & Conditions
  codeOfConduct: boolean;
  privacyPolicy: boolean;
}
