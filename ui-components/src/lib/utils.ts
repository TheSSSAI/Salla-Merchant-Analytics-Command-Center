import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS classes with clsx logic.
 * This utility resolves class conflicts (e.g., 'px-2' vs 'px-4') using tailwind-merge
 * and handles conditional classes using clsx.
 * 
 * @param inputs - List of class values, arrays, or objects.
 * @returns A merged string of class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as a currency string.
 * Uses the Intl.NumberFormat API.
 * 
 * @param value - The number to format.
 * @param currency - The currency code (default: 'SAR' for Salla context).
 * @param locale - The locale string (default: 'en-US').
 * @returns Formatted currency string.
 */
export function formatCurrency(
  value: number, 
  currency: string = 'SAR', 
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a number with compact notation (e.g. 1.2k, 1M).
 * 
 * @param value - The number to format.
 * @returns Formatted string.
 */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}

/**
 * Generates initial for a user name.
 * 
 * @param name - Full name of the user.
 * @returns Two letter initials (e.g., "John Doe" -> "JD").
 */
export function getInitials(name: string): string {
  if (!name) return "";
  
  const parts = name.split(" ");
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Artificial delay for simulating async operations during development/demos.
 * 
 * @param ms - Milliseconds to wait.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}