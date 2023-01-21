import { clsx } from "clsx";
import React from "react";
import { Link } from "wouter";

type ButtonType = "primary" | "secondary";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant: ButtonType;
  href?: string;
}

export const Button = ({ children, variant, href, ...props }: ButtonProps) => {
  const button = (
    <button
      className={clsx(
        "flex items-center justify-center rounded-xl border-2 bg-white p-6 font-bold transition-all duration-200 hover:text-white hover:shadow-xl",
        variant === "primary" && "border-primary text-primary hover:bg-primary",
        variant === "secondary" &&
          "border-secondary text-secondary hover:bg-secondary",
      )}
      {...props}
    >
      {children}
    </button>
  );

  return href ? <Link to={href}>{button}</Link> : button;
};
