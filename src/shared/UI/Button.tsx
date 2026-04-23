import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "ghost"
  | "warning";

type ButtonSize = "sm" | "md" | "lg";

type Props = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  className = "",
  disabled,
  ...props
}: Props) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-[20px] font-bold transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-[#2B5FBA] text-white hover:bg-[#214E9B] active:scale-[0.98]",
    secondary:
      "bg-[#F8F8F8] text-[#4B5563] border border-[#DADADA] hover:bg-[#F1F1F1] active:scale-[0.98]",
    success: "bg-[#10C94B] text-white hover:bg-[#0FA942] active:scale-[0.98]",
    danger: "bg-[#E74C3C] text-white hover:bg-[#D63D2D] active:scale-[0.98]",
    ghost: "bg-transparent text-[#2B5FBA] hover:bg-white/60 shadow-none",
    warning:
      "bg-[#F6EBCF] text-[#8A6116] border border-[#EBDDBB] hover:bg-[#F2E2BB] active:scale-[0.98]",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {loading ? "Загрузка..." : children}
    </button>
  );
};
