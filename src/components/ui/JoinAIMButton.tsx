import React from "react";
import { Button } from "./button";
import Link from "next/link";

interface JoinAIMButtonProps {
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
  onClick?: () => void;
  external?: boolean;
}

const JoinAIMButton: React.FC<JoinAIMButtonProps> = ({
  href = "/membership/apply",
  size = "default",
  variant = "outline",
  className = "bg-transparent",
  text = "Join AIM",
  onClick,
  external = false,
}) => {
  const buttonElement = (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={onClick}
    >
      {text}
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

export default JoinAIMButton;
