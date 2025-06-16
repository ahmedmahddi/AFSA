import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTenantURL(tenantSlug: string) {
  return `/tenants/${tenantSlug}`;
}

export const formatCurrency = (value: number, currency: string = "TND") => {
  const opts: Intl.NumberFormatOptions = { style: "currency", currency };
  if (currency === "TND") opts.maximumFractionDigits = 3;
  else opts.maximumFractionDigits = 2;
  opts.minimumFractionDigits = 0;
  return new Intl.NumberFormat("en-US", opts).format(value);
};
