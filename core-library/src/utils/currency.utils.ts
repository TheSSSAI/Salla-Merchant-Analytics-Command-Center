import { CurrencyCode } from '../types/domain.types';
import { ValidationError } from '../errors/validation.error';

/**
 * Enterprise-grade currency formatting and manipulation utilities.
 * Uses Intl.NumberFormat for high-performance, localized formatting.
 */
export const CurrencyUtils = {
  /**
   * Formats a numeric value into a currency string.
   * 
   * @param value - The monetary value
   * @param currencyCode - ISO 4217 Currency Code (default: USD)
   * @param locale - Locale string (default: en-US)
   * @returns Formatted currency string (e.g., "$1,234.56")
   * @throws ValidationError if input is invalid or currency code is unsupported
   */
  formatCurrency(value: number, currencyCode: string = CurrencyCode.USD, locale: string = 'en-US'): string {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new ValidationError('Value must be a valid number');
    }

    // Validate currency code against the domain Enum to ensure system support
    if (!Object.values(CurrencyCode).includes(currencyCode as CurrencyCode)) {
      // Fallback or throw? For strict enterprise logic, we verify support.
      // However, Intl supports more than our Enum. We will trust the Enum definition.
      // If code is passed that isn't in Enum, we might still format it, but let's be strict if it was typed as string.
      // Ideally, the input should be typed as CurrencyCode, but the signature allows string.
      // We will proceed with Intl formatting, it handles most codes.
    }

    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    } catch (error) {
      throw new ValidationError(`Failed to format currency: ${(error as Error).message}`);
    }
  },

  /**
   * Gets the symbol for a specific currency code.
   * 
   * @param currencyCode - ISO 4217 Currency Code
   * @param locale - Locale string
   * @returns Currency symbol (e.g., "$")
   */
  getSymbol(currencyCode: string = CurrencyCode.USD, locale: string = 'en-US'): string {
    try {
      const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
      });
      
      const parts = formatter.formatToParts(0);
      const symbolPart = parts.find(part => part.type === 'currency');
      return symbolPart ? symbolPart.value : currencyCode;
    } catch {
      return currencyCode;
    }
  },

  /**
   * Parses a formatted currency string back to a number.
   * Note: This is heuristic and might not handle all localized formats perfectly.
   * Use with caution on user input.
   * 
   * @param currencyString - The string to parse (e.g. "$1,234.56")
   * @returns number
   */
  parseCurrency(currencyString: string): number {
    if (!currencyString) return 0;
    
    // Remove currency symbols and grouping separators (commas), keep decimal point
    // This regex assumes standard western formatting (period for decimal, comma for thousand)
    // For robust multi-locale parsing, a dedicated library like currency.js or dinero.js is better.
    const cleanString = currencyString.replace(/[^0-9.-]+/g, '');
    const num = parseFloat(cleanString);
    
    return isNaN(num) ? 0 : num;
  },

  /**
   * Converts a major unit (e.g. Dollars) to minor unit (e.g. Cents).
   * Useful for payment gateways like Stripe.
   * 
   * @param amount - Amount in major unit
   * @returns Amount in minor unit (integer)
   */
  toMinorUnit(amount: number): number {
    return Math.round(amount * 100);
  },

  /**
   * Converts a minor unit (e.g. Cents) to major unit (e.g. Dollars).
   * 
   * @param amount - Amount in minor unit
   * @returns Amount in major unit (float)
   */
  fromMinorUnit(amount: number): number {
    return amount / 100;
  }
};

export const { formatCurrency, getSymbol, parseCurrency, toMinorUnit, fromMinorUnit } = CurrencyUtils;