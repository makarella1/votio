import { clsx } from "clsx";
import React from "react";
import { Link } from "wouter";

type ButtonType =
  | "primary"
  | "secondary"
  | "primary-outlined"
  | "secondary-outlined";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant: ButtonType;
  href?: string;
}

export const Button = ({ children, variant, href, ...props }: ButtonProps) => {
  const button = (
    <button
      className={clsx(
        "flex items-center justify-center rounded-xl border-2 p-6 font-bold transition-all duration-200 hover:shadow-xl",
        variant === "primary-outlined" &&
          "border-primary bg-white text-primary hover:bg-primary hover:text-white",
        variant === "secondary-outlined" &&
          "border-secondary text-secondary hover:bg-secondary hover:text-white",
        variant === "primary" &&
          "border-primary bg-primary text-white hover:border-primary hover:bg-white hover:text-primary",
        variant === "secondary" &&
          "border-secondary bg-secondary text-white hover:border-secondary hover:bg-white hover:text-secondary",
      )}
      {...props}
    >
      {children}
    </button>
  );

  return href ? <Link to={href}>{button}</Link> : button;
};
