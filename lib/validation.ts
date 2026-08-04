export function isValidIndianMobile(mobile: string): boolean {
  const digits = mobile.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return /^[6-9]\d{9}$/.test(digits.slice(2));
  }
  if (digits.length === 10) {
    return /^[6-9]\d{9}$/.test(digits);
  }
  return false;
}

export function normalizeMobile(mobile: string): string {
  const digits = mobile.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  return digits;
}

export function isNonEmpty(value: unknown, max = 200): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= max;
}

export function optionalString(value: unknown, max = 500): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}
