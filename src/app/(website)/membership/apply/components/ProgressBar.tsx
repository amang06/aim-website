"use client";

import React from "react";

interface ProgressBarProps {
  currentStep: number;
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
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
          <span className="ml-2 font-medium">Contact Info</span>
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
  );
}
