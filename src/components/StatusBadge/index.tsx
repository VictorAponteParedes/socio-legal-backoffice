// src/components/StatusBadge/index.tsx
import type { ReactNode } from "react";

type Variant = "success" | "warning" | "error" | "neutral" | "info";

interface StatusBadgeProps {
  variant: Variant;
  children: ReactNode;
  dot?: boolean;
}

const VARIANT_STYLES: Record<Variant, string> = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  error: "bg-red-50 text-red-700 border-red-200",
  neutral: "bg-slate-100 text-slate-600 border-slate-200",
  info: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

const DOT_COLORS: Record<Variant, string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  neutral: "bg-slate-400",
  info: "bg-indigo-500",
};

export const StatusBadge = ({ variant, children, dot = false }: StatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${VARIANT_STYLES[variant]}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${DOT_COLORS[variant]}`} />
      )}
      {children}
    </span>
  );
};
