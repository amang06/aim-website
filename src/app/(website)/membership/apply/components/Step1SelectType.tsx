"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

interface Step1SelectTypeProps {
  membershipType: string;
  setMembershipType: (type: string) => void;
  nextStep: () => void;
}

export default function Step1SelectType({
  membershipType,
  setMembershipType,
  nextStep,
}: Step1SelectTypeProps) {
  return (
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
            membershipType === "associate"
              ? "ring-2 ring-primary-500 bg-primary-50"
              : "hover:shadow-lg"
          }`}
          onClick={() => setMembershipType("associate")}
        >
          <CardHeader className="bg-primary-50">
            <CardTitle className="text-lg text-primary-900">
              Associate Member
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
            membershipType === "allied"
              ? "ring-2 ring-green-500 bg-green-50"
              : "hover:shadow-lg"
          }`}
          onClick={() => setMembershipType("allied")}
        >
          <CardHeader className="bg-green-50">
            <CardTitle className="text-lg text-green-900">
              Allied Member
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
            membershipType === "premier"
              ? "ring-2 ring-purple-500 bg-purple-50"
              : "hover:shadow-lg"
          }`}
          onClick={() => setMembershipType("premier")}
        >
          <CardHeader className="bg-purple-50">
            <CardTitle className="text-lg text-purple-900">
              Premier Member
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
}
