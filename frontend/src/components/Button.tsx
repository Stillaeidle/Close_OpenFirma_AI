import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "text";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  const baseStyles =
    "font-medium transition-colors inline-flex items-center justify-center";

  const variantStyles = {
    primary:
      "bg-brand-green-600 text-white hover:bg-brand-green-700 dark:bg-brand-green-600 dark:hover:bg-brand-green-700",
    secondary:
      "bg-white text-brand-green-700 hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-brand-green-800",
    outline:
      "border border-brand-green-600 text-brand-green-600 hover:bg-brand-green-50 dark:border-brand-green-500 dark:text-brand-green-400 dark:hover:bg-green-900/20",
    text: "text-brand-green-600 hover:text-brand-green-700 hover:underline dark:text-brand-green-400 dark:hover:text-brand-green-300",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm rounded",
    md: "px-4 py-2 rounded-md",
    lg: "px-6 py-3 rounded-md",
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};


export default Button;
