// src/helper/currency.ts
export const formatCurrency = (value?: number | string | null): string => {
  if (value === null || value === undefined) return "0 Gs.";

  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numericValue)) return "0 Gs.";
  const formatted = new Intl.NumberFormat("es-PY").format(numericValue);

  return `${formatted} Gs.`;
};
