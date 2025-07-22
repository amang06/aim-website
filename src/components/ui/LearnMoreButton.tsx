import React from "react";
import { Button } from "./button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface LearnMoreButtonProps {
  href?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
  text?: string;
  showArrow?: boolean;
  onClick?: () => void;
  external?: boolean;
}

const LearnMoreButton: React.FC<LearnMoreButtonProps> = ({
  href = "/about",
  size = "default",
  variant = "ghost",
  className = "",
  text = "Learn More",
  showArrow = true,
  onClick,
  external = false,
}) => {
  const buttonContent = showArrow ? <>{text} <ChevronRight className="size-6"/></> : text;

  const buttonElement = (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={onClick}
    >
      {buttonContent}
    </Button>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {buttonElement}
        </a>
      );
    }

    return <Link href={href}>{buttonElement}</Link>;
  }

  return buttonElement;
};

export default LearnMoreButton;
