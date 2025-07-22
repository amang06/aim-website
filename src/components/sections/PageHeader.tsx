"use client";
import React from "react";
import LearnMoreButton from "../ui/LearnMoreButton";
import JoinAIMButton from "../ui/JoinAIMButton";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
  overlay?: boolean;
  height?: "small" | "medium" | "large";
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
  backgroundImage,
  overlay = true,
  height = "medium",
}) => {
  const heightClasses = {
    small: "min-h-[40vh]",
    medium: "min-h-[50vh]",
    large: "min-h-[60vh]",
  };

  return (
    <section
      className={`relative bg-gradient-to-br from-primary-600 to-primary-800 text-white ${heightClasses[height]} flex items-center justify-center`}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {overlay && (
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          )}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl md:text-2xl font-medium text-primary-100 mb-6">
                {subtitle}
              </p>
            )}
          </div>

          {description && (
            <p className="text-lg text-primary-100 mb-8 leading-relaxed">
              {description}
            </p>
          )}

          {(ctaText || ctaHref) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {ctaText && ctaHref && (
                <LearnMoreButton
                  href={ctaHref}
                  size="lg"
                  variant="secondary"
                  className="bg-green-500 text-primary hover:bg-green-400"
                  showArrow={false}
                  text={ctaText}
                />
              )}
              <JoinAIMButton
                href="/membership"
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
