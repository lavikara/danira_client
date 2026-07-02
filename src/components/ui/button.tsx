import { cn } from "@/utils/helpers";
import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "danger" | "green";
type Size = "default" | "sm";

const SIZE_CLASSES: Record<Size, string> = {
  default: "px-4 py-2 text-[13px] rounded-[9px]",
  sm: "px-3 py-1.5 text-xs rounded-lg",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  const variantStyle: React.CSSProperties =
    variant === "primary"
      ? { backgroundColor: "#2563eb", color: "#fff" }
      : variant === "ghost"
        ? {
            backgroundColor: "var(--surface)",
            color: "var(--t2)",
            borderColor: "var(--border)",
          }
        : variant === "danger"
          ? { backgroundColor: "#ef4444", color: "#fff" }
          : { backgroundColor: "#10b981", color: "#fff" };

  const variantClass =
    variant === "primary"
      ? "shadow-[0_2px_8px_rgba(37,99,235,.28)] hover:bg-[#1d4ed8] hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(37,99,235,.38)]"
      : variant === "ghost"
        ? "border hover:border-primary hover:text-primary hover:bg-[var(--primary-50)]"
        : variant === "danger"
          ? "hover:bg-[#dc2626]"
          : "hover:bg-[#059669]";

  return (
    <button
      style={variantStyle}
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold leading-none transition-all duration-150 cursor-pointer",
        variantClass,
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
